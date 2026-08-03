// Idea schema — the data contract passed between pipeline stages.
// Stages 1–3 (vision → idea → proposal) live in this repo.
// Stages 4–7 (approved → build → grow → managed) live in VR4Deaf / 360Magicians.
// This schema is the handoff payload between the two systems.

import { z } from "zod"

export const IdeaStageSchema = z.object({
  id: z.string(),
  stage: z.enum(["vision", "idea", "proposal", "approved", "build", "grow", "managed"]),
  title: z.string().min(1),
  category: z.enum(["jobs", "businesses", "self-employment", "contracts"]),
  region: z.string().optional(),
  description: z.string().optional(),
  createdAt: z.string().datetime(),
})

export const ProposalPayloadSchema = z.object({
  businessName: z.string().min(1),
  businessType: z.string().min(1),
  fundingAgency: z.string().min(1),
  accommodationNeeds: z.string(),
  businessGoals: z.string(),
  targetMarket: z.string().optional(),
  estimatedBudget: z.string().optional(),
  timeline: z.string().optional(),
  expectedOutcomes: z.string().optional(),
})

// The shape passed to downstream systems (PinkFlow / 360Magicians)
export const PipelineHandoffSchema = z.object({
  stageId: z.string(),
  fromStage: z.enum(["vision", "idea", "proposal"]),
  toStage: z.enum(["approved", "build", "grow", "managed"]),
  idea: IdeaStageSchema,
  proposal: ProposalPayloadSchema.optional(),
  feasibilityScore: z.number().min(0).max(100).optional(),
  matchProbability: z.number().min(0).max(100).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
})

export type IdeaStage = z.infer<typeof IdeaStageSchema>
export type ProposalPayload = z.infer<typeof ProposalPayloadSchema>
export type PipelineHandoff = z.infer<typeof PipelineHandoffSchema>
