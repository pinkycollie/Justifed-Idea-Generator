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

interface ValidationResult {
  report: string
  feasibilityScore: number
}

// Advanced feasibility assessment algorithm
function calculateFeasibilityScore(formData: ValidationFormData): number {
  let score = 0
  const weights = {
    completeness: 30,
    specificity: 25,
    clarity: 20,
    alignment: 15,
    marketViability: 10,
  }

  // Completeness score (30 points)
  const fieldsCompleted = [
    formData.businessName,
    formData.businessType,
    formData.fundingAgency,
    formData.accommodationNeeds,
    formData.businessGoals,
    formData.estimatedBudget,
  ].filter((field) => field && field.trim().length > 0).length

  score += (fieldsCompleted / 6) * weights.completeness

  // Specificity score (25 points) - based on detail length
  const detailScore =
    Math.min(formData.accommodationNeeds.length / 200, 1) * 0.4 +
    Math.min(formData.businessGoals.length / 200, 1) * 0.4 +
    Math.min(formData.targetMarket.length / 150, 1) * 0.2

  score += detailScore * weights.specificity

  // Clarity score (20 points) - based on structured information
  let clarityPoints = 0
  if (formData.estimatedBudget.match(/\$|USD|\d+/)) clarityPoints += 0.3
  if (formData.timeline.length > 0) clarityPoints += 0.3
  if (formData.expectedOutcomes.length > 0) clarityPoints += 0.4

  score += clarityPoints * weights.clarity

  // Alignment score (15 points) - keyword matching
  const alignmentKeywords = [
    "employment",
    "career",
    "opportunity",
    "growth",
    "independence",
    "accessible",
    "Texas",
    "community",
  ]
  const contentText = `${formData.businessGoals} ${formData.accommodationNeeds} ${formData.expectedOutcomes}`.toLowerCase()
  const keywordMatches = alignmentKeywords.filter((keyword) => contentText.includes(keyword)).length

  score += (keywordMatches / alignmentKeywords.length) * weights.alignment

  // Market viability score (10 points)
  let viabilityPoints = 0
  if (formData.targetMarket.length > 50) viabilityPoints += 0.5
  if (formData.businessType.length > 0) viabilityPoints += 0.5

  score += viabilityPoints * weights.marketViability

  return Math.round(Math.min(score, 100))
}

