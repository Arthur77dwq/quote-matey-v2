import Image from 'next/image';
import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Comparison } from '@/types/pages';

import { Icon } from './icon';
import { Description, Title } from './section-header';
import { Card, CardContent } from './ui/card';

export function ComparisonCard({
  comparison,
  className,
  active,
  setActive,
}: {
  className?: string;
  comparison: Comparison[];
  active: string;
  setActive: (x: string) => void;
}) {
  const mid = Math.floor(comparison.length / 2);
  return (
    <Tabs
      onValueChange={(value) => setActive(value)}
      defaultValue={comparison[0].id}
      className={cn(
        'flex flex-col justify-center items-center h-fit shadow-none border-none',
        className,
      )}
    >
      <TabsList>
        {comparison.map((each, index: number) => {
          return (
            <React.Fragment key={index}>
              <TabsTrigger
                className="border-none shadow-none!"
                value={each.id}
                // disabled
              >
                {each.head && (
                  <Description
                    className="text-neutral-900 leading-23 lg:text-[1rem]"
                    description={each.head}
                  />
                )}
              </TabsTrigger>
              {mid - 1 === index && (
                <div className="size-fit">
                  <Image
                    src={
                      active === '2'
                        ? '/images/dialOpen.png'
                        : '/images/dialClose.png'
                    }
                    alt=""
                    width={50}
                    height={50}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </TabsList>
      {comparison.map((each, index: number) => {
        return (
          <TabsContent key={index} value={each.id}>
            <div className="flex justify-center w-full h-full">
              <div className="w-1/2 flex flex-col items-start">
                {each.title && (
                  <Title
                    className="leading-23 lg:text-[2rem]"
                    title={each.title}
                  />
                )}
                <div className="flex w-full">
                  {each.icon?.active && (
                    <Icon
                      style={{ color: each.icon.color }}
                      name={each.icon.icon || ''}
                    />
                  )}
                  {each.description && (
                    <Description
                      className="text-left"
                      description={each.description}
                    />
                  )}
                </div>
              </div>
              <div className="flex flex-col items-start gap-7.5 w-1/2">
                {each.content?.map(
                  (data, i) =>
                    data.type === 'STATS' &&
                    data.data.map((stat, z) => (
                      <Card key={i + z} className="w-full">
                        <CardContent className="flex flex-col">
                          <div className="w-full">{stat.stat}</div>
                          <div className="w-full">{stat.text}</div>
                        </CardContent>
                      </Card>
                    )),
                )}
              </div>
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
