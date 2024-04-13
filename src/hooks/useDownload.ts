import { useEffect, useState } from 'react';

import type { Promisable } from 'type-fest';

import { useNotificationsStore } from './useNotificationsStore.js';

type DownloadOptions<T extends Blob | string = Blob | string> = T extends Blob
  ? { blobType: 'image/png' }
  : { blobType: 'text/csv' | 'text/plain' };

/**
 * Used to trigger downloads of arbitrary data to the client
 * @returns A function to invoke the download
 */
export function useDownload() {
  const notifications = useNotificationsStore();
  const [state, setState] = useState<{
    blobType: DownloadOptions['blobType'];
    data: Blob | string;
    filename: string;
  } | null>(null);

  useEffect(() => {
    if (state) {
      const { blobType, data, filename } = state;
      const anchor = document.createElement('a');
      document.body.appendChild(anchor);

      const blob = new Blob([data], { type: blobType });

      const url = URL.createObjectURL(blob);
      anchor.href = url;
      anchor.download = filename;
      anchor.click();
      URL.revokeObjectURL(url);
      anchor.remove();
      setState(null);
    }
  }, [state]);

  return async <T extends Blob | string>(
    filename: string,
    fetchData: () => Promisable<T>,
    options?: DownloadOptions<T>
  ) => {
    try {
      const data = await fetchData();
      if (typeof data !== 'string' && !options?.blobType) {
        throw new Error("argument 'blobType' must be defined when download is called with a Blob object");
      }
      setState({ blobType: options?.blobType ?? 'text/plain', data, filename });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      notifications.addNotification({
        message,
        title: 'Error',
        type: 'error'
      });
    }
  };
}
