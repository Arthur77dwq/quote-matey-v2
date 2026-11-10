'use client';

import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Description, Title } from '@/components/section-header';
import { Badge } from '@/components/ui/badge';
import { useDragSeek } from '@/hooks/use-drag-seek';
import { useObserver } from '@/hooks/use-intersection-observer';
import { cn } from '@/lib/utils';
import { VIDEODEMO } from '@/types/pages';

export function VideoDemoSection({
  tag,
  title,
  description,
  video,
  className,
}: VIDEODEMO) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const { startDrag } = useDragSeek();

  // Metadata can load before React attaches onLoadedMetadata, so check on mount too
  useEffect(() => {
    const v = videoRef.current;
    if (v && v.readyState >= 1) setDuration(v.duration || 0);
  }, []);

  const togglePlayPause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    setUserInteracted(true);
    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  useObserver(
    videoRef,
    (entries) => {
      if (userInteracted) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
          if (!isPlaying) togglePlayPause();
        }
        if (!entry.isIntersecting && entry.intersectionRatio <= 0.3) {
          if (isPlaying) togglePlayPause();
        }
      });
    },
    { threshold: [0.7, 0.3] },
  );

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  const seekTo = useCallback(
    (clientX: number) => {
      const video = videoRef.current;
      if (!video || !duration) return;
      const rect = video.getBoundingClientRect();
      const percent = Math.max(
        0,
        Math.min(1, (clientX - rect.left) / rect.width),
      );
      video.currentTime = percent * duration;
      setCurrentTime(video.currentTime);
    },
    [duration],
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      startDrag(e.clientX, (x) => seekTo(x));
    },
    [startDrag, seekTo],
  );

  const formatTime = useCallback((seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }, []);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section
      className={cn(
        'py-40 px-2 flex flex-col justify-center items-center',
        className,
      )}
    >
      <div className="px-4 py-5 sm:px-0 flex flex-col items-center justify-center gap-2.5 w-full h-fit">
        {tag && (
          <Badge className="rounded-full py-2.5 px-5 bg-neutral-50 text-[0.87rem] font-medium font-inter text-neutral-900 flex items-center justify-center border border-neutral-100">
            {tag}
          </Badge>
        )}

        <div className="flex flex-col justify-center items-center">
          {title && (
            <Title
              className="text-[2.125rem]! md:text-[3.75rem]! font-bold [&_*]:font-bold leading-[1.2em]! [&_*]:leading-[1.2em]!"
              {...{ title }}
            />
          )}
          {description && (
            <Description
              className="text-neutral-900! text-[1rem]! md:text-body-md!"
              {...{ description }}
            />
          )}
        </div>
      </div>

      {/* Named group so it doesn't clash with the progress bar's own `group` */}
      <div className="group/video relative w-full max-w-6xl rounded-[3.75rem] shadow-xl overflow-hidden bg-black">
        <video
          ref={videoRef}
          className="block w-full h-53 sm:h-108.25 lg:h-146 object-fill"
          loop
          playsInline
          muted
          onTimeUpdate={() => {
            const v = videoRef.current;
            if (v) setCurrentTime(v.currentTime);
          }}
          onLoadedMetadata={() => {
            const v = videoRef.current;
            if (v) {
              setDuration(v.duration || 0);
              setCurrentTime(v.currentTime);
            }
          }}
          onDurationChange={() => setDuration(videoRef.current?.duration || 0)}
        >
          <source src={video?.src} type="video/mp4" />
        </video>

        {/* Paused overlay */}
        {!isPlaying && (
          <div
            onClick={togglePlayPause}
            className="absolute inset-0 flex items-center justify-center bg-black/60 cursor-pointer"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlayPause();
              }}
              className="w-26 h-26 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/20 shadow-lg transition-all duration-200 ease-out hover:scale-105 hover:shadow-xl"
              aria-label="Play video"
            >
              <Play className="w-8 h-8 ml-1" />
            </button>
          </div>
        )}

        {/* Bottom controls: hidden until hover, always visible while paused / on touch / on keyboard focus */}
        <div
          className={cn(
            'absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent',
            'transition-opacity duration-300 ease-out',
            'opacity-0 group-hover/video:opacity-100 focus-within:opacity-100',
            '[@media(hover:none)]:opacity-100',
            !isPlaying && 'opacity-100',
          )}
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={togglePlayPause}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 hover:scale-105"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Play className="w-5 h-5 sm:w-6 sm:h-6 ml-1" />
              )}
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between text-[0.75rem] text-white mb-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div
                className="relative h-1.5 w-full cursor-pointer rounded-full group"
                onMouseDown={handleMouseDown}
              >
                <div className="absolute inset-0 rounded-full bg-white/30 group-hover:h-2.5 transition-all" />
                <div
                  className="absolute left-0 top-0 h-1.5 rounded-full bg-white"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <button
              onClick={toggleMute}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 hover:scale-105"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
