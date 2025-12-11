"use client"

import { useState } from "react"
import {
  Lightbulb,
  Briefcase,
  Building2,
  UserRound,
  FileCodeIcon as FileContract,
  MapPin,
  TrendingUp,
  Award,
  Phone,
  ChevronDown,
  ChevronUp,
  Info,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateIdea, generatePersonalizedOpportunity, Opportunity } from "@/lib/idea-generator"
import { UserCircumstances, TexasRegion, regionalData } from "@/lib/user-context"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

type Category = "jobs" | "businesses" | "self-employment" | "contracts"

export function EnhancedIdeaGenerator() {
  const [currentIdea, setCurrentIdea] = useState<string>("")
  const [currentOpportunity, setCurrentOpportunity] = useState<Opportunity | null>(null)
  const [matchProbability, setMatchProbability] = useState<number>(0)
  const [resources, setResources] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<Category>("jobs")
  const [showDetails, setShowDetails] = useState<boolean>(false)
  const [showUserForm, setShowUserForm] = useState<boolean>(false)

  // User circumstances state
  const [userCircumstances, setUserCircumstances] = useState<Partial<UserCircumstances>>({
    location: {
      city: '',
      county: '',
      region: 'dallas-fort-worth',
      isRural: false,
      inOpportunityZone: false,
    },
    employmentStatus: 'unemployed',
    educationLevel: 'high-school',
    primaryGoal: 'immediate-employment',
    isVeteran: false,
    hasDisability: false,
    skills: [],
    languages: ['English'],
  })

  const handleGenerateIdea = async () => {
    setIsGenerating(true)
    setShowDetails(false)
    try {
      // Use enhanced generator if user has set a region
      if (userCircumstances.location?.region) {
        const result = await generatePersonalizedOpportunity(selectedCategory, userCircumstances)
        setCurrentOpportunity(result.opportunity)
        setMatchProbability(result.matchProbability)
        setResources(result.resources)
        setCurrentIdea(`${result.opportunity.title}\n\n${result.opportunity.description}`)
        setShowDetails(true)
      } else {
        // Fallback to simple generator
        const idea = await generateIdea(selectedCategory)
        setCurrentIdea(idea)
        setCurrentOpportunity(null)
      }
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

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return "text-green-600 bg-green-50"
    if (probability >= 60) return "text-blue-600 bg-blue-50"
    if (probability >= 40) return "text-yellow-600 bg-yellow-50"
    return "text-orange-600 bg-orange-50"
  }

  const getProbabilityLabel = (probability: number) => {
    if (probability >= 80) return "Excellent Match"
    if (probability >= 60) return "Good Match"
    if (probability >= 40) return "Moderate Match"
    return "Consider After Training"
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="w-full max-w-4xl bg-white shadow-lg border-slate-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-slate-800">
            <Lightbulb className="inline-block mr-2 h-6 w-6 text-yellow-600" />
            Texas Public Opportunity Generator
          </CardTitle>
          <CardDescription className="text-slate-600">
            Personalized job and business opportunities with SBA, Workforce Solutions, and Department of Labor resources
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* User Settings Dialog */}
          <div className="mb-6 flex justify-between items-center bg-indigo-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-indigo-600" />
              <span className="text-sm font-medium text-slate-700">
                Region: {regionalData[userCircumstances.location?.region || 'dallas-fort-worth']?.region.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </span>
            </div>
            <Dialog open={showUserForm} onOpenChange={setShowUserForm}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="bg-white">
                  <Info className="h-4 w-4 mr-2" />
                  Personalize
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Personalize Your Opportunities</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Texas Region</label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={userCircumstances.location?.region || 'dallas-fort-worth'}
                      onChange={(e) =>
                        setUserCircumstances({
                          ...userCircumstances,
                          location: { ...userCircumstances.location!, region: e.target.value as TexasRegion },
                        })
                      }
                    >
                      {Object.keys(regionalData).map((region) => (
                        <option key={region} value={region}>
                          {region.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Current Status</label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={userCircumstances.employmentStatus || 'unemployed'}
                      onChange={(e) =>
                        setUserCircumstances({
                          ...userCircumstances,
                          employmentStatus: e.target.value as any,
                        })
                      }
                    >
                      <option value="employed">Employed (seeking better opportunity)</option>
                      <option value="unemployed">Unemployed</option>
                      <option value="underemployed">Underemployed</option>
                      <option value="student">Student</option>
                      <option value="retired">Retired</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Education Level</label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={userCircumstances.educationLevel || 'high-school'}
                      onChange={(e) =>
                        setUserCircumstances({
                          ...userCircumstances,
                          educationLevel: e.target.value as any,
                        })
                      }
                    >
                      <option value="less-than-high-school">Less than High School</option>
                      <option value="high-school">High School / GED</option>
                      <option value="some-college">Some College</option>
                      <option value="associate">Associate Degree</option>
                      <option value="bachelor">Bachelor's Degree</option>
                      <option value="advanced">Advanced Degree</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Primary Goal</label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={userCircumstances.primaryGoal || 'immediate-employment'}
                      onChange={(e) =>
                        setUserCircumstances({
                          ...userCircumstances,
                          primaryGoal: e.target.value as any,
                        })
                      }
                    >
                      <option value="immediate-employment">Find Job Immediately</option>
                      <option value="career-change">Change Career Path</option>
                      <option value="start-business">Start a Business</option>
                      <option value="training">Get Training/Education</option>
                      <option value="contract-work">Contract/Freelance Work</option>
                    </select>
                  </div>

                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={userCircumstances.isVeteran || false}
                        onChange={(e) =>
                          setUserCircumstances({ ...userCircumstances, isVeteran: e.target.checked })
                        }
                        className="h-4 w-4"
                      />
                      <span className="text-sm">Military Veteran</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={userCircumstances.hasDisability || false}
                        onChange={(e) =>
                          setUserCircumstances({ ...userCircumstances, hasDisability: e.target.checked })
                        }
                        className="h-4 w-4"
                      />
                      <span className="text-sm">Have Disability</span>
                    </label>
                  </div>

                  <div className="pt-4">
                    <Button onClick={() => setShowUserForm(false)} className="w-full bg-indigo-600 hover:bg-indigo-700">
                      Save Preferences
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

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
                Jobs matched with Workforce Solutions, Department of Labor programs, and local economic development
              </p>
            </TabsContent>
            <TabsContent value="businesses" className="mt-0">
              <p className="text-sm text-slate-700 mb-4">
                Business opportunities with SBA financing, SBDC consulting, and economic development incentives
              </p>
            </TabsContent>
            <TabsContent value="self-employment" className="mt-0">
              <p className="text-sm text-slate-700 mb-4">
                Self-employment paths with SBA microloans, self-employment assistance programs, and SCORE mentorship
              </p>
            </TabsContent>
            <TabsContent value="contracts" className="mt-0">
              <p className="text-sm text-slate-700 mb-4">
                Contract opportunities including government contracting, 8(a) program, and professional services
              </p>
            </TabsContent>
          </Tabs>

          <div className="flex justify-center mb-6">
            <Button
              onClick={handleGenerateIdea}
              disabled={isGenerating}
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
              aria-label="Generate opportunity"
            >
              {isGenerating ? "Generating..." : "Generate Opportunity"}
            </Button>
          </div>

          {/* Main idea display */}
          <div
            className={cn(
              "p-6 rounded-lg border-2 border-dashed border-indigo-200 min-h-[150px] flex flex-col justify-center transition-all",
              currentIdea ? "bg-indigo-50" : "bg-transparent",
            )}
            aria-live="polite"
          >
            {currentIdea ? (
              <div>
                {matchProbability > 0 && (
                  <div className="flex items-center justify-between mb-4">
                    <div className={cn("px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2", getProbabilityColor(matchProbability))}>
                      <TrendingUp className="h-4 w-4" />
                      {matchProbability}% Match - {getProbabilityLabel(matchProbability)}
                    </div>
                  </div>
                )}
                <p className="text-lg font-medium text-slate-800 whitespace-pre-line">{currentIdea}</p>
              </div>
            ) : (
              <p className="text-slate-500 italic text-center">
                Your personalized Texas opportunity will appear here
              </p>
            )}
          </div>

          {/* Enhanced details section */}
          {currentOpportunity && (
            <div className="mt-6 space-y-4">
              <Button
                variant="outline"
                onClick={() => setShowDetails(!showDetails)}
                className="w-full flex items-center justify-between"
              >
                <span className="font-medium">View Resources & Next Steps</span>
                {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>

              {showDetails && (
                <div className="space-y-4 animate-in slide-in-from-top">
                  {/* Government Resources */}
                  {resources.length > 0 && (
                    <Card className="bg-blue-50 border-blue-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Award className="h-4 w-4 text-blue-600" />
                          Government Resources Available
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          {resources.slice(0, 6).map((resource, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-blue-600 mt-0.5">•</span>
                              <span className="text-slate-700">{resource}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* Next Steps */}
                  {currentOpportunity.nextSteps.length > 0 && (
                    <Card className="bg-green-50 border-green-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          Your Action Plan
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ol className="space-y-2 text-sm list-decimal list-inside">
                          {currentOpportunity.nextSteps.map((step, idx) => (
                            <li key={idx} className="text-slate-700">
                              {step}
                            </li>
                          ))}
                        </ol>
                      </CardContent>
                    </Card>
                  )}

                  {/* Contact Information */}
                  {currentOpportunity.contactInfo.length > 0 && (
                    <Card className="bg-purple-50 border-purple-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Phone className="h-4 w-4 text-purple-600" />
                          Contact Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          {currentOpportunity.contactInfo.map((contact, idx) => (
                            <li key={idx} className="text-slate-700">
                              {contact}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* Key Details */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {currentOpportunity.salaryRange && (
                      <div className="bg-white p-3 rounded border">
                        <div className="text-slate-500 text-xs">Expected Income</div>
                        <div className="font-medium text-slate-800">{currentOpportunity.salaryRange}</div>
                      </div>
                    )}
                    {currentOpportunity.timeToStart && (
                      <div className="bg-white p-3 rounded border">
                        <div className="text-slate-500 text-xs">Timeline</div>
                        <div className="font-medium text-slate-800 capitalize">
                          {currentOpportunity.timeToStart.replace(/-/g, ' ')}
                        </div>
                      </div>
                    )}
                    {currentOpportunity.remote !== undefined && (
                      <div className="bg-white p-3 rounded border">
                        <div className="text-slate-500 text-xs">Work Location</div>
                        <div className="font-medium text-slate-800">
                          {currentOpportunity.remote ? 'Remote/Hybrid' : 'On-site'}
                        </div>
                      </div>
                    )}
                    {currentOpportunity.startupCost && (
                      <div className="bg-white p-3 rounded border">
                        <div className="text-slate-500 text-xs">Startup Cost</div>
                        <div className="font-medium text-slate-800">
                          ${currentOpportunity.startupCost.toLocaleString()}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-6 border-slate-200">
          <p className="text-sm text-slate-600 text-center">
            Powered by Texas Small Business Administration, Workforce Solutions, and Department of Labor programs
          </p>
        </CardFooter>
      </Card>

      {/* Info cards about resources */}
      <div className="mt-8 w-full max-w-4xl">
        <h2 className="text-xl font-semibold text-slate-800 mb-4 text-center">Available Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white shadow-md border-slate-200">
            <CardContent className="pt-6">
              <h3 className="font-medium mb-2 text-indigo-700">Small Business Administration</h3>
              <p className="text-sm text-slate-700 mb-3">
                SBA loans, grants, SBDC consulting, SCORE mentorship, and contracting programs
              </p>
              <p className="text-xs text-slate-500">Free business counseling • Financing up to $5M • Government contracts</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-md border-slate-200">
            <CardContent className="pt-6">
              <h3 className="font-medium mb-2 text-indigo-700">Workforce Solutions</h3>
              <p className="text-sm text-slate-700 mb-3">
                Job placement, skills training, childcare assistance, and unemployment support
              </p>
              <p className="text-xs text-slate-500">Free training • Job matching • Career counseling</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-md border-slate-200">
            <CardContent className="pt-6">
              <h3 className="font-medium mb-2 text-indigo-700">Department of Labor</h3>
              <p className="text-sm text-slate-700 mb-3">
                Apprenticeships, Job Corps, veteran services, and disability employment programs
              </p>
              <p className="text-xs text-slate-500">Earn while learning • Youth programs • Senior employment</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
