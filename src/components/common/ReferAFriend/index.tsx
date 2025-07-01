import React, { useEffect, useState } from "react";
import AktivGroteskText from "../AktivGroteskText";
import { ICONS_NAMES } from "@/constants";
import GreenCTA from "@/components/GreenCTA";
import SvgIcons from "../SvgIcons";
import { useRouter } from "next/navigation";
import ReferNowComponent from "../ReferNowComponent";
import { useGetAllReferrals } from "@/api/hooks/ReferralHooks";
import { IInviteeData } from "@/interfaces";
import useAppSelector from "@/hooks/useSelector";

const ReferAFriend = ({
  referToFriendHeader,
  referNowButtonText,
  prevButtonText,
  nextButtonText,
  user,
  sendReminder,
  status,
  referAnother,
  myReferrals,
  pending,
  accepted,
}: {
  referToFriendHeader: string;
  referNowButtonText: string;
  prevButtonText: string;
  nextButtonText: string;
  user: string;
  sendReminder: string;
  status: string;
  referAnother: string;
  myReferrals: string;
  pending: string;
  accepted: string;
}) => {
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [referralCode, setReferralCode] = useState<string>("");
  const { data: referrals } = useGetAllReferrals({ page, referralCode });
  const { selectedLanguage } = useAppSelector((state) => state.language);

  const [data, setData] = useState<IInviteeData[]>([]);

  const router = useRouter();

  useEffect(() => {
    if (referrals?.ok) {
      const { data } = referrals ?? {};
      const newPages = Math.ceil(data?.total / data?.page_size);
      setPages(newPages);
      const referralsData = referrals?.data?.referrals as IInviteeData[];
      setData(referralsData);
    }
  }, [referrals]);

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Helper function to get display text based on status
  const getStatusDisplayText = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return pending;
      case "accepted":
        return accepted;
      default:
        return status;
    }
  };

  return (
    <>
      {data?.length === 0 && (
        <div className="flex justify-between items-center p-[16px] bg-white rounded-[5px] md:rounded-[20px]">
          <AktivGroteskText
            text={referToFriendHeader}
            fontSize="text-[16px] md:text-[28px]"
            fontWeight="font-[700]"
          />
          <div>
            <GreenCTA
              paddingClass="py-[10px] px-[20px]"
              className="leading-tight"
              fontSize="text-[14px] md:text-[24px]"
              text={referNowButtonText}
              onClick={() => {
                setOpen(true);
              }}
            />
          </div>
        </div>
      )}
      {data?.length > 0 && (
        <div className="flex flex-col gap-[16px] md:gap-[24px]">
          <AktivGroteskText
            text={myReferrals}
            fontSize="text-[16px] md:text-[28px]"
            fontWeight="font-[700]"
          />
          <div className="flex justify-between px-[12px] py-[12px] md:px-[35px] md:py-[24px] bg-[#FFE200] rounded-[5px] md:rounded-[20px]">
            <AktivGroteskText
              text={user}
              fontSize="text-[12px] md:text-[20px]"
              fontWeight="font-[700]"
            />
            <AktivGroteskText
              text={status}
              fontSize="text-[12px] md:text-[20px]"
              fontWeight="font-[700]"
            />
          </div>
          {data?.map((item: IInviteeData) => (
            <div
              key={item.id}
              className="flex flex-col gap-[8px] md:gap-[20px]"
            >
              <div className="bg-white flex justify-between items-center px-[8px] py-[8px] md:py-[18px] md:px-[45px] rounded-[5px] md:rounded-[20px]">
                <div className="flex items-center gap-[16px] md:gap-[24px]">
                  <SvgIcons
                    name={ICONS_NAMES.USER}
                    className="w-[21px] h-[21px] md:w-[24px] md:h-[28px]"
                  />
                  <AktivGroteskText
                    text={`+91-XXXXXX${item.mobile_number?.slice(6)}`}
                    fontSize="text-[12px] md:text-[20px]"
                    fontWeight="font-[400]"
                    className={`${
                      item.status?.toLowerCase() === "pending"
                        ? "text-[rgba(0,0,0,0.5)]"
                        : "text-black"
                    }`}
                  />
                </div>
                <AktivGroteskText
                  text={getStatusDisplayText(item.status)}
                  fontSize="text-[12px] md:text-[20px]"
                  fontWeight="font-[400]"
                  className={`${
                    item.status?.toLowerCase() === "pending"
                      ? "text-[rgba(0,0,0,0.5)]"
                      : "text-black"
                  }`}
                />
              </div>
            </div>
          ))}
          <div className="w-full flex justify-center flex-row items-center">
            <div className="relative flex gap-[12px] md:gap-[16px]">
              {page > 1 && (
                <button
                  onClick={() => {
                    if (page > 1) {
                      setPage((prev) => prev - 1);
                    }
                  }}
                  className={`hover:bg-[#E0E0E0] transition-all duration-300 rounded-[100px]  border-[1px]   text-[10px] font-[700] py-[6px] px-[36px] ${
                    page > 1
                      ? "border-black text-black"
                      : "border-[rgba(0,0,0,0.2)] text-[rgba(0,0,0,0.2)]"
                  }`}
                >
                  <AktivGroteskText
                    text={prevButtonText}
                    fontSize="text-[14px] md:text-[24px]"
                    fontWeight="font-[700]"
                  />
                </button>
              )}
              {pages > 1 && (
                <button
                  onClick={() => {
                    if (page < pages) {
                      setPage((prev) => prev + 1);
                    }
                  }}
                  className={` hover:bg-[#E0E0E0]  ${
                    pages !== page
                      ? "border-black text-black"
                      : "border-[rgba(0,0,0,0.2)] text-[rgba(0,0,0,0.2)]"
                  }  transition-all duration-300 rounded-[100px] border-[1px] text-[10px] font-[700] py-[6px] px-[36px]`}
                >
                  <AktivGroteskText
                    text={nextButtonText}
                    fontSize="text-[14px] md:text-[24px]"
                    fontWeight="font-[700]"
                  />
                </button>
              )}
            </div>
          </div>

          <div className="w-full flex justify-center gap-[12px] md:gap-[28px] md:pt-[40px]">
            <button
              onClick={() => {
                router.push("/send-reminder");
              }}
              className="px-[24px] box-border py-[8px] md:py-[20px] md:px-[60px] relative border-[1px] md:border-[3px] border-[#00953B] rounded-[100px]"
            >
              <AktivGroteskText
                text={sendReminder}
                className="leading-tight"
                fontSize={`${selectedLanguage === 'ta' ? 'xxs:text-[6px] text-[8px] md:text-[20px] xl:text-[20px] 2xl:text-[20px]' : 'text-[14px] md:text-[20px]'}`}
                fontWeight="font-[700]"
              />
            </button>
            <GreenCTA
              className="leading-tight"
              fontSize={`${selectedLanguage === 'ta' ? 'xxs:text-[6px] text-[8px] md:text-[20px] xl:text-[20px] 2xl:text-[20px]' : 'text-[14px] md:text-[20px]'}`}
              fontWeight="font-[700]"
              paddingClass="px-[20px] py-[8px] md:py-[20px] md:px-[60px]"
              text={referAnother}
              onClick={() => {
                setOpen(true);
              }}
            />
          </div>
        </div>
      )}
      {isAuthenticated && (
        <ReferNowComponent
          setReferralCode={setReferralCode}
          setOpen={setOpen}
          open={open}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default ReferAFriend;
