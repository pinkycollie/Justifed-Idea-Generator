# Texas Public Opportunity Generator

*Public-facing tool connecting Texans with employment and business opportunities*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/pinksync/v0-texas-generator)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/YV07sw8hTEW)

## Overview

The Texas Public Opportunity Generator is a comprehensive tool designed to help Texans find employment, start businesses, and access government resources. The application integrates with:

- **Small Business Administration (SBA)** - Loans, grants, consulting, and contracting programs
- **Texas Workforce Solutions** - Job placement, training, and career services
- **Department of Labor** - Apprenticeships, Job Corps, and employment programs
- **Economic Development** - Opportunity Zones, incentives, and local resources

## Features

### Personalized Opportunity Matching
- Geographic-based recommendations (12 Texas regions)
- Match probability scoring based on user circumstances
- Skills and education alignment
- Financial feasibility assessment
- Timeline compatibility

### User Circumstance Inputs
- Employment status and career goals
- Education level and work experience
- Geographic location and preferences
- Special circumstances (veteran status, disability)
- Available resources (transportation, childcare, capital)

### Government Resource Integration
- SBA programs (7(a) loans, microloans, SBDC, SCORE)
- Workforce Solutions offices and services
- Department of Labor programs
- Economic development incentives
- Opportunity Zone locations

### Four Opportunity Categories
1. **Jobs** - Employment opportunities with training pathways
2. **Businesses** - Startup ideas with SBA financing
3. **Self-Employment** - Freelance and independent contractor paths
4. **Contracts** - Government and private contracting opportunities

### Actionable Information
- Detailed next steps for each opportunity
- Contact information for local resources
- Expected timelines and income ranges
- Required skills and education
- Training and funding sources

## Context Framework

The application uses an engineered prompt framework documented in `context.md`:

- **Regional Data** - Economic characteristics of 12 Texas regions
- **User Matching** - Probability algorithm considering 7+ factors
- **Resource Database** - SBA offices, Workforce Solutions boards, DOL programs
- **Workflow Templates** - 5 standardized pathways (employment, training, business, hybrid, pipeline)
- **Variable Prompts** - Dynamic content based on user circumstances

## Technology Stack

- **Next.js 15** - React framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Context-aware Engine** - Geolocation and circumstance matching

## Deployment

Your project is live at:

**[https://vercel.com/pinksync/v0-texas-generator](https://vercel.com/pinksync/v0-texas-generator)**

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
├── app/
│   ├── page.tsx                    # Main application page
│   └── layout.tsx                  # Root layout
├── components/
│   ├── enhanced-idea-generator.tsx # Main opportunity generator
│   ├── idea-generator.tsx          # Legacy component
│   └── ui/                         # Reusable UI components
├── lib/
│   ├── idea-generator.ts           # Opportunity database & logic
│   ├── user-context.ts             # User circumstances & regional data
│   └── utils.ts                    # Utility functions
├── context.md                      # Comprehensive framework documentation
└── README.md                       # This file
```

## Key Components

### Enhanced Idea Generator
The main UI component featuring:
- Category tabs (jobs, businesses, self-employment, contracts)
- User personalization form
- Match probability display
- Government resources panel
- Action plan with next steps
- Contact information

### Opportunity Database
Comprehensive database of opportunities with:
- 8+ sample opportunities across categories
- Regional assignments (12 Texas regions)
- SBA, Workforce Solutions, and DOL program links
- Skills, education, and experience requirements
- Startup costs and salary ranges
- Next steps and contact information

### User Context System
Matching algorithm considering:
- Geographic alignment (20% weight)
- Education requirements (15% weight)
- Skills matching (25% weight)
- Financial feasibility (15% weight)
- Timeline alignment (10% weight)
- Special programs eligibility (15% weight)

## Government Resources

### Small Business Administration
- **7(a) Loan Program**: Up to $5 million for various business needs
- **Microloan Program**: Up to $50,000 for small businesses
- **SBDC**: Free business consulting at multiple Texas locations
- **SCORE**: Free mentorship from experienced entrepreneurs
- **8(a) Program**: Support for disadvantaged entrepreneurs
- **Government Contracting**: Access to federal contracts

### Workforce Solutions Texas
- **Job Search Assistance**: Resume building, interview prep
- **Skills Training**: WIOA-funded certification programs
- **Apprenticeships**: Earn-while-you-learn opportunities
- **Child Care Services**: Support for working families
- **Veterans Services**: Specialized employment assistance
- **28 Local Boards**: Covering all 254 Texas counties

### Department of Labor
- **Job Corps**: Free education and training (ages 16-24)
- **Registered Apprenticeship**: Industry-recognized credentials
- **Senior Employment**: Programs for workers 55+
- **Disability Employment**: Specialized services
- **Veterans Programs**: Transition assistance and priority services

## Texas Regions Covered

1. Dallas-Fort Worth Metroplex
2. Houston Metropolitan Area
3. San Antonio Region
4. Austin Metropolitan Area
5. El Paso Border Region
6. Rio Grande Valley
7. Permian Basin
8. Gulf Coast
9. Panhandle
10. East Texas
11. Central Texas
12. West Texas

Each region includes specific:
- Primary industries and economic strengths
- SBA office locations
- Workforce Solutions boards
- Opportunity Zone counts
- Key programs and incentives

## Contributing

This repository syncs with v0.dev deployments. To make changes:

1. Build your app on [v0.dev](https://v0.dev/chat/projects/YV07sw8hTEW)
2. Deploy changes from the v0 interface
3. Changes automatically push to this repository
4. Vercel deploys the latest version

## License

Private repository - All rights reserved