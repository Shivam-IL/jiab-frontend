import React from "react";
import { IUserGeneratedJokeCard } from "@/interfaces";
import AktivGroteskText from "../AktivGroteskText";
import {  PENDING } from "@/constants";
import { formatDateToMonthYear } from "@/utils";

const UserGeneratedJokeCard: React.FC<IUserGeneratedJokeCard> = ({
  image,
  title,
  date,
  status,
}) => {
  return (
    <div className="w-full bg-white rounded-[5px] px-[8px] py-[12px] md:p-[12px] flex items-center  gap-[16px] md:gap-[40px]">
      <div
        className={`min-w-[57px] max-w-[57px] min-h-[57px] max-h-[57px] md:min-w-[108px] md:max-w-[108px] md:min-h-[108px] md:max-h-[108px] rounded-[3px] md:rounded-[8px] relative bg-[#11A64B]`}
      >
        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="rounded-[3px] md:rounded-[5px] object-fit min-w-[57px] max-w-[57px] min-h-[57px] max-h-[57px] md:min-w-[108px] md:max-w-[108px] md:min-h-[108px] md:max-h-[108px]  relative"
            src={image}
            alt="joke"
          />
        )}
      </div>
      <div className="w-full flex flex-col gap-[9px] md:gap-[16px]">
        <AktivGroteskText
          text={title}
          fontSize="text-[12px] md:text-[20px]"
          fontWeight="font-[700]"
        />
        <div className="flex justify-between items-center">
          <AktivGroteskText
            text={`Date: ${formatDateToMonthYear(date)}`}
            fontSize="text-[10px] md:text-[14px]"
            fontWeight="font-[400]"
          />
          <AktivGroteskText
            text={status ?? PENDING}
            fontSize="text-[10px] capitalize md:text-[14px]"
            fontWeight="font-[400]"
          />
        </div>
      </div>
    </div>
  );
};

export default UserGeneratedJokeCard;
