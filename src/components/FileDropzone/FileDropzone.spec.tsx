import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { FileDropzone } from './FileDropzone';

describe('FileDropzone', () => {
  const testfile = new File([new Blob()], 'testfile.csv');
  it('should render', () => {
    render(
      <FileDropzone
        file={null}
        setFile={function (file: File): void {
          throw new Error('Function not implemented. File name is ' + file.name);
        }}
      />
    );
    expect(screen.getByTestId('dropzoneText')).contains(String, "Drag'n'drop files or click on box to upload");
  });

  it('should have file', () => {
    render(
      <FileDropzone
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

    expect(screen.getByTestId('dropzoneText')).contain(String, 'testfile.csv');
  });
});
