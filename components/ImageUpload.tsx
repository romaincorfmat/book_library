"use client";

import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import Image from "next/image";
import React, { useRef, useState } from "react";

import { useToast } from "@/hooks/use-toast";
import config from "@/lib/config";

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`,
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;

    return {
      token,
      expire,
      signature,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Authentication request failed : ${error.message}`);
    } else {
      throw new Error("Authentication request failed");
    }
  }
};

const {
  env: {
    imageKit: { publicKey, urlEndpoint },
  },
} = config;

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {
  const { toast } = useToast();
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onError = (error: unknown) => {
    console.error("Upload failed", error);
    toast({
      title: "Fail to upload file ",
      description: `Your image could not be uploaded. Please try again.`,
    });
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    toast({
      title: "File uploaded successfully",
      description: `${res.filePath} uploaded successfully!`,
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
        fileName="test-upload.jpg"
      />
      <button
        className="upload-btn"
        onClick={(e) => {
          e.preventDefault();
          if (ikUploadRef.current) {
            // @ts-expect-error - ikUploadRef is not null
            ikUploadRef.current?.click();
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload icon"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className="text-base text-light-100">Upload a file</p>
        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>
      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={500}
        />
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
