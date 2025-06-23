import React, { useEffect, useState } from "react";
import AktivGroteskText from "../common/AktivGroteskText";
import { DAILY_WINNERS, ICONS_NAMES, IMAGES } from "@/constants";
import SvgIcons from "../common/SvgIcons";
import { aktivGrotesk } from "@/app/layout";
import { generateImageurl } from "@/utils";
import { ISingleLeaderboardData, updateLeaderboard } from "@/store/leaderboard";
import useAppSelector from "@/hooks/useSelector";
import SingleDateSelector from "../common/SingleDateSelector";
import useAppDispatch from "@/hooks/useDispatch";
import { useGetLeaderBoard } from "@/api/hooks/LeaderBoardHooks";
import profileImage from "../../../public/profile-images/profile-image-guest.svg";
import Image from "next/image";

export const DisplayTable = ({
  data,
  myRank = false,
  rankData,
  avatarText,
  comicCoinText,
  mobileNoText,
  prizeText,
  rankText,
  yourRankText,
}: {
  data: ISingleLeaderboardData[];
  myRank?: boolean;
  rankData?: ISingleLeaderboardData;
  avatarText?: string;
  comicCoinText?: string;
  mobileNoText?: string;
  prizeText?: string;
  rankText?: string;
  yourRankText?: string;
}) => {
  const [image, setImage] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const couponImage = generateImageurl(IMAGES.COUPON);
      setImage(couponImage);
    }
  }, []);
  return (
    <>
      <table className="w-full table-fixed border-separate border-spacing-y-[12px] md:border-spacing-y-[20px]">
        <colgroup>
          <col className="w-[15%]" />
          <col className="w-[20%]" />
          <col className="w-[25%]" />
          <col className="w-[20%]" />
          <col className="w-[20%]" />
        </colgroup>
        <thead>
          <tr className={`border-none  bg-[#FFE200] ${myRank ? "hidden" : ""}`}>
            <td
              className={`${aktivGrotesk.className} mb-[12px] text-[12px] md:text-[20px] font-[500] text-center py-[12px] md:py-[20px] pl-[12px] md:pl-[40px] rounded-l-[5px] md:rounded-l-[10px]`}
            >
              {rankText ?? "Rank"}
            </td>
            <td
              className={`${aktivGrotesk.className} mb-[12px] text-[12px] md:text-[20px] font-[500] text-center py-[12px] md:py-[20px]`}
            >
              {avatarText ?? "Avatar"}
            </td>
            <td
              className={`${aktivGrotesk.className} mb-[12px] text-[12px] md:text-[20px] font-[500] text-center py-[12px] md:py-[20px]   `}
            >
              {mobileNoText ?? "Mobile No"}
            </td>
            <td
              className={`${aktivGrotesk.className} mb-[12px] text-[12px] md:text-[20px] font-[500] text-center py-[12px] md:py-[20px]`}
            >
              {comicCoinText ?? "Comic Coins"}
            </td>
            <td
              className={`${aktivGrotesk.className} mb-[12px] text-[12px] md:text-[20px] font-[500] text-center py-[12px] md:py-[20px]  pr-[12px] md:pr-[40px] rounded-r-[5px] md:rounded-r-[10px]`}
            >
              {prizeText ?? "Prize"}
            </td>
          </tr>
        </thead>
        <tbody className="w-full relative">
          {data?.length > 0 &&
            data?.map((item) => (
              <tr
                key={item.user_id}
                className={`${
                  myRank || rankData?.user_id === item.user_id
                    ? "bg-[#C6E3D1]"
                    : "bg-white"
                } border-none mt-[12px] relative`}
              >
                <td
                  className={`${aktivGrotesk.className} overflow-hidden relative text-[12px] md:text-[16px] font-[400] text-center py-[6px] md:py-[19px] pl-[22px] md:rounded-l-[10px] rounded-l-[5px]`}
                >
                  {(item?.user_id === rankData?.user_id || myRank) && (
                    <div className="h-[17px] md:h-[26px] w-[100px] md:w-[120px] bg-black absolute top-0  left-[-30px]  bottom-0 rotate-[135deg]">
                      <AktivGroteskText
                        text={yourRankText ?? "YOUR RANK"}
                        fontSize="text-[5px] md:text-[7px]"
                        fontWeight="font-[700]"
                        className="text-[#FFE200] rotate-180 ml-5 md:ml-6"
                      />
                    </div>
                  )}
                  {item?.user_rank}
                </td>
                <td
                  className={`min-h-full  relative font-[400]  md:py-[19px]  text-center py-[6px]`}
                >
                  <div className="flex justify-center items-center">
                    <div className="w-[24px] h-[24px]  md:w-[40px] md:h-[40px] flex flex-col justify-center items-center rounded-full bg-[#11A64B]">
                      {item.avatar ? (
                        <Image
                          src={item.avatar}
                          alt="avatar"
                          className="w-[24px] h-[24px] md:w-[40px] md:h-[40px] rounded-full object-cover"
                          width={40}
                          height={40}
                        />
                      ) : (
                        <Image
                          src={profileImage}
                          alt="avatar"
                          width={40}
                          height={40}
                        />
                      )}
                    </div>
                  </div>
                </td>
                <td
                  className={`${aktivGrotesk.className} text-[12px] md:text-[16px] font-[400]  md:py-[19px]  text-center py-[6px]`}
                >
                  xxxxxx{item.mobile?.slice(6)}
                </td>
                <td
                  className={`${aktivGrotesk.className} text-[12px] md:text-[16px] font-[400]  md:py-[19px]  text-center py-[6px]`}
                >
                  {item.coins}
                </td>
                <td
                  className={`${aktivGrotesk.className} text-[12px] md:rounded-r-[10px]  font-[500] text-center py-[6px] pr-[22px] rounded-r-[5px]`}
                >
                  <div className="flex justify-center items-center">
                    {item.winner_reward?.image_url ? (
                      <Image
                        src={item.winner_reward?.image_url || image}
                        alt="coupon"
                        width={45}
                        height={32}
                        className="w-[43px] h-[31px] md:w-[45px] md:h-[32px]"
                      />
                    ) : (
                      <Image
                        src={image}
                        alt="coupon"
                        width={45}
                        height={32}
                        className="w-[43px] h-[31px] md:w-[45px] md:h-[32px]"
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

const LeaderBoardTable = ({
  yourRankText,
  noDataFoundText,
  avatarText,
  comicCoinText,
  mobileNoText,
  prizeText,
  rankText,
  dailyWinnersText,
}: {
  yourRankText?: string;
  noDataFoundText?: string;
  avatarText?: string;
  comicCoinText?: string;
  mobileNoText?: string;
  prizeText?: string;
  rankText?: string;
  dailyWinnersText?: string;
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const { my_rank, leaderboard } = useAppSelector((state) => state.leaderboard);
  const [date, setSelectedDate] = useState<string>("");

  const dispatch = useAppDispatch();
  const { data: leaderboardData } = useGetLeaderBoard({ date });

  useEffect(() => {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    const formattedDate = `${month}/${day}/${year}`;
    setSelectedDate(formattedDate);
  }, []);

  useEffect(() => {
    if (leaderboardData?.ok) {
      const { data } = leaderboardData ?? {};
      dispatch(
        updateLeaderboard({
          my_rank: data?.my_rank,
          leaderboard: data?.top_users ?? [],
        })
      );
    }
  }, [leaderboardData, dispatch]);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const year = date.getFullYear();
      const formattedDate = `${month}/${day}/${year}`;
      setSelectedDate(formattedDate);
    }
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex justify-between md:justify-start items-center md:gap-[12px]">
        <button
          className="outline-none md:block hidden border-none"
          onClick={() => setIsCalendarOpen(true)}
        >
          <SvgIcons
            name={ICONS_NAMES.CALENDAR2}
            className="w-[18px] h-[18px] md:w-[22px] md:h-[22px]"
          />
        </button>
        <AktivGroteskText
          text={dailyWinnersText ?? DAILY_WINNERS}
          fontSize="text-[14px] md:text-[20px]"
          fontWeight="font-[500] md:font-[400]"
        />
        <button
          className="outline-none md:hidden border-none"
          onClick={() => setIsCalendarOpen(true)}
        >
          <SvgIcons
            name={ICONS_NAMES.CALENDAR2}
            className="w-[18px] h-[18px]"
          />
        </button>
        <SingleDateSelector
          open={isCalendarOpen}
          setOpen={setIsCalendarOpen}
          onDateSelect={handleDateSelect}
        />
      </div>
      <div className="w-full flex flex-col gap-[28px] md:gap-[40px]">
        <div className="w-full flex flex-col gap-[12px]">
          <DisplayTable
            rankData={my_rank}
            data={leaderboard}
            avatarText={avatarText}
            comicCoinText={comicCoinText}
            mobileNoText={mobileNoText}
            prizeText={prizeText}
            rankText={rankText}
            yourRankText={yourRankText}
          />
          {leaderboard?.length === 0 && (
            <div className="flex  justify-center items-center">
              <AktivGroteskText
                text={noDataFoundText ?? "No Data Found"}
                fontSize="text-[16px] md:text-[20px]"
                fontWeight="font-[700]"
              />
            </div>
          )}
        </div>

        <div>
          <AktivGroteskText
            text={yourRankText ?? "YOUR RANK"}
            fontSize="text-[16px] md:text-[20px]"
            fontWeight="font-[700]"
          />
          <DisplayTable
            myRank={true}
            data={[my_rank]}
            yourRankText={yourRankText}
          />
        </div>
      </div>
    </div>
  );
};

export default LeaderBoardTable;
