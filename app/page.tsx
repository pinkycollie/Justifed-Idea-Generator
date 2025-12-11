"use client"

import { useState } from "react"
import { IdeaGenerator } from "@/components/idea-generator"
import { ValidationTool } from "@/components/validation-tool"
import { AISettings } from "@/components/ai-settings"
import { AccessibilityBanner } from "@/components/accessibility-banner"
import { ThemeProvider } from "@/components/theme-provider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lightbulb, FileCheck, Settings } from "lucide-react"

export default function Home() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="idea-generator-theme">
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        <AccessibilityBanner />
        <div className="container mx-auto px-4 py-8">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-slate-800 mb-2">360 Business Magician</h1>
            <p className="text-xl text-slate-700">Texas Opportunity Generator</p>
            <p className="text-sm text-slate-600 mt-2">
              Advanced AI-powered business idea generation with integrated validation tools
            </p>
          </header>
          
          <Tabs defaultValue="generator" className="w-full">
            <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-3 mb-8 bg-white shadow-md">
              <TabsTrigger value="generator" className="flex items-center gap-2 data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                <Lightbulb className="h-4 w-4" />
                Idea Generator
              </TabsTrigger>
              <TabsTrigger value="validation" className="flex items-center gap-2 data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                <FileCheck className="h-4 w-4" />
                Validation Tool
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2 data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                <Settings className="h-4 w-4" />
                AI Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="generator">
              <IdeaGenerator />
            </TabsContent>

            <TabsContent value="validation">
              <ValidationTool />
            </TabsContent>

            <TabsContent value="settings">
              <div className="max-w-3xl mx-auto">
                <AISettings />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </ThemeProvider>
  )
}

