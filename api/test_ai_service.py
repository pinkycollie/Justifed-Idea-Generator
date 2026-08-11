"""
Comprehensive test suite for Local AI Service
Tests idea generation, validation, and API endpoints
"""

import unittest
import json
from unittest.mock import patch, MagicMock
import sys
import os

# Add the api directory to the path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

import local_ai_service as lai_service
app = lai_service.app
IdeaGenerator = lai_service.IdeaGenerator
ValidationEngine = lai_service.ValidationEngine


class TestIdeaGenerator(unittest.TestCase):
    """Test cases for IdeaGenerator class"""
    
    def setUp(self):
        self.generator = IdeaGenerator()
    
    def test_initialization(self):
        """Test proper initialization of IdeaGenerator"""
        self.assertIsInstance(self.generator.texas_keywords, list)
        self.assertIsInstance(self.generator.category_templates, dict)
        self.assertEqual(len(self.generator.category_templates), 4)
    
    def test_generate_idea_jobs(self):
        """Test idea generation for jobs category"""
        idea = self.generator.generate_idea('jobs')
        self.assertIsInstance(idea, str)
        self.assertGreater(len(idea), 0)
        self.assertIn('AI-optimized position', idea)
    
    def test_generate_idea_businesses(self):
        """Test idea generation for businesses category"""
        idea = self.generator.generate_idea('businesses')
        self.assertIsInstance(idea, str)
        self.assertGreater(len(idea), 0)
        self.assertIn('Launch a', idea)
    
    def test_generate_idea_self_employment(self):
        """Test idea generation for self-employment category"""
        idea = self.generator.generate_idea('self-employment')
        self.assertIsInstance(idea, str)
        self.assertGreater(len(idea), 0)
        self.assertIn('Build a', idea)
    
    def test_generate_idea_contracts(self):
        """Test idea generation for contracts category"""
        idea = self.generator.generate_idea('contracts')
        self.assertIsInstance(idea, str)
        self.assertGreater(len(idea), 0)
        self.assertIn('Secure', idea)
    
    def test_generate_idea_invalid_category(self):
        """Test idea generation with invalid category"""
        idea = self.generator.generate_idea('invalid_category')
        self.assertEqual(idea, 'Category not found')
    
    def test_generate_idea_with_context(self):
        """Test idea generation with additional context"""
        context = {
            'region': 'Austin',
            'industry': 'technology'
        }
        idea = self.generator.generate_idea('businesses', context)
        self.assertIsInstance(idea, str)
        self.assertGreater(len(idea), 0)


class TestValidationEngine(unittest.TestCase):
    """Test cases for ValidationEngine class"""
    
    def setUp(self):
        self.validator = ValidationEngine()
    
    def test_calculate_feasibility_complete_data(self):
        """Test feasibility calculation with complete data"""
        data = {
            'businessName': 'Texas Tech Solutions',
            'businessType': 'Technology',
            'businessGoals': 'Create innovative software solutions for Texas businesses with a focus on sustainable growth and customer satisfaction',
            'accommodationNeeds': 'Require accessible workspace with ergonomic equipment, flexible scheduling, and assistive technology for development work',
            'targetMarket': 'Texas small businesses and local community organizations',
            'estimatedBudget': '$75,000',
            'timeline': '6 months',
            'expectedOutcomes': 'Launch MVP and secure 10 clients'
        }
        
        result = self.validator.calculate_feasibility(data)
        
        self.assertIsInstance(result, dict)
        self.assertIn('score', result)
        self.assertIn('factors', result)
        self.assertIn('recommendation', result)
        self.assertGreaterEqual(result['score'], 0)
        self.assertLessEqual(result['score'], 100)
        self.assertIsInstance(result['factors'], list)
        self.assertGreater(len(result['factors']), 0)
    
    def test_calculate_feasibility_minimal_data(self):
        """Test feasibility calculation with minimal data"""
        data = {
            'businessName': 'Test Business'
        }
        
        result = self.validator.calculate_feasibility(data)
        
        self.assertIsInstance(result, dict)
        self.assertIn('score', result)
        self.assertLess(result['score'], 50)  # Should have low score with minimal data
    
    def test_calculate_feasibility_empty_data(self):
        """Test feasibility calculation with empty data"""
        data = {}
        
        result = self.validator.calculate_feasibility(data)
        
        self.assertIsInstance(result, dict)
        self.assertIn('score', result)
        self.assertEqual(result['score'], 0)
    
    def test_feasibility_score_range(self):
        """Test that feasibility score is always in valid range"""
        test_cases = [
            {},
            {'businessName': 'Test'},
            {'businessName': 'Test', 'businessType': 'Tech', 'businessGoals': 'Goals', 'accommodationNeeds': 'Needs'},
        ]
        
        for data in test_cases:
            result = self.validator.calculate_feasibility(data)
            self.assertGreaterEqual(result['score'], 0)
            self.assertLessEqual(result['score'], 100)
    
    def test_feasibility_factors_present(self):
        """Test that feasibility factors are always provided"""
        data = {
            'businessName': 'Test Business',
            'businessType': 'Technology'
        }
        
        result = self.validator.calculate_feasibility(data)
        
        self.assertIn('factors', result)
        self.assertIsInstance(result['factors'], list)
        self.assertGreater(len(result['factors']), 0)


