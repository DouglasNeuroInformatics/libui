import { useContext, useEffect, useRef } from 'react';

import { useStore } from 'zustand';
import { useStoreWithEqualityFn } from 'zustand/traditional';

import { MEMOIZED_HANDLE_ID } from './constants';
import { DataTableContext } from './context';

import type { DataTableStore } from './types';

export function useContainerRef() {
  const containerRef = useRef<HTMLDivElement>(null);
  const setContainerWidth = useDataTableStore((state) => state.setContainerWidth);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let delay = 0;

    const observer = new ResizeObserver(([entry]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        delay = 100;
        if (entry?.contentBoxSize[0]?.inlineSize) {
          const containerWidth = entry.contentBoxSize[0].inlineSize;
          setContainerWidth(containerWidth);
        }
      }, delay);
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  return containerRef;
}

export function useDataTableStore<T>(selector: (state: DataTableStore) => T) {
  const context = useContext(DataTableContext);
  return useStore(context.store, selector);
}

export function useDataTableHandle<TKey extends keyof DataTableStore['$handles']>(key: TKey, forceRender = false) {
  const context = useContext(DataTableContext);
  const { handle } = useStoreWithEqualityFn(
    context.store,
    // the function is already updated by the time of equality check, so we cache it here
    (store) => ({
      globalKey: store._key,
      handle: store.$handles[key],
      handleKey: store.$handles[key][MEMOIZED_HANDLE_ID]
    }),
    forceRender ? (a, b) => a.globalKey === b.globalKey : (a, b) => a.handleKey === b.handleKey
  );
  return handle();
}