// Generate agency-specific report formatting
function formatReportForAgency(formData: ValidationFormData, feasibilityScore: number): string {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const agencyFormats = {
    "vocational-rehab": {
      title: "VOCATIONAL REHABILITATION ACCOMMODATION JUSTIFICATION REPORT",
      sections: [
        "Individual Information and Business Overview",
        "Accommodation Requirements Analysis",
        "Vocational Goals and Career Objectives",
        "Cost-Benefit Analysis",
        "Implementation Timeline and Milestones",
        "Expected Outcomes and Success Metrics",
      ],
    },
    sba: {
      title: "SMALL BUSINESS ADMINISTRATION FUNDING JUSTIFICATION REPORT",
      sections: [
        "Business Overview and Market Analysis",
        "Accommodation and Accessibility Needs",
        "Business Plan and Strategic Goals",
        "Financial Projections and Budget",
        "Timeline and Implementation Strategy",
        "Economic Impact and Community Benefits",
      ],
    },
    "state-grant": {
      title: "STATE GRANT PROGRAM APPLICATION JUSTIFICATION",
      sections: [
        "Project Overview",
        "Accommodation Requirements",
        "Program Goals and Objectives",
        "Budget and Resource Allocation",
        "Implementation Schedule",
        "Anticipated Outcomes and Impact",
      ],
    },
    "private-foundation": {
      title: "PRIVATE FOUNDATION FUNDING PROPOSAL",
      sections: [
        "Mission Alignment",
        "Project Description and Accessibility Needs",
        "Goals and Impact",
        "Financial Overview",
        "Timeline",
        "Sustainability Plan",
      ],
    },
    other: {
      title: "ACCOMMODATION AND FUNDING JUSTIFICATION REPORT",
      sections: [
        "Business Overview",
        "Accommodation Needs",
        "Goals and Objectives",
        "Budget Analysis",
        "Timeline",
        "Expected Results",
      ],
    },
  }

  const format = agencyFormats[formData.fundingAgency as keyof typeof agencyFormats] || agencyFormats.other

  let report = `${format.title}\n`
  report += `${"=".repeat(format.title.length)}\n\n`
  report += `Report Date: ${today}\n`
  report += `Business/Project Name: ${formData.businessName}\n`
  report += `Business Type: ${formData.businessType}\n`
  report += `Feasibility Assessment Score: ${feasibilityScore}%\n\n`

  // Section 1
  report += `${format.sections[0].toUpperCase()}\n`
  report += `${"-".repeat(format.sections[0].length)}\n\n`
  report += `Business/Project Name: ${formData.businessName}\n`
  report += `Industry Category: ${formData.businessType}\n`
  if (formData.targetMarket) {
    report += `Target Market: ${formData.targetMarket}\n`
  }
  report += `\nBusiness Description: ${formData.businessGoals}\n\n`

  // Section 2
  report += `${format.sections[1].toUpperCase()}\n`
  report += `${"-".repeat(format.sections[1].length)}\n\n`
  report += `Accommodation Requirements:\n${formData.accommodationNeeds}\n\n`
  report += `These accommodations are essential for ensuring equal opportunity, workplace accessibility, and the ability to perform essential business functions effectively.\n\n`

  // Section 3
  report += `${format.sections[2].toUpperCase()}\n`
  report += `${"-".repeat(format.sections[2].length)}\n\n`
  report += `Primary Objectives:\n${formData.businessGoals}\n\n`

  if (formData.expectedOutcomes) {
    report += `Expected Outcomes:\n${formData.expectedOutcomes}\n\n`
  }

  // Section 4
  report += `${format.sections[3].toUpperCase()}\n`
  report += `${"-".repeat(format.sections[3].length)}\n\n`
  report += `Estimated Budget: ${formData.estimatedBudget}\n\n`
  report += `Budget Justification: The requested funding will be allocated toward necessary accommodations, business development, and operational expenses that directly contribute to achieving vocational independence and business sustainability in the Texas market.\n\n`

  // Section 5
  report += `${format.sections[4].toUpperCase()}\n`
  report += `${"-".repeat(format.sections[4].length)}\n\n`
  if (formData.timeline) {
    report += `Proposed Timeline: ${formData.timeline}\n\n`
  }
  report += `Phase 1: Initial Setup and Accommodation Implementation\n`
  report += `Phase 2: Business Launch and Market Entry\n`
  report += `Phase 3: Growth and Sustainability Assessment\n\n`

  // Section 6
  report += `${format.sections[5].toUpperCase()}\n`
  report += `${"-".repeat(format.sections[5].length)}\n\n`
  report += `Success Metrics:\n`
  report += `- Achievement of vocational independence through sustainable employment or business operation\n`
  report += `- Successful implementation of necessary accommodations\n`
  report += `- Contribution to the Texas economy and local community\n`
  if (formData.expectedOutcomes) {
    report += `- ${formData.expectedOutcomes}\n`
  }
  report += `\n`

  // Conclusion
  report += `CONCLUSION\n`
  report += `${"=".repeat(10)}\n\n`
  report += `This proposal demonstrates a ${feasibilityScore >= 80 ? "strong" : feasibilityScore >= 60 ? "viable" : "developing"} plan for achieving vocational goals through ${formData.businessName}. `
  report += `The requested accommodations and support are justified by clear business objectives, market analysis, and alignment with the mission of ${formData.fundingAgency === "vocational-rehab" ? "vocational rehabilitation services" : formData.fundingAgency === "sba" ? "the Small Business Administration" : "the funding agency"}. `
  report += `This initiative represents an investment in individual independence, economic opportunity, and community development within the State of Texas.\n\n`

  report += `Feasibility Rating: ${feasibilityScore >= 80 ? "HIGH - Ready for funding consideration" : feasibilityScore >= 60 ? "MODERATE - Additional refinement recommended" : "DEVELOPING - Further planning suggested"}\n\n`

  report += `---\n`
  report += `Report generated by the 360 Business Magician - Texas Opportunity Generator\n`
  report += `Advanced Validation Tool - Powered by feasibility assessment algorithms\n`

  return report
}

export async function generateValidationReport(formData: ValidationFormData): Promise<ValidationResult> {
  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Calculate feasibility score using advanced algorithms
  const feasibilityScore = calculateFeasibilityScore(formData)

  // Generate formatted report based on agency requirements
  const report = formatReportForAgency(formData, feasibilityScore)

  return {
    report,
    feasibilityScore,
  }
}
