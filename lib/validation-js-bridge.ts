/**
 * JavaScript implementation of validation algorithms
 * This provides browser-compatible versions of Python validation logic
 * Ensures feature parity for client-side processing
 */

export interface ValidationData {
  businessName?: string;
  businessType?: string;
  businessGoals?: string;
  accommodationNeeds?: string;
  targetMarket?: string;
  estimatedBudget?: string;
  timeline?: string;
  expectedOutcomes?: string;
}

export interface FeasibilityResult {
  score: number;
  factors: string[];
  recommendation: string;
}

export class ValidationEngine {
  /**
   * Calculate feasibility score using multiple factors
   * This mirrors the Python implementation for consistency
   */
  calculateFeasibility(data: ValidationData): FeasibilityResult {
    let score = 0;
    const factors: string[] = [];

    // Completeness factor (30%)
    const requiredFields = ['businessName', 'businessType', 'businessGoals', 'accommodationNeeds'];
    const completeness = requiredFields.filter(field => data[field as keyof ValidationData]).length / requiredFields.length;
    score += completeness * 30;
    factors.push(`Completeness: ${Math.round(completeness * 100)}%`);

    // Detail factor (25%)
    let detailScore = 0;
    if ((data.accommodationNeeds?.length || 0) > 100) {
      detailScore += 0.4;
    }
    if ((data.businessGoals?.length || 0) > 100) {
      detailScore += 0.4;
    }
    if ((data.targetMarket?.length || 0) > 50) {
      detailScore += 0.2;
    }
    score += detailScore * 25;
    factors.push(`Detail Level: ${Math.round(detailScore * 100)}%`);

    // Budget factor (20%)
    const budgetStr = data.estimatedBudget || '';
    if (/\d/.test(budgetStr)) {
      score += 20;
      factors.push('Budget: Well-defined');
    } else {
      factors.push('Budget: Needs specification');
    }

    // Market alignment (15%)
    const marketKeywords = ['texas', 'local', 'community', 'market', 'customer'];
    const marketText = `${data.targetMarket || ''} ${data.businessGoals || ''}`.toLowerCase();
    const marketMatches = marketKeywords.filter(kw => marketText.includes(kw)).length;
    const marketScore = Math.min(marketMatches / marketKeywords.length, 1.0);
    score += marketScore * 15;
    factors.push(`Market Alignment: ${Math.round(marketScore * 100)}%`);

    // Implementation readiness (10%)
    if (data.timeline) {
      score += 5;
    }
    if (data.expectedOutcomes) {
      score += 5;
    }

    const finalScore = Math.round(Math.min(score, 100));
    const recommendation = finalScore >= 80 
      ? 'High feasibility' 
      : finalScore >= 60 
      ? 'Moderate feasibility' 
      : 'Needs refinement';

    return {
      score: finalScore,
      factors,
      recommendation
    };
  }
}

export interface IdeaContext {
  region?: string;
  industry?: string;
}

export class IdeaGenerator {
  private texasKeywords = [
    'Texas', 'Lone Star', 'Dallas', 'Houston', 'Austin',
    'San Antonio', 'border', 'Gulf Coast', 'Permian Basin'
  ];

  private categoryTemplates = {
    jobs: [
      'technology sector',
      'energy industry',
      'healthcare field',
      'logistics and transportation',
      'agriculture and farming'
    ],
    businesses: [
      'retail innovation',
      'service-based enterprise',
      'sustainable solutions',
      'food and beverage',
      'technology startup'
    ],
    'self-employment': [
      'freelance services',
      'consulting practice',
      'creative arts',
      'skilled trades',
      'digital services'
    ],
    contracts: [
      'government contracting',
      'municipal services',
      'infrastructure projects',
      'public sector consulting',
      'community services'
    ]
  };

  /**
   * Generate an AI-enhanced business idea
   */
  generateIdea(category: keyof typeof this.categoryTemplates, context?: IdeaContext): string {
    const templates = this.categoryTemplates[category];
    if (!templates) {
      return 'Category not found';
    }

    const template = templates[Math.floor(Math.random() * templates.length)];
    const location = this.texasKeywords[Math.floor(Math.random() * this.texasKeywords.length)];

    const ideas = {
      jobs: `AI-optimized position in ${template} focusing on ${location} market opportunities with emphasis on innovation and growth`,
      businesses: `Launch a ${template} in ${location} leveraging Texas market advantages and sustainable business practices`,
      'self-employment': `Build a ${template} business serving the ${location} area with focus on flexible, scalable operations`,
      contracts: `Secure ${template} opportunities in ${location} region supporting public infrastructure and community development`
    };

    return ideas[category] || 'Generate innovative Texas-focused opportunity';
  }
}

/**
 * Benchmark the JavaScript implementations
 */
export interface BenchmarkMetrics {
  meanMs: number;
  medianMs: number;
  minMs: number;
  maxMs: number;
  stdDevMs: number;
  iterations: number;
}

export function benchmarkFunction(func: () => void, iterations: number = 1000): BenchmarkMetrics {
  const times: number[] = [];

  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    func();
    const end = performance.now();
    times.push(end - start);
  }

  const sorted = times.slice().sort((a, b) => a - b);
  const mean = times.reduce((a, b) => a + b, 0) / times.length;
  const median = sorted[Math.floor(sorted.length / 2)];
  const min = Math.min(...times);
  const max = Math.max(...times);

  // Calculate standard deviation
  const variance = times.reduce((sum, time) => sum + Math.pow(time - mean, 2), 0) / times.length;
  const stdDev = Math.sqrt(variance);

  return {
    meanMs: mean,
    medianMs: median,
    minMs: min,
    maxMs: max,
    stdDevMs: stdDev,
    iterations
  };
}

/**
 * Run comprehensive benchmarks
 */
export function runBenchmarks(): Record<string, BenchmarkMetrics> {
  const results: Record<string, BenchmarkMetrics> = {};
  const generator = new IdeaGenerator();
  const validator = new ValidationEngine();

  // Benchmark idea generation
  const categories: Array<keyof typeof generator['categoryTemplates']> = [
    'jobs', 'businesses', 'self-employment', 'contracts'
  ];

  categories.forEach(category => {
    results[`Idea Generation - ${category}`] = benchmarkFunction(
      () => generator.generateIdea(category),
      1000
    );
  });

  // Benchmark validation
  const testData: ValidationData = {
    businessName: 'Test Business',
    businessType: 'Technology',
    businessGoals: 'Create innovative solutions',
    accommodationNeeds: 'Accessible workspace needed',
    targetMarket: 'Texas businesses',
    estimatedBudget: '$50,000'
  };

  results['Validation - Complete Data'] = benchmarkFunction(
    () => validator.calculateFeasibility(testData),
    1000
  );

  return results;
}
