'use client';

import config from '@/lib/config';
import { IKImage, ImageKitProvider, IKUpload } from 'imagekitio-next';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { toast } from 'sonner';

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request failed with sattus ${response.status}: ${errorText}`,
      );
    }

    const data = await response.json();

    const { signature, expire, token } = data;

    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(`Authencation request failed: ${error.message}`);
  }
};

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onError = (error: any) => {
    console.log(error);

    toast.error('Image upload failed', {
      description: 'Your image could not be uploaded. Please try again.',
      icon: '🚫',
      position: 'top-center',
    });
  };

  const onSuccess = (res: { filePath: string }) => {
    setFile(res);
    onFileChange(res.filePath);
    toast.success('Image uploaded successfully', {
      icon: '🚀',
      position: 'top-center',
      description: `${res.filePath} uploaded successfully`,
    });
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        ref={ikUploadRef}
        className="hidden"
        onError={onError}
        onSuccess={onSuccess}
        fileName="text-upload.png"
      />
      <button
        className="upload-btn"
        onClick={(e) => {
          e.preventDefault();
          if (ikUploadRef.current) {
            (ikUploadRef.current as HTMLElement).click();
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload"
          width={20}
          height={20}
          className="object-contain"
        />
        <p>Upload a File</p>

        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>
      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={300}
        />
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
