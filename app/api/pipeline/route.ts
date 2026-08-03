// /api/pipeline — single endpoint for PinkFlow orchestration.
// Accepts { stage, input } and returns the output of that stage.
// Stages 1–3 (vision, idea, proposal) are handled here.
// Stages 4–7 (approved, build, grow, managed) belong to VR4Deaf / 360Magicians.

import { NextRequest, NextResponse } from "next/server"
import { generatePersonalizedOpportunity } from "@/lib/idea-generator"
import { generateValidationReport } from "@/lib/proposal-generator"
import { PipelineHandoffSchema } from "@/mbtq/schemas/idea.schema"

type Stage = "vision" | "idea" | "proposal"

export async function POST(req: NextRequest) {
  let body: { stage: Stage; input: Record<string, unknown> }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const { stage, input } = body

  if (!stage || !input) {
    return NextResponse.json({ error: "Missing stage or input" }, { status: 400 })
  }

  try {
    switch (stage) {
      case "vision": {
        // Vision stage — echo back the user intent, nothing computed yet
        return NextResponse.json({
          stage: "vision",
          next: "idea",
          output: { received: input },
        })
      }

      case "idea": {
        const category = input.category as string
        const userProfile = (input.userProfile ?? {}) as Record<string, unknown>

        if (!category) {
          return NextResponse.json({ error: "input.category is required for idea stage" }, { status: 400 })
        }

        const result = await generatePersonalizedOpportunity(category, userProfile as Parameters<typeof generatePersonalizedOpportunity>[1])

        return NextResponse.json({
          stage: "idea",
          next: "proposal",
          output: {
            idea: {
              id: crypto.randomUUID(),
              stage: "idea",
              title: result.opportunity.title,
              category,
              region: result.opportunity.region,
              description: result.opportunity.description,
              createdAt: new Date().toISOString(),
            },
            matchProbability: result.matchProbability,
            resources: result.resources,
          },
        })
      }

      case "proposal": {
        const formData = input as unknown as Parameters<typeof generateValidationReport>[0]
        const result = await generateValidationReport(formData)

        const handoff = PipelineHandoffSchema.parse({
          stageId: crypto.randomUUID(),
          fromStage: "proposal",
          toStage: "approved",
          idea: {
            id: crypto.randomUUID(),
            stage: "proposal",
            title: formData.businessName,
            category: "businesses",
            createdAt: new Date().toISOString(),
          },
          proposal: formData,
          feasibilityScore: result.feasibilityScore,
        })

        return NextResponse.json({
          stage: "proposal",
          next: "approved",
          output: {
            report: result.report,
            feasibilityScore: result.feasibilityScore,
            handoff,
          },
        })
      }

      default:
        return NextResponse.json(
          { error: `Stage "${stage}" is not handled by this service. Stages 4–7 belong to VR4Deaf / 360Magicians.` },
          { status: 422 }
        )
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
