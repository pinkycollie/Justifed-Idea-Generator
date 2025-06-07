"use client"

import { useState } from "react"
import { Lightbulb, Briefcase, Building2, UserRound, FileCodeIcon as FileContract } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateIdea } from "@/lib/idea-generator"
import { cn } from "@/lib/utils"

type Category = "jobs" | "businesses" | "self-employment" | "contracts"

export function IdeaGenerator() {
  const [currentIdea, setCurrentIdea] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<Category>("jobs")

  const handleGenerateIdea = async () => {
    setIsGenerating(true)
    try {
      const idea = await generateIdea(selectedCategory)
      setCurrentIdea(idea)
    } catch (error) {
      console.error("Failed to generate idea:", error)
      setCurrentIdea("Failed to generate an idea. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const categoryIcons = {
    jobs: <Briefcase className="h-5 w-5" />,
    businesses: <Building2 className="h-5 w-5" />,
    "self-employment": <UserRound className="h-5 w-5" />,
    contracts: <FileContract className="h-5 w-5" />,
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="w-full max-w-3xl bg-white shadow-lg border-slate-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-slate-800">
            <Lightbulb className="inline-block mr-2 h-6 w-6 text-yellow-600" />
            Texas Opportunity Idea Generator
          </CardTitle>
          <CardDescription className="text-slate-600">
            Generate innovative business ideas specific to the Texas market for everyone
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="jobs"
            className="w-full"
            onValueChange={(value) => setSelectedCategory(value as Category)}
          >
            <TabsList className="grid grid-cols-4 mb-8 bg-slate-100">
              <TabsTrigger
                value="jobs"
                className="flex items-center gap-2 data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
              >
                {categoryIcons.jobs} Jobs
              </TabsTrigger>
              <TabsTrigger
                value="businesses"
                className="flex items-center gap-2 data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
              >
                {categoryIcons.businesses} Businesses
              </TabsTrigger>
              <TabsTrigger
                value="self-employment"
                className="flex items-center gap-2 data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
              >
                {categoryIcons["self-employment"]} Self-Employment
              </TabsTrigger>
              <TabsTrigger
                value="contracts"
                className="flex items-center gap-2 data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
              >
                {categoryIcons.contracts} Contracts
              </TabsTrigger>
            </TabsList>

            <TabsContent value="jobs" className="mt-0">
              <p className="text-sm text-slate-700 mb-4">
                Discover promising job opportunities and career paths in Texas for all skill levels and backgrounds.
              </p>
            </TabsContent>
            <TabsContent value="businesses" className="mt-0">
              <p className="text-sm text-slate-700 mb-4">
                Explore innovative business ideas tailored to the Texas market, accessible to entrepreneurs of all
                backgrounds.
              </p>
            </TabsContent>
            <TabsContent value="self-employment" className="mt-0">
              <p className="text-sm text-slate-700 mb-4">
                Find freelance and self-employment opportunities in the Lone Star State suitable for diverse talents.
              </p>
            </TabsContent>
            <TabsContent value="contracts" className="mt-0">
              <p className="text-sm text-slate-700 mb-4">
                Discover contract-based work and project opportunities in Texas open to professionals from all
                backgrounds.
              </p>
            </TabsContent>
          </Tabs>

          <div className="flex justify-center mb-6">
            <Button
              onClick={handleGenerateIdea}
              disabled={isGenerating}
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
              aria-label="Generate business idea"
            >
              {isGenerating ? "Generating..." : "Generate Idea"}
            </Button>
          </div>

          <div
            className={cn(
              "p-6 rounded-lg border-2 border-dashed border-indigo-200 min-h-[150px] flex items-center justify-center text-center transition-all",
              currentIdea ? "bg-indigo-50" : "bg-transparent",
            )}
            aria-live="polite"
          >
            {currentIdea ? (
              <p className="text-lg font-medium text-slate-800">{currentIdea}</p>
            ) : (
              <p className="text-slate-500 italic">Your Texas opportunity idea will appear here</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-6 border-slate-200">
          <p className="text-sm text-slate-600">
            Ideas are generated specifically for the Texas market and designed to be accessible to everyone
          </p>
        </CardFooter>
      </Card>

      <div className="mt-8 text-center max-w-2xl">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Why Texas?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white shadow-md border-slate-200">
            <CardContent className="pt-6">
              <h3 className="font-medium mb-2 text-indigo-700">Booming Economy</h3>
              <p className="text-sm text-slate-700">
                Texas has one of the strongest economies in the US, offering numerous opportunities for everyone.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-md border-slate-200">
            <CardContent className="pt-6">
              <h3 className="font-medium mb-2 text-indigo-700">Business Friendly</h3>
              <p className="text-sm text-slate-700">
                Low taxes and regulations make Texas ideal for starting and growing businesses of all types.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-md border-slate-200">
            <CardContent className="pt-6">
              <h3 className="font-medium mb-2 text-indigo-700">Inclusive Growth</h3>
              <p className="text-sm text-slate-700">
                Texas offers opportunities across diverse sectors and communities, welcoming entrepreneurs from all
                backgrounds.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

