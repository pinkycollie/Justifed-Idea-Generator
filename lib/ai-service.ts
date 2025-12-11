// AI Service Integration for Ollama and Local AI
// This module provides integration with Ollama AI and local AI solutions

export interface AIRequest {
  prompt: string
  category?: string
  context?: Record<string, any>
  temperature?: number
  maxTokens?: number
}

export interface AIResponse {
  text: string
  confidence: number
  model: string
  processingTime: number
}

export interface AIServiceConfig {
  provider: "ollama" | "local" | "mock"
  endpoint?: string
  model?: string
  apiKey?: string
}

class AIService {
  private config: AIServiceConfig
  private defaultModel = "llama2"

  constructor(config: AIServiceConfig) {
    this.config = config
  }

  async generateIdea(request: AIRequest): Promise<AIResponse> {
    const startTime = Date.now()

    switch (this.config.provider) {
      case "ollama":
        return await this.generateWithOllama(request, startTime)
      case "local":
        return await this.generateWithLocal(request, startTime)
      default:
        return await this.generateWithMock(request, startTime)
    }
  }

  private async generateWithOllama(request: AIRequest, startTime: number): Promise<AIResponse> {
    const endpoint = this.config.endpoint || "http://localhost:11434"
    const model = this.config.model || this.defaultModel

    try {
      const response = await fetch(`${endpoint}/api/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: model,
          prompt: request.prompt,
          temperature: request.temperature || 0.7,
          stream: false,
        }),
      })

      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.statusText}`)
      }

      const data = await response.json()
      const processingTime = Date.now() - startTime

      return {
        text: data.response || "",
        confidence: 0.85,
        model: model,
        processingTime,
      }
    } catch (error) {
      console.error("Ollama generation failed:", error)
      // Fallback to mock generation
      return await this.generateWithMock(request, startTime)
    }
  }

  private async generateWithLocal(request: AIRequest, startTime: number): Promise<AIResponse> {
    // This would integrate with a local Python AI service
    const endpoint = this.config.endpoint || "http://localhost:5000"

    try {
      const response = await fetch(`${endpoint}/api/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: request.prompt,
          category: request.category,
          context: request.context,
          temperature: request.temperature || 0.7,
          max_tokens: request.maxTokens || 150,
        }),
      })

      if (!response.ok) {
        throw new Error(`Local AI API error: ${response.statusText}`)
      }

      const data = await response.json()
      const processingTime = Date.now() - startTime

      return {
        text: data.text || "",
        confidence: data.confidence || 0.8,
        model: data.model || "local-ai",
        processingTime,
      }
    } catch (error) {
      console.error("Local AI generation failed:", error)
      // Fallback to mock generation
      return await this.generateWithMock(request, startTime)
    }
  }

  private async generateWithMock(request: AIRequest, startTime: number): Promise<AIResponse> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const processingTime = Date.now() - startTime

    // Return mock response
    return {
      text: "AI service is not configured. Please set up Ollama or local AI service.",
      confidence: 0.5,
      model: "mock",
      processingTime,
    }
  }

  async enhanceIdeaWithAI(baseIdea: string, category: string): Promise<string> {
    const prompt = `You are a business consultant specializing in Texas opportunities. 
    
Based on this business idea: "${baseIdea}"

Category: ${category}

Please enhance this idea by adding:
1. Specific Texas market advantages
2. Potential challenges and solutions
3. Estimated startup requirements
4. Target customer demographics in Texas

Provide a detailed, actionable enhancement to this business idea.`

    const response = await this.generateIdea({
      prompt,
      category,
      temperature: 0.7,
      maxTokens: 300,
    })

    return response.text
  }

  async validateBusinessConcept(formData: any): Promise<{ score: number; feedback: string }> {
    const prompt = `You are a business validation expert. Analyze this business concept and provide a feasibility score (0-100) and constructive feedback.

Business Name: ${formData.businessName}
Type: ${formData.businessType}
Goals: ${formData.businessGoals}
Target Market: ${formData.targetMarket}
Budget: ${formData.estimatedBudget}

Provide:
1. Feasibility score (0-100)
2. Key strengths
3. Potential risks
4. Recommendations for improvement`

    const response = await this.generateIdea({
      prompt,
      temperature: 0.5,
      maxTokens: 400,
    })

    // Parse response to extract score (simplified)
    const scoreMatch = response.text.match(/(\d+)/)
    const score = scoreMatch ? parseInt(scoreMatch[1]) : 70

    return {
      score: Math.min(100, Math.max(0, score)),
      feedback: response.text,
    }
  }
}

// Singleton instance
let aiServiceInstance: AIService | null = null

export function getAIService(config?: AIServiceConfig): AIService {
  if (!aiServiceInstance) {
    const defaultConfig: AIServiceConfig = {
      provider: "mock", // Default to mock, can be configured via environment
      endpoint: process.env.NEXT_PUBLIC_AI_ENDPOINT,
      model: process.env.NEXT_PUBLIC_AI_MODEL,
    }

    aiServiceInstance = new AIService(config || defaultConfig)
  }

  return aiServiceInstance
}

export function configureAIService(config: AIServiceConfig): void {
  aiServiceInstance = new AIService(config)
}
