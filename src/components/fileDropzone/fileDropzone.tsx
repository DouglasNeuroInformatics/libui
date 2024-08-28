import React, { useCallback } from 'react';

import { type FileRejection, useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';

export type fileDropzoneProps = {
  file: File | null;
  setFile: (file: File) => void;
};

export const fileDropzone = ({ file, setFile }: fileDropzoneProps) => {
  const { t } = useTranslation('libui');

  const handleDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      for (const { errors, file } of rejectedFiles) {
        console.error(errors, file);
      }
      setFile(acceptedFiles[0]!);
    },
    [setFile]
  );
  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    accept: {
      'text/csv': ['.csv'],
      'text/plain': ['.csv', '.tsv']
    },
    maxFiles: 1,
    onDrop: handleDrop
  });

  return (
    <div {...getRootProps()}>
      <p className="mt-1 border border-dashed p-4 text-center text-sm">
        {file ? file.name : isDragActive ? t('fileDropzone.fileToUpload') : t('fileDropzone.dropHere')}
      </p>

      <input {...getInputProps()} />
    </div>
  );
};
