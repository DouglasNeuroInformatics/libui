import { useCallback } from 'react';

import { type FileRejection, useDropzone } from 'react-dropzone';

import { useTranslation } from '@/hooks/useTranslation';

export type FileDropzoneProps = {
  acceptedFileTypes: {
    [key: string]: string[];
  };
  file: File | null;
  setFile: (file: File) => void;
};

export const FileDropzone = ({ acceptedFileTypes, file, setFile }: FileDropzoneProps) => {
  const { t } = useTranslation();

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
    accept: acceptedFileTypes,
    maxFiles: 1,
    onDrop: handleDrop
  });

  return (
    <div data-testid="dropzone" {...getRootProps()}>
      <p className="mt-1 border border-dashed p-4 text-center text-sm" data-testid="dropzoneText">
        {file
          ? file.name
          : isDragActive
            ? t({
                en: 'File to upload',
                fr: 'fichier à télécharger'
              })
            : t({
                en: "Drag'n'drop files or click on box to upload",
                fr: 'Glissez-déposez les fichiers ou cliquez sur la case pour les télécharger'
              })}
      </p>

      <input {...getInputProps()} />
    </div>
  );
};
