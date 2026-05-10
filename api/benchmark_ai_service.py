"""
Comprehensive benchmarking suite for Local AI Service
Measures performance, accuracy, and scalability metrics
"""

import time
import statistics
import sys
import os
import json
from typing import List, Dict, Any

# Add the api directory to the path
sys.path.insert(0, os.path.dirname(__file__))

import local_ai_service

app = local_ai_service.app
IdeaGenerator = local_ai_service.IdeaGenerator
ValidationEngine = local_ai_service.ValidationEngine


class BenchmarkResults:
    """Store and display benchmark results"""
    
    def __init__(self):
        self.results = {}
    
    def add_result(self, name: str, metrics: Dict[str, Any]):
        """Add a benchmark result"""
        self.results[name] = metrics
    
    def print_results(self):
        """Print formatted benchmark results"""
        print("\n" + "=" * 80)
        print("BENCHMARK RESULTS - Texas Idea Generator AI Service")
        print("=" * 80)
        
        for name, metrics in self.results.items():
            print(f"\n{name}:")
            print("-" * 80)
            for key, value in metrics.items():
                if isinstance(value, float):
                    print(f"  {key:40s}: {value:>12.4f}")
                elif isinstance(value, int):
                    print(f"  {key:40s}: {value:>12d}")
                else:
                    print(f"  {key:40s}: {value:>12s}")
        
        print("\n" + "=" * 80)
    
    def to_json(self) -> str:
        """Export results as JSON"""
        return json.dumps(self.results, indent=2)


def benchmark_function(func, iterations: int = 1000) -> Dict[str, float]:
    """
    Benchmark a function and return timing statistics
    
    Args:
        func: Function to benchmark
        iterations: Number of iterations to run
    
    Returns:
        Dictionary with timing statistics
    """
    times = []
    
    for _ in range(iterations):
        start = time.perf_counter()
        func()
        end = time.perf_counter()
        times.append((end - start) * 1000)  # Convert to milliseconds
    
    return {
        'mean_ms': statistics.mean(times),
        'median_ms': statistics.median(times),
        'min_ms': min(times),
        'max_ms': max(times),
        'std_dev_ms': statistics.stdev(times) if len(times) > 1 else 0,
        'iterations': iterations
    }


def benchmark_idea_generation():
    """Benchmark idea generation performance"""
    print("\n📊 Benchmarking Idea Generation...")
    
    generator = IdeaGenerator()
    categories = ['jobs', 'businesses', 'self-employment', 'contracts']
    
    results = {}
    
    for category in categories:
        print(f"  Testing category: {category}...")
        metrics = benchmark_function(
            lambda: generator.generate_idea(category),
            iterations=1000
        )
        results[f'Idea Generation - {category}'] = metrics
    
    # Test with context
    print("  Testing with context...")
    context = {
        'region': 'Austin',
        'industry': 'technology'
    }
    metrics = benchmark_function(
        lambda: generator.generate_idea('businesses', context),
        iterations=1000
    )
    results['Idea Generation - With Context'] = metrics
    
    return results


def benchmark_validation():
    """Benchmark validation engine performance"""
    print("\n📊 Benchmarking Validation Engine...")
    
    validator = ValidationEngine()
    
    # Test with various data completeness levels
    test_cases = {
        'Empty Data': {},
        'Minimal Data': {
            'businessName': 'Test Business'
        },
        'Partial Data': {
            'businessName': 'Test Business',
            'businessType': 'Technology',
            'businessGoals': 'Create solutions'
        },
        'Complete Data': {
            'businessName': 'Texas Tech Solutions',
            'businessType': 'Technology',
            'businessGoals': 'Create innovative software solutions for Texas businesses with a focus on sustainable growth and customer satisfaction',
            'accommodationNeeds': 'Require accessible workspace with ergonomic equipment, flexible scheduling, and assistive technology for development work',
            'targetMarket': 'Texas small businesses and local community organizations',
            'estimatedBudget': '$75,000',
            'timeline': '6 months',
            'expectedOutcomes': 'Launch MVP and secure 10 clients'
        }
    }
    
    results = {}
    
    for name, data in test_cases.items():
        print(f"  Testing: {name}...")
        metrics = benchmark_function(
            lambda: validator.calculate_feasibility(data),
            iterations=1000
        )
        results[f'Validation - {name}'] = metrics
    
    return results


def benchmark_api_endpoints():
    """Benchmark API endpoints"""
    print("\n📊 Benchmarking API Endpoints...")
    
    # Skip actual API benchmarks to avoid timeouts
    # These are better tested with actual service running
    print("  Skipping API benchmarks (run with service active)")
    
    return {}


