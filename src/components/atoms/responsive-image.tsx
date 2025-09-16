"use client";
import Image from "next/image";
import { useState } from "react";

export default function ResponsiveImage({
  url,
  className = "",
  unoptimized,
  alt = "Image",
}: {
  url: string;
  className?: string;
  unoptimized?: boolean;
  alt?: string;
}) {
  const [error, setError] = useState(false);

  const handleError = (e: any) => {
    setError(true);
  };

  if (error) {
    return (
      <div
        className={`relative w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 ${className}`}
      >
        <div className="text-center p-4">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white flex items-center justify-center shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-purple-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-gray-700">
            Image are broken
          </h3>
          <p className="mt-1 text-xs text-gray-500">{alt}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      <Image
        src={url}
        alt={alt}
        className="object-cover pointer-events-none"
        width={400}
        height={600}
        unoptimized={unoptimized}
        style={{
          maxHeight: "100%",
          width: "auto",
        }}
        onError={handleError}
      />
    </div>
  );
}
