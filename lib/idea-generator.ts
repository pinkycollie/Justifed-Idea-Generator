import { UserCircumstances, TexasRegion, regionalData, calculateMatchProbability } from './user-context'

// Enhanced opportunity interface with government resources and context
export interface Opportunity {
  id: string
  title: string
  description: string
  category: 'jobs' | 'businesses' | 'self-employment' | 'contracts'
  region: TexasRegion
  type: 'job' | 'business' | 'training' | 'contract'
  
  // Requirements
  educationRequired: string
  skills: string[]
  experience: number
  
  // Resources
  sbaPrograms: string[]
  workforceSolutions: string[]
  dolPrograms: string[]
  economicDevelopment: string[]
  
  // Characteristics
  startupCost?: number
  salaryRange?: string
  timeToStart: 'immediate' | 'within-month' | 'within-3-months' | 'planning-stage'
  remote: boolean
  partTimeAvailable: boolean
  
  // Special programs
  veteranPreferred: boolean
  disabilityFriendly: boolean
  opportunityZone: boolean
  
  // Next steps
  nextSteps: string[]
  contactInfo: string[]
}

// Comprehensive database with government resources integration
const opportunitiesDatabase: Opportunity[] = [
  // JOBS - Dallas-Fort Worth
  {
    id: 'job-dfw-tech-1',
    title: 'Software Developer - Tech Startup',
    description: 'Join a growing technology company in the Dallas-Fort Worth metroplex. Remote and hybrid options available.',
    category: 'jobs',
    region: 'dallas-fort-worth',
    type: 'job',
    educationRequired: 'bachelor',
    skills: ['JavaScript', 'React', 'Node.js', 'Problem Solving'],
    experience: 2,
    sbaPrograms: [],
    workforceSolutions: ['Skills Development Fund for coding bootcamp', 'Job search assistance'],
    dolPrograms: ['Registered Apprenticeship in Software Development'],
    economicDevelopment: ['Texas Enterprise Fund employer benefits'],
    salaryRange: '$75,000 - $110,000',
    timeToStart: 'within-month',
    remote: true,
    partTimeAvailable: false,
    veteranPreferred: true,
    disabilityFriendly: true,
    opportunityZone: false,
    nextSteps: [
      'Update resume with technical skills',
      'Visit Workforce Solutions North Central Texas for job matching',
      'Apply to positions on WorkInTexas.com',
      'Consider coding bootcamp if skills gap exists'
    ],
    contactInfo: [
      'Workforce Solutions North Central Texas: (817) 695-9184',
      'Website: workintexas.com'
    ]
  },
  
  // JOBS - Houston Healthcare
  {
    id: 'job-houston-health-1',
    title: 'Certified Medical Assistant',
    description: 'Work in Houston\'s world-renowned Texas Medical Center. Training programs available for career changers.',
    category: 'jobs',
    region: 'houston',
    type: 'job',
    educationRequired: 'high-school',
    skills: ['Patient Care', 'Medical Terminology', 'Communication'],
    experience: 0,
    sbaPrograms: [],
    workforceSolutions: ['Medical Assistant Certification Training (WIOA funded)', 'Childcare assistance during training'],
    dolPrograms: ['Healthcare Career Pathway Initiative'],
    economicDevelopment: [],
    salaryRange: '$32,000 - $42,000',
    timeToStart: 'within-3-months',
    remote: false,
    partTimeAvailable: true,
    veteranPreferred: true,
    disabilityFriendly: true,
    opportunityZone: true,
    nextSteps: [
      'Attend Workforce Solutions Gulf Coast orientation',
      'Apply for WIOA training funds',
      'Enroll in 12-week Medical Assistant program',
      'Complete externship at Houston hospital',
      'Take national certification exam'
    ],
    contactInfo: [
      'Workforce Solutions Gulf Coast: (713) 688-6881',
      'San Jacinto College Allied Health: (281) 998-6150'
    ]
  },
  
  // JOBS - Military Transition
  {
    id: 'job-sa-cyber-1',
    title: 'Cybersecurity Analyst - Military Skills Translation',
    description: 'Transition military IT/cyber skills to civilian cybersecurity roles in San Antonio\'s booming defense sector.',
    category: 'jobs',
    region: 'san-antonio',
    type: 'job',
    educationRequired: 'some-college',
    skills: ['Network Security', 'Risk Assessment', 'Security Clearance'],
    experience: 2,
    sbaPrograms: ['Veteran-owned Business Support (if considering consulting)'],
    workforceSolutions: ['Military Skills Translation', 'SkillBridge Program', 'Resume writing for veterans'],
    dolPrograms: ['Veterans Employment Services', 'Transition Assistance Program'],
    economicDevelopment: ['San Antonio Military Transition Partnership'],
    salaryRange: '$65,000 - $95,000',
    timeToStart: 'immediate',
    remote: true,
    partTimeAvailable: false,
    veteranPreferred: true,
    disabilityFriendly: true,
    opportunityZone: false,
    nextSteps: [
      'Translate MOS/Rating to civilian job titles',
      'Register with Workforce Solutions Alamo Veterans Services',
      'Obtain Security+ or CISSP certification if needed',
      'Apply to cleared positions via ClearanceJobs.com',
      'Network at San Antonio cybersecurity meetups'
    ],
    contactInfo: [
      'Workforce Solutions Alamo Veterans: (210) 272-3250',
      'Fort Sam Houston Transition Center: (210) 221-1234'
    ]
  },

  // BUSINESSES - Low Capital Start
  {
    id: 'biz-houston-service-1',
    title: 'Mobile Auto Detailing Service',
    description: 'Low-cost startup serving Houston\'s suburban markets. SBA Microloan eligible.',
    category: 'businesses',
    region: 'houston',
    type: 'business',
    educationRequired: 'high-school',
    skills: ['Customer Service', 'Attention to Detail', 'Small Business Management'],
    experience: 0,
    sbaPrograms: ['SBA Microloan (up to $50,000)', 'SCORE Mentorship', 'SBDC Free Consulting'],
    workforceSolutions: ['Self-Employment Assistance Program'],
    dolPrograms: [],
    economicDevelopment: ['Houston Small Business Development Center'],
    startupCost: 8000,
    timeToStart: 'within-month',
    remote: false,
    partTimeAvailable: true,
    veteranPreferred: false,
    disabilityFriendly: true,
    opportunityZone: false,
    nextSteps: [
      'Develop business plan with Houston SBDC',
      'Apply for SBA Microloan or personal funding',
      'Obtain business license and insurance',
      'Purchase equipment and supplies',
      'Market to suburban neighborhoods',
      'Build online presence and booking system'
    ],
    contactInfo: [
      'Houston SBDC: (713) 752-8444',
      'SBA Houston District Office: (713) 773-6500',
      'SCORE Houston: score.org/houston'
    ]
  },

  // BUSINESSES - Opportunity Zone
  {
    id: 'biz-dfw-oz-1',
    title: 'Community Cafe & Coworking Space',
    description: 'Create a community hub in a Dallas Opportunity Zone. Tax incentives available for investors.',
    category: 'businesses',
    region: 'dallas-fort-worth',
    type: 'business',
    educationRequired: 'some-college',
    skills: ['Hospitality', 'Community Building', 'Business Management'],
    experience: 3,
    sbaPrograms: ['SBA 7(a) Loan', 'Community Advantage', 'SBDC Consulting'],
    workforceSolutions: ['Hiring incentives for employees from Opportunity Zone'],
    dolPrograms: ['Registered Apprenticeship for baristas and cooks'],
    economicDevelopment: ['Opportunity Zone tax benefits', 'Dallas EDC support', 'Infrastructure assistance'],
    startupCost: 150000,
    timeToStart: 'planning-stage',
    remote: false,
    partTimeAvailable: false,
    veteranPreferred: false,
    disabilityFriendly: true,
    opportunityZone: true,
    nextSteps: [
      'Identify specific Opportunity Zone location',
      'Connect with Dallas EDC for incentives',
      'Develop comprehensive business plan',
      'Secure financing (SBA 7(a) + OZ investment)',
      'Navigate permits and licensing',
      'Build community partnerships',
      'Hire local residents from Opportunity Zone'
    ],
    contactInfo: [
      'Dallas EDC: (214) 571-1000',
      'North Texas SBDC: (214) 860-5835',
      'Opportunity Zone Fund advisors'
    ]
  },

  // SELF-EMPLOYMENT - Border Region
  {
    id: 'self-elpaso-translate-1',
    title: 'Bilingual Translation & Interpretation Services',
    description: 'Leverage bilingual skills for cross-border business in El Paso region.',
    category: 'self-employment',
    region: 'el-paso',
    type: 'business',
    educationRequired: 'bachelor',
    skills: ['Spanish-English Fluency', 'Cultural Competency', 'Legal/Medical Terminology'],
    experience: 1,
    sbaPrograms: ['SBA Microloan', 'Women-Owned Small Business Program'],
    workforceSolutions: ['Self-Employment Training', 'Business startup guidance'],
    dolPrograms: [],
    economicDevelopment: ['USMCA trade support resources', 'Binational chamber memberships'],
    startupCost: 2000,
    timeToStart: 'within-month',
    remote: true,
    partTimeAvailable: true,
    veteranPreferred: false,
    disabilityFriendly: true,
    opportunityZone: false,
    nextSteps: [
      'Obtain professional certification (ATA or medical interpreter)',
      'Register business with Texas Secretary of State',
      'Join El Paso Hispanic Chamber of Commerce',
      'Market to border businesses, legal firms, hospitals',
      'Build portfolio and testimonials',
      'Consider SCORE mentorship'
    ],
    contactInfo: [
      'El Paso SBDC: (915) 831-7743',
      'Workforce Solutions Upper Rio Grande: (915) 887-2819',
      'El Paso Hispanic Chamber: (915) 566-4066'
    ]
  },

  // CONTRACTS - Rural Development
  {
    id: 'contract-rural-grant-1',
    title: 'Grant Writer - Rural Development Projects',
    description: 'Contract work writing grants for rural Texas communities and non-profits.',
    category: 'contracts',
    region: 'east-texas',
    type: 'contract',
    educationRequired: 'bachelor',
    skills: ['Grant Writing', 'Research', 'Rural Development Knowledge', 'Communication'],
    experience: 2,
    sbaPrograms: ['8(a) Business Development if forming company'],
    workforceSolutions: ['Contract work training and resources'],
    dolPrograms: [],
    economicDevelopment: ['Rural communities partnership', 'USDA Rural Development collaboration'],
    salaryRange: '$45-75/hour',
    timeToStart: 'within-month',
    remote: true,
    partTimeAvailable: true,
    veteranPreferred: false,
    disabilityFriendly: true,
    opportunityZone: false,
    nextSteps: [
      'Build portfolio of successful grant applications',
      'Network with rural economic development corporations',
      'Register on SAM.gov for federal contracts',
      'Join Grant Professionals Association',
      'Market services to small towns and rural non-profits',
      'Consider flat fee or percentage-based pricing'
    ],
    contactInfo: [
      'East Texas Council of Governments: (903) 984-8641',
      'USDA Rural Development: (254) 742-9770',
      'Texas Association of Counties: tac.org'
    ]
  },

  // TRAINING TO EMPLOYMENT
  {
    id: 'training-austin-tech-1',
    title: 'Coding Bootcamp to Tech Job',
    description: 'Free or low-cost coding training leading to entry-level tech positions in Austin.',
    category: 'jobs',
    region: 'austin',
    type: 'training',
    educationRequired: 'high-school',
    skills: ['Basic Computer Skills', 'Logical Thinking', 'Willingness to Learn'],
    experience: 0,
    sbaPrograms: [],
    workforceSolutions: ['WIOA Training Funds', 'Skills Development Fund', 'Job placement assistance'],
    dolPrograms: ['Registered Apprenticeship', 'Trade Adjustment Assistance if eligible'],
    economicDevelopment: ['Austin tech company partnerships'],
    salaryRange: '$55,000 - $75,000 (post-training)',
    timeToStart: 'within-3-months',
    remote: true,
    partTimeAvailable: false,
    veteranPreferred: true,
    disabilityFriendly: true,
    opportunityZone: false,
    nextSteps: [
      'Apply to Workforce Solutions Capital Area for WIOA',
      'Complete assessment for training eligibility',
      'Enroll in approved coding bootcamp (16-24 weeks)',
      'Build portfolio projects during training',
      'Leverage bootcamp career services',
      'Apply to entry-level developer positions',
      'Continue learning and skill development'
    ],
    contactInfo: [
      'Workforce Solutions Capital Area: (512) 597-7100',
      'Austin Coding Academy: (512) 827-8498',
      'ACC Continuing Education: (512) 223-5555'
    ]
  },

  // Additional opportunities continue...
]

