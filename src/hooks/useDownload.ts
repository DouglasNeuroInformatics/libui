import { useEffect, useState } from 'react';

import type { Promisable } from 'type-fest';

import { useNotificationsStore } from './useNotificationsStore';

/**
 * Used to trigger downloads of arbitrary data to the client
 * @returns A function to invoke the download
 */
export function useDownload() {
  const notifications = useNotificationsStore();
  const [data, setData] = useState<null | Object>(null);
  const [filename, setFilename] = useState<null | string>(null);

  useEffect(() => {
    if (data && filename) {
      const anchor = document.createElement('a');
      document.body.appendChild(anchor);

      let blobType = 'text/plain';
      let blob = new Blob();
      if (filename.includes('png')) {
        blobType = 'image/png';
        const blobData = data as Blob;
        blob = new Blob([blobData], { type: blobType });
      } else {
        const blobData = data.toString();
        blob = new Blob([blobData], { type: blobType });
      }

      const url = URL.createObjectURL(blob);
      anchor.href = url;
      anchor.download = filename;
      anchor.click();
      URL.revokeObjectURL(url);
      anchor.remove();
      setData(null);
      setFilename(null);
    }
  }, [data, filename]);

  return async (filename: string, fetchData: () => Promisable<Object>) => {
    try {
      const data = await fetchData();
      if (data instanceof String) {
        setData(data.toString);
      } else {
        setData(data as Blob);
      }
      setFilename(filename);
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