def benchmark_accuracy():
    """Benchmark accuracy and quality of generated content"""
    print("\n📊 Benchmarking Content Quality...")
    
    generator = IdeaGenerator()
    validator = ValidationEngine()
    
    results = {}
    
    # Test idea generation consistency
    print("  Testing idea generation consistency...")
    ideas = [generator.generate_idea('businesses') for _ in range(100)]
    unique_ideas = len(set(ideas))
    
    results['Content Quality - Ideas'] = {
        'total_generated': 100,
        'unique_ideas': unique_ideas,
        'uniqueness_ratio': unique_ideas / 100,
        'avg_length_chars': statistics.mean([len(idea) for idea in ideas]),
        'min_length_chars': min([len(idea) for idea in ideas]),
        'max_length_chars': max([len(idea) for idea in ideas])
    }
    
    # Test validation scoring consistency
    print("  Testing validation scoring consistency...")
    test_data = {
        'businessName': 'Test Business',
        'businessType': 'Technology',
        'businessGoals': 'Create solutions',
        'accommodationNeeds': 'Accessible workspace'
    }
    
    scores = [validator.calculate_feasibility(test_data)['score'] for _ in range(100)]
    
    results['Content Quality - Validation'] = {
        'mean_score': statistics.mean(scores),
        'std_dev_score': statistics.stdev(scores) if len(scores) > 1 else 0,
        'min_score': min(scores),
        'max_score': max(scores),
        'consistency': 'EXCELLENT' if statistics.stdev(scores) == 0 else 'GOOD'
    }
    
    return results


def benchmark_scalability():
    """Benchmark scalability with increasing load"""
    print("\n📊 Benchmarking Scalability...")
    
    generator = IdeaGenerator()
    validator = ValidationEngine()
    
    results = {}
    
    # Test with increasing batch sizes
    batch_sizes = [10, 50, 100, 500, 1000]
    
    for batch_size in batch_sizes:
        print(f"  Testing batch size: {batch_size}...")
        
        start = time.perf_counter()
        for _ in range(batch_size):
            generator.generate_idea('businesses')
        end = time.perf_counter()
        
        total_time_ms = (end - start) * 1000
        
        results[f'Scalability - Batch {batch_size}'] = {
            'batch_size': batch_size,
            'total_time_ms': total_time_ms,
            'avg_per_item_ms': total_time_ms / batch_size,
            'throughput_per_sec': batch_size / (total_time_ms / 1000)
        }
    
    return results


def benchmark_memory_efficiency():
    """Benchmark memory efficiency"""
    print("\n📊 Benchmarking Memory Efficiency...")
    
    import sys
    
    generator = IdeaGenerator()
    validator = ValidationEngine()
    
    results = {}
    
    # Measure object sizes
    results['Memory Efficiency'] = {
        'generator_size_bytes': sys.getsizeof(generator),
        'validator_size_bytes': sys.getsizeof(validator),
        'category_templates_size_bytes': sys.getsizeof(generator.category_templates),
        'texas_keywords_size_bytes': sys.getsizeof(generator.texas_keywords)
    }
    
    return results


def run_all_benchmarks():
    """Run complete benchmark suite"""
    print("\n" + "=" * 80)
    print("STARTING COMPREHENSIVE BENCHMARK SUITE")
    print("=" * 80)
    
    benchmark_results = BenchmarkResults()
    
    # Run all benchmarks
    try:
        # Idea generation benchmarks
        results = benchmark_idea_generation()
        for name, metrics in results.items():
            benchmark_results.add_result(name, metrics)
        
        # Validation benchmarks
        results = benchmark_validation()
        for name, metrics in results.items():
            benchmark_results.add_result(name, metrics)
        
        # API endpoint benchmarks
        results = benchmark_api_endpoints()
        for name, metrics in results.items():
            benchmark_results.add_result(name, metrics)
        
        # Accuracy benchmarks
        results = benchmark_accuracy()
        for name, metrics in results.items():
            benchmark_results.add_result(name, metrics)
        
        # Scalability benchmarks
        results = benchmark_scalability()
        for name, metrics in results.items():
            benchmark_results.add_result(name, metrics)
        
        # Memory benchmarks
        results = benchmark_memory_efficiency()
        for name, metrics in results.items():
            benchmark_results.add_result(name, metrics)
        
    except Exception as e:
        print(f"\n❌ Error during benchmarking: {e}")
        import traceback
        traceback.print_exc()
        return None
    
    # Print results
    benchmark_results.print_results()
    
    # Save to file
    print("\n💾 Saving results to benchmark_results.json...")
    with open('benchmark_results.json', 'w') as f:
        f.write(benchmark_results.to_json())
    
    print("\n✅ Benchmarking complete!")
    
    return benchmark_results


if __name__ == '__main__':
    run_all_benchmarks()
