import React from "react";
import AktivGroteskText from "../common/AktivGroteskText";
import { DAILY_WINNERS, ICONS_NAMES, PROFILE_IMAGES } from "@/constants";
import SvgIcons from "../common/SvgIcons";
import { aktivGrotesk } from "@/app/layout";
import CalendarDialog from "../CalendarDialog";
import { DateRange } from "react-day-picker";
import Image from "next/image";
import coupon from '../../../public/static/sprite/icons/coupon.svg';

export const DisplayTable = () => {
  return (
    <table className="w-full border-separate border-spacing-y-[12px] md:border-spacing-y-[20px]">
      <thead>
        <tr className="border-none bg-[#FFE200]">
          <td
            className={`${aktivGrotesk.className} mb-[12px] text-[12px] md:text-[20px] font-[500] text-center py-[12px] md:py-[20px] pl-[12px] md:pl-[40px] rounded-l-[5px] md:rounded-l-[10px]`}
          >
            Rank
          </td>
          <td
            className={`${aktivGrotesk.className} mb-[12px] text-[12px] md:text-[20px] font-[500] text-center py-[12px] md:py-[20px]`}
          >
            Avatar
          </td>
          <td
            className={`${aktivGrotesk.className} mb-[12px] text-[12px] md:text-[20px] font-[500] text-center py-[12px] md:py-[20px]   `}
          >
            Mobile No
          </td>
          <td
            className={`${aktivGrotesk.className} mb-[12px] text-[12px] md:text-[20px] font-[500] text-center py-[12px] md:py-[20px]`}
          >
            Comic Coins
          </td>
          <td
            className={`${aktivGrotesk.className} mb-[12px] text-[12px] md:text-[20px] font-[500] text-center py-[12px] md:py-[20px]  pr-[12px] md:pr-[40px] rounded-r-[5px] md:rounded-r-[10px]`}
          >
            Prize
          </td>
        </tr>
      </thead>
      <tbody className="w-full">
        <tr className="border-none mt-[12px] bg-white">
          <td
            className={`${aktivGrotesk.className} text-[12px] md:text-[16px] font-[400] text-center py-[12px] md:py-[19px] pl-[22px] md:rounded-l-[10px] rounded-l-[5px]`}
          >
            1.
          </td>
          <td
            className={`${aktivGrotesk.className} flex justify-center font-[400]  md:py-[19px]  text-center py-[12px]`}
          >
            <div className="w-[24px] h-[24px] md:w-[40px] md:h-[40px] rounded-full bg-[#11A64B]">
              <img
                className="w-full h-full object-cover"
                src={PROFILE_IMAGES?.[0]?.imageURL}
                alt="avatar"
              />
            </div>
          </td>
          <td
            className={`${aktivGrotesk.className} text-[12px] md:text-[16px] font-[400]  md:py-[19px]  text-center py-[12px]`}
          >
            xxxxxx3753
          </td>
          <td
            className={`${aktivGrotesk.className} text-[12px] md:text-[16px] font-[400]  md:py-[19px]  text-center py-[12px]`}
          >
            400
          </td>
          <td
            className={`${aktivGrotesk.className} text-[12px] md:rounded-r-[10px] flex justify-center items-center font-[500] text-center py-[12px] pr-[22px] rounded-r-[5px]`}
          >
            <Image src={coupon} alt="coupon" className="w-[43px] h-[31px] md:w-[45px] md:h-[33px]" width={20} height={19} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const LeaderBoardTable = () => {
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);

  const handleDateRangeSelect = (range: DateRange | undefined) => {
    console.log("Selected date range:", range);
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
          text={DAILY_WINNERS}
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
        <CalendarDialog
          open={isCalendarOpen}
          setOpen={setIsCalendarOpen}
          onDateSelect={handleDateRangeSelect}
        />
      </div>
      <div className="w-full flex flex-col gap-[28px] md:gap-[40px]">
        <DisplayTable />
        <div>
          <AktivGroteskText
            text="YOUR RANK"
            fontSize="text-[16px] md:text-[20px]"
            fontWeight="font-[700]"
          />
        </div>
      </div>
    </div>
  );
};

export default LeaderBoardTable;
