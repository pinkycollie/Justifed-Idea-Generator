# Texas Idea Generator - Context Framework

## Purpose
This public-facing Idea Generator helps individuals seeking employment or business opportunities by providing personalized recommendations based on their circumstances, location, and resources available through government programs and economic development initiatives.

## Integration Points

### Small Business Administration (SBA)
The SBA provides crucial resources for entrepreneurs and small businesses:

**Key Programs:**
- **SBA 7(a) Loan Program**: General purpose loans up to $5 million for working capital, equipment, and real estate
- **SBA 504 Loan Program**: Long-term, fixed-rate financing for major assets like real estate and equipment
- **Microloan Program**: Loans up to $50,000 for small businesses and childcare centers
- **SBA Community Advantage**: Loans for businesses in underserved markets
- **Women-Owned Small Business (WOSB) Program**: Federal contracting assistance
- **8(a) Business Development Program**: For socially and economically disadvantaged entrepreneurs
- **HUBZone Program**: For businesses in historically underutilized business zones
- **SCORE Mentorship**: Free business mentoring and education
- **Small Business Development Centers (SBDC)**: Free business consulting and training
- **Veterans Business Outreach Centers (VBOC)**: Support for veteran entrepreneurs

**Texas SBA Offices:**
- Houston District Office
- San Antonio District Office
- Dallas/Fort Worth Branch Office
- El Paso Branch Office
- Corpus Christi Branch Office
- Lubbock Branch Office

### Workforce Solutions
Texas Workforce Commission provides employment services and training:

**Key Services:**
- **Job Search Assistance**: Resume building, interview preparation, job matching
- **Skills Development Program**: Training grants for in-demand skills
- **Apprenticeship Programs**: Earn-while-you-learn opportunities
- **Child Care Services**: Assistance for working families
- **Unemployment Benefits**: Temporary financial assistance
- **Adult Education and Literacy**: GED preparation and ESL classes
- **Veterans Services**: Specialized employment assistance for veterans
- **Trade Adjustment Assistance**: For workers affected by foreign trade
- **WIOA (Workforce Innovation and Opportunity Act)**: Training and employment services
- **Choices (TANF Work Program)**: Employment services for TANF recipients
- **Supplemental Nutrition Assistance Employment & Training (SNAP E&T)**: Job training for SNAP recipients

**Texas Workforce Solutions Boards** (28 local boards covering all counties)

### Department of Labor Resources
Federal programs supporting workers and job seekers:

**Programs:**
- **Job Corps**: Free education and training for young people ages 16-24
- **YouthBuild**: Construction training for young people ages 16-24
- **Senior Community Service Employment Program**: Part-time community service training for low-income seniors 55+
- **Registered Apprenticeship Program**: Structured on-the-job training
- **OSHA Training**: Workplace safety certification
- **H-1B Ready to Work**: Training grants for long-term unemployed
- **Trade Adjustment Assistance Community College**: Training for workers in trade-affected industries
- **Reemployment Trade Adjustment Assistance**: Support for older workers affected by trade
- **Disability Employment Initiative**: Services for people with disabilities
- **American Job Centers**: One-stop career centers (co-located with Workforce Solutions)

### Economic Development Resources

**Texas Economic Development Corporation (TEDC):**
- Business expansion support
- Site selection assistance
- Incentive programs analysis
- Market research and data

**Local Economic Development Corporations:**
- City and county EDCs offering local incentives
- Tax abatements and infrastructure support
- Fast-track permitting
- Workforce training grants

**Rural Development Programs:**
- USDA Rural Business Development Grants
- Rural Energy for America Program (REAP)
- Value-Added Producer Grants
- Rural Business Investment Program

**Enterprise Zones and Opportunity Zones:**
- Federal Opportunity Zones (tax incentives for investments in designated communities)
- State Enterprise Zones (sales tax refunds on equipment and materials)

## Geolocation-Based Context

### Major Texas Regions and Economic Characteristics

**Dallas-Fort Worth Metroplex:**
- **Primary Industries**: Technology, telecommunications, finance, defense, logistics
- **Workforce Strengths**: Professional services, healthcare, education
- **SBA Resources**: Dallas/Fort Worth Branch Office, multiple SBDCs
- **Opportunity Zones**: 92 designated zones
- **Key Incentives**: Texas Enterprise Fund, Skills Development Fund

