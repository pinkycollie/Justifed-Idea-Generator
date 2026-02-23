# Accessibility Features Guide

## Overview

The Texas Idea Generator is designed with accessibility as a core principle, ensuring that all users, regardless of ability, can effectively use the application. This document outlines the comprehensive accessibility features implemented.

## Table of Contents

1. [WCAG 2.1 AA Compliance](#wcag-21-aa-compliance)
2. [Accessibility Features](#accessibility-features)
3. [Gesture Recognition](#gesture-recognition)
4. [Keyboard Navigation](#keyboard-navigation)
5. [Screen Reader Support](#screen-reader-support)
6. [Implementation Guide](#implementation-guide)
7. [Testing Accessibility](#testing-accessibility)

## WCAG 2.1 AA Compliance

The application is designed to meet WCAG 2.1 Level AA standards:

### Perceivable

- ✅ **Text Alternatives**: All images have alt text
- ✅ **Time-based Media**: Captions and alternatives provided
- ✅ **Adaptable**: Content can be presented in different ways
- ✅ **Distinguishable**: Easy to see and hear content
  - Color contrast ratios meet 4.5:1 for normal text
  - Color contrast ratios meet 3:1 for large text
  - Text can be resized up to 200%
  - High contrast mode available

### Operable

- ✅ **Keyboard Accessible**: All functionality available via keyboard
- ✅ **Enough Time**: No time limits on interactions
- ✅ **Seizures**: No content flashes more than 3 times per second
- ✅ **Navigable**: Multiple ways to navigate and find content
  - Skip links to main content
  - Clear page titles
  - Logical focus order
  - Link purpose clear from context
  - Multiple navigation methods

### Understandable

- ✅ **Readable**: Text is readable and understandable
  - Language of page is identified
  - Clear, simple language used
  - Unusual words are explained
- ✅ **Predictable**: Pages appear and operate in predictable ways
  - Consistent navigation
  - Consistent identification
  - No unexpected context changes
- ✅ **Input Assistance**: Help users avoid and correct mistakes
  - Error identification
  - Labels and instructions
  - Error suggestions
  - Error prevention

### Robust

- ✅ **Compatible**: Content is compatible with current and future user tools
  - Valid HTML
  - Name, role, value for all components
  - Status messages announced

## Accessibility Features

### 1. Screen Reader Optimization

**Purpose**: Enhance experience for users relying on screen readers.

**Features**:
- ARIA labels on all interactive elements
- ARIA live regions for dynamic content
- Semantic HTML structure
- Descriptive link text
- Form labels properly associated

**Usage**:
```typescript
<Button aria-label="Generate business idea">Generate</Button>
<div role="status" aria-live="polite">Processing...</div>
```

### 2. High Contrast Mode

**Purpose**: Improve visibility for users with low vision.

**Features**:
- Increased color contrast (1.5x)
- Enhanced border visibility
- Clear focus indicators
- Maintained readability

**Activation**: Toggle via Accessibility Settings

### 3. Text Size Controls

**Purpose**: Allow users to adjust text size for comfortable reading.

**Features**:
- Font size adjustable from 75% to 200%
- Maintains layout integrity
- Preserves responsive design
- Quick access slider

**Usage**: Adjust slider in Accessibility Settings

### 4. Keyboard Navigation

**Purpose**: Enable full functionality without a mouse.

**Features**:
- All interactive elements keyboard accessible
- Visible focus indicators
- Logical tab order
- Keyboard shortcuts
- Skip links

**Shortcuts**:
| Key | Action |
|-----|--------|
| Tab | Navigate forward |
| Shift+Tab | Navigate backward |
| Enter/Space | Activate button/link |
| Escape | Close dialog/modal |
| Arrow Keys | Navigate menus/tabs |

### 5. Gesture Recognition

**Purpose**: Provide alternative input method for users with mobility challenges.

**Features**:
- Hand gesture detection
- Camera-based recognition
- Real-time processing
- Privacy-focused (local processing)

**Supported Gestures**:
- 👍 Thumbs Up - Approve/Next
- 👌 OK Sign - Confirm
- ✌️ Peace Sign - Cancel
- 👉 Pointing - Select

### 6. Status Announcements

**Purpose**: Keep users informed of changes and actions.

**Features**:
- ARIA live regions
- Polite announcements
- Non-intrusive notifications
- Contextual messages

## Gesture Recognition

### Overview

The gesture recognition system uses the device camera to detect hand gestures, providing an alternative input method for users who may have difficulty with traditional input devices.

### Setup

1. **Enable Feature**: Turn on in Accessibility Settings
2. **Grant Permission**: Allow camera access when prompted
3. **Position Camera**: Ensure good lighting and clear view of hands
4. **Start Recognition**: Click "Start Camera" button

### Technical Implementation

The gesture recognition system can be enhanced with:

#### MediaPipe Hands

```bash
npm install @mediapipe/hands @mediapipe/camera_utils
```

```typescript
import { Hands } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';

const hands = new Hands({
  locateFile: (file) => 
    `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
});

hands.setOptions({
  maxNumHands: 2,
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});

hands.onResults((results) => {
  // Process hand landmarks
  // Detect gestures
  // Trigger actions
});
```

#### TensorFlow.js

```bash
npm install @tensorflow/tfjs @tensorflow-models/handpose
```

```typescript
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';

const model = await handpose.load();
const predictions = await model.estimateHands(video);

// Process predictions
// Detect gestures
// Trigger actions
```

### Privacy Considerations

- All processing happens locally in the browser
- No video data is sent to any server
- Camera can be turned off at any time
- Clear indicators when camera is active

## Keyboard Navigation

### Navigation Patterns

#### Tab Navigation
- Sequential navigation through interactive elements
- Visual focus indicators
- Skip links to main content

#### Arrow Key Navigation
- Navigate through tabs
- Select from dropdowns
- Move through radio groups

#### Dialog Navigation
- Focus trap within modal dialogs
- Escape key to close
- Focus return to trigger element

### Implementation Example

```typescript
// Ensure proper tab order
<div tabIndex={0}>
  <button tabIndex={1}>First</button>
  <button tabIndex={2}>Second</button>
</div>

// Handle keyboard events
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    // Activate
  } else if (e.key === 'Escape') {
    // Close/Cancel
  }
};
```

## Screen Reader Support

### ARIA Landmarks

```html
<header role="banner">
<nav role="navigation">
<main role="main">
<aside role="complementary">
<footer role="contentinfo">
```

### ARIA Live Regions

```html
<!-- Polite announcements -->
<div role="status" aria-live="polite" aria-atomic="true">
  Processing your request...
</div>

<!-- Urgent announcements -->
<div role="alert" aria-live="assertive" aria-atomic="true">
  Error: Please correct the form
</div>
```

### Form Labels

```html
<label htmlFor="business-name">
  Business Name
  <span className="sr-only">(Required)</span>
</label>
<input
  id="business-name"
  type="text"
  aria-required="true"
  aria-describedby="business-name-help"
/>
<span id="business-name-help" className="sr-only">
  Enter a descriptive name for your business
</span>
```

## Implementation Guide

### Adding Accessibility Features

#### 1. Import Components

```typescript
import { AccessibilityFeatures } from '@/components/accessibility-features';
import { GestureRecognition } from '@/components/gesture-recognition';
```

#### 2. Add to Your Page

```typescript
export default function Page() {
  const [accessibilitySettings, setAccessibilitySettings] = 
    useState<AccessibilitySettings>();

  return (
    <div>
      <AccessibilityFeatures 
        onSettingsChange={setAccessibilitySettings} 
      />
      
      {accessibilitySettings?.gestureRecognition && (
        <GestureRecognition 
          enabled={true}
          onGestureDetected={(gesture) => {
            console.log('Detected:', gesture);
          }}
        />
      )}
    </div>
  );
}
```

#### 3. Apply Settings Globally

```typescript
// In layout.tsx or app component
useEffect(() => {
  const root = document.documentElement;
  
  if (settings.highContrast) {
    root.classList.add('high-contrast');
  }
  
  root.style.fontSize = `${settings.textSize}%`;
}, [settings]);
```

### Best Practices

1. **Use Semantic HTML**: Use proper HTML elements (`<button>`, `<nav>`, etc.)
2. **Provide Text Alternatives**: Alt text for images, labels for forms
3. **Ensure Keyboard Access**: All functionality available via keyboard
4. **Test with Screen Readers**: Regularly test with NVDA, JAWS, VoiceOver
5. **Check Color Contrast**: Use tools to verify contrast ratios
6. **Avoid Auto-play**: Don't auto-play audio or video
7. **Provide Captions**: Add captions to video content
8. **Use ARIA Carefully**: Only when semantic HTML isn't sufficient

## Testing Accessibility

### Automated Testing

#### Pa11y

```bash
npm install -g pa11y
pa11y http://localhost:3000
```

#### Lighthouse

```bash
npm install -g lighthouse
lighthouse http://localhost:3000 --view
```

#### axe DevTools

Install browser extension and run in Developer Tools

### Manual Testing

#### Keyboard Testing Checklist

- [ ] Can reach all interactive elements with Tab
- [ ] Tab order is logical
- [ ] Focus indicators are visible
- [ ] Can activate all buttons with Enter/Space
- [ ] Can dismiss modals with Escape
- [ ] No keyboard traps

#### Screen Reader Testing Checklist

- [ ] All content is announced
- [ ] Images have meaningful alt text
- [ ] Form fields have labels
- [ ] Errors are announced
- [ ] Dynamic content changes are announced
- [ ] Landmarks are properly labeled

#### Visual Testing Checklist

- [ ] Text contrast meets 4.5:1 minimum
- [ ] Text resizes to 200% without breaking
- [ ] Content doesn't rely solely on color
- [ ] Focus indicators are visible
- [ ] Layout works at different zoom levels

### Testing Tools

- **NVDA**: Free Windows screen reader
- **JAWS**: Professional Windows screen reader
- **VoiceOver**: Built-in macOS/iOS screen reader
- **ChromeVox**: Chrome extension screen reader
- **Wave**: Browser extension for accessibility testing
- **axe DevTools**: Comprehensive accessibility testing
- **Lighthouse**: Built into Chrome DevTools

## Resources

### Guidelines and Standards

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Resources](https://webaim.org/resources/)

### Tools

- [MediaPipe Hands](https://google.github.io/mediapipe/solutions/hands.html)
- [TensorFlow.js](https://www.tensorflow.org/js)
- [Pa11y](https://pa11y.org/)
- [axe DevTools](https://www.deque.com/axe/devtools/)

### Testing

- [NVDA Screen Reader](https://www.nvaccess.org/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

## Summary

The Texas Idea Generator provides comprehensive accessibility features:

- ✅ WCAG 2.1 AA compliant
- ✅ Full keyboard navigation
- ✅ Screen reader optimized
- ✅ High contrast mode
- ✅ Adjustable text size
- ✅ Gesture recognition support
- ✅ ARIA live regions
- ✅ Semantic HTML
- ✅ Automated testing in CI/CD

These features ensure that the application is usable by everyone, regardless of their abilities or the assistive technologies they use.
