/**
 * Accessibility Features Component
 * Provides comprehensive accessibility enhancements including:
 * - Screen reader optimization
 * - Keyboard navigation
 * - High contrast mode
 * - Text size controls
 * - ARIA live regions
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Eye,
  Type,
  Contrast,
  Volume2,
  Keyboard,
  Hand,
  Info
} from 'lucide-react';

interface AccessibilityFeaturesProps {
  onSettingsChange?: (settings: AccessibilitySettings) => void;
}

export interface AccessibilitySettings {
  screenReader: boolean;
  highContrast: boolean;
  largeText: boolean;
  textSize: number;
  keyboardNav: boolean;
  gestureRecognition: boolean;
  announcements: boolean;
}

export function AccessibilityFeatures({ onSettingsChange }: AccessibilityFeaturesProps) {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    screenReader: false,
    highContrast: false,
    largeText: false,
    textSize: 100,
    keyboardNav: true,
    gestureRecognition: false,
    announcements: true
  });

  const [announcement, setAnnouncement] = useState<string>('');

  useEffect(() => {
    // Apply settings to document
    applyAccessibilitySettings(settings);
    
    // Notify parent component
    if (onSettingsChange) {
      onSettingsChange(settings);
    }
  }, [settings, onSettingsChange]);

  const applyAccessibilitySettings = (settings: AccessibilitySettings) => {
    const root = document.documentElement;

    // High contrast mode
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Text size
    root.style.fontSize = `${settings.textSize}%`;

    // Large text mode
    if (settings.largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }

    // Keyboard navigation hints
    if (settings.keyboardNav) {
      root.classList.add('keyboard-nav');
    } else {
      root.classList.remove('keyboard-nav');
    }
  };

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    announce(`${key} ${value ? 'enabled' : 'disabled'}`);
  };

  const announce = (message: string) => {
    if (settings.announcements) {
      setAnnouncement(message);
      setTimeout(() => setAnnouncement(''), 3000);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Accessibility Settings
          </CardTitle>
          <CardDescription>
            Customize your experience for better accessibility
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Screen Reader Optimization */}
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <Volume2 className="h-4 w-4" />
              <Label htmlFor="screen-reader" className="flex flex-col">
                <span>Screen Reader Optimization</span>
                <span className="text-xs text-muted-foreground font-normal">
                  Enhanced descriptions and ARIA labels
                </span>
              </Label>
            </div>
            <Switch
              id="screen-reader"
              checked={settings.screenReader}
              onCheckedChange={(checked) => updateSetting('screenReader', checked)}
              aria-label="Toggle screen reader optimization"
            />
          </div>

          {/* High Contrast Mode */}
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <Contrast className="h-4 w-4" />
              <Label htmlFor="high-contrast" className="flex flex-col">
                <span>High Contrast Mode</span>
                <span className="text-xs text-muted-foreground font-normal">
                  Increase color contrast for better visibility
                </span>
              </Label>
            </div>
            <Switch
              id="high-contrast"
              checked={settings.highContrast}
              onCheckedChange={(checked) => updateSetting('highContrast', checked)}
              aria-label="Toggle high contrast mode"
            />
          </div>

          {/* Large Text Mode */}
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <Type className="h-4 w-4" />
              <Label htmlFor="large-text" className="flex flex-col">
                <span>Large Text Mode</span>
                <span className="text-xs text-muted-foreground font-normal">
                  Increase default text size
                </span>
              </Label>
            </div>
            <Switch
              id="large-text"
              checked={settings.largeText}
              onCheckedChange={(checked) => updateSetting('largeText', checked)}
              aria-label="Toggle large text mode"
            />
          </div>

          {/* Text Size Slider */}
          <div className="space-y-2">
            <Label htmlFor="text-size" className="flex items-center space-x-2">
              <Type className="h-4 w-4" />
              <span>Text Size: {settings.textSize}%</span>
            </Label>
            <Slider
              id="text-size"
              min={75}
              max={200}
              step={5}
              value={[settings.textSize]}
              onValueChange={([value]) => updateSetting('textSize', value)}
              aria-label="Adjust text size"
              className="w-full"
            />
          </div>

          {/* Keyboard Navigation */}
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <Keyboard className="h-4 w-4" />
              <Label htmlFor="keyboard-nav" className="flex flex-col">
                <span>Keyboard Navigation Hints</span>
                <span className="text-xs text-muted-foreground font-normal">
                  Show focus indicators and shortcuts
                </span>
              </Label>
            </div>
            <Switch
              id="keyboard-nav"
              checked={settings.keyboardNav}
              onCheckedChange={(checked) => updateSetting('keyboardNav', checked)}
              aria-label="Toggle keyboard navigation hints"
            />
          </div>

          {/* Gesture Recognition */}
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <Hand className="h-4 w-4" />
              <Label htmlFor="gesture-recognition" className="flex flex-col">
                <span>Gesture Recognition</span>
                <span className="text-xs text-muted-foreground font-normal">
                  Use hand gestures for navigation
                </span>
              </Label>
            </div>
            <Switch
              id="gesture-recognition"
              checked={settings.gestureRecognition}
              onCheckedChange={(checked) => updateSetting('gestureRecognition', checked)}
              aria-label="Toggle gesture recognition"
            />
          </div>

          {/* Announcements */}
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <Info className="h-4 w-4" />
              <Label htmlFor="announcements" className="flex flex-col">
                <span>Status Announcements</span>
                <span className="text-xs text-muted-foreground font-normal">
                  Announce changes to screen readers
                </span>
              </Label>
            </div>
            <Switch
              id="announcements"
              checked={settings.announcements}
              onCheckedChange={(checked) => updateSetting('announcements', checked)}
              aria-label="Toggle status announcements"
            />
          </div>
        </CardContent>
      </Card>

      {/* Keyboard Shortcuts Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Keyboard Shortcuts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tab / Shift+Tab</span>
              <span>Navigate forward / backward</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Enter / Space</span>
              <span>Activate button/link</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Escape</span>
              <span>Close dialog/modal</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Arrow Keys</span>
              <span>Navigate menus/tabs</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ARIA Live Region for Announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>

      {/* Screen Reader Only Instructions */}
      <div className="sr-only">
        <h2>Accessibility Features</h2>
        <p>This application includes comprehensive accessibility support including:</p>
        <ul>
          <li>Full keyboard navigation</li>
          <li>Screen reader optimization with ARIA labels</li>
          <li>High contrast mode for better visibility</li>
          <li>Adjustable text size</li>
          <li>Gesture recognition for hands-free operation</li>
        </ul>
        <p>Use the settings above to customize your experience.</p>
      </div>
    </div>
  );
}

/**
 * CSS for Accessibility Features
 * Add to global styles (app/globals.css):
 * 
 * .high-contrast {
 *   filter: contrast(1.5);
 * }
 * 
 * .large-text {
 *   font-size: 1.2em;
 * }
 * 
 * .keyboard-nav *:focus {
 *   outline: 3px solid #0066cc;
 *   outline-offset: 2px;
 * }
 * 
 * .sr-only {
 *   position: absolute;
 *   width: 1px;
 *   height: 1px;
 *   padding: 0;
 *   margin: -1px;
 *   overflow: hidden;
 *   clip: rect(0, 0, 0, 0);
 *   white-space: nowrap;
 *   border-width: 0;
 * }
 */
