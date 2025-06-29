import LoginSignupWrapper, {
  AuthHeading,
} from "@/components/LoginSignupWrapper";
import React, { useCallback, useEffect, useState } from "react";
import { aktivGrotesk } from "@/app/layout";
import Input from "@/components/Input";
import GreenCTA from "@/components/GreenCTA";
import EditProfileImage from "@/components/EditProfileImage";
import useAppDispatch from "@/hooks/useDispatch";
import useAppSelector from "@/hooks/useSelector";
import {
  updateIsAuthenticated,
  updateIsFirstLogin,
  updateOtpFilled,
  updateOtpStatus,
  updatePhoneNumber,
  updateToken,
  updateEnableCoachMarks,
} from "@/store/auth/auth.slice";
import SvgIcons from "../SvgIcons";
import {
  GA_EVENTS,
  ICONS_NAMES,
  LOCAL_KEYS,
  SESSION_STORAGE_KEYS,
  TOKEN_TYPE,
} from "@/constants";
import { MainService } from "@/api/services/MainService";
import { useMutateSignUp } from "@/api/hooks/LoginHooks";
import {
  clearSessionStorage,
  getLocalStorageItem,
  getSessionStorageItem,
  removeSessionStorageItem,
  setLocalStorageItem,
  setSessionStorageItem,
} from "@/utils";
import { LOCAL_STORAGE_KEYS } from "@/api/client/config";
import { triggerGAEvent } from "@/utils/gTagEvents";
import { messaging, getToken } from "@/lib/firebase";
import {
  BaseCDPEventPayload,
  CDPEventPayloadBuilder,
  RegistrationCDPEventPayload,
} from "@/api/utils/cdpEvents";
import { ILocalGeoData } from "@/api/types/GeolocationTypes";
import { useSendCDPEvent } from "@/api/hooks/CDPHooks";
import { useRouter } from "next/navigation";
import { IAvatarsData } from "@/store/profile/profile.slice";
import { useCMSData } from "@/data";

interface IUserData {
  avatar: string;
  name: string;
  number: string;
  email: string;
  invite_code: string;
  agree: boolean;
}

