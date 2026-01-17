import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { FileDropzone } from './FileDropzone.tsx';

describe('FileDropzone', () => {
  const testfile = new File([new Blob()], 'testfile.csv');
  it('should render', () => {
    render(
      <FileDropzone
        acceptedFileTypes={{
          'text/csv': ['.csv'],
          'text/plain': ['.csv', '.tsv']
        }}
        file={null}
        setFile={function (file: File): void {
          throw new Error('Function not implemented. File name is ' + file.name);
        }}
      />
    );
    expect(screen.getByTestId('dropzone-title')).contains(String, 'Drag and drop files or click on box to upload');
  });

  it('should have file', () => {
    render(
      <FileDropzone
        acceptedFileTypes={{
          'text/csv': ['.csv'],
          'text/plain': ['.csv', '.tsv']
        }}
        file={testfile}
        setFile={function (file: File): void {
          throw new Error('Function not implemented. File name is ' + file.name);
        }}
      />
    );
    expect(screen.getByText('testfile.csv')).toBeInTheDocument();
  });
  it('drag active should work', () => {
    render(
      <FileDropzone
        acceptedFileTypes={{
          'text/csv': ['.csv'],
          'text/plain': ['.csv', '.tsv']
        }}
        file={null}
        setFile={function (file: File): void {
          throw new Error('Function not implemented. File name is ' + file.name);
        }}
      />
    );

    const fileDropzoneElement = screen.getByTestId('dropzone');

    fireEvent.dragOver(fileDropzoneElement, {
      dataTransfer: {
        files: [testfile]
      }
    });

    fireEvent.drop(fileDropzoneElement, {
      dataTransfer: {
        files: [testfile]
      }
    });

    expect(screen.getByTestId('dropzone-title')).contain(String, 'testfile.csv');
  });
});
