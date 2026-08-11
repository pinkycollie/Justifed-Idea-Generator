/**
 * Tests for JavaScript validation bridge
 * Ensures feature parity with Python implementation
 */

import { describe, it, expect } from 'vitest';
import {
  ValidationEngine,
  IdeaGenerator,
  ValidationData,
  benchmarkFunction,
  runBenchmarks
} from '../lib/validation-js-bridge';

describe('ValidationEngine', () => {
  const validator = new ValidationEngine();

  it('should calculate feasibility for complete data', () => {
    const data: ValidationData = {
      businessName: 'Texas Tech Solutions',
      businessType: 'Technology',
      businessGoals: 'Create innovative software solutions for Texas businesses with a focus on sustainable growth and customer satisfaction',
      accommodationNeeds: 'Require accessible workspace with ergonomic equipment, flexible scheduling, and assistive technology for development work',
      targetMarket: 'Texas small businesses and local community organizations',
      estimatedBudget: '$75,000',
      timeline: '6 months',
      expectedOutcomes: 'Launch MVP and secure 10 clients'
    };

    const result = validator.calculateFeasibility(data);

    expect(result).toHaveProperty('score');
    expect(result).toHaveProperty('factors');
    expect(result).toHaveProperty('recommendation');
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
    expect(result.factors.length).toBeGreaterThan(0);
  });

  it('should handle empty data', () => {
    const result = validator.calculateFeasibility({});

    expect(result.score).toBe(0);
    expect(result.factors.length).toBeGreaterThan(0);
    expect(result.recommendation).toBe('Needs refinement');
  });

  it('should handle minimal data', () => {
    const data: ValidationData = {
      businessName: 'Test Business'
    };

    const result = validator.calculateFeasibility(data);

    expect(result.score).toBeLessThan(50);
    expect(result.recommendation).toBe('Needs refinement');
  });

  it('should give proper credit for budget', () => {
    const dataWithBudget: ValidationData = {
      businessName: 'Test',
      estimatedBudget: '$50,000'
    };

    const dataWithoutBudget: ValidationData = {
      businessName: 'Test'
    };

    const resultWith = validator.calculateFeasibility(dataWithBudget);
    const resultWithout = validator.calculateFeasibility(dataWithoutBudget);

    expect(resultWith.score).toBeGreaterThan(resultWithout.score);
  });

  it('should detect market alignment keywords', () => {
    const dataWithKeywords: ValidationData = {
      businessName: 'Test',
      targetMarket: 'Texas local community market',
      businessGoals: 'Serve customers in the local market'
    };

    const dataWithoutKeywords: ValidationData = {
      businessName: 'Test',
      targetMarket: 'Generic market',
      businessGoals: 'Generic goals'
    };

    const resultWith = validator.calculateFeasibility(dataWithKeywords);
    const resultWithout = validator.calculateFeasibility(dataWithoutKeywords);

    expect(resultWith.score).toBeGreaterThan(resultWithout.score);
  });
});

describe('IdeaGenerator', () => {
  const generator = new IdeaGenerator();

  it('should generate ideas for jobs category', () => {
    const idea = generator.generateIdea('jobs');

    expect(idea).toBeTruthy();
    expect(typeof idea).toBe('string');
    expect(idea.length).toBeGreaterThan(0);
    expect(idea).toContain('AI-optimized position');
  });

  it('should generate ideas for businesses category', () => {
    const idea = generator.generateIdea('businesses');

    expect(idea).toBeTruthy();
    expect(idea).toContain('Launch a');
  });

  it('should generate ideas for self-employment category', () => {
    const idea = generator.generateIdea('self-employment');

    expect(idea).toBeTruthy();
    expect(idea).toContain('Build a');
  });

  it('should generate ideas for contracts category', () => {
    const idea = generator.generateIdea('contracts');

    expect(idea).toBeTruthy();
    expect(idea).toContain('Secure');
  });

  it('should handle context', () => {
    const context = {
      region: 'Austin',
      industry: 'technology'
    };

    const idea = generator.generateIdea('businesses', context);

    expect(idea).toBeTruthy();
    expect(typeof idea).toBe('string');
  });

  it('should return error for invalid category', () => {
    const idea = generator.generateIdea('invalid' as any);

    expect(idea).toBe('Category not found');
  });

  it('should generate diverse ideas', () => {
    const ideas = new Set<string>();
    for (let i = 0; i < 50; i++) {
      ideas.add(generator.generateIdea('businesses'));
    }

    // Should have at least some variety
    expect(ideas.size).toBeGreaterThan(10);
  });
});

describe('Benchmarking', () => {
  it('should benchmark a function', () => {
    let counter = 0;
    const metrics = benchmarkFunction(() => {
      counter++;
    }, 100);

    expect(metrics.iterations).toBe(100);
    expect(metrics.meanMs).toBeGreaterThanOrEqual(0);
    expect(metrics.medianMs).toBeGreaterThanOrEqual(0);
    expect(metrics.minMs).toBeGreaterThanOrEqual(0);
    expect(metrics.maxMs).toBeGreaterThanOrEqual(metrics.minMs);
    expect(counter).toBe(100);
  });

  it('should run comprehensive benchmarks', () => {
    const results = runBenchmarks();

    expect(results).toBeDefined();
    expect(Object.keys(results).length).toBeGreaterThan(0);

    // Check that all results have required metrics
    Object.values(results).forEach(metric => {
      expect(metric).toHaveProperty('meanMs');
      expect(metric).toHaveProperty('medianMs');
      expect(metric).toHaveProperty('minMs');
      expect(metric).toHaveProperty('maxMs');
      expect(metric).toHaveProperty('stdDevMs');
      expect(metric).toHaveProperty('iterations');
    });
  });
});

describe('Python-JavaScript Parity', () => {
  it('should produce similar validation scores', () => {
    const validator = new ValidationEngine();

    const testCase: ValidationData = {
      businessName: 'Test Business',
      businessType: 'Technology',
      businessGoals: 'Create solutions',
      accommodationNeeds: 'Accessible workspace'
    };

    const result = validator.calculateFeasibility(testCase);

    // Should be around 30% based on Python implementation
    // (25% completeness + 5% implementation readiness)
    expect(result.score).toBeGreaterThanOrEqual(25);
    expect(result.score).toBeLessThanOrEqual(35);
  });

  it('should produce consistent scores across multiple runs', () => {
    const validator = new ValidationEngine();

    const testCase: ValidationData = {
      businessName: 'Test',
      businessType: 'Tech'
    };

    const scores = new Set<number>();
    for (let i = 0; i < 10; i++) {
      const result = validator.calculateFeasibility(testCase);
      scores.add(result.score);
    }

    // Should be completely consistent
    expect(scores.size).toBe(1);
  });

  it('should have similar performance to Python', () => {
    const generator = new IdeaGenerator();
    const validator = new ValidationEngine();

    const testData: ValidationData = {
      businessName: 'Test',
      businessType: 'Technology'
    };

    // Benchmark idea generation
    const ideaMetrics = benchmarkFunction(
      () => generator.generateIdea('businesses'),
      100
    );

    // Benchmark validation
    const validationMetrics = benchmarkFunction(
      () => validator.calculateFeasibility(testData),
      100
    );

    // Should be reasonably fast (< 1ms average)
    expect(ideaMetrics.meanMs).toBeLessThan(1);
    expect(validationMetrics.meanMs).toBeLessThan(1);
  });
});
