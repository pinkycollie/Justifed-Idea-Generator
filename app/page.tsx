import { IdeaGenerator } from "@/components/idea-generator"
import { AccessibilityBanner } from "@/components/accessibility-banner"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="idea-generator-theme">
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        <AccessibilityBanner />
        <div className="container mx-auto px-4 py-8">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-slate-800 mb-2">360 Business Magician</h1>
            <p className="text-xl text-slate-700">Texas Opportunity Generator</p>
          </header>
          <IdeaGenerator />
        </div>
      </main>
    </ThemeProvider>
  )
}

