import React, { useEffect, useReducer, useRef, useState } from 'react';

import clsx from 'clsx';

import { LegacyStepperContext } from '@/context/LegacyStepperContext';
import { useWindowSize } from '@/hooks/useWindowSize';
import { cn } from '@/utils';

/** @deprecated */
export type Step = {
  element: React.ReactElement;
  icon: React.ReactElement;
  label: string;
};

/** @deprecated */
export type LegacyStepperProps = {
  className?: string;
  steps: Step[];
};

/** @deprecated */
export const LegacyStepper = ({ className, steps }: LegacyStepperProps) => {
  const icons = useRef<HTMLDivElement[]>([]);
  const [divideStyles, setDivideStyles] = useState<React.CSSProperties[]>([]);
  const { height, width } = useWindowSize();

  useEffect(() => {
    const styles: React.CSSProperties[] = [];
    for (let i = 0; i < steps.length - 1; i++) {
      const current = icons.current[i];
      const next = icons.current[i + 1];
      const left = current.offsetLeft + current.offsetWidth;
      styles.push({
        left,
        width: next.offsetLeft - left
      });
    }
    setDivideStyles(styles);
  }, [height, width]);

  const [index, updateIndex] = useReducer((prevIndex: number, action: 'decrement' | 'increment') => {
    if (action === 'decrement' && prevIndex > 0) {
      return prevIndex - 1;
    } else if (action === 'increment' && prevIndex < steps.length - 1) {
      return prevIndex + 1;
    }
    return prevIndex;
  }, 0);

  return (
    <LegacyStepperContext.Provider value={{ index, updateIndex }}>
      <div className={cn('flex flex-col', className)}>
        <div className="relative mb-12 flex items-center justify-between print:hidden">
          {steps.map((step, i) => {
            return (
              <React.Fragment key={i}>
                <div className="flex items-center">
                  <div className="flex flex-col items-center justify-center">
                    <div
                      className={clsx(
                        'h-12 w-12 rounded-full bg-sky-700 py-3  text-white transition duration-500 ease-in-out [&>*]:h-full [&>*]:w-full',
                        i > index && 'bg-slate-200 dark:bg-slate-700'
                      )}
                      ref={(e) => {
                        icons.current[i] = e!;
                      }}
                    >
                      {step.icon}
                    </div>
                    <span className="mt-2 text-xs font-medium uppercase text-muted-foreground">{step.label}</span>
                  </div>
                </div>
                {i !== steps.length - 1 && (
                  <div
                    className={clsx(
                      'absolute top-6 flex-auto border-t-2 transition duration-500 ease-in-out',
                      i >= index ? 'border-slate-200 dark:border-slate-700' : 'border-sky-700'
                    )}
                    style={divideStyles[i]}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
        <div className="flex-grow">{steps[index]?.element}</div>
      </div>
    </LegacyStepperContext.Provider>
  );
};
