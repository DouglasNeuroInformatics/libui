import { forwardRef } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { range } from 'lodash-es';

import { useTranslation } from '@/hooks';

export const CALENDAR_ANIMATION_DURATION = 0.2; // seconds

export type CalendarProps = {
  month: number;
  onSelection: (date: Date) => void;
  year: number;
};

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(function Calendar(props, ref) {
  const { t } = useTranslation('libui');
  const firstDay = new Date(props.year, props.month).getDay();
  const lastDay = new Date(props.year, props.month + 1, 0).getDate();
  const days = range(1, lastDay + 1);

  const daysOfWeek = [
    t('days.sunday'),
    t('days.monday'),
    t('days.tuesday'),
    t('days.wednesday'),
    t('days.thursday'),
    t('days.friday'),
    t('days.saturday')
  ];

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        initial={{ opacity: 0, x: 20 }}
        key={`${props.year}-${props.month}`}
        transition={{ duration: CALENDAR_ANIMATION_DURATION }}
      >
        <div className="grid h-56 w-56 grid-cols-7 text-sm" ref={ref}>
          {daysOfWeek.map((label) => (
            <div className="flex h-8 w-8 items-center justify-center text-muted-foreground" key={label}>
              {label.charAt(0).toUpperCase()}
            </div>
          ))}
          <div style={{ gridColumn: `span ${firstDay} / span ${firstDay}` }} />
          {days.map((day) => (
            <button
              className="dark:hover:bg-extra-muted flex h-8 w-8 items-center justify-center rounded-md hover:bg-slate-200 dark:hover:bg-slate-700"
              key={day}
              tabIndex={-1}
              type="button"
              onClick={() => {
                props.onSelection(new Date(props.year, props.month, day));
              }}
            >
              {day}
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
});
