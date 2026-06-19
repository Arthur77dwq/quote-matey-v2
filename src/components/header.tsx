import Image from 'next/image';

import { DesktopNavBar } from './navBar/desktop';

export const getGlobalData = async () => {
  const global = await import('@/constant/data/global');
  return global.GLOBAL_DATA;
};

export async function Header() {
  const DATA = await getGlobalData();
  const Header = DATA.headers;
  return (
    <>
      {Header?.type === 'GLOBAL_HEADER' && (
        <div className="fixed z-header top-0 w-full flex flex-col justify-center items-center p-5 ">
          <div className="absolute inset-0 bg-black/30 blur-2xl w-full h-7"></div>
          <div className="relative z-header min-w-40 h-14.5 bg-white w-3xl flex justify-between items-center p-2.5">
            <Image
              src={Header?.logo.src}
              alt={Header?.logo.alt}
              width={170}
              height={35}
            />

            {Header?.navBar.active && (
              <DesktopNavBar navLinks={Header?.navBar.links || []} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
