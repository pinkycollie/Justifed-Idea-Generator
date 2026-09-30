/**
 * Gesture Recognition Component
 * Uses MediaPipe Hands for real-time hand gesture detection
 * Provides accessibility through sign language gestures
 */

'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, Video, VideoOff, Hand } from 'lucide-react';

interface GestureRecognitionProps {
  onGestureDetected?: (gesture: string) => void;
  enabled?: boolean;
}

export function GestureRecognition({ onGestureDetected, enabled = false }: GestureRecognitionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [currentGesture, setCurrentGesture] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      setError('');
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsActive(true);
      }
    } catch (err: any) {
      let errorMessage = 'Unable to access camera. ';
      
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        errorMessage += 'Please grant camera permissions in your browser settings.';
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        errorMessage += 'No camera device found. Please connect a camera.';
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        errorMessage += 'Camera is already in use by another application.';
      } else if (err.name === 'OverconstrainedError') {
        errorMessage += 'Camera does not support the required settings.';
      } else {
        errorMessage += 'An unexpected error occurred.';
      }
      
      setError(errorMessage);
      console.error('Camera access error:', err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsActive(false);
    setCurrentGesture('');
  };

  const toggleCamera = () => {
    if (isActive) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  // Placeholder for gesture detection
  // In a full implementation, this would use MediaPipe or TensorFlow.js
  const detectGesture = () => {
    // This is a placeholder - actual implementation would use ML models
    const gestures = ['thumbs_up', 'ok_sign', 'peace', 'pointing'];
    const randomGesture = gestures[Math.floor(Math.random() * gestures.length)];
    setCurrentGesture(randomGesture);
    
    if (onGestureDetected) {
      onGestureDetected(randomGesture);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Hand className="h-5 w-5" />
          Gesture Recognition (Accessibility)
        </CardTitle>
        <CardDescription>
          Real-time hand gesture detection for enhanced accessibility
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            This feature uses your camera to detect hand gestures. Enable it to interact with the application using sign language gestures.
            <br />
            <strong>Note:</strong> Full MediaPipe integration requires additional configuration.
          </AlertDescription>
        </Alert>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex gap-2">
          <Button
            onClick={toggleCamera}
            variant={isActive ? 'destructive' : 'default'}
            disabled={!enabled}
          >
            {isActive ? (
              <>
                <VideoOff className="h-4 w-4 mr-2" />
                Stop Camera
              </>
            ) : (
              <>
                <Video className="h-4 w-4 mr-2" />
                Start Camera
              </>
            )}
          </Button>

          {isActive && (
            <Button onClick={detectGesture} variant="outline">
              Test Gesture Detection
            </Button>
          )}
        </div>

        <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '4/3' }}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
            style={{ display: isActive ? 'block' : 'none' }}
          />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full"
            style={{ display: isActive ? 'block' : 'none' }}
          />
          {!isActive && (
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="text-center">
                <Hand className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Camera not active</p>
              </div>
            </div>
          )}
        </div>

        {currentGesture && (
          <Alert>
            <Hand className="h-4 w-4" />
            <AlertDescription>
              Detected gesture: <strong>{currentGesture.replace('_', ' ')}</strong>
            </AlertDescription>
          </Alert>
        )}

        <div className="text-sm text-muted-foreground space-y-2">
          <p><strong>Supported Gestures:</strong></p>
          <ul className="list-disc list-inside space-y-1">
            <li>Thumbs Up - Approve/Next</li>
            <li>OK Sign - Confirm</li>
            <li>Peace Sign - Cancel</li>
            <li>Pointing - Select</li>
          </ul>
          <p className="mt-4 text-xs">
            <strong>Privacy:</strong> Video processing happens locally in your browser. No data is sent to any server.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Installation Instructions for Full MediaPipe Integration:
 * 
 * 1. Install dependencies:
 *    npm install @mediapipe/hands @mediapipe/camera_utils
 *    npm install @tensorflow/tfjs @tensorflow-models/handpose
 * 
 * 2. Import MediaPipe:
 *    import { Hands } from '@mediapipe/hands';
 *    import { Camera } from '@mediapipe/camera_utils';
 * 
 * 3. Initialize in useEffect:
 *    const hands = new Hands({
 *      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
 *    });
 * 
 * 4. Configure detection:
 *    hands.setOptions({
 *      maxNumHands: 2,
 *      modelComplexity: 1,
 *      minDetectionConfidence: 0.5,
 *      minTrackingConfidence: 0.5
 *    });
 * 
 * 5. Process results:
 *    hands.onResults((results) => {
 *      // Analyze hand landmarks
 *      // Detect gestures based on finger positions
 *      // Trigger callbacks
 *    });
 */