**Houston Metropolitan Area:**
- **Primary Industries**: Energy, petrochemicals, aerospace, healthcare, international trade
- **Workforce Strengths**: Engineering, medical services, port operations
- **SBA Resources**: Houston District Office, multiple SBDCs
- **Opportunity Zones**: 69 designated zones
- **Special Programs**: Port-related training, energy sector apprenticeships

**San Antonio Region:**
- **Primary Industries**: Military, cybersecurity, healthcare, tourism, biosciences
- **Workforce Strengths**: Military transition, hospitality, medical technology
- **SBA Resources**: San Antonio District Office, multiple SBDCs
- **Opportunity Zones**: 44 designated zones
- **Key Programs**: Military spouse employment support, SkillBridge

**Austin Metropolitan Area:**
- **Primary Industries**: Technology, semiconductors, biotechnology, creative industries
- **Workforce Strengths**: Software development, engineering, creative services
- **SBA Resources**: Multiple SBDCs, SCORE chapters
- **Opportunity Zones**: 29 designated zones
- **Special Focus**: Tech startups, creative economy

**El Paso Border Region:**
- **Primary Industries**: International trade, manufacturing, logistics, call centers
- **Workforce Strengths**: Bilingual services, cross-border commerce
- **SBA Resources**: El Paso Branch Office, SBDC
- **Opportunity Zones**: 28 designated zones
- **Border Programs**: USMCA trade support, binational workforce development

**Rio Grande Valley:**
- **Primary Industries**: Agriculture, manufacturing, healthcare, international trade
- **Workforce Strengths**: Agricultural technology, manufacturing, bilingual services
- **SBA Resources**: Multiple SBDCs
- **Opportunity Zones**: 44 designated zones
- **Special Programs**: Colonias initiatives, agricultural development

**Permian Basin:**
- **Primary Industries**: Oil and gas extraction, energy services
- **Workforce Strengths**: Energy sector, equipment operation, logistics
- **SBA Resources**: Midland SBDC
- **Economic Development**: Energy-focused training, diversification initiatives

**Texas Triangle (Austin-Houston-Dallas-San Antonio corridor):**
- **Combined Benefits**: Interconnected economy with 70% of Texas population
- **Transportation**: Major highways, rail, airports connecting all regions
- **Workforce Mobility**: Programs supporting relocation and commuting

## User Circumstance Matching Framework

### Variables to Consider:

**Personal Circumstances:**
- Current employment status (employed, unemployed, underemployed, student, retired)
- Education level (less than high school, high school/GED, some college, associate's, bachelor's, advanced)
- Work experience (years and industries)
- Skills and certifications
- Language abilities (English, Spanish, other)
- Military service status (veteran, active duty, military spouse)
- Age group (youth 16-24, prime working age 25-54, older worker 55+)
- Disability status
- Transportation access
- Childcare needs
- Financial resources available for business startup

**Geographic Variables:**
- Current location (city/county)
- Willingness to relocate
- Commute tolerance
- Urban/suburban/rural setting
- Proximity to Workforce Solutions office
- Proximity to SBA resources
- Local economic development programs
- Opportunity Zone location

**Goals:**
- Seeking immediate employment
- Career change/advancement
- Starting a business
- Obtaining training/education
- Contract/freelance work
- Part-time/full-time preference

### Probability Matching Algorithm Concepts:

**High Probability Match Criteria:**
1. **Skill Alignment**: User skills match 70%+ of requirements
2. **Geographic Accessibility**: Opportunity within reasonable commute or remote
3. **Training Pathway**: Clear training route available through Workforce Solutions/DOL
4. **Financial Feasibility**: Startup costs match available SBA programs
5. **Local Demand**: Industry has growing employment in user's region
6. **Support Services**: Childcare, transportation available if needed
7. **Timeline Alignment**: Opportunity timeline matches user's urgency

## Engineered Prompts by Category

### Job Seeker Prompts

**Entry-Level/Career Starter:**
"Based on your location in [REGION] and [EDUCATION_LEVEL], consider these opportunities with high growth potential: [OPPORTUNITIES]. The Texas Workforce Commission offers free training through [SPECIFIC_PROGRAM]. Your nearest Workforce Solutions office in [LOCATION] can help with resume building and job matching. Contact: [OFFICE_INFO]"