class TestAPIEndpoints(unittest.TestCase):
    """Test cases for Flask API endpoints"""
    
    def setUp(self):
        self.app = app
        self.app.config['TESTING'] = True
        self.client = self.app.test_client()
    
    def test_health_check(self):
        """Test health check endpoint"""
        response = self.client.get('/api/health')
        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.data)
        self.assertIn('status', data)
        self.assertEqual(data['status'], 'healthy')
        self.assertIn('service', data)
        self.assertIn('model', data)
    
    def test_generate_endpoint(self):
        """Test idea generation endpoint"""
        payload = {
            'prompt': 'Generate a business idea',
            'category': 'businesses',
            'context': {}
        }
        
        response = self.client.post(
            '/api/generate',
            data=json.dumps(payload),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.data)
        self.assertIn('text', data)
        self.assertIn('confidence', data)
        self.assertIn('model', data)
        self.assertIsInstance(data['text'], str)
        self.assertGreater(len(data['text']), 0)
    
    def test_generate_endpoint_enhancement(self):
        """Test idea enhancement feature"""
        payload = {
            'prompt': 'enhance "Tech Startup in Austin"',
            'category': 'businesses',
            'context': {}
        }
        
        response = self.client.post(
            '/api/generate',
            data=json.dumps(payload),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.data)
        self.assertIn('text', data)
        self.assertIn('Texas Market Advantages', data['text'])
    
    def test_validate_endpoint(self):
        """Test business validation endpoint"""
        payload = {
            'businessName': 'Texas Tech Solutions',
            'businessType': 'Technology',
            'businessGoals': 'Create innovative solutions',
            'accommodationNeeds': 'Accessible workspace needed',
            'targetMarket': 'Texas businesses',
            'estimatedBudget': '$50,000'
        }
        
        response = self.client.post(
            '/api/validate',
            data=json.dumps(payload),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.data)
        self.assertIn('feasibility_score', data)
        self.assertIn('factors', data)
        self.assertIn('recommendation', data)
        self.assertGreaterEqual(data['feasibility_score'], 0)
        self.assertLessEqual(data['feasibility_score'], 100)
    
    def test_generate_endpoint_error_handling(self):
        """Test error handling in generate endpoint"""
        response = self.client.post(
            '/api/generate',
            data='invalid json',
            content_type='application/json'
        )
        
        # Should either return 400 or 500 depending on error handling
        self.assertIn(response.status_code, [400, 500])
    
    def test_validate_endpoint_empty_data(self):
        """Test validation endpoint with empty data"""
        payload = {}
        
        response = self.client.post(
            '/api/validate',
            data=json.dumps(payload),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.data)
        self.assertIn('feasibility_score', data)
        self.assertEqual(data['feasibility_score'], 0)
    
    @patch('requests.get')
    def test_ollama_status_connected(self, mock_get):
        """Test Ollama status endpoint when connected"""
        mock_response = MagicMock()
        mock_response.json.return_value = {
            'models': [
                {'name': 'llama2'},
                {'name': 'mistral'}
            ]
        }
        mock_get.return_value = mock_response
        
        response = self.client.get('/api/ollama/status')
        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.data)
        self.assertIn('status', data)
        self.assertEqual(data['status'], 'connected')
        self.assertIn('available_models', data)
    
    @patch('requests.get')
    def test_ollama_status_disconnected(self, mock_get):
        """Test Ollama status endpoint when disconnected"""
        mock_get.side_effect = Exception('Connection refused')
        
        response = self.client.get('/api/ollama/status')
        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.data)
        self.assertIn('status', data)
        self.assertEqual(data['status'], 'disconnected')
        self.assertIn('error', data)


class TestPerformance(unittest.TestCase):
    """Performance tests for critical operations"""
    
    def setUp(self):
        self.generator = IdeaGenerator()
        self.validator = ValidationEngine()
    
    def test_idea_generation_performance(self):
        """Test that idea generation completes in reasonable time"""
        import time
        
        start_time = time.time()
        for _ in range(100):
            self.generator.generate_idea('businesses')
        end_time = time.time()
        
        avg_time = (end_time - start_time) / 100
        self.assertLess(avg_time, 0.1)  # Should average less than 100ms per generation
    
    def test_validation_performance(self):
        """Test that validation completes in reasonable time"""
        import time
        
        data = {
            'businessName': 'Test Business',
            'businessType': 'Technology',
            'businessGoals': 'Create solutions',
            'accommodationNeeds': 'Accessible workspace',
            'targetMarket': 'Texas market',
            'estimatedBudget': '$50,000'
        }
        
        start_time = time.time()
        for _ in range(100):
            self.validator.calculate_feasibility(data)
        end_time = time.time()
        
        avg_time = (end_time - start_time) / 100
        self.assertLess(avg_time, 0.05)  # Should average less than 50ms per validation


if __name__ == '__main__':
    unittest.main()
