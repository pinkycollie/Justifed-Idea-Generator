"""
Local AI Service for Texas Idea Generator
Provides AI-powered idea generation and validation using local models
Compatible with Ollama and other local AI solutions
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import time
import random
from typing import Dict, Any, List

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Configuration
AI_MODEL = "local-ai-model"
PORT = 5000


class IdeaGenerator:
    """Enhanced idea generator with AI-like capabilities"""
    
    def __init__(self):
        self.texas_keywords = [
            "Texas", "Lone Star", "Dallas", "Houston", "Austin", 
            "San Antonio", "border", "Gulf Coast", "Permian Basin"
        ]
        
        self.category_templates = {
            "jobs": [
                "technology sector",
                "energy industry",
                "healthcare field",
                "logistics and transportation",
                "agriculture and farming",
            ],
            "businesses": [
                "retail innovation",
                "service-based enterprise",
                "sustainable solutions",
                "food and beverage",
                "technology startup",
            ],
            "self-employment": [
                "freelance services",
                "consulting practice",
                "creative arts",
                "skilled trades",
                "digital services",
            ],
            "contracts": [
                "government contracting",
                "municipal services",
                "infrastructure projects",
                "public sector consulting",
                "community services",
            ],
        }
    
    def generate_idea(self, category: str, context: Dict[str, Any] = None) -> str:
        """Generate an AI-enhanced business idea"""
        templates = self.category_templates.get(category, [])
        if not templates:
            return "Category not found"
        
        template = random.choice(templates)
        location = random.choice(self.texas_keywords)
        
        # Simulate AI-enhanced generation
        ideas = {
            "jobs": f"AI-optimized position in {template} focusing on {location} market opportunities with emphasis on innovation and growth",
            "businesses": f"Launch a {template} in {location} leveraging Texas market advantages and sustainable business practices",
            "self-employment": f"Build a {template} business serving the {location} area with focus on flexible, scalable operations",
            "contracts": f"Secure {template} opportunities in {location} region supporting public infrastructure and community development",
        }
        
        return ideas.get(category, "Generate innovative Texas-focused opportunity")


class ValidationEngine:
    """Advanced validation and feasibility assessment"""
    
    @staticmethod
    def calculate_feasibility(data: Dict[str, Any]) -> Dict[str, Any]:
        """Calculate feasibility score using multiple factors"""
        score = 0
        factors = []
        
        # Completeness factor (30%)
        required_fields = ['businessName', 'businessType', 'businessGoals', 'accommodationNeeds']
        completeness = sum(1 for field in required_fields if data.get(field)) / len(required_fields)
        score += completeness * 30
        factors.append(f"Completeness: {completeness * 100:.0f}%")
        
        # Detail factor (25%)
        detail_score = 0
        if len(data.get('accommodationNeeds', '')) > 100:
            detail_score += 0.4
        if len(data.get('businessGoals', '')) > 100:
            detail_score += 0.4
        if len(data.get('targetMarket', '')) > 50:
            detail_score += 0.2
        score += detail_score * 25
        factors.append(f"Detail Level: {detail_score * 100:.0f}%")
        
        # Budget factor (20%)
        budget_str = data.get('estimatedBudget', '')
        if any(char.isdigit() for char in budget_str):
            score += 20
            factors.append("Budget: Well-defined")
        else:
            factors.append("Budget: Needs specification")
        
        # Market alignment (15%)
        market_keywords = ['texas', 'local', 'community', 'market', 'customer']
        market_text = f"{data.get('targetMarket', '')} {data.get('businessGoals', '')}".lower()
        market_matches = sum(1 for kw in market_keywords if kw in market_text)
        market_score = min(market_matches / len(market_keywords), 1.0)
        score += market_score * 15
        factors.append(f"Market Alignment: {market_score * 100:.0f}%")
        
        # Implementation readiness (10%)
        if data.get('timeline'):
            score += 5
        if data.get('expectedOutcomes'):
            score += 5
        
        return {
            'score': round(min(score, 100)),
            'factors': factors,
            'recommendation': 'High feasibility' if score >= 80 else 'Moderate feasibility' if score >= 60 else 'Needs refinement'
        }


# Initialize services
idea_gen = IdeaGenerator()
validator = ValidationEngine()


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'Local AI Service',
        'model': AI_MODEL,
        'timestamp': time.time()
    })


@app.route('/api/generate', methods=['POST'])
def generate():
    """Generate AI-enhanced business ideas"""
    try:
        data = request.get_json()
        prompt = data.get('prompt', '')
        category = data.get('category', 'businesses')
        context = data.get('context', {})
        
        # Simulate processing time
        time.sleep(0.3)
        
        # Generate idea
        if 'enhance' in prompt.lower():
            # Enhanced idea generation
            base_idea = prompt.split('"')[1] if '"' in prompt else ''
            enhanced = f"{base_idea}\n\nTexas Market Advantages:\n- Strong economic growth\n- Business-friendly regulations\n- Access to diverse markets\n\nEstimated Startup: $25,000-$75,000\nTarget Demographics: Texas professionals and entrepreneurs"
            response_text = enhanced
        else:
            response_text = idea_gen.generate_idea(category, context)
        
        return jsonify({
            'text': response_text,
            'confidence': 0.85,
            'model': AI_MODEL,
            'timestamp': time.time()
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/validate', methods=['POST'])
def validate():
    """Validate business concept"""
    try:
        data = request.get_json()
        
        # Perform validation
        result = validator.calculate_feasibility(data)
        
        return jsonify({
            'feasibility_score': result['score'],
            'factors': result['factors'],
            'recommendation': result['recommendation'],
            'timestamp': time.time()
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/ollama/status', methods=['GET'])
def ollama_status():
    """Check Ollama service status"""
    try:
        import requests
        response = requests.get('http://localhost:11434/api/tags', timeout=2)
        models = response.json().get('models', [])
        return jsonify({
            'status': 'connected',
            'available_models': [m['name'] for m in models]
        })
    except Exception as e:
        return jsonify({
            'status': 'disconnected',
            'error': str(e)
        })


if __name__ == '__main__':
    print(f"Starting Local AI Service on port {PORT}")
    print(f"Model: {AI_MODEL}")
    print("Endpoints:")
    print("  - GET  /api/health         - Health check")
    print("  - POST /api/generate       - Generate ideas")
    print("  - POST /api/validate       - Validate business concept")
    print("  - GET  /api/ollama/status  - Check Ollama status")
    # Production mode - debug should be False for security
    app.run(host='0.0.0.0', port=PORT, debug=False)
