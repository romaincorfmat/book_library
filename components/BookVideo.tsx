"use client";

import { IKVideo, ImageKitProvider } from "imagekitio-next";
import React from "react";

import config from "@/lib/config";

const BookVideo = ({ videoUrl }: { videoUrl: string }) => {
  return (
    <ImageKitProvider
      publicKey={config.env.imageKit.publicKey}
      urlEndpoint={config.env.imageKit.urlEndpoint}
    >
      <IKVideo path={videoUrl} controls={true} className="w-full rounded-sm" />
    </ImageKitProvider>
  );
};

export default BookVideo;
