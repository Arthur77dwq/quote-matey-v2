'use client';

import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useObserver } from '@/hooks/use-intersection-observer';

export function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [, setVideoLoaded] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const lastActionRef = useRef(0);

  // reset interaction when tab hidden
  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setUserInteracted(false);
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    return () =>
      document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  // PLAY
  const playVideo = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      await video.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  // PAUSE
  const pauseVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    setIsPlaying(false);
  };

  // TOGGLE PLAY
  const togglePlayPause = async () => {
    const video = videoRef.current;
    if (!video) return;

    setUserInteracted(true);

    if (video.paused) {
      await playVideo();
    } else {
      pauseVideo();
    }
  };

  // OBSERVER (stable + no flicker)
  useObserver(
    videoRef,
    (entries) => {
      const entry = entries[0];
      const video = videoRef.current;
      if (!entry || !video) return;

      // debounce scroll spam
      const now = Date.now();
      if (now - lastActionRef.current < 250) return;
      lastActionRef.current = now;

      // ALWAYS allow pause
      if (entry.intersectionRatio <= 0.25) {
        if (!video.paused) pauseVideo();
        return;
      }

      // block autoplay after user interaction
      if (userInteracted) return;

      if (entry.isIntersecting && entry.intersectionRatio >= 0.75) {
        if (video.paused) playVideo();
      }
    },
    { threshold: [0.25, 0.75] }
  );

  // MUTE
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">

      {/* background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-[#f57a0a]/5 to-transparent rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-[#0a1628] bg-[#0a1628]/10 px-4 py-1.5 rounded-full mb-4">
            See It In Action
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1628] mb-4 tracking-tight">
            Watch how QuoteMatey
            <span className="block text-[#f57a0a]">
              transforms your quoting
            </span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See the fastest way to create professional quotes that win more jobs
          </p>
        </div>

        {/* VIDEO WRAPPER */}
        <div className="relative max-w-6xl mx-auto">

          {/* MAC HEADER */}
          <div className="bg-gray-200 rounded-t-2xl p-3 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>

              <div className="text-gray-700 text-sm font-medium">
                QuoteMatey Demo
              </div>

              <div className="w-20" />
            </div>
          </div>

          {/* VIDEO FRAME (FIXED CORNERS + NO BLACK LINE) */}
          <div className="relative aspect-video bg-black shadow-2xl border-4 border-gray-300 rounded-b-2xl overflow-hidden isolate">

            {/* VIDEO */}
            <video
              ref={videoRef}
              src="/video.mp4"
              className="absolute inset-0 w-full h-full object-cover block rounded-b-2xl"
              loop
              playsInline
              muted
              onLoadStart={handleVideoLoad}
              onCanPlay={handleVideoLoad}
            />

            {/* CONTROLS */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-6">
              <div className="flex items-center justify-center gap-3 sm:gap-4">

                <button
                  onClick={togglePlayPause}
                  className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 sm:w-6 sm:h-6" />
                  ) : (
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 ml-1" />
                  )}
                </button>

                <button
                  onClick={toggleMute}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>

              </div>
            </div>

            {/* CLICK OVERLAY */}
            {!isPlaying && (
              <div
                onClick={togglePlayPause}
                className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center text-white">
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 ml-1" />
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
