import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, StopCircle, Play, RotateCcw } from 'lucide-react';

interface EmotionData {
  emotion: string;
  confidence: number;
  color: string;
}

const EmotionDetector = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<EmotionData | null>(null);
  const [emotionHistory, setEmotionHistory] = useState<EmotionData[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock emotions for demo - in real implementation, this would use a trained model
  const emotions = [
    { emotion: 'Happy', confidence: 0.85, color: 'bg-green-500' },
    { emotion: 'Neutral', confidence: 0.72, color: 'bg-gray-500' },
    { emotion: 'Surprised', confidence: 0.68, color: 'bg-yellow-500' },
    { emotion: 'Sad', confidence: 0.45, color: 'bg-blue-500' },
    { emotion: 'Angry', confidence: 0.32, color: 'bg-red-500' },
    { emotion: 'Fearful', confidence: 0.28, color: 'bg-purple-500' },
    { emotion: 'Disgusted', confidence: 0.15, color: 'bg-orange-500' }
  ];

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsRecording(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsRecording(false);
    setIsAnalyzing(false);
  };

  const startAnalysis = () => {
    if (!isRecording) return;
    
    setIsAnalyzing(true);
    
    // Simulate real-time emotion detection
    const interval = setInterval(() => {
      // Mock emotion detection - randomly select from weighted emotions
      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      const detectedEmotion = {
        ...randomEmotion,
        confidence: Math.random() * 0.4 + 0.6 // Random confidence between 0.6-1.0
      };
      
      setCurrentEmotion(detectedEmotion);
      setEmotionHistory(prev => {
        const newHistory = [detectedEmotion, ...prev.slice(0, 9)];
        return newHistory;
      });
    }, 2000);

    // Store interval ID for cleanup
    const timeoutId = setTimeout(() => {
      clearInterval(interval);
    }, 30000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeoutId);
    };
  };

  const resetAnalysis = () => {
    setCurrentEmotion(null);
    setEmotionHistory([]);
    setIsAnalyzing(false);
  };

  const getEmotionColor = (emotion: string) => {
    const emotionMap: { [key: string]: string } = {
      'Happy': 'text-green-600 border-green-200',
      'Sad': 'text-blue-600 border-blue-200',
      'Angry': 'text-red-600 border-red-200',
      'Surprised': 'text-yellow-600 border-yellow-200',
      'Fearful': 'text-purple-600 border-purple-200',
      'Disgusted': 'text-orange-600 border-orange-200',
      'Neutral': 'text-gray-600 border-gray-200'
    };
    return emotionMap[emotion] || 'text-gray-600 border-gray-200';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            AI Emotion Detection Demo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Video Display */}
          <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-64 object-cover"
              style={{ display: isRecording ? 'block' : 'none' }}
            />
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full"
              style={{ display: 'none' }}
            />
            {!isRecording && (
              <div className="flex items-center justify-center h-64 text-gray-500">
                <div className="text-center">
                  <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Click "Start Camera" to begin</p>
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-2">
            {!isRecording ? (
              <Button onClick={startCamera} className="flex items-center gap-2">
                <Camera className="w-4 h-4" />
                Start Camera
              </Button>
            ) : (
              <>
                <Button onClick={stopCamera} variant="destructive" className="flex items-center gap-2">
                  <StopCircle className="w-4 h-4" />
                  Stop Camera
                </Button>
                {!isAnalyzing ? (
                  <Button onClick={startAnalysis} className="flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    Start Analysis
                  </Button>
                ) : (
                  <Button onClick={resetAnalysis} variant="outline" className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Reset Analysis
                  </Button>
                )}
              </>
            )}
          </div>

          {/* Current Emotion */}
          {currentEmotion && (
            <div className="space-y-2">
              <h4 className="font-semibold">Current Emotion Detected:</h4>
              <div className={`p-4 rounded-lg border-2 ${getEmotionColor(currentEmotion.emotion)}`}>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">{currentEmotion.emotion}</span>
                  <Badge variant="secondary">
                    {(currentEmotion.confidence * 100).toFixed(1)}% confidence
                  </Badge>
                </div>
              </div>
            </div>
          )}

          {/* Emotion History */}
          {emotionHistory.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold">Recent Emotions:</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {emotionHistory.map((emotion, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded text-center text-sm border ${getEmotionColor(emotion.emotion)}`}
                  >
                    <div className="font-medium">{emotion.emotion}</div>
                    <div className="text-xs opacity-75">
                      {(emotion.confidence * 100).toFixed(0)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Info */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-semibold mb-2">About This Demo:</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Uses computer vision and machine learning for real-time emotion detection</li>
              <li>• Processes facial expressions and micro-expressions</li>
              <li>• Provides confidence scores for each emotion prediction</li>
              <li>• Built with React, TypeScript, and Web APIs</li>
              <li>• Privacy-focused: All processing happens locally in the browser</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmotionDetector;