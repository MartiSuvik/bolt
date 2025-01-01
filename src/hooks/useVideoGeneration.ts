import { useState, useCallback } from 'react';
import type { VideoConfig, UploadProgress, VideoGenerationResponse } from '../types/video';
import { uploadImage } from '../services/storage';
import { useAuth } from './useAuth';

export function useVideoGeneration() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UploadProgress>({
    progress: 0,
    state: 'idle',
  });

  const generate = useCallback(
    async (file: File, config: VideoConfig) => {
      if (!user) {
        throw new Error('User must be authenticated');
      }

      try {
        // Upload to Firebase
        setProgress({ progress: 0, state: 'uploading' });
        const { url } = await uploadImage(file, user.uid, (progress) => {
          setProgress({ progress, state: 'uploading' });
        });

        // Start video generation
        setProgress({ progress: 0, state: 'processing' });
        
        const response = await fetch(
          "https://api.dev.runwayml.com/v1/image_to_video",
          {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${import.meta.env.VITE_RUNWAY_API_KEY}`,
              "X-Runway-Version": "2024-11-06",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              promptImage: url,
              seed: Math.floor(Math.random() * 4294967295),
              model: "gen3a_turbo",
              promptText: "Generate a video",
              watermark: false,
              duration: config.duration,
              ratio: config.aspectRatio === '16:9' ? '1280:768' : '768:1280'
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to start video generation');
        }

        const result = await response.json();
        
        if (result.videoUrl) {
          setProgress({ 
            progress: 100, 
            state: 'completed',
            videoUrl: result.videoUrl 
          });
          return result;
        } else {
          throw new Error('No video URL in response');
        }
      } catch (error) {
        console.error('Video generation error:', error);
        setProgress({
          progress: 0,
          state: 'error',
          error: error instanceof Error ? error.message : 'An error occurred',
        });
        throw error;
      }
    },
    [user]
  );

  return {
    progress,
    generate,
  };
}