**Career Changer:**
"Transitioning from [CURRENT_FIELD] to [DESIRED_FIELD] in [REGION]? [TRAINING_PROGRAM] offers certification in [DURATION]. This aligns with [LOCAL_INDUSTRY] growth in your area. Projected salary: [RANGE]. Training support available through [PROGRAM]. Next steps: [ACTION_ITEMS]"

**Veteran/Military Transition:**
"Your military experience in [MOS/RATING] translates to civilian roles in [CIVILIAN_FIELDS]. Texas has [NUMBER] veteran-friendly employers in [REGION]. VetBiz resources through SBA and Veterans Services at Workforce Solutions can help. Consider these opportunities: [OPPORTUNITIES]. GI Bill approved training: [PROGRAMS]"

**Older Worker/Second Career:**
"The Senior Community Service Employment Program offers part-time training positions for workers 55+ in [REGION]. Your experience in [FIELD] is valuable for [OPPORTUNITIES]. Age-friendly employers in your area include: [EMPLOYERS]. Additional support: [PROGRAMS]"

### Business Starter Prompts

**Microbusiness/Low Capital Start:**
"Starting a business in [REGION] with limited capital? Consider [BUSINESS_IDEAS] with startup costs under $10,000. SBA Microloan program offers up to $50,000. Your local SBDC in [LOCATION] provides free consulting. Key steps: 1) [STEP1], 2) [STEP2], 3) [STEP3]. Local market analysis: [DATA]"

**Franchise/Established Model:**
"Franchise opportunities in [REGION]: [FRANCHISES] with strong performance. SBA 7(a) loans support franchise financing. Average investment: [AMOUNT]. Market demand in [REGION]: [DEMAND_DATA]. Support resources: [RESOURCES]"

**Technology/Innovation Business:**
"Tech business in [REGION] - capitalize on [LOCAL_TECH_SECTOR] growth. Resources: [ACCELERATORS], [INCUBATORS]. SBA SBIR/STTR programs for R&D. Funding sources: [INVESTORS], [GRANTS]. Your competitive advantage: [FACTORS]"

**Service Business:**
"Service business opportunity: [SERVICE_TYPE] in [REGION]. Market gap analysis shows demand for [SPECIFIC_SERVICES]. Licensing requirements: [REQUIREMENTS]. Startup support: [RESOURCES]. Estimated timeline to revenue: [TIMELINE]"

**Home-Based Business:**
"Home-based business options for [REGION]: [OPTIONS]. Zoning considerations: [ZONING_INFO]. Low overhead model with [PROJECTED_INCOME] potential. SBA resources for home-based businesses: [RESOURCES]. Success factors: [FACTORS]"

### Workforce Development Prompts

**Skills Training:**
"High-demand skills in [REGION]: [SKILLS_LIST]. Free/low-cost training available: [PROGRAMS]. Completion time: [DURATION]. Job placement rate: [PERCENTAGE]. Certification recognized by [EMPLOYERS]. Funding through [PROGRAM]. Application deadline: [DATE]"

**Apprenticeship:**
"Registered Apprenticeship programs in [REGION] for [TRADE]: [PROGRAMS]. Earn while you learn - starting wage: [WAGE]. Program duration: [DURATION]. Sponsored by [EMPLOYERS]. Leads to [CERTIFICATION]. Apply through: [CONTACT]"

**Advanced Education:**
"Career advancement through education: [DEGREE/PROGRAM] in [FIELD]. Local options: [INSTITUTIONS]. Cost: [TUITION]. Financial aid: [AID_OPTIONS]. ROI: [SALARY_INCREASE]. Part-time/online options available. Workforce Solutions education assistance: [PROGRAM]"

### Economic Development Alignment Prompts

**Opportunity Zone Business:**
"Your business idea in [OPPORTUNITY_ZONE] qualifies for tax incentives: [INCENTIVES]. Local EDC support: [SUPPORT]. Infrastructure: [INFRASTRUCTURE]. Target market: [DEMOGRAPHICS]. Competitive advantage: [ADVANTAGE]. Investment timeline: [TIMELINE]"

