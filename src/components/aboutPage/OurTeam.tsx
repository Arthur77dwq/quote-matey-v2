import { ProfileShow } from '../profileShow';
import { Badge } from '../ui/badge';

export async function OurTeam() {
  return (
    <section className="pb-25 w-full flex flex-col gap-12.5 items-center justify-between">
      <div className="w-full flex flex-col items-center justify-between">
        <Badge className="rounded-full py-2.5 px-5 bg-neutral-50 font-inter font-medium text-body-xs text-neutral-900 flex items-center justify center border border-neutral-100">
          Our experts
        </Badge>
        <h2 className="text-[2.13rem] sm:text-6xl text-neutral-900 font-bold text-nowrap">
          Meet <strong className="text-warning-600">our</strong> team
        </h2>
      </div>
      <div className="flex items-center justify-center w-full">
        <div className="flex items-start justify-center w-full sm:w-1/2 gap-5 sm:gap-7.5">
          {[
            {
              name: 'Arthur',
              desc: 'Founder & CEO',
              image: '/images/about/arthur.avif',
            },
            {
              name: 'Ankesh Sharma',
              desc: 'Founding Software Engineer',
              image: '/images/about/ankesh.webp',
            },
          ].map((profile, i) => (
            <ProfileShow key={`${i}-${profile.name}`} {...profile} />
          ))}
        </div>
      </div>
    </section>
  );
}
