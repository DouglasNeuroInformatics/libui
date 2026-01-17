import { useCallback } from 'react';

import { UploadIcon } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import type { FileRejection } from 'react-dropzone';

import { useTranslation } from '#hooks';
import { cn } from '#utils';

export type FileDropzoneProps = {
  acceptedFileTypes: {
    [key: string]: string[];
  };
  className?: string;
  description?: string;
  file: File | null;
  setFile: (file: File) => void;
  titles?: {
    dragActive: string;
    dragInactive: string;
  };
};

export const FileDropzone = ({
  acceptedFileTypes,
  className,
  description,
  file,
  setFile,
  titles
}: FileDropzoneProps) => {
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

  const dragActiveTitle =
    titles?.dragActive ??
    t({
      en: 'File to upload',
      fr: 'fichier à télécharger'
    });

  const dragInactiveTitle =
    titles?.dragInactive ??
    t({
      en: 'Drag and drop files or click on box to upload',
      fr: 'Glissez-déposez les fichiers ou cliquez sur la case pour les télécharger'
    });

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-md border border-dashed border-slate-400 p-4 dark:border-slate-600',
        className
      )}
      data-testid="dropzone"
      {...getRootProps()}
    >
      <div className="flex flex-col items-center justify-center gap-3">
        <UploadIcon style={{ height: 24, strokeWidth: 2, width: 24 }} />
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-lg font-semibold tracking-tight" data-testid="dropzone-title">
            {file ? file.name : isDragActive ? dragActiveTitle : dragInactiveTitle}
          </h3>
          {description && <p className="text-muted-foreground text-sm">{description}</p>}
        </div>
      </div>
      <input {...getInputProps()} />
    </div>
  );
};
