import React from "react";
import SvgIcons from "../common/SvgIcons";
import {
  ICONS_NAMES,
  IMAGES_LINK,
  PROFILE_IMAGES,
  USER_INFO_CARD_DATA,
} from "@/constants";
import Image from "next/image";
import { CircularProgress } from "../common/CircularProgress";
import AktivGroteskText from "../common/AktivGroteskText";
import UserInfoCard from "../common/UserInfoCard";
import { useRouter } from "next/navigation";

const ProfileCard = () => {
  const router = useRouter();
  return (
    <div className="relative w-full rounded-[10px]  bg-white md:rounded-[20px]">
      <div className="w-full h-[135px] md:h-[210px] flex flex-col items-center justify-center">
        <div className="md:hidden">
          <CircularProgress value={30}>
            <div className="text-sm w-[90%] h-[90%] rounded-full font-medium bg-[#11A64B] text-gray-700">
              <Image
                className="w-full h-full"
                src={PROFILE_IMAGES?.[0]?.imageURL}
                alt="profile-badge"
                width={32}
                height={32}
              />
            </div>
          </CircularProgress>
        </div>
        <div className="hidden md:block">
          <CircularProgress size={148} value={30}>
            <div className="text-sm w-[90%] h-[90%] rounded-full font-medium bg-[#11A64B] text-gray-700">
              <Image
                className="w-full h-full"
                src={PROFILE_IMAGES?.[0]?.imageURL}
                alt="profile-badge"
                width={32}
                height={32}
              />
            </div>
          </CircularProgress>
        </div>
      </div>
      <div className="relative h-[23px] md:h-fit flex justify-center">
        <AktivGroteskText
          text="Kartikeya Rai"
          fontSize="text-[16px] md:text-[28px]"
          fontWeight="font-[700]"
        />
        <button
          onClick={() => {
            router.push("/my-profile/1");
          }}
          className="absolute bottom-[5px] md:bottom-[12px] right-[8px] md:right-[33px] outline-none border-none"
        >
          <SvgIcons
            className=" w-[11.97px] h-[14px] md:w-[20px] md:h-[23px]"
            name={ICONS_NAMES.PENCIL}
          />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2 md:gap-[28px] md:gap-x-[9rem] lg:gap-x-[20rem] gap-x-0 px-[16px] md:px-[66px] pt-[16px] md:pt-[66px] pb-[10px] md:pb-[44px] w-full">
        {USER_INFO_CARD_DATA?.length > 0 &&
          USER_INFO_CARD_DATA?.map((item) => (
            <UserInfoCard
              iconClassName="w-[14px] h-[14px] md:min-w-[29px] md:min-h-[29px]"
              key={item?.id}
              iconName={item?.iconName}
              text={item?.text}
            />
          ))}
      </div>
    </div>
  );
};

export default ProfileCard;
