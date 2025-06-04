import React, { useState, useEffect } from "react";
import AktivGroteskText from "../common/AktivGroteskText";
import { ANNOUNCING_WINNER_TIMER_TEXT, ICONS_NAMES } from "@/constants";
import TimerBox from "../common/TimerBox";
import SvgIcons from "../common/SvgIcons";

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

const TIMER_DATA: { key: string; text: string }[] = [
  {
    key: "hours",
    text: "Hours",
  },
  {
    key: "minutes",
    text: "Minutes",
  },
  {
    key: "seconds",
    text: "Seconds",
  },
];

const AnnouncingWinnerTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    hours: 24,
    minutes: 0,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { hours, minutes, seconds } = prevTime;

        if (hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(timer);
          return prevTime;
        }

        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            }
          }
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full flex md:gap-[48px] justify-between items-start py-[10px]">
      <AktivGroteskText
        text={`${ANNOUNCING_WINNER_TIMER_TEXT}`}
        fontSize="text-[12px] md:text-[28px]"
        fontWeight="font-[700]"
      />
      <div className="flex gap-[1.51px]">
        {TIMER_DATA?.map((item, index) => {
          const { key, text } = item;
          const time: number = timeLeft[key as keyof TimeLeft];
          return (
            <div key={index} className="flex items-center">
              <div className="flex justify-center flex-col">
                <div className="flex gap-[1.51px] md:gap-[3.82px]">
                  {time && time > 9
                    ? time
                        ?.toString()
                        ?.split("")
                        ?.map((it: string, index: number) => (
                          <TimerBox key={index} text={it} />
                        ))
                    : ["0", `${time}`]?.map((it: string, index: number) => (
                        <TimerBox key={index} text={it} />
                      ))}
                </div>
                <AktivGroteskText
                  className="text-center"
                  text={text}
                  fontSize="text-[8px] md:text-[16px]"
                  fontWeight="font-[400]"
                />
              </div>
              {index !== TIMER_DATA?.length - 1 && (
                <SvgIcons
                  className="mt-[4px] self-start md:mt-[9px] w-[10px] h-[10px] md:w-[15px] md:h-[15px]"
                  name={ICONS_NAMES.COLON}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnnouncingWinnerTimer;
