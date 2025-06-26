import React from "react";
import Image from "next/image";

interface UgcPageLoaderProps {
  isVisible: boolean;
}

const UgcPageLoader: React.FC<UgcPageLoaderProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30">
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/videos/loading.gif"
          alt="loader"
          width={200}
          height={200}
          unoptimized
        />
      </div>
    </div>
  );
};

export default UgcPageLoader;
