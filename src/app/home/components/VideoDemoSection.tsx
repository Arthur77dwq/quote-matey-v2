import { useRef, useState } from 'react';

import { SectionHeader } from '@/components/section-header';
import { Badge } from '@/components/ui/badge';
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
  const [, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlayPause = () => {
    if (videoRef.current) {
      setUserInteracted(true);
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
      if (userInteracted) return;
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

  const handleVideoLoad = () => {
    setVideoLoaded(true);
    // Video starts paused, user must click to play
  };
  return (
    <section
      className={cn(
        'py-40 flex flex-col justify-center items-center',
        className,
      )}
    >
      <div className="px-4 sm:py-5 sm:p-0 flex flex-col items-center justify-center gap-2.5 w-full h-fit">
        {tag && (
          <Badge className="rounded-full py-2.5 px-5 bg-neutral-50 text-[0.87rem] font-medium font-inter text-neutral-900 flex items-center justify center border border-neutral-100">
            {tag}
          </Badge>
        )}
        {(title || description) && (
          <SectionHeader {...{ title, description }} />
        )}
      </div>
      <video
        ref={videoRef}
        loop
        playsInline
        muted
        controls
        onCanPlayThrough={handleVideoLoad}
        onError={() => setVideoLoaded(false)}
        className="rounded-[1.5rem] sm:rounded-[3.75rem] w-96.5 h-53 sm:w-187 sm:h-108.25 lg:w-273.75 lg:h-146 object-fill"
      >
        <source className="w-full" src={video?.src} type="video/mp4" />
      </video>
    </section>
  );
}