// Legacy database for backward compatibility (randomly selected from new database)
const ideasDatabase = {
  jobs: opportunitiesDatabase
    .filter(o => o.category === 'jobs')
    .map(o => o.title),
  businesses: opportunitiesDatabase
    .filter(o => o.category === 'businesses')
    .map(o => o.title),
  "self-employment": opportunitiesDatabase
    .filter(o => o.category === 'self-employment')
    .map(o => o.title),
  contracts: opportunitiesDatabase
    .filter(o => o.category === 'contracts')
    .map(o => o.title),
}

// Function to generate idea with context (legacy - simple version)
export async function generateIdea(category: string): Promise<string> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const ideas = ideasDatabase[category as keyof typeof ideasDatabase] || []
  if (ideas.length === 0) {
    return "No ideas available for this category yet."
  }

  const randomIndex = Math.floor(Math.random() * ideas.length)
  return ideas[randomIndex]
}

// Enhanced function with user circumstances and probability matching
export async function generatePersonalizedOpportunity(
  category: string,
  userCircumstances?: Partial<UserCircumstances>
): Promise<{ opportunity: Opportunity; matchProbability: number; resources: string[] }> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Filter opportunities by category
  let opportunities = opportunitiesDatabase.filter(o => o.category === category)

  // If user circumstances provided, calculate match probability
  if (userCircumstances && userCircumstances.location?.region) {
    // Prefer opportunities in user's region
    opportunities = opportunities.sort((a, b) => {
      const aScore = a.region === userCircumstances.location?.region ? 1 : 0
      const bScore = b.region === userCircumstances.location?.region ? 1 : 0
      return bScore - aScore
    })
  }

  if (opportunities.length === 0) {
    // Fallback to first opportunity if no matches
    opportunities = opportunitiesDatabase.filter(o => o.category === category)
  }

  // Select random opportunity from filtered list
  const randomIndex = Math.floor(Math.random() * opportunities.length)
  const opportunity = opportunities[randomIndex]

  // Calculate match probability if user circumstances available
  const matchProbability = userCircumstances 
    ? calculateMatchProbability(opportunity, userCircumstances)
    : 75 // Default probability

  // Get regional resources
  const resources = opportunity.region && regionalData[opportunity.region]
    ? [
        `SBA: ${regionalData[opportunity.region].sbaOffice}`,
        `Workforce Solutions: ${regionalData[opportunity.region].workforceSolutionsOffices[0]}`,
        ...opportunity.sbaPrograms.map(p => `SBA Program: ${p}`),
        ...opportunity.workforceSolutions.map(p => `Workforce Solutions: ${p}`),
      ]
    : []

  return {
    opportunity,
    matchProbability,
    resources
  }
}

// Function to get all opportunities for a category with scoring
export async function getAllOpportunitiesForCategory(
  category: string,
  userCircumstances?: Partial<UserCircumstances>
): Promise<Array<{ opportunity: Opportunity; matchProbability: number }>> {
  const opportunities = opportunitiesDatabase.filter(o => o.category === category)
  
  return opportunities.map(opportunity => ({
    opportunity,
    matchProbability: userCircumstances 
      ? calculateMatchProbability(opportunity, userCircumstances)
      : 50
  })).sort((a, b) => b.matchProbability - a.matchProbability)
}

