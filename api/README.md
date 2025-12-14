# Local AI Service

Python-based local AI service for the Texas Idea Generator.

## Features

- **Idea Generation**: Generate Texas-specific business ideas
- **Validation**: Assess business concept feasibility
- **Ollama Integration**: Check Ollama service status
- **RESTful API**: Easy integration with frontend

## Setup

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. **Create Virtual Environment** (recommended)
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

### Running the Service

```bash
python local-ai-service.py
```

The service will start on `http://localhost:5000`

## API Endpoints

### 1. Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "status": "healthy",
  "service": "Local AI Service",
  "model": "local-ai-model",
  "timestamp": 1234567890.0
}
```

### 2. Generate Ideas
```http
POST /api/generate
Content-Type: application/json

{
  "prompt": "Generate a business idea",
  "category": "businesses",
  "context": {},
  "temperature": 0.7,
  "max_tokens": 150
}
```

**Response:**
```json
{
  "text": "Launch a retail innovation in Austin...",
  "confidence": 0.85,
  "model": "local-ai-model",
  "timestamp": 1234567890.0
}
```

### 3. Validate Business Concept
```http
POST /api/validate
Content-Type: application/json

{
  "businessName": "Tech Startup",
  "businessType": "technology",
  "businessGoals": "Create innovative software",
  "accommodationNeeds": "Remote work setup",
  "targetMarket": "Texas tech companies",
  "estimatedBudget": "$50,000"
}
```

**Response:**
```json
{
  "feasibility_score": 85,
  "factors": [
    "Completeness: 100%",
    "Detail Level: 80%",
    "Budget: Well-defined",
    "Market Alignment: 60%"
  ],
  "recommendation": "High feasibility",
  "timestamp": 1234567890.0
}
```

### 4. Check Ollama Status
```http
GET /api/ollama/status
```

**Response:**
```json
{
  "status": "connected",
  "available_models": ["llama2", "mistral"]
}
```

## Configuration

Edit `local-ai-service.py` to change:

```python
AI_MODEL = "local-ai-model"  # AI model name
PORT = 5000                   # Service port
```

## Integration with Frontend

The service is designed to work with the Next.js frontend:

1. Start the Python service (port 5000)
2. Start the Next.js app (port 3000)
3. Configure AI settings in the frontend to use `http://localhost:5000`

## Testing

### Test with curl

```bash
# Health check
curl http://localhost:5000/api/health

# Generate idea
curl -X POST http://localhost:5000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Generate a business idea","category":"businesses"}'

# Validate concept
curl -X POST http://localhost:5000/api/validate \
  -H "Content-Type: application/json" \
  -d '{
    "businessName":"Test",
    "businessType":"retail",
    "businessGoals":"Grow business",
    "accommodationNeeds":"Accessible workspace",
    "estimatedBudget":"$50,000"
  }'
```

## Troubleshooting

### Port Already in Use

Change the port in `local-ai-service.py`:
```python
PORT = 5001  # Use different port
```

### CORS Issues

CORS is enabled by default. If you have issues, check:
```python
CORS(app)  # This line enables CORS
```

### Module Not Found

Ensure virtual environment is activated and dependencies are installed:
```bash
source venv/bin/activate
pip install -r requirements.txt
```

## Extending the Service

### Add New Endpoint

```python
@app.route('/api/your-endpoint', methods=['POST'])
def your_endpoint():
    try:
        data = request.get_json()
        # Your logic here
        return jsonify({'result': 'success'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
```

### Integrate with Ollama

The service includes Ollama status checking. To use Ollama for generation:

```python
import requests

def generate_with_ollama(prompt):
    response = requests.post(
        'http://localhost:11434/api/generate',
        json={
            'model': 'llama2',
            'prompt': prompt,
            'stream': False
        }
    )
    return response.json()['response']
```

## Production Deployment

### Using Gunicorn

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 local-ai-service:app
```

### Using systemd

Create `/etc/systemd/system/local-ai.service`:

```ini
[Unit]
Description=Local AI Service
After=network.target

[Service]
User=your-user
WorkingDirectory=/path/to/api
Environment="PATH=/path/to/venv/bin"
ExecStart=/path/to/venv/bin/python local-ai-service.py

[Install]
WantedBy=multi-user.target
```

Start the service:
```bash
sudo systemctl start local-ai
sudo systemctl enable local-ai
```

## License

Same as parent project.
