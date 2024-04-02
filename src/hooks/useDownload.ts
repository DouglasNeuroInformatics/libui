import { useEffect, useState } from 'react';

import type { Promisable } from 'type-fest';

import { useNotificationsStore } from './useNotificationsStore';

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
    options: DownloadOptions<T>
  ) => {
    try {
      const data = await fetchData();
      setState({ blobType: options.blobType, data, filename });
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
