# 360 Business Magician - Texas Opportunity Generator

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/pinksync/v0-texas-generator)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/YV07sw8hTEW)

## Overview

An advanced HTML-based interface for generating innovative business ideas with integrated AI support and validation tools. This application helps users justify accommodation needs for vocational rehabilitation, SBA, and other funding agencies.

### Key Features

🚀 **Idea Generator**
- Texas-specific business opportunities across 4 categories
- AI-enhanced idea generation (optional)
- Comprehensive market insights

✅ **Validation Tool**
- Professional accommodation justification reports
- Advanced feasibility assessment algorithms (0-100% scoring)
- Multi-agency support (Vocational Rehab, SBA, State Grants, Private Foundations)
- Downloadable reports

🤖 **AI Integration**
- Ollama support for local AI models
- Python-based local AI service
- Mock mode for testing
- Modular architecture for custom AI providers

🔧 **Advanced Features**
- PinkFlow test container integration
- PinkSync Estimator tool integration
- Fully accessible interface
- Responsive design
- Theme support

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

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **AI**: Ollama, Python Flask, Custom integrations
- **Build**: Next.js build system
- **Deployment**: Vercel

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

## Deployment

Your project is live at:

**[https://vercel.com/pinksync/v0-texas-generator](https://vercel.com/pinksync/v0-texas-generator)**

### Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/pinkycollie/v0-texas_idea_generator)

## Development

```bash
# Run development server
npm run dev

# Build for production
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

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## License

See the LICENSE file for details.

## Support

For issues or questions:
- Check the [User Guide](docs/USER_GUIDE.md)
- Review the [Integration Guide](docs/INTEGRATION.md)
- Open an issue on GitHub

## Acknowledgments

- Built with [v0.dev](https://v0.dev)
- Deployed on [Vercel](https://vercel.com)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)