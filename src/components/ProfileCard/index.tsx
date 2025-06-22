import React, { useEffect, useState } from "react";
import SvgIcons from "../common/SvgIcons";
import defaultProfile from "../../../public/profile-images/default-profile.svg";
import {
  ICONS_NAMES,
  LOCAL_IMAGES,
  USER_INFO_EMAIL_GENDER_ARRAY,
  USER_INFO_NUMBER_DATE_ARRAY,
} from "@/constants";
import Image from "next/image";
import { CircularProgress } from "../common/CircularProgress";
import AktivGroteskText from "../common/AktivGroteskText";
import UserInfoCard from "../common/UserInfoCard";
import { useRouter } from "next/navigation";
import { dateConvert, generateImageurl } from "@/utils";
import useWindowWidth from "@/hooks/useWindowWidth";
import useAppSelector from "@/hooks/useSelector";
import { User } from "@/store/profile/profile.slice";

interface InfoDataItem {
  id: number;
  type: string;
  iconName: string;
  text: string;
  visible: boolean;
}

const ProfileCard = () => {
  const router = useRouter();

  const width = useWindowWidth();
  const [numberDateArray, setNumberDateArray] = useState<InfoDataItem[]>([]);
  const [emailGenderArray, setEmailGenderArray] = useState<InfoDataItem[]>([]);

  const { user } = useAppSelector((state) => state.profile);
  const { name, profile_percentage, id, userImage } = user;

  const [bgImage, setBgImage] = useState<string>("");

  useEffect(() => {
    if (width < 768) {
      setBgImage(LOCAL_IMAGES.PROFILE_BG);
    } else {
      setBgImage(LOCAL_IMAGES.PROFILE_MD_BG);
    }
  }, [width]);

  // useEffect(() => {
  //   if (user && user?.id) {
  //     const newInfoData = USER_INFO_CARD_DATA.map(item => {
  //       const itemKey = item.type as keyof User
  //       const value = user[itemKey]
  //       if (value !== undefined && value !== null && value) {
  //         return {
  //           ...item,
  //           text:
  //             item.type === 'dob'
  //               ? dateConvert(value as string)
  //               : String(value),
  //           visible: true
  //         }
  //       }
  //       return { ...item, visible: false, text: '' }
  //     })
  //     setInfoData(newInfoData)
  //   }
  // }, [user])

  useEffect(() => {
    if (user && user?.id) {
      if (user && user?.id) {
        const modifiedNumberDateArray = USER_INFO_NUMBER_DATE_ARRAY?.map(
          (item) => {
            const itemKey = item.type as keyof User;
            const value = user[itemKey];
            if (value !== undefined && value !== null && value) {
              return {
                ...item,
                text:
                  item.type === "dob"
                    ? dateConvert(value as string)
                    : String(value),
                visible: true,
              };
            }
            return { ...item, visible: false, text: "" };
          }
        );
        setNumberDateArray(modifiedNumberDateArray);
      }
    }
    if (user && user?.id) {
      const modifiedEmailGenderArray = USER_INFO_EMAIL_GENDER_ARRAY?.map(
        (item) => {
          const itemKey = item.type as keyof User;
          const value = user[itemKey];
          if (value !== undefined && value !== null && value) {
            return {
              ...item,
              text: String(value),
              visible: true,
            };
          }
          return { ...item, visible: false, text: "" };
        }
      );
      setEmailGenderArray(modifiedEmailGenderArray);
    }
  }, [user]);

  const handleEditProfile = () => {
    if (id) {
      router.push(`/my-profile/${id}`);
    }
  };

  console.log(userImage, "userImage");

  return (
    <div className="relative w-full rounded-[10px]  bg-white md:rounded-[20px]">
      <div
        className="relative rounded-t-[10px] md:rounded-t-[20px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${generateImageurl(bgImage)})`,
        }}
      >
        <div
          className={`w-full h-[135px] md:h-[210px] flex flex-col items-center justify-center `}
        >
          <div className="md:hidden">
            <CircularProgress value={profile_percentage}>
              <div className="text-sm w-[90%] h-[90%] flex items-center justify-center rounded-full font-medium bg-[#11A64B] text-gray-700">
                {userImage ? (
                  <Image
                    className="w-[80%] rounded-full h-[80%]"
                    src={userImage}
                    alt="profile-badge"
                    width={32}
                    height={32}
                  />
                ) : (
                  <Image
                    width={32}
                    height={32}
                    src={defaultProfile}
                    alt="profile-badge"
                  />
                )}
              </div>
            </CircularProgress>
          </div>
          <div className="hidden md:block">
            <CircularProgress size={148} value={profile_percentage}>
              <div className="text-sm w-[90%] flex items-center justify-center h-[90%] rounded-full font-medium bg-[#11A64B] text-gray-700">
                {userImage ? (
                  <Image
                    className="w-[80%] rounded-full h-[80%]"
                    src={userImage}
                    alt="profile-badge"
                    width={60}
                    height={60}
                  />
                ) : (
                  <Image
                    width={60}
                    height={60}
                    src={defaultProfile}
                    alt="profile-badge"
                  />
                )}
              </div>
            </CircularProgress>
          </div>
        </div>
        <div className="relative h-[23px] md:h-fit flex justify-center">
          <AktivGroteskText
            text={name ?? ""}
            fontSize="text-[16px] md:text-[30px]"
            fontWeight="font-[700]"
          />
          <button
            onClick={handleEditProfile}
            className="absolute bottom-[5px] md:bottom-[12px] right-[8px] md:right-[33px] outline-none border-none"
          >
            <SvgIcons
              className=" w-[11.97px] h-[14px] md:w-[20px] md:h-[23px]"
              name={ICONS_NAMES.PENCIL}
            />
          </button>
        </div>
      </div>

      <div className="flex flex-row gap-2 justify-between gap-x-0 px-[16px] md:px-[66px] pt-[16px] md:pt-[66px] pb-[20px] md:pb-[32px] w-full">
        <div className="flex flex-col gap-[10px]">
          {numberDateArray?.length > 0 &&
            numberDateArray?.map((item, index) => {
              if (item?.visible) {
                return (
                  <UserInfoCard
                    index={index}
                    dataLength={numberDateArray?.length}
                    iconClassName="w-[14px] h-[14px] md:min-w-[29px] md:min-h-[29px]"
                    key={item?.id}
                    iconName={item?.iconName}
                    text={item?.text}
                  />
                );
              } else {
                return null;
              }
            })}
        </div>
        <div className="flex flex-col gap-[10px]">
          {emailGenderArray?.length > 0 &&
            emailGenderArray?.map((item, index) => {
              if (item?.visible) {
                return (
                  <UserInfoCard
                    index={index}
                    dataLength={emailGenderArray?.length}
                    iconClassName="w-[14px] h-[14px] md:min-w-[29px] md:min-h-[29px]"
                    key={item?.id}
                    iconName={item?.iconName}
                    text={item?.text}
                  />
                );
              } else {
                return null;
              }
            })}
        </div>
        {/* {infoData?.length > 0 &&
          infoData?.map((item, index) => {
            if (item?.visible) {
              return (
                <UserInfoCard
                  index={index}
                  dataLength={infoData?.length}
                  iconClassName='w-[14px] h-[14px] md:min-w-[29px] md:min-h-[29px]'
                  key={item?.id}
                  iconName={item?.iconName}
                  text={item?.text}
                />
              )
            } else {
              return null
            }
          })} */}
      </div>
    </div>
  );
};

export default ProfileCard;
