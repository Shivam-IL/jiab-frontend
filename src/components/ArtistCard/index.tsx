import { IArtistCard } from "@/interfaces";
import React from "react";
import AktivGroteskText from "../common/AktivGroteskText";
import GreenCTA from "../GreenCTA";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ArtistCard: React.FC<IArtistCard> = ({
  image,
  name,
  followers,
  artistId,
}) => {
  const router = useRouter();

  return (
    <div
      className={`w-full cursor-pointer flex flex-col justify-center items-center gap-[12px] rounded-[5px]`}
    >
      <div
        onClick={() => {
          router.push(`/artists/${artistId}`);
        }}
        className="w-full h-full relative bg-[#11A64B] rounded-[5px] border-[5px] border-white"
      >
        <Image className="w-full h-full object-cover" src={image} alt={name} />
      </div>
      <div className="flex flex-col items-center gap-[6px]">
        <AktivGroteskText
          className="text-center"
          text={name}
          fontSize="text-[10px] md:text-[20px]"
          fontWeight="font-[700]"
        />
        <AktivGroteskText
          text={`${followers} Followers`}
          fontSize="text-[8px] md:text-[16px]"
          fontWeight="font-[400]"
        />
      </div>
      <GreenCTA
        className="w-auto"
        fontSize="text-[8px] md:text-[18px]"
        fontWeight="font-[700]"
        paddingClass="px-[20px] py-[6px] md:px-[36px] md:py-[12px]"
        onClick={() => {}}
        text="Follow"
      />
    </div>
  );
};

export default ArtistCard;