**Rural Development:**
"Rural business opportunity in [RURAL_AREA]: [OPPORTUNITY]. USDA Rural Development grants available: [GRANTS]. Local needs: [NEEDS]. Support services: [SERVICES]. Market access: [ACCESS]. Success factors for rural business: [FACTORS]"

**Export/International Trade:**
"Export opportunity for [PRODUCT/SERVICE] - [REGION] has strong trade routes to [COUNTRIES]. Trade Finance available through [PROGRAMS]. Market research: [DATA]. Compliance support: [RESOURCES]. Projected revenue: [AMOUNT]"

## Variable Workflow Templates

### Workflow 1: Immediate Employment Need
1. **Assess**: Current skills, location, immediate needs
2. **Match**: Active job openings in local area
3. **Support**: Workforce Solutions job search assistance
4. **Action**: Apply for positions, interview preparation
5. **Follow-up**: Placement tracking, retention support

### Workflow 2: Career Development Path
1. **Assess**: Current position, career goals, skill gaps
2. **Plan**: Training pathway with clear milestones
3. **Fund**: Identify funding sources (WIOA, employer, self-pay)
4. **Train**: Enroll in certification/degree program
5. **Transition**: Job search in new field with enhanced skills
6. **Advance**: Ongoing professional development

### Workflow 3: Business Startup Journey
1. **Ideation**: Business concept validation
2. **Planning**: Business plan development (SBDC support)
3. **Funding**: Identify capital sources (SBA loans, grants, investors)
4. **Legal**: Business structure, licensing, permits
5. **Launch**: Soft opening, marketing, initial sales
6. **Growth**: Scaling, hiring, expansion planning
7. **Sustainability**: Ongoing support, mentorship (SCORE)

### Workflow 4: Hybrid Approach (Employment + Side Business)
1. **Stabilize**: Secure employment for income stability
2. **Develop**: Build business on side with limited hours
3. **Validate**: Test business model, build customer base
4. **Transition**: Reduce employment as business grows
5. **Full-time**: Transition to full-time entrepreneurship when viable

### Workflow 5: Training to Employment Pipeline
1. **Assessment**: Skills inventory, career interests
2. **Selection**: Choose high-demand training program
3. **Enrollment**: Complete application, secure funding
4. **Training**: Attend classes, gain certification
5. **Job Search**: Leverage training provider placement services
6. **Employment**: Start new career in trained field
7. **Advancement**: Continue education for career growth

## Success Metrics and Outcomes

**Job Placement:**
- Time to employment
- Wage level vs. prior employment
- Job retention at 6 months, 12 months
- Career pathway progression

**Business Success:**
- Business survival at 1 year, 3 years, 5 years
- Revenue milestones
- Job creation
- Loan repayment success
- Owner income vs. prior employment

**Training Effectiveness:**
- Completion rate
- Certification attainment
- Post-training employment rate
- Wage increase after training
- Employer satisfaction

## Contact Information Templates

**Workforce Solutions:**
"Your nearest Workforce Solutions office: [OFFICE_NAME], [ADDRESS], [PHONE], Hours: [HOURS]. Services: Job search assistance, resume help, training programs, unemployment benefits. Website: workintexas.com"

**SBA Resources:**
"SBA [DISTRICT] Office: [ADDRESS], [PHONE]. Local SBDC: [LOCATION], [CONTACT]. SCORE Chapter: [LOCATION], [CONTACT]. Free business counseling, training workshops, loan assistance."

**Economic Development:**
"[CITY/COUNTY] EDC: [CONTACT_INFO]. Services: Business incentives, site selection, market data, workforce training grants. Website: [URL]"

## Implementation Notes

This context framework should be used to:
1. Generate personalized recommendations based on user input
2. Provide specific, actionable next steps
3. Connect users to real resources with contact information
4. Match opportunities to user circumstances with high probability
5. Support multiple pathways (employment, business, training)
6. Consider geographic and economic realities
7. Integrate government programs and resources
8. Provide realistic timelines and expectations
9. Address common barriers (childcare, transportation, funding)
10. Support diverse populations (veterans, older workers, youth, immigrants, people with disabilities)

Variables in prompts (marked with [BRACKETS]) should be dynamically populated based on:
- User input (location, skills, goals, circumstances)
- Real-time data (job openings, program availability, economic indicators)
- Regional information (local industries, resources, contacts)
- Program eligibility (based on user circumstances)
