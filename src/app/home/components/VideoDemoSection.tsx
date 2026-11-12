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
  // Frame follows the video's real aspect ratio (no stretching)
  const [ratio, setRatio] = useState('16 / 9');
  const trackRef = useRef<HTMLDivElement>(null);
  const { startDrag } = useDragSeek();

  // Metadata can load before React attaches onLoadedMetadata, so check on mount too
  useEffect(() => {
    const v = videoRef.current;
    if (v && v.readyState >= 1) {
      setDuration(v.duration || 0);
      if (v.videoWidth && v.videoHeight) {
        setRatio(`${v.videoWidth} / ${v.videoHeight}`);
      }
    }
  }, []);

  // Smooth progress bar while playing (timeupdate only fires ~4x/sec)
  useEffect(() => {
    let frame = 0;
    const tick = () => {
      const v = videoRef.current;
      if (v) setCurrentTime(v.currentTime);
      frame = requestAnimationFrame(tick);
    };
    if (isPlaying) frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isPlaying]);

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
      const track = trackRef.current;
      if (!video || !track || !duration) return;
      const rect = track.getBoundingClientRect();
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
    if (!seconds || Number.isNaN(seconds)) return '0:00';
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
      <div
        className="group/video relative isolate w-full max-w-6xl overflow-hidden rounded-3xl bg-black shadow-xl sm:rounded-[3.75rem] [transform:translateZ(0)]"
        style={{ aspectRatio: ratio }}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 block h-full w-full rounded-[inherit] object-contain"
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
              if (v.videoWidth && v.videoHeight) {
                setRatio(`${v.videoWidth} / ${v.videoHeight}`);
              }
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
            className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-[inherit] bg-black/60"
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
            'absolute bottom-0 left-0 right-0 rounded-b-[inherit] p-4 sm:p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent',
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
              <div className="mb-1 flex items-center justify-between text-[0.75rem] tabular-nums leading-none text-white">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              {/* Tall hit area; the visible line is centred inside it */}
              <div
                ref={trackRef}
                className="group/seek relative flex h-5 w-full cursor-pointer items-center"
                onMouseDown={handleMouseDown}
              >
                <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/30 transition-[height] duration-150 group-hover/seek:h-2.5">
                  <div
                    className="h-full rounded-full bg-white"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div
                  className="pointer-events-none absolute h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-white opacity-0 shadow transition-opacity group-hover/seek:opacity-100"
                  style={{ left: `${progress}%` }}
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
