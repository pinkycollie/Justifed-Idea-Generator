"use client"

import { useState } from "react"
import { Accessibility } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function AccessibilityBanner() {
  const [showBanner, setShowBanner] = useState(true)
  const [showDialog, setShowDialog] = useState(false)

  const handleRedirect = () => {
    // Redirect to the specialized platform for deaf users
    window.location.href = "https://360businessmagician.mbtquniverse.com"
  }

  if (!showBanner) return null

  return (
    <>
      <div className="bg-indigo-700 text-white py-3 px-4 shadow-md">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <div className="flex items-center">
            <Accessibility className="h-5 w-5 mr-2" />
            <span className="text-sm md:text-base font-medium">
              We provide specialized services for all users, including accessibility options
            </span>
          </div>
          <div className="flex mt-2 md:mt-0">
            <Button
              variant="outline"
              size="sm"
              className="text-xs md:text-sm bg-transparent border-white text-white hover:bg-white hover:text-indigo-700 mr-2 font-medium"
              onClick={() => setShowDialog(true)}
            >
              Accessibility Options
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs md:text-sm text-white hover:bg-indigo-600 font-medium"
              onClick={() => setShowBanner(false)}
            >
              Dismiss
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Accessibility Options</DialogTitle>
            <DialogDescription>We offer specialized services for different accessibility needs.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div
              className="rounded-lg border p-4 hover:bg-indigo-50 cursor-pointer transition-colors border-indigo-200"
              onClick={handleRedirect}
            >
              <h3 className="font-medium mb-1 text-indigo-700">Are you Deaf?</h3>
              <p className="text-sm text-gray-700">
                We offer a specialized platform with sign language support and visual-focused content.
              </p>
            </div>
            <div className="rounded-lg border p-4 border-gray-200">
              <h3 className="font-medium mb-1">Other Accessibility Needs</h3>
              <p className="text-sm text-gray-700">
                This platform is designed to be accessible to all users. If you have specific needs, please contact us.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              onClick={() => setShowDialog(false)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Continue to Main Platform
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

