import { EnhancedIdeaGenerator } from "@/components/enhanced-idea-generator"
import { AccessibilityBanner } from "@/components/accessibility-banner"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="idea-generator-theme">
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        <AccessibilityBanner />
        <div className="container mx-auto px-4 py-8">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-slate-800 mb-2">Texas Public Opportunity Portal</h1>
            <p className="text-xl text-slate-700">
              Connecting Texans with Jobs, Businesses & Government Resources
            </p>
            <p className="text-sm text-slate-600 mt-2">
              Powered by SBA • Workforce Solutions • Department of Labor • Economic Development
            </p>
          </header>
          <EnhancedIdeaGenerator />
        </div>
      </main>
    </ThemeProvider>
  )
}

