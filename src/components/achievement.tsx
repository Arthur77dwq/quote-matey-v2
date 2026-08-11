import { nameAcronoym } from '@/lib/utils';
import { ImageType } from '@/types/global';

import { Icon } from './icon';
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from './ui/avatar';

export function Achievement({
  title,
  users,
  ratingText,
  star,
}: {
  title: string;
  users: ImageType[];
  ratingText: string;
  star: number;
}) {
  return (
    <div className="flex flex-col justify-center items-center gap-2.5 w-full h-fit">
      <p className="text-neutral-600 font-semibold">{title}</p>
      <div className="flex justify-center gap-4 items-center w-full">
        <AvatarGroup className="ring-white">
          {users.map((avatar, i) => (
            <Avatar className="ring-white ring-0.5 size-4" key={i}>
              <AvatarImage src={avatar.src} alt={avatar.alt} />
              <AvatarFallback>{nameAcronoym(avatar.alt)}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
        <div className="flex">
          {Array.from({ length: star }).map((_, i) => (
            <Icon
              key={i}
              name="Star"
              fill="#FFD700"
              stroke="#FFD700"
              className="size-4"
            />
          ))}
        </div>
        <span className="text-[0.75rem] text-neutral-600 font-semibold">
          {ratingText}
        </span>
      </div>
    </div>
  );
}
