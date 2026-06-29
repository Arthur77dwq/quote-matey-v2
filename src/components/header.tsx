import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

import { GLOBAL_DATA } from '@/constant/data/global';

import { DesktopNavBar } from './navBar/desktop';
import { Button } from './ui/button';

export const getGlobalData = async () => {
  return GLOBAL_DATA;
};

export async function Header() {
  const { headers } = await getGlobalData();
  return (
    <>
      {headers?.type === 'GLOBAL_HEADER' && (
        <div className="fixed z-200 top-0 w-full flex flex-col justify-center items-center p-5 ">
          <div className="absolute inset-0 bg-black/30 blur-2xl w-full h-7"></div>
          <div className="rounded-md shadow-[0_0_0_4px_#DDE5ED] overflow-hidden relative z-header min-w-40 h-14.5 bg-white w-3xl flex justify-between items-center p-2.5">
            <Image
              src={headers?.logo.src}
              alt={headers?.logo.alt}
              width={170}
              height={35}
            />

            {headers?.navBar.active && (
              <DesktopNavBar navLinks={headers?.navBar.links || []} />
            )}

            <div className="flex items-center justify-between gap-2">
              {/* {headers?.buttons &&
                headers?.buttons?.length > 0 &&
                headers?.buttons?.map((btn, index) => {
                  return ( */}
              <Button
                variant="outline"
                className="bg-white border border-[#E5E7EB] w-23 rounded-2xl cursor-pointer"
              >
                Login
              </Button>

              <Button className="group overflow-hidden cursor-pointer flex items-center justify-center w-fit h-fit rounded-full text-white bg-linear-to-br from-[#637696] via-[#5A7AAD] via-20% to-[#2D4A7A]">
                Start Free
                <div className="transition-transform group-hover:animate-roll-right bg-white text-black text-body-xs justify-self-end flex items-center justify-center rounded-full size-5.5">
                  <ArrowRight />
                </div>
              </Button>
              {/* );
                })} */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
