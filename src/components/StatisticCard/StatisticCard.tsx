import { useEffect } from 'react';
import type { ReactElement } from 'react';

import { motion, useSpring, useTransform } from 'motion/react';

import { cn } from '@/utils';

import { Card } from '../Card';

type StatisticCardProps = {
  [key: `data-${string}`]: unknown;
  className?: string;
  icon?: ReactElement;
  label: string;
  value: number;
};

export const StatisticCard = ({ className, icon, label, value, ...props }: StatisticCardProps) => {
  const spring = useSpring(0, { bounce: 0 });
  const rounded = useTransform(spring, (latest: number) => Math.floor(latest));

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <Card className={cn('flex w-full rounded-lg p-4', className)} {...props}>
      {icon && <div className="mr-2 flex items-center justify-center text-4xl">{icon}</div>}
      <div className="w-full text-center">
        <motion.h3 className="title-font text-2xl font-semibold text-slate-900 dark:text-slate-100 sm:text-3xl">
          {rounded}
        </motion.h3>
        <p className="font-medium leading-relaxed">{label}</p>
      </div>
    </Card>
  );
};
