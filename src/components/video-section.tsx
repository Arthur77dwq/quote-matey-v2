'use client';

import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { useRef, useState } from 'react';

import { useObserver } from '@/src/hooks/use-intersection-observer';

export function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Start muted for autoplay
  const [, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {
          setVideoLoaded(false);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  useObserver(
    videoRef,
    (entries) => {
      entries.forEach((entry) => {
        // Play when more or equal to 70% of element visible on viewport
        if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
          if (!isPlaying) togglePlayPause();
        }
        // Pause when less then 30% of element visible on viewport
        if (!entry.isIntersecting && entry.intersectionRatio <= 0.3) {
          if (isPlaying) togglePlayPause();
        }
      });
    },
    { threshold: [0.7, 0.3] },
  );

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoLoad = () => {
    setVideoLoaded(true);
    // Video starts paused, user must click to play
  };

  return (
    <section
      id="video-section"
      className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-[#f57a0a]/5 to-transparent rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-[#0a1628] bg-[#0a1628]/10 px-4 py-1.5 rounded-full mb-4">
            See It In Action
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1628] mb-4 tracking-tight">
            Watch how QuoteMatey
            <span className="block text-[#f57a0a]">
              {' '}
              transforms your quoting
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See the fastest way to create professional quotes that win more jobs
          </p>
        </div>

        {/* Video Container with MacBook-style frame */}
        <div className="relative max-w-6xl mx-auto">
          {/* MacBook Frame - Only top tab bar */}
          <div className="bg-gray-200 rounded-t-2xl p-3 shadow-2xl">
            {/* MacBook Tab Bar */}
            <div className="flex items-center justify-between">
              {/* Traffic Light Buttons */}
              <div className="flex items-center gap-2">
                <button className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors" />
                <button className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors" />
                <button className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors" />
              </div>
              {/* Window Title */}
              <div className="text-gray-700 text-sm font-medium">
                QuoteMatey Demo
              </div>
              <div className="w-20" /> {/* Spacer for balance */}
            </div>
          </div>

          {/* Video Container - 1920x1080 aspect ratio with stroke */}
          <div className="relative aspect-video bg-black shadow-2xl border-4 border-gray-300 rounded-b-2xl overflow-hidden">
            <video
              ref={videoRef}
              src="/video.mp4"
              className="w-full h-full object-cover"
              loop
              playsInline
              muted
              onLoadStart={handleVideoLoad}
              onCanPlay={handleVideoLoad}
              onError={() => setVideoLoaded(false)}
              style={{ WebkitUserSelect: 'none', WebkitTouchCallout: 'none' }}
            />

            {/* Custom Video Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-6">
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                {/* Play/Pause Button */}
                <button
                  onClick={togglePlayPause}
                  className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all hover:scale-105"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 sm:w-6 sm:h-6" />
                  ) : (
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 ml-1" />
                  )}
                </button>

                {/* Mute/Unmute Button */}
                <button
                  onClick={toggleMute}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all hover:scale-105"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Click to play overlay (when paused) */}
            {!isPlaying && (
              <div
                onClick={togglePlayPause}
                className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer group"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white group-hover:bg-white/30 transition-all group-hover:scale-110">
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 ml-1" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Feature highlights below video */}
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-16">
          <div className="text-center">
            <div className="w-12 h-12 bg-[#f57a0a]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Play className="w-6 h-6 text-[#f57a0a]" />
            </div>
            <h3 className="font-semibold text-[#0a1628] mb-2 text-sm sm:text-base">
              Watch the Magic
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              See how AI transforms simple descriptions into professional quotes
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-[#0a1628]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Volume2 className="w-6 h-6 text-[#0a1628]" />
            </div>
            <h3 className="font-semibold text-[#0a1628] mb-2 text-sm sm:text-base">
              Custom Controls
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Pause, play, and control volume exactly how you want
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
            <h3 className="font-semibold text-[#0a1628] mb-2 text-sm sm:text-base">
              Ready to Go
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Start generating quotes in seconds, not hours
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
