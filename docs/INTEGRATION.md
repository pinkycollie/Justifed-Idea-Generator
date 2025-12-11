# Integration Documentation

## AI Service Integration

### Architecture Overview

The application supports multiple AI backends through a unified interface:

```
┌─────────────────┐
│  Frontend (UI)  │
└────────┬────────┘
         │
         v
┌─────────────────┐
│  AI Service     │
│  Interface      │
└────────┬────────┘
         │
    ┌────┴────┬────────┬────────┐
    v         v        v        v
┌────────┐ ┌──────┐ ┌─────┐ ┌──────┐
│Ollama  │ │Local │ │Mock │ │Custom│
│Backend │ │Python│ │Mode │ │ AI   │
└────────┘ └──────┘ └─────┘ └──────┘
```

### API Endpoints

#### AI Service Interface (`/lib/ai-service.ts`)

**Core Methods:**

1. **generateIdea(request: AIRequest): Promise<AIResponse>**
   - Generates business ideas using AI
   - Supports multiple providers
   - Returns structured AI response

2. **enhanceIdeaWithAI(baseIdea: string, category: string): Promise<string>**
   - Enhances existing ideas with market analysis
   - Adds Texas-specific context
   - Provides actionable recommendations

3. **validateBusinessConcept(formData: any): Promise<{score: number, feedback: string}>**
   - AI-powered business validation
   - Returns feasibility score and feedback
   - Used by Validation Tool

**Configuration:**

```typescript
import { configureAIService } from '@/lib/ai-service'

configureAIService({
  provider: 'ollama', // 'ollama' | 'local' | 'mock'
  endpoint: 'http://localhost:11434',
  model: 'llama2'
})
```

### Ollama Integration

#### Setup

1. **Install Ollama**
   ```bash
   # macOS
   brew install ollama
   
   # Linux
   curl -fsSL https://ollama.ai/install.sh | sh
   
   # Windows
   # Download from ollama.ai
   ```

2. **Pull Models**
   ```bash
   ollama pull llama2
   ollama pull mistral
   ollama pull codellama
   ```

3. **Start Service**
   ```bash
   ollama serve
   ```

#### API Format

**Request:**
```json
POST http://localhost:11434/api/generate
{
  "model": "llama2",
  "prompt": "Generate a business idea...",
  "temperature": 0.7,
  "stream": false
}
```

**Response:**
```json
{
  "response": "Generated text...",
  "model": "llama2",
  "created_at": "2024-01-01T00:00:00Z"
}
```

### Python Local Service Integration

#### Setup

1. **Navigate to API Directory**
   ```bash
   cd api/
   ```

2. **Create Virtual Environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run Service**
   ```bash
   python local-ai-service.py
   ```

#### API Endpoints

**1. Health Check**
```
GET /api/health

Response:
{
  "status": "healthy",
  "service": "Local AI Service",
  "model": "local-ai-model",
  "timestamp": 1234567890.0
}
```

**2. Generate Ideas**
```
POST /api/generate
Content-Type: application/json

{
  "prompt": "Generate business idea",
  "category": "businesses",
  "context": {},
  "temperature": 0.7,
  "max_tokens": 150
}

Response:
{
  "text": "Generated idea...",
  "confidence": 0.85,
  "model": "local-ai-model",
  "timestamp": 1234567890.0
}
```

**3. Validate Business Concept**
```
POST /api/validate
Content-Type: application/json

{
  "businessName": "My Business",
  "businessType": "retail",
  "businessGoals": "...",
  "accommodationNeeds": "...",
  "targetMarket": "...",
  "estimatedBudget": "$50,000"
}

Response:
{
  "feasibility_score": 85,
  "factors": ["Completeness: 100%", "..."],
  "recommendation": "High feasibility",
  "timestamp": 1234567890.0
}
```

**4. Check Ollama Status**
```
GET /api/ollama/status

Response:
{
  "status": "connected",
  "available_models": ["llama2", "mistral"]
}
```

### PinkFlow Test Container Integration

The validation tool is designed to work with PinkFlow test container for reliability testing.

#### Test Container Interface

```typescript
interface PinkFlowTest {
  name: string
  type: 'validation' | 'generation' | 'integration'
  input: any
  expectedOutput: any
  timeout: number
}
```

#### Example Test Cases

```typescript
const pinkFlowTests: PinkFlowTest[] = [
  {
    name: 'Validation Report Generation',
    type: 'validation',
    input: {
      businessName: 'Test Business',
      businessType: 'retail',
      fundingAgency: 'sba',
      accommodationNeeds: 'Test needs',
      businessGoals: 'Test goals',
      estimatedBudget: '$50,000'
    },
    expectedOutput: {
      feasibilityScore: { min: 0, max: 100 },
      reportLength: { min: 1000 }
    },
    timeout: 5000
  }
]
```

#### Integration Points

1. **Performance Testing**
   - Report generation speed < 2 seconds
   - Feasibility calculation accuracy
   - Memory usage optimization

2. **Reliability Testing**
   - Consistent scoring algorithms
   - Error handling verification
   - Edge case validation

3. **Compatibility Testing**
   - Browser compatibility
   - Responsive design validation
   - Accessibility compliance

### PinkSync Estimator Integration

