import { Avatar, AvatarFallback,AvatarImage } from '../ui/avatar';

export async function Compliance() {
  return (
    <section className="pb-25 px-4 md:px-0 w-full flex items-start justify-center">
      <div className="w-full md:w-3xl p-5 md:p-10 flex flex-col md:flex-row items-center justify-between gap-5 bg-neutral-50 rounded-3xl">
        <h2 className="text-center md:text-left font-semibold text-neutral-900 text-heading-5 w-full">
          Your data is protected at every level
        </h2>
        <div className="flex justify-between items-center gap-7.5">
          {[
            {
              src: '/images/about/soc.svg',
              name: 'SOC 2',
            },
            {
              src: '/images/about/iso.svg',
              name: 'ISO 27001',
            },
            {
              src: '/images/about/gdpr.svg',
              name: 'GDPR',
            },
          ].map((cred, i) => (
            <Avatar key={`${i}-${cred.name}`} className="size-23 md:size-25">
              <AvatarImage src={cred.src} />
              <AvatarFallback>{cred.name}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </div>
    </section>
  );
}
