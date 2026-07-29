import { SectionHeader } from '@/components/section-header';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { VIDEODEMO } from '@/types/pages';

export function VideoDemoSection({
  tag,
  title,
  description,
  video,
  className,
}: VIDEODEMO) {
  return (
    <section
      className={cn('flex flex-col justify-center items-center', className)}
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
        loop
        className="rounded-[1.5rem] sm:rounded-[3.75rem] w-96.5 h-53 sm:w-187 sm:h-108.25 lg:w-273.75 lg:h-146 object-fill"
        playsInline
        controls
        autoPlay
        muted
      >
        <source className="w-full" src={video?.src} type="video/mp4" />
      </video>
    </section>
  );
}
