# 360 Business Magician - Texas Opportunity Generator
# Texas Public Opportunity Generator

*Public-facing tool connecting Texans with employment and business opportunities*

[![Deployed on GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-blue?style=for-the-badge&logo=github)](https://pinkycollie.github.io/Justifed-Idea-Generator/)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2016-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)

> **🚀 New to this repo?** See [SETUP.md](SETUP.md) for quick deployment setup (2 minutes)

## Overview

An advanced HTML-based interface for generating innovative business ideas with integrated AI support, validation tools, comprehensive testing framework, and accessibility features. This application helps users justify accommodation needs for vocational rehabilitation, SBA, and other funding agencies.

### Key Features

🚀 **Idea Generator**
- Texas-specific business opportunities across 4 categories
- AI-enhanced idea generation (optional)
- Comprehensive market insights
- JavaScript/Python bridge for browser-only operation

✅ **Validation Tool**
- Professional accommodation justification reports
- Advanced feasibility assessment algorithms (0-100% scoring)
- Multi-agency support (Vocational Rehab, SBA, State Grants, Private Foundations)
- Downloadable reports
- Real-time validation

🤖 **AI Integration**
- Ollama support for local AI models
- Python-based local AI service with Flask REST API
- Mock mode for testing
- Modular architecture for custom AI providers

🧪 **Testing & Benchmarking**
- **22 comprehensive Python tests** with pytest
- **17 JavaScript/TypeScript tests** with Vitest
- Real performance benchmarks (880k+ operations/second)
- Automated CI/CD testing pipelines
- Python-JavaScript feature parity validation

♿ **Accessibility Features**
- WCAG 2.1 AA compliant
- Screen reader optimized with ARIA labels
- Keyboard navigation support
- High contrast mode
- Adjustable text size (75%-200%)
- Gesture recognition support (MediaPipe ready)
- Automated accessibility audits

🔧 **Advanced Features**
- PinkFlow test container integration
- PinkSync Estimator tool integration
- Fully accessible interface
- Responsive design
- Theme support
- Client-side processing (no backend required)

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- (Optional) Python 3.8+ for local AI service
- (Optional) Ollama for local AI models

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pinkycollie/v0-texas_idea_generator.git
   cd v0-texas_idea_generator
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```
   
   Navigate to `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## Documentation

- **[User Guide](docs/USER_GUIDE.md)** - Complete usage instructions
- **[Integration Guide](docs/INTEGRATION.md)** - AI and system integration
- **[API Documentation](api/README.md)** - Python AI service documentation
- **[Benchmarking Guide](docs/BENCHMARKING.md)** - Testing and performance metrics
- **[Accessibility Guide](docs/ACCESSIBILITY.md)** - WCAG compliance and features

## AI Setup (Optional)

### Option 1: Ollama (Local AI)

```bash
# Install Ollama
brew install ollama  # macOS
# or download from ollama.ai

# Pull a model
ollama pull llama2

# Service starts automatically
```

### Option 2: Python Local Service

```bash
cd api/
pip install -r requirements.txt
python local-ai-service.py
```

### Option 3: Mock Mode

No setup required - perfect for testing!

## Project Structure

```
├── app/                    # Next.js app router
│   ├── page.tsx           # Main page with tabs
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── idea-generator.tsx    # Idea generation UI
│   ├── validation-tool.tsx   # Validation form & reports
│   ├── ai-settings.tsx       # AI configuration
│   └── ui/                   # Reusable UI components
├── lib/                   # Business logic
│   ├── idea-generator.ts     # Idea generation logic
│   ├── validation-generator.ts  # Validation algorithms
│   ├── ai-service.ts         # AI integration
│   └── utils.ts              # Utilities
├── api/                   # Python AI service
│   ├── local-ai-service.py   # Flask API server
│   ├── requirements.txt      # Python dependencies
│   └── README.md             # API documentation
├── docs/                  # Documentation
│   ├── USER_GUIDE.md         # User documentation
│   └── INTEGRATION.md        # Integration guide
└── public/               # Static assets
```

## Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **AI**: Ollama, Python Flask, Custom integrations
- **Build**: Next.js build system with static export
- **Deployment**: GitHub Pages with automated CI/CD

## Usage

### 1. Generate Ideas

1. Navigate to the **Idea Generator** tab
2. Select a category (Jobs, Businesses, Self-Employment, Contracts)
3. Click "Generate Idea"
4. Get Texas-specific opportunities

### 2. Create Validation Reports

1. Navigate to the **Validation Tool** tab
2. Fill in the required business information
3. Click "Generate Validation Report"
4. Review feasibility score and report
5. Download or copy the professional justification report

### 3. Configure AI (Optional)

1. Navigate to the **AI Settings** tab
2. Enable AI Enhancement
3. Select provider (Ollama, Python, or Mock)
4. Configure endpoint and model
5. Test connection
6. Save settings

## Integration with PinkFlow and PinkSync

The validation tool includes built-in integration points for:

- **PinkFlow Test Container**: Reliability and performance validation
- **PinkSync Estimator Tool**: Enhanced feasibility assessment accuracy

See [INTEGRATION.md](docs/INTEGRATION.md) for details.
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

- **Next.js 16** - React framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Context-aware Engine** - Geolocation and circumstance matching

## Deployment

This project is automatically deployed to GitHub Pages via GitHub Actions.

**Live Site**: [https://pinkycollie.github.io/Justifed-Idea-Generator/](https://pinkycollie.github.io/Justifed-Idea-Generator/)

### Automated CI/CD

- **Continuous Integration**: Automatic building on every push and PR
- **Continuous Deployment**: Automatic deployment to GitHub Pages on every push to `main`
- **Auto-Updates**: Dependabot automatically creates PRs for dependency updates
- **Auto-Merge**: Patch and minor dependency updates are automatically merged after CI passes

For detailed deployment setup instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

### Manual Deployment

To deploy manually:

```bash
npm run build
# The static files will be in the /out directory
```

## Development

### Local Development

```bash
# Install dependencies
npm install --legacy-peer-deps

# Run development server
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Lint code
npm run lint
```

### Testing

#### JavaScript/TypeScript Tests

```bash
# Run tests once
npm test -- --run

# Run tests in watch mode
npm test

# Run with coverage
npm run test:coverage
```

#### Python Tests

```bash
cd api

# Run tests
python -m pytest test_ai_service.py -v

# Run with coverage
python -m pytest test_ai_service.py --cov

# Run benchmarks
python benchmark_ai_service.py
```

#### Test Results

- **JavaScript**: 17/17 tests passing ✅
- **Python**: 22/22 tests passing ✅
- **Performance**: 880k+ operations/second ⚡
- **Coverage**: Comprehensive test coverage of core algorithms

### Continuous Integration

The project includes automated CI/CD workflows:

- **Python Tests**: Automated pytest execution on every push
- **JavaScript Tests**: Automated Vitest execution on every push
- **Accessibility Audit**: WCAG compliance checking with Pa11y and Lighthouse
- **Deployment**: Automatic deployment to GitHub Pages
- **Dependency Updates**: Automated with Dependabot

## Development
npm run build

# Run production server
npm start

# Lint code
npm run lint
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Lint code with Next.js linter

## Environment Variables

Create a `.env.local` file:

```bash
# AI Service Configuration
NEXT_PUBLIC_AI_PROVIDER=mock
NEXT_PUBLIC_AI_ENDPOINT=http://localhost:11434
NEXT_PUBLIC_AI_MODEL=llama2

# Optional integrations
NEXT_PUBLIC_PINKFLOW_ENABLED=true
NEXT_PUBLIC_PINKSYNC_ENABLED=true
```

## Accessibility

This application is designed with accessibility in mind:
- Fully keyboard navigable
- ARIA labels for screen readers
- High contrast support
- Semantic HTML structure
- Accessible form validation

## Contributing

This repository is automatically synced from v0.dev. For major changes:

1. Build and test locally
2. Submit a pull request
3. Ensure all tests pass
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

Contributions are welcome! To contribute:

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

All pull requests will automatically run CI checks (linting and building) before merge.

## License

Private repository - All rights reserved

## Support

For issues or questions:
- Check the [User Guide](docs/USER_GUIDE.md)
- Review the [Integration Guide](docs/INTEGRATION.md)
- Open an issue on GitHub

## Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Deployed on [GitHub Pages](https://pages.github.com)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)
