# Advanced Accessibility Integration Guide

## MediaPipe and TensorFlow.js Setup

This guide provides step-by-step instructions for integrating advanced machine learning models for gesture recognition and accessibility features.

## Table of Contents

1. [Overview](#overview)
2. [MediaPipe Hands Integration](#mediapipe-hands-integration)
3. [TensorFlow.js Integration](#tensorflowjs-integration)
4. [Gesture Recognition Implementation](#gesture-recognition-implementation)
5. [Sign Language Recognition](#sign-language-recognition)
6. [Performance Optimization](#performance-optimization)
7. [Testing and Validation](#testing-and-validation)

## Overview

The Texas Idea Generator can be enhanced with real-time gesture recognition using:

- **MediaPipe Hands**: Google's hand tracking solution
- **TensorFlow.js**: Browser-based machine learning
- **Handpose**: Pre-trained hand detection models

These technologies enable:
- ♿ Sign language recognition
- 👋 Gesture-based navigation
- 🎯 Touchless interaction
- 🔒 Privacy-focused (local processing)

## MediaPipe Hands Integration

### Installation

```bash
npm install @mediapipe/hands @mediapipe/camera_utils @mediapipe/drawing_utils
```

### Basic Implementation

Create `lib/mediapipe-hands.ts`:

```typescript
import { Hands, Results } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';

export class MediaPipeGestureDetector {
  private hands: Hands;
  private camera: Camera | null = null;
  
  constructor() {
    this.hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      }
    });
    
    this.hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });
  }
  
  async initialize(videoElement: HTMLVideoElement) {
    this.hands.onResults((results: Results) => {
      this.processResults(results);
    });
    
    this.camera = new Camera(videoElement, {
      onFrame: async () => {
        await this.hands.send({ image: videoElement });
      },
      width: 640,
      height: 480
    });
    
    await this.camera.start();
  }
  
  private processResults(results: Results) {
    if (results.multiHandLandmarks) {
      for (const landmarks of results.multiHandLandmarks) {
        const gesture = this.detectGesture(landmarks);
        if (gesture) {
          this.onGestureDetected(gesture);
        }
      }
    }
  }
  
  private detectGesture(landmarks: any[]): string | null {
    // Implement gesture detection logic
    // Example: Thumbs up detection
    const thumb = landmarks[4];
    const indexFinger = landmarks[8];
    
    if (thumb.y < indexFinger.y) {
      return 'thumbs_up';
    }
    
    // Add more gesture detection logic here
    return null;
  }
  
  private onGestureDetected(gesture: string) {
    console.log('Gesture detected:', gesture);
    // Emit event or call callback
  }
  
  stop() {
    if (this.camera) {
      this.camera.stop();
    }
  }
}
```

### Usage in Components

Update `components/gesture-recognition.tsx`:

```typescript
import { MediaPipeGestureDetector } from '@/lib/mediapipe-hands';

export function GestureRecognition() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const detectorRef = useRef<MediaPipeGestureDetector | null>(null);
  
  const startDetection = async () => {
    if (videoRef.current && !detectorRef.current) {
      detectorRef.current = new MediaPipeGestureDetector();
      await detectorRef.current.initialize(videoRef.current);
    }
  };
  
  const stopDetection = () => {
    if (detectorRef.current) {
      detectorRef.current.stop();
      detectorRef.current = null;
    }
  };
  
  // ... rest of component
}
```

## TensorFlow.js Integration

### Installation

```bash
npm install @tensorflow/tfjs @tensorflow-models/handpose
```

### Basic Implementation

Create `lib/tensorflow-gesture.ts`:

```typescript
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';

export class TensorFlowGestureDetector {
  private model: handpose.HandPose | null = null;
  private animationFrame: number | null = null;
  
  async initialize() {
    // Load the handpose model
    this.model = await handpose.load();
    console.log('TensorFlow.js Handpose model loaded');
  }
  
  async startDetection(videoElement: HTMLVideoElement, callback: (gesture: string) => void) {
    if (!this.model) {
      throw new Error('Model not initialized');
    }
    
    const detect = async () => {
      if (videoElement.readyState === 4) {
        const predictions = await this.model!.estimateHands(videoElement);
        
        if (predictions.length > 0) {
          const gesture = this.classifyGesture(predictions[0].landmarks);
          if (gesture) {
            callback(gesture);
          }
        }
      }
      
      this.animationFrame = requestAnimationFrame(detect);
    };
    
    detect();
  }
  
  private classifyGesture(landmarks: number[][]): string | null {
    // Implement gesture classification
    // landmarks is an array of [x, y, z] coordinates for 21 hand keypoints
    
    // Example: Detect open palm
    const fingersExtended = this.countExtendedFingers(landmarks);
    
    if (fingersExtended === 5) {
      return 'open_palm';
    } else if (fingersExtended === 2) {
      return 'peace_sign';
    } else if (fingersExtended === 1) {
      return 'pointing';
    }
    
    return null;
  }
  
  private countExtendedFingers(landmarks: number[][]): number {
    let count = 0;
    
    // Thumb
    if (landmarks[4][0] > landmarks[3][0]) {
      count++;
    }
    
    // Other fingers
    const fingerTips = [8, 12, 16, 20];
    const fingerPips = [6, 10, 14, 18];
    
    for (let i = 0; i < fingerTips.length; i++) {
      if (landmarks[fingerTips[i]][1] < landmarks[fingerPips[i]][1]) {
        count++;
      }
    }
    
    return count;
  }
  
  stop() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }
}
```

### Usage Example

```typescript
const detector = new TensorFlowGestureDetector();
await detector.initialize();

await detector.startDetection(videoElement, (gesture) => {
  console.log('Detected gesture:', gesture);
  // Handle gesture
});
```

## Gesture Recognition Implementation

### Complete Gesture Detection System

Create `lib/gesture-system.ts`:

```typescript
export interface GestureEvent {
  type: string;
  confidence: number;
  timestamp: number;
  landmarks?: any;
}

export class GestureRecognitionSystem {
  private detectionMethod: 'mediapipe' | 'tensorflow' = 'mediapipe';
  private callbacks: Map<string, ((event: GestureEvent) => void)[]> = new Map();
  
  // Gesture mappings
  private gestureActions: Record<string, () => void> = {
    'thumbs_up': () => this.emit({ type: 'approve', confidence: 0.9, timestamp: Date.now() }),
    'thumbs_down': () => this.emit({ type: 'reject', confidence: 0.9, timestamp: Date.now() }),
    'peace_sign': () => this.emit({ type: 'cancel', confidence: 0.85, timestamp: Date.now() }),
    'pointing': () => this.emit({ type: 'select', confidence: 0.8, timestamp: Date.now() }),
    'open_palm': () => this.emit({ type: 'stop', confidence: 0.95, timestamp: Date.now() }),
    'fist': () => this.emit({ type: 'confirm', confidence: 0.9, timestamp: Date.now() }),
  };
  
  on(eventType: string, callback: (event: GestureEvent) => void) {
    if (!this.callbacks.has(eventType)) {
      this.callbacks.set(eventType, []);
    }
    this.callbacks.get(eventType)!.push(callback);
  }
  
  private emit(event: GestureEvent) {
    const callbacks = this.callbacks.get(event.type);
    if (callbacks) {
      callbacks.forEach(cb => cb(event));
    }
  }
  
  processGesture(gestureName: string) {
    const action = this.gestureActions[gestureName];
    if (action) {
      action();
    }
  }
}
```

### Integration with UI

```typescript
// In your component
const gestureSystem = new GestureRecognitionSystem();

gestureSystem.on('approve', (event) => {
  // Handle approve gesture
  console.log('User approved with gesture');
});

gestureSystem.on('select', (event) => {
  // Handle selection
  console.log('User selected item with gesture');
});

// When gesture is detected
gestureSystem.processGesture('thumbs_up');
```

## Sign Language Recognition

### ASL Alphabet Recognition

For American Sign Language recognition, you can train a custom model:

```typescript
// Load custom ASL model
const model = await tf.loadLayersModel('/models/asl-model.json');

// Classify hand shape
async function classifyASL(landmarks: number[][]): Promise<string> {
  // Preprocess landmarks
  const tensor = tf.tensor2d([landmarks.flat()]);
  
  // Make prediction
  const prediction = model.predict(tensor) as tf.Tensor;
  const probabilities = await prediction.data();
  
  // Get letter with highest probability
  const maxIndex = probabilities.indexOf(Math.max(...probabilities));
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  return letters[maxIndex];
}
```

### Building ASL Recognition

1. **Collect Training Data**
   ```typescript
   // Capture hand landmarks for each letter
   const trainingData = [];
   
   for (const letter of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
     // Show prompt to user
     // Capture multiple samples
     const samples = await captureSamples(letter, 50);
     trainingData.push({ letter, samples });
   }
   ```

2. **Train Model**
   ```python
   import tensorflow as tf
   from tensorflow import keras
   
   # Create model
   model = keras.Sequential([
       keras.layers.Dense(128, activation='relu', input_shape=(63,)),
       keras.layers.Dropout(0.2),
       keras.layers.Dense(64, activation='relu'),
       keras.layers.Dropout(0.2),
       keras.layers.Dense(26, activation='softmax')
   ])
   
   model.compile(
       optimizer='adam',
       loss='categorical_crossentropy',
       metrics=['accuracy']
   )
   
   # Train
   model.fit(X_train, y_train, epochs=50, validation_split=0.2)
   
   # Save for TensorFlow.js
   import tensorflowjs as tfjs
   tfjs.converters.save_keras_model(model, 'public/models')
   ```

3. **Use in Application**
   ```typescript
   const aslModel = await tf.loadLayersModel('/models/model.json');
   
   async function recognizeASL(landmarks: number[][]) {
     const input = tf.tensor2d([landmarks.flat()]);
     const prediction = aslModel.predict(input) as tf.Tensor;
     const letter = await classifyPrediction(prediction);
     return letter;
   }
   ```

## Performance Optimization

### Tips for Real-time Performance

1. **Reduce Model Complexity**
   ```typescript
   hands.setOptions({
     modelComplexity: 0, // Use lite model for faster processing
     maxNumHands: 1,     // Track only one hand if sufficient
   });
   ```

2. **Throttle Detection**
   ```typescript
   let lastDetection = 0;
   const DETECTION_INTERVAL = 100; // ms
   
   function throttledDetection() {
     const now = Date.now();
     if (now - lastDetection > DETECTION_INTERVAL) {
       detectGesture();
       lastDetection = now;
     }
   }
   ```

3. **Use Web Workers**
   ```typescript
   // gesture-worker.ts
   self.onmessage = async (e) => {
     const imageData = e.data;
     const predictions = await detectGestures(imageData);
     self.postMessage(predictions);
   };
   ```

4. **Optimize Video Resolution**
   ```typescript
   const stream = await navigator.mediaDevices.getUserMedia({
     video: {
       width: { ideal: 640 },
       height: { ideal: 480 },
       frameRate: { ideal: 30 }
     }
   });
   ```

## Testing and Validation

### Unit Tests for Gesture Detection

```typescript
// __tests__/gesture-detection.test.ts
import { describe, it, expect } from 'vitest';
import { GestureRecognitionSystem } from '@/lib/gesture-system';

describe('GestureRecognitionSystem', () => {
  it('should detect thumbs up gesture', () => {
    const system = new GestureRecognitionSystem();
    let detected = false;
    
    system.on('approve', (event) => {
      detected = true;
      expect(event.type).toBe('approve');
      expect(event.confidence).toBeGreaterThan(0.5);
    });
    
    system.processGesture('thumbs_up');
    expect(detected).toBe(true);
  });
  
  it('should handle multiple gesture callbacks', () => {
    const system = new GestureRecognitionSystem();
    let count = 0;
    
    system.on('select', () => count++);
    system.on('select', () => count++);
    
    system.processGesture('pointing');
    expect(count).toBe(2);
  });
});
```

### Integration Tests

```typescript
describe('MediaPipe Integration', () => {
  it('should initialize MediaPipe', async () => {
    const detector = new MediaPipeGestureDetector();
    const video = document.createElement('video');
    
    await detector.initialize(video);
    expect(detector).toBeDefined();
  });
});
```

## Deployment Considerations

### CDN vs Self-hosted

**MediaPipe from CDN** (recommended for development):
```typescript
locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
```

**Self-hosted** (recommended for production):
```bash
# Copy MediaPipe files to public directory
cp -r node_modules/@mediapipe/hands/dist/* public/mediapipe/
```

```typescript
locateFile: (file) => `/mediapipe/${file}`
```

### Browser Compatibility

```typescript
// Check for required features
function checkBrowserSupport(): boolean {
  return !!(
    navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia &&
    typeof WebAssembly !== 'undefined'
  );
}

if (!checkBrowserSupport()) {
  console.warn('Gesture recognition not supported in this browser');
}
```

## Resources

### Official Documentation
- [MediaPipe Hands](https://google.github.io/mediapipe/solutions/hands.html)
- [TensorFlow.js](https://www.tensorflow.org/js)
- [Handpose Model](https://github.com/tensorflow/tfjs-models/tree/master/handpose)

### Example Projects
- [MediaPipe Hands Demo](https://mediapipe.page.link/hands_js)
- [TensorFlow.js Handpose Demo](https://storage.googleapis.com/tfjs-models/demos/handpose/index.html)

### Training Resources
- [ASL Dataset](https://www.kaggle.com/datasets/grassknoted/asl-alphabet)
- [Hand Gesture Dataset](https://www.kaggle.com/datasets/gti-upm/leapgestrecog)

## Summary

This guide provides everything needed to implement advanced gesture recognition:

- ✅ MediaPipe Hands integration
- ✅ TensorFlow.js implementation  
- ✅ Gesture classification system
- ✅ Sign language recognition framework
- ✅ Performance optimization techniques
- ✅ Testing strategies
- ✅ Deployment considerations

For basic gesture recognition, the placeholder implementation in `components/gesture-recognition.tsx` is sufficient. For production sign language support, follow this guide to integrate MediaPipe or TensorFlow.js.
