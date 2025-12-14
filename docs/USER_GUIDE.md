# Advanced Idea Generator - User Documentation

## Overview

The **360 Business Magician - Texas Opportunity Generator** is an advanced HTML-based interface designed for generating innovative business ideas with integrated AI support and validation tools. This application helps users justify accommodation needs for vocational rehabilitation, SBA, and other funding agencies.

## Features

### 1. Idea Generator
Generate Texas-specific business opportunities across four categories:
- **Jobs**: Career opportunities in the Texas market
- **Businesses**: Business ideas tailored to Texas
- **Self-Employment**: Freelance and independent contractor opportunities
- **Contracts**: Government and municipal contract opportunities

### 2. Validation Tool
Professional accommodation justification report generator featuring:
- Structured input forms for business/vocational needs
- Automated feasibility assessment using advanced algorithms
- Agency-specific report formatting for:
  - Vocational Rehabilitation
  - Small Business Administration (SBA)
  - State Grant Programs
  - Private Foundations
  - Other funding agencies
- Downloadable and shareable reports
- Real-time feasibility scoring (0-100%)

### 3. AI Integration
Support for multiple AI providers:
- **Ollama**: Local AI using open-source models (llama2, mistral, etc.)
- **Python Local Service**: Custom local AI implementation
- **Mock Mode**: Testing without AI backend

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- (Optional) Python 3.8+ for local AI service
- (Optional) Ollama for local AI models

### Installation

1. **Install Dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   Navigate to `http://localhost:3000`

3. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

### Setting Up AI Integration

#### Option 1: Ollama (Recommended for Local AI)

1. Install Ollama from [ollama.ai](https://ollama.ai)
2. Pull a model:
   ```bash
   ollama pull llama2
   ```
3. Start Ollama service (runs automatically on most systems)
4. In the app, go to **AI Settings** tab
5. Select "Ollama (Local AI)" as provider
6. Set endpoint to `http://localhost:11434`
7. Set model name (e.g., `llama2`)
8. Click "Test Connection"
9. Click "Save Settings"

#### Option 2: Python Local Service

1. Navigate to the `api/` directory
2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the service:
   ```bash
   python local-ai-service.py
   ```
4. In the app, go to **AI Settings** tab
5. Select "Python Local Service" as provider
6. Set endpoint to `http://localhost:5000`
7. Click "Test Connection"
8. Click "Save Settings"

#### Option 3: Mock Mode

No setup required. Perfect for testing the interface without AI backend.

## Using the Validation Tool

### Step 1: Input Information

Fill out the structured form with:

**Required Fields:**
- Business/Project Name
- Business Type
- Funding Agency
- Accommodation Needs
- Business/Vocational Goals
- Estimated Budget

**Optional Fields:**
- Target Market
- Implementation Timeline
- Expected Outcomes

### Step 2: Generate Report

1. Complete all required fields
2. Click "Generate Validation Report"
3. Wait for the feasibility assessment to complete
4. Review the feasibility score (0-100%)

### Step 3: Review and Export

1. Switch to the "Generated Report" tab
2. Review the professional justification report
3. Options:
   - **Copy to Clipboard**: Share via email or documents
   - **Download Report**: Save as text file

### Feasibility Scoring

The system evaluates your submission on multiple factors:

- **Completeness (30%)**: All required information provided
- **Specificity (25%)**: Level of detail in descriptions
- **Clarity (20%)**: Well-structured budget and timeline
- **Alignment (15%)**: Keywords matching vocational goals
- **Market Viability (10%)**: Target market definition

**Score Interpretation:**
- **80-100%**: High Feasibility - Ready for funding consideration
- **60-79%**: Moderate Feasibility - Additional refinement recommended
- **0-59%**: Needs Refinement - Further planning suggested

## Integration with PinkFlow and PinkSync

### PinkFlow Test Container
The validation tool includes built-in reliability testing compatible with the PinkFlow test container framework. All validation algorithms are performance-tested to ensure consistent results.

### PinkSync Estimator Tool
The feasibility assessment algorithms integrate with PinkSync Estimator for enhanced accuracy in budget and timeline validation.

## Accessibility Features

- Fully keyboard navigable
- ARIA labels for screen readers
- High contrast mode support
- Clear visual feedback for all actions
- Accessible form validation messages

## Customization

### Adding New Business Categories

Edit `/lib/idea-generator.ts`:
```typescript
const ideasDatabase = {
  // Add your category here
  "new-category": [
    "Idea 1",
    "Idea 2",
    // ...
  ]
}
```

### Customizing Validation Criteria

Edit `/lib/validation-generator.ts`:
```typescript
const weights = {
  completeness: 30,
  specificity: 25,
  clarity: 20,
  alignment: 15,
  marketViability: 10,
}
// Adjust weights as needed
```

### Agency-Specific Formatting

Modify the `agencyFormats` object in `/lib/validation-generator.ts` to customize report sections for different funding agencies.

## Troubleshooting

### AI Connection Issues

**Problem**: "Connection failed" when testing AI connection

**Solutions**:
1. Verify the AI service is running
2. Check the endpoint URL is correct
3. Ensure no firewall is blocking the connection
4. Try "Mock Mode" to test the interface

### Build Errors

**Problem**: Build fails with dependency errors

**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run build
```

### Validation Report Not Generating

**Problem**: Report generation fails or shows error

**Solutions**:
1. Ensure all required fields are filled
2. Check browser console for error messages
3. Try refreshing the page
4. Clear browser localStorage

## Security Considerations

- All data processing happens locally in the browser
- No sensitive business information is sent to external servers (unless using Ollama/AI service)
- Python AI service runs locally - no cloud dependencies
- Reports are generated client-side

## Support

For issues or questions:
1. Check this documentation
2. Review the console for error messages
3. Test with Mock Mode first
4. Verify all dependencies are installed correctly

## Version History

- **v1.0.0** - Initial release with Validation Tool and AI Integration
  - Idea Generator with 4 categories
  - Validation Tool with multi-agency support
  - AI integration (Ollama, Python, Mock)
  - Advanced feasibility assessment algorithms
  - Professional report generation
  - Comprehensive documentation
