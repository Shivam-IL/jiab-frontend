"use client";

import { useEditUserProfileDetails } from "@/api/hooks/ProfileHooks";
import AktivGroteskText from "@/components/common/AktivGroteskText";
import MobileTempNavBar from "@/components/common/MobileTempNavBar";
import ScreenWrapper from "@/components/common/ScreenWrapper";
import EditProfileImage from "@/components/EditProfileImage";
import GreenCTA from "@/components/GreenCTA";
import Input from "@/components/Input";
import { IAvatarsData, updateUser } from "@/store/profile/profile.slice";
import useAppSelector from "@/hooks/useSelector";
import useWindowWidth from "@/hooks/useWindowWidth";
import { newDayMonthYearConvert } from "@/utils";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import useAppDispatch from "@/hooks/useDispatch";
import { useSendCDPEvent } from "@/api/hooks/CDPHooks";

import {
  CDPEventPayloadBuilder,
  ProfileCDPEventPayload,
} from "@/api/utils/cdpEvents";
import { useCMSData } from "@/data";

interface IUserData {
  avatar_id: number;
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
}

interface IErrors {
  name: string;
  dob: string;
  email: string;
}

const EditProfilePage = () => {
  const [mounted, setMounted] = useState(false);
  const cmsData = useCMSData(mounted);
  useEffect(() => {
    setMounted(true);
  }, []);
  const width = useWindowWidth();
  const params = useParams();
  const dispatch = useAppDispatch();
  const {
    mutate: editUserProfileDetails,
    isPending,
    data: editUserProfileDetailsData,
  } = useEditUserProfileDetails();

  const [editProfileImage, setEditProfileImage] = useState<boolean>(false);
  const { user, avatarsData } = useAppSelector((state) => state.profile);
  const [currentImage, setCurrentImage] = useState<string>("");
  const [userData, setUserData] = useState<IUserData>({
    avatar_id: 0,
    name: "",
    email: "",
    phone: "+91-8989898989",
    dob: "",
    gender: "",
  });
  const router = useRouter();

  const [errors, setErrors] = useState<IErrors>({
    name: "",
    dob: "",
    email: "",
  });
  const { mutate: sendCDPEvent } = useSendCDPEvent();

  const validateName = (name: string) => {
    if (!name.trim()) {
      return cmsData.validation.signupNameIsRequired;
    }
    if (name.length < 2) {
      return cmsData.validation.signupNameTwoCharLong;
    }
    if (!/^[^\d!@#$%^&*()_+\-=\[\]{}|;':",./<>?\\]+$/.test(name)) {
      return cmsData.validation.signupNameContainAlphabet;
    }
    return "";
  };

  const validateEmail = (email: string) => {
    if (!email) {
      return "Email is required";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return cmsData.validation.profileEditProfileInvalidEmail;
    }
    return "";
  };

  const validateDOB = (dob: string) => {
    if (!dob) {
      return "";
    }
    const [day, month, year] = dob.split("/");
    const dobDate = new Date(Number(year), Number(month) - 1, Number(day));
    console.log(dobDate, "dobDate");
    const today = new Date();
    const minAge = 18; // Minimum age requirement

    // Calculate age
    let age = today.getFullYear() - dobDate.getFullYear();
    console.log(age, "age");
    const monthDiff = today.getMonth() - dobDate.getMonth();
    console.log(monthDiff, "monthDiff");
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < dobDate.getDate())
    ) {
      age--;
    }

    if (dobDate > today) {
      return cmsData.validation.dateOfBirthInFutureError;
    }

    if (age < minAge) {
      return cmsData.validation.editProfileAgeValidation;
    }
    return "";
  };

  useEffect(() => {
    if (userData.dob) {
      setErrors((prev) => ({ ...prev, dob: validateDOB(userData.dob) }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.dob]);

  // const validateGender = (gender: string) => {
  //   if (!gender) {
  //     return 'Gender is required'
  //   }
  //   return ''
  // }

  const handleChange = (key: string, value: string) => {
    setUserData((prev) => ({ ...prev, [key]: value }));

    // Validate the changed field
    switch (key) {
      case "name":
        setErrors((prev) => ({ ...prev, name: validateName(value) }));
        break;
    }
  };

  useEffect(() => {
    const currentImage = avatarsData?.find(
      (item: IAvatarsData) =>
        item?.id.toString() === userData?.avatar_id.toString()
    );
    setCurrentImage(currentImage?.image ?? "");
  }, [userData?.avatar_id, avatarsData]);

  const handleContainerClick = () => {
    if (editProfileImage) {
      setEditProfileImage(false);
    }
  };

  useEffect(() => {
    if (user?.id !== params?.userId) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, params?.userId]);

  const convertDateToDdMmYyyy = (date: string) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    const newDay = day < 10 ? `0${day}` : day;
    const newMonth = month < 10 ? `0${month}` : month;
    return `${newDay}/${newMonth}/${year}`;
  };

  const trigger_CDP_EDIT_PROFILE = useCallback(
    (name: string, dob: string, email: string, gender: number) => {
      if ((name || dob || email || gender) && user?.id) {
        let genderValue = "";
        if (gender === 1) {
          genderValue = "M";
        } else if (gender === 2) {
          genderValue = "F";
        } else if (gender === 3) {
          genderValue = "O";
        } else if (gender === 4) {
          genderValue = "P";
        }
        const payload: ProfileCDPEventPayload =
          CDPEventPayloadBuilder.buildEditProfilePayload({
            first_name: name ?? "",
            email: email,
            dob: dob && dob !== "" ? convertDateToDdMmYyyy(dob) : "",
            gender: genderValue,
            user_identifier: user.id ?? "",
          });
        sendCDPEvent(payload);
      }
    },
    [user?.id, sendCDPEvent]
  );

  useEffect(() => {
    if (user?.id === params?.userId) {
      const { name, email, phone_number, dob, gender } = user;
      const currentImage = avatarsData?.find(
        (item: IAvatarsData) => item?.id === user?.avatar_id
      );
      let genderNew = gender;
      if (gender === "Prefer not to say") {
        genderNew = "perfer_not_to_say";
      }
      setCurrentImage(currentImage?.image ?? "");
      setUserData({
        avatar_id: 0,
        name: name,
        email: email,
        phone: phone_number,
        dob: dob ? dob : "",
        gender: genderNew,
      });
    }
  }, [user, params?.userId, avatarsData]);

  console.log(userData, "userData");

  const isFormValid = () => {
    const nameError = validateName(userData.name);
    let dobError = "";
    let emailError = "";
    if (userData.dob) {
      dobError = validateDOB(userData.dob);
    }
    if (userData.email) {
      emailError = validateEmail(userData.email);
    }

    setErrors((prev) => ({
      ...prev,
      name: nameError,
      dob: dobError,
      email: emailError,
    }));

    return !nameError && !dobError && !emailError;
  };

  const submitHandler = () => {
    if (isFormValid()) {
      const { name, dob, gender, avatar_id, email } = userData;
      let newdate = dob;
      if (dob?.includes("T")) {
        const dateArr = dob.split("T");
        const dateStr = dateArr[0];
        const [year, month, day] = dateStr.split("-");
        newdate = `${day}/${month}/${year}`;
      }
      const payload = {
        name,
        dob: newdate ? newDayMonthYearConvert(newdate) : "",
        email,
        gender,
        avatar_id,
      };
      console.log(payload, "payload");
      editUserProfileDetails(payload);
    }
  };

  const [generalError, setGeneralError] = useState<string>("");

  useEffect(() => {
    if (editUserProfileDetailsData?.ok) {
      const { data } = editUserProfileDetailsData?.data ?? {};
      dispatch(updateUser({ user: { ...data } }));
      if (trigger_CDP_EDIT_PROFILE) {
        trigger_CDP_EDIT_PROFILE(
          data?.name,
          data?.dob,
          data?.email,
          data?.gender
        );
      }
      router.push("/profile");
    } else if (editUserProfileDetailsData?.ok === false) {
      const message =
        (editUserProfileDetailsData as { message?: string })?.message ||
        "Something went wrong";

      // Map specific error messages to CMS data
      if (message === "Email already in use") {
        setGeneralError(
          cmsData.validation.profileEditProfileEmailAlreadyInUsed
        );
      } else {
        setGeneralError(message);
      }
    }
  }, [
    editUserProfileDetailsData,
    dispatch,
    router,
    trigger_CDP_EDIT_PROFILE,
    cmsData,
  ]);

  return (
    <div onClick={handleContainerClick} className="flex flex-col gap-3">
      <MobileTempNavBar
        title={cmsData?.editProfile?.personalInfoHeading}
        subtitle={cmsData?.editProfile?.personalInfoSubHeading}
      />
      <div onClick={handleContainerClick}>
        <ScreenWrapper
          desktopWidth="md:w-[429px]"
          className={`${width > 750 ? "mt-20 flex justify-center" : "mt-0"}`}
        >
          <div className="hidden text-center md:flex md:flex-col justify-center items-center pt-[30px] pb-[24px]">
            <AktivGroteskText
              text={cmsData?.editProfile?.personalInfoHeading}
              className="uppercase"
              fontSize="text-[30px]"
            />
            <AktivGroteskText
              text={cmsData?.editProfile?.personalInfoSubHeading}
              fontWeight="font-[400]"
              fontSize="text-[20px]"
            />
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
            className="flex flex-col pt-[23px] gap-[24px] md:gap-[16px]"
          >
            <div
              className="md:mb-[8px]"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <EditProfileImage
                name={"avatar_id"}
                editProfileImage={editProfileImage}
                setEditProfileImage={setEditProfileImage}
                image={currentImage}
                onChange={handleChange}
              />
            </div>
            <Input
              fontSize="text-[14px] md:text-[18px]"
              paddingClass="md:py-[10px] md:px-[17px] pl-[16px] pr-[16px] py-[16px] "
              bgColor="bg-white"
              name={"name"}
              type="text"
              error={errors.name}
              value={userData.name}
              onChange={handleChange}
              placeholder={cmsData?.editProfile?.fullNamePlaceholder}
            />
            <Input
              fontSize="text-[14px] md:text-[18px]"
              bgColor="bg-white"
              paddingClass="md:py-[10px] md:px-[17px] pl-[16px] pr-[16px] py-[16px] "
              name={"phone"}
              type="text"
              readonly={true}
              value={userData.phone}
              onChange={handleChange}
              placeholder={cmsData?.editProfile?.mobileNumberPlaceholder}
            />

            <Input
              fontSize="text-[14px] md:text-[18px]"
              bgColor="bg-white"
              paddingClass="md:py-[10px] md:px-[17px] pl-[16px] pr-[16px] py-[16px] "
              name={"email"}
              type="email"
              error={errors.email}
              value={userData.email}
              onChange={handleChange}
              placeholder={cmsData?.editProfile?.emailIdPlaceholder}
            />

            <Input
              fontSize="text-[14px] md:text-[18px]"
              bgColor="bg-white"
              paddingClass="md:py-[10px] md:px-[17px] pl-[16px] pr-[16px] py-[16px] "
              name={"dob"}
              type="date"
              value={userData.dob}
              error={errors.dob}
              onChange={handleChange}
              placeholder="DD/MM/YYYY"
            />

            <div className="relative">
              <select
                className={`w-full cursor-pointer border border-transparent outline-none text-[14px] md:text-[18px] font-[400] md:py-[10px] md:px-[17px] pl-[16px] pr-[40px] py-[16px] bg-white rounded-[100px] transition-all duration-200 hover:border-gray-200 focus:border-[#11A64B] focus-visible:border-[#11A64B] appearance-none`}
                name="gender"
                value={userData.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
              >
                <option value="">
                  {cmsData?.validation.profileEditProfileSelectGender}
                </option>
                <option value="male">{cmsData?.editProfile?.genderMale}</option>
                <option value="female">
                  {cmsData?.editProfile?.genderFemale}
                </option>
                <option value="other">
                  {cmsData?.editProfile?.genderOthers}
                </option>
                <option value="perfer_not_to_say">
                  {cmsData?.editProfile?.genderPreferNotToSay}
                </option>
              </select>
              <div className="absolute right-[16px] top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L6 6L11 1"
                    stroke="#666"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            {generalError !== "" && (
              <span className="text-[#FD0202] font-[400] text-[12px]">
                {generalError}
              </span>
            )}
            <GreenCTA
              disabled={isPending}
              onClick={submitHandler}
              className="md:mt-[24px]"
              paddingClass="py-[17px]"
              text={cmsData?.myProfile?.saveDetails}
              fontSize="text-[16px]"
              fontWeight="font-[700]"
            />
          </form>
        </ScreenWrapper>
      </div>
    </div>
  );
};

export default EditProfilePage;
