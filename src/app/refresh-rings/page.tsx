import ScreenWrapper from "@/components/common/ScreenWrapper";
import React from "react";
import Image from "next/image";
const RefreshRings = () => {
  return (
    <div className="bg-[url('/other-svgs/jiab-bg.svg')] bg-cover bg-center min-h-screen w-full flex justify-center items-center">
      <ScreenWrapper className="bg-transparent min-h-screen">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex flex-col items-center justify-center bg-white rounded-[16px] p-[6dvh]">
            <Image
              src="/other-svgs/scan-icon.svg"
              alt="Refresh Rings"
              width={55}
              height={45}
            />
            <p className="text-[18px] font-black text-black">Refresh Rings</p>
            <p className="text-[16px] text-black text-center mt-[10px] max-w-[250px]">
              Scan the nearest Refresh Rings QR code to unlock some exclusive
              content
            </p>
          </div>
        </div>
      </ScreenWrapper>
    </div>
  );
};

export default RefreshRings;
