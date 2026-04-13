'use client';

import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { useRef, useState } from 'react';
import { useObserver } from '@/hooks/use-intersection-observer';

export function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);

  const lastAction = useRef(0);

  const syncState = () => {
    if (!videoRef.current) return;
    setIsPlaying(!videoRef.current.paused);
  };

  const playVideo = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      await video.play();
    } catch {}

    syncState();
  };

  const pauseVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    syncState();
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    const now = Date.now();
    if (now - lastAction.current < 200) return;
    lastAction.current = now;

    setUserInteracted(true);

    if (video.paused) playVideo();
    else pauseVideo();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  useObserver(
    videoRef,
    (entries) => {
      const entry = entries[0];
      const video = videoRef.current;
      if (!entry || !video) return;

      // STOP autoplay after user interaction
      if (userInteracted) return;

      // pause when out of view
      if (entry.intersectionRatio < 0.3) {
        video.pause();
        syncState();
        return;
      }

      // play when visible
      if (entry.intersectionRatio > 0.7) {
        video.play().catch(() => {});
        syncState();
      }
    },
    { threshold: [0.3, 0.7] }
  );

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">

      {/* background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#f57a0a]/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0a1628]">
            Watch how QuoteMatey
            <span className="block text-[#f57a0a]">
              transforms your quoting
            </span>
          </h2>

          <p className="text-muted-foreground mt-4">
            See the fastest way to create professional quotes
          </p>
        </div>

        {/* VIDEO WRAPPER */}
        <div className="max-w-6xl mx-auto">

          {/* MAC HEADER */}
          <div className="bg-gray-200 rounded-t-2xl p-3 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>

              <div className="text-sm text-gray-700">
                QuoteMatey Demo
              </div>

              <div className="w-20" />
            </div>
          </div>

          {/* VIDEO BOX */}
          <div className="relative aspect-video bg-black border-4 border-gray-300 rounded-b-2xl overflow-hidden">

            {/* VIDEO */}
            <div className="absolute inset-0 overflow-hidden rounded-b-2xl bg-black">
              <video
                ref={videoRef}
                src="/video.mp4"
                className="w-full h-full object-cover block"
                loop
                playsInline
                muted
                onPlay={syncState}
                onPause={syncState}
              />
            </div>

            {/* CONTROLS */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5 flex justify-center gap-4">

              <button
                onClick={togglePlayPause}
                className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-white"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6 ml-1" />
                )}
              </button>

              <button
                onClick={toggleMute}
                className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>

            </div>

            {/* OVERLAY */}
            {!isPlaying && (
              <div
                onClick={togglePlayPause}
                className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
              >
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-white">
                  <Play className="w-8 h-8 ml-1" />
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