const Signup = () => {
  const mainServiceInstance = MainService.getInstance();
  const [mounted, setMounted] = useState<boolean>(false);
  const cmsData = useCMSData(mounted);

  const [open, setOpen] = useState<boolean>(true);
  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [acceptTermsError, setAcceptTermsError] = useState<string>("");
  const [editProfileImage, setEditProfileImage] = useState<boolean>(false);

  const { isFirstLogin, phoneNumber, otpVerified } = useAppSelector(
    (state) => state.auth
  );
  const { mutate: signupToCoke, data: signupData } = useMutateSignUp();

  const [userData, setUserData] = useState<IUserData>({
    avatar: "",
    name: "",
    number: "",
    email: "",
    invite_code: "",
    agree: false,
  });

  const [error, setError] = useState<string>("");

  const [selectedAvatar, setSelectedAvatar] = useState<string>("");
  const { avatarsData } = useAppSelector((state) => state.profile);
  const [fcmToken, setFcmToken] = useState<string>("");
  const { mutate: sendCDPEvent } = useSendCDPEvent();

  const dispatch = useAppDispatch();

  const handleChange = (key: string, value: string | boolean) => {
    setEditProfileImage(false);
    setUserData({ ...userData, [key]: value });
  };

  const handleContainerClick = () => {
    if (editProfileImage) {
      setEditProfileImage(false);
    }
  };

  // Name validation
  useEffect(() => {
    if (!userData.name) {
      setNameError("");
      return;
    }

    const timeoutId = setTimeout(() => {
      if (userData.name.length < 2) {
        setNameError(cmsData.validation.signupNameTwoCharLong);
      } else if (!/^[^\d!@#$%^&*()_+\-=\[\]{}|;':",./<>?\\]+$/.test(userData.name)) {
        setNameError(cmsData.validation.signupNameContainAlphabet);
      } else {
        setNameError("");
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [userData.name, cmsData]);

  const router = useRouter();

  // Email validation
  useEffect(() => {
    if (!userData.email) {
      setEmailError("");
      return;
    }

    const timeoutId = setTimeout(() => {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(userData.email)) {
        setEmailError(cmsData.validation.signupEmailValidation);
      } else {
        setEmailError("");
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [userData.email, cmsData.validation.signupEmailValidation]);

  const triggerCDPInviteCodeEvent = useCallback(
    (userId: string) => {
      if (userId) {
        const payload: BaseCDPEventPayload =
          CDPEventPayloadBuilder.buildUseInviteCodePayload({
            user_identifier: userId,
          });
        sendCDPEvent(payload);
      }
    },
    [sendCDPEvent]
  );

  useEffect(() => {
    if (avatarsData?.length > 0) {
      const avatar = avatarsData.find(
        (avatar: IAvatarsData) =>
          avatar?.id?.toString() === userData?.avatar?.toString()
      );
      setSelectedAvatar(avatar?.image ?? "");
    }
  }, [userData.avatar, avatarsData]);

  const isFormValid = () => {
    let emailCheck = true;
    if (userData?.name === "") {
      setNameError(cmsData.validation.signupNameRequired);
    }
    if (!userData?.agree) {
      setAcceptTermsError(cmsData.validation.signupTandcAcceptance);
      return false;
    }
    if (userData?.email !== "") {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(userData?.email)) {
        console.log("Enter in this");
        emailCheck = false;
      }
    }

    console.log(emailCheck);
    return userData.name.length > 0 && !nameError && emailCheck;
  };

  useEffect(() => {
    if (userData?.agree) {
      setAcceptTermsError("");
    }
  }, [userData?.agree]);

  const removeAuthentication = useCallback(() => {
    dispatch(updateIsFirstLogin({ isFirstLogin: false }));
    dispatch(updateIsAuthenticated({ isAuthenticated: false }));
    dispatch(updateOtpFilled({ otpFilled: false }));
    dispatch(updateOtpStatus({ otpSent: false }));
    dispatch(updatePhoneNumber({ phoneNumber: "" }));
    dispatch(updateToken({ token: "" }));
    dispatch(updateIsFirstLogin({ isFirstLogin: false }));
    mainServiceInstance.setAccessToken("");
  }, [dispatch, mainServiceInstance]);

  useEffect(() => {
    if (isFirstLogin) {
      setUserData({
        ...userData,
        number: `+91 ${phoneNumber}`,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFirstLogin]);

  useEffect(() => {
    if (!otpVerified) {
      removeAuthentication();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otpVerified]);

  const trigerrSignupCDP = (userId: string, phoneNumber: string) => {
    const geoLocationData = JSON.parse(
      getLocalStorageItem(LOCAL_STORAGE_KEYS.USER_GEOLOCATION) ?? "{}"
    ) as ILocalGeoData;
    const payload: RegistrationCDPEventPayload =
      CDPEventPayloadBuilder.buildRegistrationPayload({
        phone_e164: `+91${phoneNumber}`,
        email: userData.email ?? "",
        first_name: userData.name,
        ...geoLocationData,
        user_identifier: userId,
      });
    sendCDPEvent(payload);
  };

  // Generate FCM token for push notifications
  useEffect(() => {
    const generateFCMToken = async () => {
      try {
        // Check if we're in a browser environment with Notification API
        if (typeof window === "undefined" || !("Notification" in window)) {
          console.log("Notification API not available");
          return;
        }

        if (!messaging) {
          console.log("Firebase messaging not available");
          return;
        }

        // Check if service worker is supported
        if ("serviceWorker" in navigator) {
          // Register service worker
          await navigator.serviceWorker.register("/firebase-messaging-sw.js");

          // Request notification permission
          const permission = await Notification.requestPermission();

          if (permission === "granted") {
            // Generate FCM token
            const token = await getToken(messaging, {
              vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
            });

            if (token) {
              console.log("FCM Token generated for signup:", token);
              setFcmToken(token);
              // Store token in localStorage for persistence
              localStorage.setItem("fcm_token", token);
            } else {
              console.log("No FCM token available");
            }
          } else {
            console.log("Notification permission denied");
          }
        }
      } catch (error) {
        console.error("Error generating FCM token:", error);
      }
    };

    // Only generate token during signup process
    if (isFirstLogin && phoneNumber) {
      generateFCMToken();
    }
  }, [isFirstLogin, phoneNumber]);

  const handleSignup = () => {
    setError("");
    setEditProfileImage(false);
    triggerGAEvent(GA_EVENTS.SPRITE_J24_SIGNUP);
    if (isFormValid()) {
      const formData = {
        avatar: userData.avatar,
        email: userData.email ?? "",
        full_name: userData.name,
        mobile_number: phoneNumber,
        referral_code: userData.invite_code ?? "",
        device_token: fcmToken || "", // Include FCM device token
      };
      signupToCoke(formData);
    }
  };

  const trigerReferCompleteCDpEvent = (
    referee_mobile_number: string,
    userId: string
  ) => {
    if (referee_mobile_number && userId) {
      const payload: BaseCDPEventPayload =
        CDPEventPayloadBuilder.buildReferralCompletedPayload(
          referee_mobile_number,
          userId
        );
      sendCDPEvent(payload);
    }
  };

  useEffect(() => {
    if (signupData?.ok) {
      const { data } = signupData;
      const tokenType = data?.token_type ?? "";
      if (
        data?.access_token &&
        tokenType === TOKEN_TYPE.BEARER &&
        data?.refresh_token !== ""
      ) {
        setLocalStorageItem(
          LOCAL_STORAGE_KEYS.ACCESS_TOKEN,
          data?.access_token
        );
        setLocalStorageItem(
          LOCAL_STORAGE_KEYS.REFRESH_TOKEN,
          data?.refresh_token
        );
        dispatch(updateToken({ token: data?.access_token }));
        mainServiceInstance.setAccessToken(data?.access_token);
        dispatch(updateIsAuthenticated({ isAuthenticated: true }));
        dispatch(updateIsFirstLogin({ isFirstLogin: false }));
        dispatch(updateEnableCoachMarks({ enableCoachMarks: true }));
        setLocalStorageItem(LOCAL_KEYS.CONTEST_TOUR, "true");
        setOpen(false);
        removeSessionStorageItem(SESSION_STORAGE_KEYS.SIGNUP_KEEP_ALIVE);
        trigerrSignupCDP(data?.user_id ?? "", data?.phone_number ?? "");
        if (data?.referral_phone_number) {
          trigerReferCompleteCDpEvent(
            data?.referral_phone_number,
            data?.user_id
          );
          triggerCDPInviteCodeEvent(data?.user_id ?? "");
        }
      }
    } else if (signupData?.ok === false) {
      const { message } = signupData as unknown as { message: string };
      if (message === "Invalid referral code") {
        setError(cmsData.validation.signupReferralCodeValidation);
      } else if (message === "Email already in use") {
        setError(cmsData.validation.profileEditProfileEmailAlreadyInUsed);
      } 
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signupData, dispatch]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (getSessionStorageItem(SESSION_STORAGE_KEYS.SIGNUP_KEEP_ALIVE)) {
      const data = JSON.parse(
        getSessionStorageItem(SESSION_STORAGE_KEYS.SIGNUP_KEEP_ALIVE) ?? "{}"
      );
      if (data.phoneNumber) {
        setUserData({
          ...userData,
          number: `+91 ${data.phoneNumber}`,
        });
        dispatch(updatePhoneNumber({ phoneNumber: data.phoneNumber }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LoginSignupWrapper
      open={open}
      setOpen={() => {
        setOpen(false);
        if (isFirstLogin) {
          removeAuthentication();
        }
        clearSessionStorage();
      }}
      logo={true}
    >
      <div
        className={`flex flex-col gap-[24px] pt-[28px]`}
        onClick={handleContainerClick}
      >
        <div className="w-full absolute top-[4px] right-[4px] flex justify-end box-border pt-[10px] pr-[10px]">
          <button
            className="flex justify-center items-center outline-none border-none"
            onClick={() => {
              setOpen(false);
              if (isFirstLogin) {
                removeAuthentication();
              }
              clearSessionStorage();
            }}
          >
            <SvgIcons name={ICONS_NAMES.CROSS} className="w-[20px] h-[20px]" />
          </button>
        </div>
        <div className="flex flex-col justify-center items-center gap-[8px]">
          <AuthHeading title={cmsData.signup.sign_up} />

          <p
            className={`${aktivGrotesk.className} font-[400] text-[#313131] md:text-[20px] text-[16px] w-[80%] flex justify-center text-center`}
          >
            {cmsData.signup.let_break_the_ice}
          </p>
          <div onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <EditProfileImage
              name="avatar"
              image={selectedAvatar}
              editProfileImage={editProfileImage}
              setEditProfileImage={setEditProfileImage}
              onChange={handleChange}
            />
          </div>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
          className="flex flex-col gap-[20px]"
          onClick={() => setEditProfileImage(false)}
        >
          <Input
            required={true}
            name="name"
            value={userData.name}
            placeholder={cmsData.signup.full_name}
            onChange={handleChange}
            type="text"
            error={nameError}
          />
          <Input
            name="number"
            required={true}
            value={userData.number}
            placeholder="Mobile Number*"
            onChange={handleChange}
            type="text"
            readonly={true}
          />
          <Input
            name="email"
            required={true}
            value={userData.email}
            placeholder={cmsData.signup.email_id}
            onChange={handleChange}
            type="email"
            error={emailError}
          />
          <Input
            name="invite_code"
            value={userData.invite_code}
            placeholder={cmsData.signup.referral_invite_code}
            onChange={handleChange}
            type="text"
          />
          <div className="flex items-start gap-[8px]">
            <input
              name="agree"
              id="agree"
              checked={userData.agree}
              onChange={(e) => handleChange("agree", e.target.checked)}
              className="relative rounded-none top-[2px] w-4 h-4 cursor-pointer accent-black"
              type="checkbox"
            />
            <label
              htmlFor="agree"
              className={`${aktivGrotesk.className} font-[400] text-[12px] cursor-pointer`}
            >
              {
                cmsData.signup.term_condition_privacy_policy.split(
                  "Terms & Conditions"
                )[0]
              }
              the{" "}
              <span className="text-[#003087] font-[700] cursor-pointer">
                <button
                  type="button"
                  onClick={() => {
                    const data = {
                      accessToken: getLocalStorageItem(
                        LOCAL_STORAGE_KEYS.ACCESS_TOKEN
                      ),
                      phoneNumber: phoneNumber,
                    };
                    setSessionStorageItem(
                      SESSION_STORAGE_KEYS.SIGNUP_KEEP_ALIVE,
                      JSON.stringify(data)
                    );
                    router.push("/terms-and-conditions");
                  }}
                >
                  Terms and Conditions
                </button>
              </span>{" "}
              and{" "}
              <span className="font-[700] text-[#003087] cursor-pointer">
                <button
                  type="button"
                  onClick={() => {
                    const data = {
                      accessToken: getLocalStorageItem(
                        LOCAL_STORAGE_KEYS.ACCESS_TOKEN
                      ),
                      phoneNumber: phoneNumber,
                    };
                    setSessionStorageItem(
                      SESSION_STORAGE_KEYS.SIGNUP_KEEP_ALIVE,
                      JSON.stringify(data)
                    );
                    router.push("/privacy-policy");
                  }}
                >
                  Privacy Policy
                </button>
              </span>
              .
            </label>
          </div>
          {acceptTermsError && (
            <span className="text-[#FD0202] font-[400] text-[12px]">
              {acceptTermsError}
            </span>
          )}
          {error && (
            <span className="text-[#FD0202] font-[400] text-[12px]">
              {error}
            </span>
          )}
        </form>
        <GreenCTA
          onClick={() => {
            handleSignup();
          }}
          text={cmsData.signup.submit}
        />
      </div>
    </LoginSignupWrapper>
  );
};

export default Signup;
