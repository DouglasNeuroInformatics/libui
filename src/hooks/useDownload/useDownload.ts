import { useEffect, useState } from 'react';

import type { Promisable } from 'type-fest';

import { useNotificationsStore } from '../useNotificationsStore';

type DownloadTextOptions = {
  blobType: 'text/csv' | 'text/plain';
};

type DownloadBlobOptions = {
  blobType: 'application/zip' | 'image/jpeg' | 'image/png' | 'image/webp';
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface DownloadFunction {
  (filename: string, data: Blob, options: DownloadBlobOptions): Promise<void>;
  (filename: string, data: () => Promisable<Blob>, options: DownloadBlobOptions): Promise<void>;
  (filename: string, data: string, options?: DownloadTextOptions): Promise<void>;
  (filename: string, data: () => Promisable<string>, options?: DownloadTextOptions): Promise<void>;
}

type Downloadable = {
  blobType: string;
  data: Blob | string;
  filename: string;
  id: string;
};

/**
 * Used to trigger downloads of arbitrary data to the client
 * @returns A function to invoke the download
 */
export function useDownload(): DownloadFunction {
  const notifications = useNotificationsStore();
  const [downloads, setDownloads] = useState<Downloadable[]>([]);

  useEffect(() => {
    if (downloads.length) {
      const { blobType, data, filename, id } = downloads.at(-1)!;
      const anchor = document.createElement('a');
      document.body.appendChild(anchor);
      const blob = new Blob([data], { type: blobType });
      const url = URL.createObjectURL(blob);
      anchor.href = url;
      anchor.download = filename;
      anchor.click();
      URL.revokeObjectURL(url);
      anchor.remove();
      setDownloads((prevDownloads) => prevDownloads.filter((item) => item.id !== id));
    }
  }, [downloads]);

  return async (filename, _data, options) => {
    try {
      const data = typeof _data === 'function' ? await _data() : _data;
      if (typeof data !== 'string' && !options?.blobType) {
        throw new Error("argument 'blobType' must be defined when download is called with a Blob object");
      }
      setDownloads((prevDownloads) => [
        ...prevDownloads,
        { blobType: options?.blobType ?? 'text/plain', data, filename, id: crypto.randomUUID() }
      ]);
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