The feasibility assessment integrates with PinkSync Estimator for enhanced accuracy.

#### Estimator Interface

```typescript
interface PinkSyncEstimate {
  budget: number
  timeline: string
  resources: string[]
  confidence: number
}
```

#### Integration Flow

1. **User Input** → Validation Form Data
2. **Budget Parsing** → Extract numerical values
3. **PinkSync Estimation** → Calculate realistic ranges
4. **Feasibility Scoring** → Adjust based on estimates
5. **Report Generation** → Include estimates in report

#### Example Integration

```typescript
import { getPinkSyncEstimate } from '@/lib/pinksync-estimator'

async function enhancedFeasibilityCalculation(formData) {
  const baseScore = calculateFeasibilityScore(formData)
  
  const estimate = await getPinkSyncEstimate({
    budget: formData.estimatedBudget,
    timeline: formData.timeline,
    businessType: formData.businessType
  })
  
  // Adjust score based on estimate confidence
  const adjustedScore = baseScore * estimate.confidence
  
  return adjustedScore
}
```

## Frontend Integration

### Component Architecture

```
app/
├── page.tsx (Main container with tabs)
├── layout.tsx (Root layout)
└── globals.css (Global styles)

components/
├── idea-generator.tsx (Idea generation UI)
├── validation-tool.tsx (Validation form & reports)
├── ai-settings.tsx (AI configuration)
├── accessibility-banner.tsx (Accessibility features)
└── ui/ (Reusable UI components)

lib/
├── idea-generator.ts (Business logic)
├── validation-generator.ts (Validation algorithms)
├── ai-service.ts (AI integration)
└── utils.ts (Utilities)
```

### State Management

All state is managed locally using React hooks:
- `useState` for component state
- `useEffect` for side effects
- `localStorage` for persistence

### Styling

- **Tailwind CSS** for utility-first styling
- **shadcn/ui** components for consistency
- **Responsive design** with mobile-first approach

## Custom AI Integration

To integrate a custom AI service:

1. **Create Service Interface**

```typescript
// lib/custom-ai.ts
export async function customAIGenerate(prompt: string): Promise<string> {
  const response = await fetch('https://your-ai-service.com/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  })
  
  const data = await response.json()
  return data.text
}
```

2. **Update AI Service**

```typescript
// lib/ai-service.ts
private async generateWithCustom(request: AIRequest, startTime: number): Promise<AIResponse> {
  const text = await customAIGenerate(request.prompt)
  
  return {
    text,
    confidence: 0.9,
    model: 'custom',
    processingTime: Date.now() - startTime
  }
}
```

3. **Add Provider Option**

```typescript
export type AIProvider = "ollama" | "local" | "mock" | "custom"
```

## Environment Variables

Create a `.env.local` file:

```bash
# AI Service Configuration
NEXT_PUBLIC_AI_PROVIDER=mock
NEXT_PUBLIC_AI_ENDPOINT=http://localhost:11434
NEXT_PUBLIC_AI_MODEL=llama2

# PinkFlow Integration
NEXT_PUBLIC_PINKFLOW_ENABLED=true
NEXT_PUBLIC_PINKFLOW_ENDPOINT=http://localhost:8080

# PinkSync Integration
NEXT_PUBLIC_PINKSYNC_ENABLED=true
NEXT_PUBLIC_PINKSYNC_API_KEY=your-api-key
```

## Deployment

### Vercel Deployment

1. **Configure Environment Variables** in Vercel dashboard
2. **Deploy** from Git repository
3. **Configure** AI endpoints for production

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t idea-generator .
docker run -p 3000:3000 idea-generator
```

## Security Considerations

1. **API Keys**: Never commit API keys to repository
2. **CORS**: Configure CORS properly for production
3. **Input Validation**: All user inputs are validated
4. **Rate Limiting**: Implement rate limiting for AI requests
5. **Data Privacy**: No user data is stored externally

## Performance Optimization

1. **Code Splitting**: Next.js automatic code splitting
2. **Image Optimization**: Next.js Image component
3. **Caching**: Browser caching for static assets
4. **Lazy Loading**: Components loaded on demand
5. **Memoization**: React.memo for expensive components

## Monitoring and Logging

### Frontend Logging

```typescript
// Log AI service performance
console.log('AI Response Time:', response.processingTime, 'ms')
console.log('Feasibility Score:', score)
```

### Backend Logging (Python)

```python
# In local-ai-service.py
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

logger.info(f"Generated idea for category: {category}")
logger.info(f"Validation score: {result['score']}")
```

## Troubleshooting

### Common Integration Issues

1. **CORS Errors**
   - Ensure Python service has CORS enabled
   - Check Ollama CORS configuration

2. **Connection Timeouts**
   - Increase timeout values
   - Check network connectivity
   - Verify service is running

3. **Model Not Found**
   - Verify model is installed
   - Check model name spelling
   - Update model list in settings

## API Rate Limits

- **Ollama**: No rate limits (local)
- **Python Service**: No rate limits (local)
- **Custom AI**: Check provider limits

## Version Compatibility

- **Node.js**: 18.x or higher
- **Next.js**: 15.x
- **React**: 19.x
- **Python**: 3.8 or higher
- **Ollama**: Latest version recommended
