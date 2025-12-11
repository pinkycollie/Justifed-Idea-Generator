"use client"

import { useState, useEffect } from "react"
import { Settings, Zap, Server, CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { configureAIService, getAIService } from "@/lib/ai-service"

type AIProvider = "ollama" | "local" | "mock"

interface AIStatus {
  connected: boolean
  message: string
  models?: string[]
}

export function AISettings() {
  const [provider, setProvider] = useState<AIProvider>("mock")
  const [endpoint, setEndpoint] = useState<string>("http://localhost:11434")
  const [model, setModel] = useState<string>("llama2")
  const [aiEnabled, setAiEnabled] = useState<boolean>(false)
  const [status, setStatus] = useState<AIStatus | null>(null)
  const [isChecking, setIsChecking] = useState<boolean>(false)

  useEffect(() => {
    // Load saved settings
    const savedProvider = localStorage.getItem("ai-provider") as AIProvider
    const savedEndpoint = localStorage.getItem("ai-endpoint")
    const savedModel = localStorage.getItem("ai-model")
    const savedEnabled = localStorage.getItem("ai-enabled")

    if (savedProvider) setProvider(savedProvider)
    if (savedEndpoint) setEndpoint(savedEndpoint)
    if (savedModel) setModel(savedModel)
    if (savedEnabled) setAiEnabled(savedEnabled === "true")
  }, [])

  const handleCheckConnection = async () => {
    setIsChecking(true)
    try {
      let url = ""
      if (provider === "ollama") {
        url = `${endpoint}/api/tags`
      } else if (provider === "local") {
        url = `${endpoint}/api/health`
      }

      if (!url) {
        setStatus({
          connected: true,
          message: "Mock mode - no connection required",
        })
        setIsChecking(false)
        return
      }

      const response = await fetch(url, {
        method: "GET",
        signal: AbortSignal.timeout(5000),
      })

      if (response.ok) {
        const data = await response.json()
        setStatus({
          connected: true,
          message: "Successfully connected to AI service",
          models: data.models?.map((m: any) => m.name) || [],
        })
      } else {
        setStatus({
          connected: false,
          message: `Connection failed: ${response.statusText}`,
        })
      }
    } catch (error) {
      setStatus({
        connected: false,
        message: `Connection failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      })
    } finally {
      setIsChecking(false)
    }
  }

  const handleSaveSettings = () => {
    localStorage.setItem("ai-provider", provider)
    localStorage.setItem("ai-endpoint", endpoint)
    localStorage.setItem("ai-model", model)
    localStorage.setItem("ai-enabled", aiEnabled.toString())

    if (aiEnabled) {
      configureAIService({
        provider,
        endpoint,
        model,
      })
    }

    alert("AI settings saved successfully!")
  }

  const getStatusIcon = () => {
    if (!status) return <AlertCircle className="h-5 w-5 text-slate-400" />
    if (status.connected) return <CheckCircle2 className="h-5 w-5 text-green-600" />
    return <XCircle className="h-5 w-5 text-red-600" />
  }

  const getStatusColor = () => {
    if (!status) return "text-slate-600"
    if (status.connected) return "text-green-600"
    return "text-red-600"
  }

  return (
    <Card className="bg-white shadow-lg border-slate-200">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Settings className="h-5 w-5 text-indigo-600" />
          AI Integration Settings
        </CardTitle>
        <CardDescription>Configure Ollama or local AI service for enhanced idea generation</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg border border-indigo-200">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-indigo-600" />
            <span className="font-medium text-slate-800">Enable AI Enhancement</span>
          </div>
          <Switch checked={aiEnabled} onCheckedChange={setAiEnabled} />
        </div>

        {aiEnabled && (
          <>
            <div className="space-y-2">
              <Label htmlFor="provider" className="text-slate-700 font-medium">
                AI Provider
              </Label>
              <Select value={provider} onValueChange={(value) => setProvider(value as AIProvider)}>
                <SelectTrigger id="provider" className="border-slate-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ollama">Ollama (Local AI)</SelectItem>
                  <SelectItem value="local">Python Local Service</SelectItem>
                  <SelectItem value="mock">Mock (Testing)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="endpoint" className="text-slate-700 font-medium">
                Service Endpoint
              </Label>
              <Input
                id="endpoint"
                type="text"
                placeholder="http://localhost:11434"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                className="border-slate-300"
                disabled={provider === "mock"}
              />
              <p className="text-xs text-slate-500">
                {provider === "ollama" && "Default Ollama endpoint: http://localhost:11434"}
                {provider === "local" && "Default Python service endpoint: http://localhost:5000"}
                {provider === "mock" && "Mock mode doesn't require an endpoint"}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="model" className="text-slate-700 font-medium">
                AI Model
              </Label>
              <Input
                id="model"
                type="text"
                placeholder="llama2"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="border-slate-300"
                disabled={provider === "mock"}
              />
              <p className="text-xs text-slate-500">
                {provider === "ollama" && "Popular models: llama2, mistral, codellama"}
                {provider === "local" && "Model configured in Python service"}
                {provider === "mock" && "Mock mode doesn't use a specific model"}
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handleCheckConnection}
                disabled={isChecking || provider === "mock"}
                variant="outline"
                className="flex-1 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
              >
                <Server className="h-4 w-4 mr-2" />
                {isChecking ? "Checking..." : "Test Connection"}
              </Button>
              <Button onClick={handleSaveSettings} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">
                Save Settings
              </Button>
            </div>

            {status && (
              <div className={`flex items-center gap-2 p-4 rounded-lg border ${status.connected ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
                {getStatusIcon()}
                <div className="flex-1">
                  <p className={`font-medium ${getStatusColor()}`}>{status.message}</p>
                  {status.models && status.models.length > 0 && (
                    <p className="text-xs text-slate-600 mt-1">
                      Available models: {status.models.join(", ")}
                    </p>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <h4 className="font-medium text-slate-800 mb-2">Setup Instructions</h4>
          <div className="text-sm text-slate-700 space-y-2">
            {provider === "ollama" && (
              <>
                <p><strong>Ollama Setup:</strong></p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Install Ollama from ollama.ai</li>
                  <li>Run: <code className="bg-slate-200 px-1 rounded">ollama pull llama2</code></li>
                  <li>Start Ollama service</li>
                  <li>Click "Test Connection"</li>
                </ol>
              </>
            )}
            {provider === "local" && (
              <>
                <p><strong>Python Service Setup:</strong></p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Navigate to the <code className="bg-slate-200 px-1 rounded">api/</code> directory</li>
                  <li>Install dependencies: <code className="bg-slate-200 px-1 rounded">pip install -r requirements.txt</code></li>
                  <li>Run: <code className="bg-slate-200 px-1 rounded">python local-ai-service.py</code></li>
                  <li>Click "Test Connection"</li>
                </ol>
              </>
            )}
            {provider === "mock" && (
              <>
                <p><strong>Mock Mode:</strong></p>
                <p>No setup required. This mode simulates AI responses for testing purposes.</p>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
