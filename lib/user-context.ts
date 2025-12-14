// User context and circumstances types
export interface UserCircumstances {
  // Personal Information
  employmentStatus: 'employed' | 'unemployed' | 'underemployed' | 'student' | 'retired'
  educationLevel: 'less-than-high-school' | 'high-school' | 'some-college' | 'associate' | 'bachelor' | 'advanced'
  yearsExperience: number
  skills: string[]
  languages: string[]
  
  // Special Circumstances
  isVeteran: boolean
  isMilitarySpouse: boolean
  hasDisability: boolean
  ageGroup: 'youth' | 'prime' | 'older'
  
  // Resources & Constraints
  hasTransportation: boolean
  needsChildcare: boolean
  availableCapital: number // for business startup
  
  // Geographic
  location: {
    city: string
    county: string
    region: TexasRegion
    isRural: boolean
    inOpportunityZone: boolean
  }
  
  // Goals
  primaryGoal: 'immediate-employment' | 'career-change' | 'start-business' | 'training' | 'contract-work'
  willingToRelocate: boolean
  preferredWorkType: 'full-time' | 'part-time' | 'remote' | 'flexible'
  timeToStart: 'immediate' | 'within-month' | 'within-3-months' | 'planning-stage'
}

export type TexasRegion = 
  | 'dallas-fort-worth'
  | 'houston'
  | 'san-antonio'
  | 'austin'
  | 'el-paso'
  | 'rio-grande-valley'
  | 'permian-basin'
  | 'gulf-coast'
  | 'panhandle'
  | 'east-texas'
  | 'central-texas'
  | 'west-texas'

export interface RegionalData {
  region: TexasRegion
  primaryIndustries: string[]
  workforceStrengths: string[]
  sbaOffice: string
  opportunityZones: number
  keyPrograms: string[]
  workforceSolutionsOffices: string[]
}

export const regionalData: Record<TexasRegion, RegionalData> = {
  'dallas-fort-worth': {
    region: 'dallas-fort-worth',
    primaryIndustries: ['Technology', 'Telecommunications', 'Finance', 'Defense', 'Logistics'],
    workforceStrengths: ['Professional Services', 'Healthcare', 'Education'],
    sbaOffice: 'Dallas/Fort Worth Branch Office',
    opportunityZones: 92,
    keyPrograms: ['Texas Enterprise Fund', 'Skills Development Fund'],
    workforceSolutionsOffices: ['North Central Texas', 'Tarrant County', 'Dallas County']
  },
  'houston': {
    region: 'houston',
    primaryIndustries: ['Energy', 'Petrochemicals', 'Aerospace', 'Healthcare', 'International Trade'],
    workforceStrengths: ['Engineering', 'Medical Services', 'Port Operations'],
    sbaOffice: 'Houston District Office',
    opportunityZones: 69,
    keyPrograms: ['Port-related Training', 'Energy Sector Apprenticeships'],
    workforceSolutionsOffices: ['Gulf Coast', 'Houston-Galveston']
  },
  'san-antonio': {
    region: 'san-antonio',
    primaryIndustries: ['Military', 'Cybersecurity', 'Healthcare', 'Tourism', 'Biosciences'],
    workforceStrengths: ['Military Transition', 'Hospitality', 'Medical Technology'],
    sbaOffice: 'San Antonio District Office',
    opportunityZones: 44,
    keyPrograms: ['Military Spouse Employment', 'SkillBridge'],
    workforceSolutionsOffices: ['Alamo', 'Bexar County']
  },
  'austin': {
    region: 'austin',
    primaryIndustries: ['Technology', 'Semiconductors', 'Biotechnology', 'Creative Industries'],
    workforceStrengths: ['Software Development', 'Engineering', 'Creative Services'],
    sbaOffice: 'Central Texas SBDC',
    opportunityZones: 29,
    keyPrograms: ['Tech Startup Support', 'Creative Economy'],
    workforceSolutionsOffices: ['Capital Area', 'Rural Capital']
  },
  'el-paso': {
    region: 'el-paso',
    primaryIndustries: ['International Trade', 'Manufacturing', 'Logistics', 'Call Centers'],
    workforceStrengths: ['Bilingual Services', 'Cross-border Commerce'],
    sbaOffice: 'El Paso Branch Office',
    opportunityZones: 28,
    keyPrograms: ['USMCA Trade Support', 'Binational Workforce Development'],
    workforceSolutionsOffices: ['Upper Rio Grande']
  },
  'rio-grande-valley': {
    region: 'rio-grande-valley',
    primaryIndustries: ['Agriculture', 'Manufacturing', 'Healthcare', 'International Trade'],
    workforceStrengths: ['Agricultural Technology', 'Manufacturing', 'Bilingual Services'],
    sbaOffice: 'Lower Rio Grande Valley SBDC',
    opportunityZones: 44,
    keyPrograms: ['Colonias Initiatives', 'Agricultural Development'],
    workforceSolutionsOffices: ['Lower Rio Grande Valley', 'Cameron County']
  },
  'permian-basin': {
    region: 'permian-basin',
    primaryIndustries: ['Oil and Gas', 'Energy Services'],
    workforceStrengths: ['Energy Sector', 'Equipment Operation', 'Logistics'],
    sbaOffice: 'Midland SBDC',
    opportunityZones: 15,
    keyPrograms: ['Energy-focused Training', 'Diversification Initiatives'],
    workforceSolutionsOffices: ['Permian Basin']
  },
  'gulf-coast': {
    region: 'gulf-coast',
    primaryIndustries: ['Petrochemicals', 'Shipping', 'Tourism', 'Fishing'],
    workforceStrengths: ['Maritime', 'Hospitality', 'Manufacturing'],
    sbaOffice: 'Houston District Office',
    opportunityZones: 25,
    keyPrograms: ['Maritime Training', 'Coastal Tourism'],
    workforceSolutionsOffices: ['Gulf Coast', 'Coastal Bend']
  },
  'panhandle': {
    region: 'panhandle',
    primaryIndustries: ['Agriculture', 'Wind Energy', 'Cattle Ranching'],
    workforceStrengths: ['Agricultural Services', 'Renewable Energy'],
    sbaOffice: 'Lubbock Branch Office',
    opportunityZones: 12,
    keyPrograms: ['Rural Development', 'Agricultural Innovation'],
    workforceSolutionsOffices: ['Panhandle', 'South Plains']
  },
  'east-texas': {
    region: 'east-texas',
    primaryIndustries: ['Timber', 'Manufacturing', 'Healthcare'],
    workforceStrengths: ['Forestry', 'Rural Healthcare'],
    sbaOffice: 'East Texas SBDC',
    opportunityZones: 18,
    keyPrograms: ['Rural Healthcare', 'Timber Industry Support'],
    workforceSolutionsOffices: ['East Texas', 'Northeast Texas']
  },
  'central-texas': {
    region: 'central-texas',
    primaryIndustries: ['Government', 'Education', 'Technology', 'Healthcare'],
    workforceStrengths: ['Public Service', 'Education', 'Technology'],
    sbaOffice: 'Central Texas SBDC',
    opportunityZones: 35,
    keyPrograms: ['Government Contracting', 'Education Services'],
    workforceSolutionsOffices: ['Capital Area', 'Central Texas', 'Heart of Texas']
  },
  'west-texas': {
    region: 'west-texas',
    primaryIndustries: ['Agriculture', 'Tourism', 'Border Trade'],
    workforceStrengths: ['Ranching', 'Hospitality', 'Bilingual Services'],
    sbaOffice: 'West Texas SBDC',
    opportunityZones: 20,
    keyPrograms: ['Rural Enterprise', 'Border Commerce'],
    workforceSolutionsOffices: ['West Texas', 'Concho Valley']
  }
}

