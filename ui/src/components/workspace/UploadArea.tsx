import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Loader2 } from 'lucide-react';
import { uploadVersion } from '../../api/client';

interface UploadAreaProps {
  workspaceName: string;
  onUploadComplete: () => void;
}

export const UploadArea: React.FC<UploadAreaProps> = ({ workspaceName, onUploadComplete }) => {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!workspaceName || acceptedFiles.length === 0) return;

    setIsUploading(true);
    try {
      // Send all files at once to support split archives
      await uploadVersion(workspaceName, acceptedFiles);
      onUploadComplete();
    } catch (error) {
      console.error('Failed to upload file', error);
    } finally {
      setIsUploading(false);
    }
  }, [workspaceName, onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}
        ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <input {...getInputProps()} disabled={isUploading} />
      {isUploading ? (
        <Loader2 className="mx-auto h-12 w-12 text-indigo-500 animate-spin" />
      ) : (
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
      )}
      <p className="mt-2 text-sm text-gray-600">
        {isUploading ? 'Uploading...' : 'Drag & drop support bundle here, or click to select files'}
      </p>
    </div>
  );
};
