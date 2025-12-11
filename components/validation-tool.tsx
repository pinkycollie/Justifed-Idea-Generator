"use client"

import { useState } from "react"
import { FileCheck, Building2, Target, DollarSign, Users, TrendingUp, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateValidationReport } from "@/lib/validation-generator"

interface ValidationFormData {
  businessName: string
  businessType: string
  fundingAgency: string
  accommodationNeeds: string
  businessGoals: string
  targetMarket: string
  estimatedBudget: string
  timeline: string
  expectedOutcomes: string
}

export function ValidationTool() {
  const [formData, setFormData] = useState<ValidationFormData>({
    businessName: "",
    businessType: "",
    fundingAgency: "",
    accommodationNeeds: "",
    businessGoals: "",
    targetMarket: "",
    estimatedBudget: "",
    timeline: "",
    expectedOutcomes: "",
  })

  const [validationReport, setValidationReport] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [feasibilityScore, setFeasibilityScore] = useState<number | null>(null)

  const handleInputChange = (field: keyof ValidationFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleGenerateReport = async () => {
    setIsGenerating(true)
    try {
      const result = await generateValidationReport(formData)
      setValidationReport(result.report)
      setFeasibilityScore(result.feasibilityScore)
    } catch (error) {
      console.error("Failed to generate validation report:", error)
      setValidationReport("Failed to generate report. Please try again.")
      setFeasibilityScore(null)
    } finally {
      setIsGenerating(false)
    }
  }

  const getFeasibilityColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getFeasibilityLabel = (score: number) => {
    if (score >= 80) return "High Feasibility"
    if (score >= 60) return "Moderate Feasibility"
    return "Needs Refinement"
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card className="bg-white shadow-lg border-slate-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-slate-800">
            <FileCheck className="inline-block mr-2 h-6 w-6 text-indigo-600" />
            Accommodation Validation Tool
          </CardTitle>
          <CardDescription className="text-slate-600">
            Generate professional justification reports for vocational rehabilitation, SBA, and funding agencies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="input" className="w-full">
            <TabsList className="grid grid-cols-2 mb-8 bg-slate-100">
              <TabsTrigger
                value="input"
                className="flex items-center gap-2 data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
              >
                <Building2 className="h-4 w-4" />
                Input Information
              </TabsTrigger>
              <TabsTrigger
                value="report"
                className="flex items-center gap-2 data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
              >
                <FileCheck className="h-4 w-4" />
                Generated Report
              </TabsTrigger>
            </TabsList>

            <TabsContent value="input" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="businessName" className="text-slate-700 font-medium">
                    Business/Project Name *
                  </Label>
                  <Input
                    id="businessName"
                    placeholder="Enter your business or project name"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange("businessName", e.target.value)}
                    className="border-slate-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessType" className="text-slate-700 font-medium">
                    Business Type *
                  </Label>
                  <Select value={formData.businessType} onValueChange={(value) => handleInputChange("businessType", value)}>
                    <SelectTrigger id="businessType" className="border-slate-300">
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="service">Service</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="food-beverage">Food & Beverage</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fundingAgency" className="text-slate-700 font-medium">
                    Funding Agency *
                  </Label>
                  <Select value={formData.fundingAgency} onValueChange={(value) => handleInputChange("fundingAgency", value)}>
                    <SelectTrigger id="fundingAgency" className="border-slate-300">
                      <SelectValue placeholder="Select funding agency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vocational-rehab">Vocational Rehabilitation</SelectItem>
                      <SelectItem value="sba">Small Business Administration (SBA)</SelectItem>
                      <SelectItem value="state-grant">State Grant Program</SelectItem>
                      <SelectItem value="private-foundation">Private Foundation</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimatedBudget" className="text-slate-700 font-medium">
                    Estimated Budget *
                  </Label>
                  <Input
                    id="estimatedBudget"
                    type="text"
                    placeholder="e.g., $50,000"
                    value={formData.estimatedBudget}
                    onChange={(e) => handleInputChange("estimatedBudget", e.target.value)}
                    className="border-slate-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accommodationNeeds" className="text-slate-700 font-medium flex items-center gap-2">
                  <Users className="h-4 w-4 text-indigo-600" />
                  Accommodation Needs *
                </Label>
                <Textarea
                  id="accommodationNeeds"
                  placeholder="Describe the specific accommodations needed (e.g., adaptive equipment, workplace modifications, assistive technology)"
                  value={formData.accommodationNeeds}
                  onChange={(e) => handleInputChange("accommodationNeeds", e.target.value)}
                  className="min-h-[100px] border-slate-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessGoals" className="text-slate-700 font-medium flex items-center gap-2">
                  <Target className="h-4 w-4 text-indigo-600" />
                  Business/Vocational Goals *
                </Label>
                <Textarea
                  id="businessGoals"
                  placeholder="Describe your business or vocational goals and how they align with your career objectives"
                  value={formData.businessGoals}
                  onChange={(e) => handleInputChange("businessGoals", e.target.value)}
                  className="min-h-[100px] border-slate-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetMarket" className="text-slate-700 font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-indigo-600" />
                  Target Market
                </Label>
                <Textarea
                  id="targetMarket"
                  placeholder="Describe your target market and customer base"
                  value={formData.targetMarket}
                  onChange={(e) => handleInputChange("targetMarket", e.target.value)}
                  className="min-h-[80px] border-slate-300"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="timeline" className="text-slate-700 font-medium">
                    Implementation Timeline
                  </Label>
                  <Input
                    id="timeline"
                    placeholder="e.g., 6-12 months"
                    value={formData.timeline}
                    onChange={(e) => handleInputChange("timeline", e.target.value)}
                    className="border-slate-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expectedOutcomes" className="text-slate-700 font-medium">
                    Expected Outcomes
                  </Label>
                  <Input
                    id="expectedOutcomes"
                    placeholder="e.g., Employment, Revenue targets"
                    value={formData.expectedOutcomes}
                    onChange={(e) => handleInputChange("expectedOutcomes", e.target.value)}
                    className="border-slate-300"
                  />
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <Button
                  onClick={handleGenerateReport}
                  disabled={
                    isGenerating ||
                    !formData.businessName ||
                    !formData.businessType ||
                    !formData.fundingAgency ||
                    !formData.accommodationNeeds ||
                    !formData.businessGoals
                  }
                  size="lg"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
                >
                  {isGenerating ? "Generating Report..." : "Generate Validation Report"}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="report" className="space-y-4">
              {feasibilityScore !== null && (
                <Card className="bg-indigo-50 border-indigo-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className={`h-6 w-6 ${getFeasibilityColor(feasibilityScore)}`} />
                        <span className="font-semibold text-slate-800">Feasibility Assessment:</span>
                      </div>
                      <div className={`text-2xl font-bold ${getFeasibilityColor(feasibilityScore)}`}>
                        {feasibilityScore}%
                      </div>
                    </div>
                    <p className={`text-sm mt-2 ${getFeasibilityColor(feasibilityScore)}`}>
                      {getFeasibilityLabel(feasibilityScore)}
                    </p>
                  </CardContent>
                </Card>
              )}

              {validationReport ? (
                <div className="prose max-w-none">
                  <div className="bg-white p-6 rounded-lg border-2 border-slate-200 whitespace-pre-wrap">
                    {validationReport}
                  </div>
                  <div className="flex justify-end gap-4 mt-4">
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(validationReport)
                      }}
                      variant="outline"
                      className="border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                    >
                      Copy to Clipboard
                    </Button>
                    <Button
                      onClick={() => {
                        const blob = new Blob([validationReport], { type: "text/plain" })
                        const url = URL.createObjectURL(blob)
                        const a = document.createElement("a")
                        a.href = url
                        a.download = `validation-report-${formData.businessName.replace(/\s+/g, "-")}.txt`
                        a.click()
                      }}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      Download Report
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center p-12 text-slate-500">
                  <FileCheck className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                  <p>Generate a report to see the validation results here</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-6 border-slate-200">
          <p className="text-sm text-slate-600 text-center">
            This tool uses advanced algorithms to assess feasibility and generate professional justification reports
            tailored to your funding agency requirements.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