export function calculateMatchProbability(
  opportunity: any,
  userCircumstances: Partial<UserCircumstances>
): number {
  let score = 0
  let maxScore = 0

  // Geographic alignment (20 points)
  maxScore += 20
  if (opportunity.region === userCircumstances.location?.region) {
    score += 20
  } else if (userCircumstances.willingToRelocate) {
    score += 10
  }

  // Education requirement match (15 points)
  maxScore += 15
  const educationLevels = ['less-than-high-school', 'high-school', 'some-college', 'associate', 'bachelor', 'advanced']
  const userEducIndex = educationLevels.indexOf(userCircumstances.educationLevel || 'high-school')
  const reqEducIndex = educationLevels.indexOf(opportunity.educationRequired || 'high-school')
  if (userEducIndex >= reqEducIndex) {
    score += 15
  } else {
    score += Math.max(0, 15 - (reqEducIndex - userEducIndex) * 5)
  }

  // Skills alignment (25 points)
  maxScore += 25
  if (userCircumstances.skills && opportunity.skills) {
    const matchingSkills = userCircumstances.skills.filter((skill: string) => 
      opportunity.skills.some((reqSkill: string) => 
        reqSkill.toLowerCase().includes(skill.toLowerCase()) || 
        skill.toLowerCase().includes(reqSkill.toLowerCase())
      )
    )
    const skillMatchRate = matchingSkills.length / Math.max(opportunity.skills.length, 1)
    score += skillMatchRate * 25
  }

  // Financial feasibility (15 points)
  maxScore += 15
  if (opportunity.type === 'business') {
    const startupCost = opportunity.startupCost || 50000
    const available = userCircumstances.availableCapital || 0
    if (available >= startupCost) {
      score += 15
    } else if (startupCost <= 50000) { // SBA Microloan eligible
      score += 12
    } else if (startupCost <= 5000000) { // SBA 7(a) eligible
      score += 8
    }
  } else {
    score += 15 // Jobs don't require capital
  }

  // Timeline alignment (10 points)
  maxScore += 10
  if (opportunity.timeToStart === userCircumstances.timeToStart) {
    score += 10
  } else if (
    (userCircumstances.timeToStart === 'immediate' && opportunity.timeToStart === 'within-month') ||
    (userCircumstances.timeToStart === 'within-month' && opportunity.timeToStart === 'within-3-months')
  ) {
    score += 7
  } else {
    score += 3
  }

  // Special programs (15 points)
  maxScore += 15
  if (userCircumstances.isVeteran && opportunity.veteranPreferred) {
    score += 15
  } else if (userCircumstances.hasDisability && opportunity.disabilityFriendly) {
    score += 15
  } else if (userCircumstances.location?.inOpportunityZone && opportunity.opportunityZone) {
    score += 12
  } else {
    score += 5
  }

  return Math.round((score / maxScore) * 100)
}

export function getRegionalResources(region: TexasRegion): string[] {
  const data = regionalData[region]
  return [
    `SBA Office: ${data.sbaOffice}`,
    `Workforce Solutions: ${data.workforceSolutionsOffices.join(', ')}`,
    `Opportunity Zones: ${data.opportunityZones} designated areas`,
    `Key Programs: ${data.keyPrograms.join(', ')}`
  ]
}
