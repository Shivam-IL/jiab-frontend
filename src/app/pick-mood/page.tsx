"use client";
import React, { useState } from "react";
import Header from "@/components/common/Header/Header";
import ScreenWrapper from "@/components/common/ScreenWrapper";
import MobileTempNavBar from "@/components/common/MobileTempNavBar";
import SvgIcons from "@/components/common/SvgIcons";
import { ICONS_NAMES } from "@/constants";
import AktivGroteskText from "@/components/common/AktivGroteskText";

const PickMood: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories: {
    id: string;
    name: string;
    icon: string;
    url?: string;
  }[] = [
    {
      id: "category1",
      name: "Cricket",
      icon: ICONS_NAMES.CRICKET,
      url: "/scroll-and-lol",
    },
    {
      id: "category2",
      name: "Animals",
      icon: ICONS_NAMES.ANIMAL,
      url: "/scroll-and-lol",
    },
    {
      id: "category3",
      name: "Food",
      icon: ICONS_NAMES.FOOD,
      url: "/scroll-and-lol",
    },
    {
      id: "category4",
      name: "Wedding",
      icon: ICONS_NAMES.RELATIONSHIP,
      url: "/scroll-and-lol",
    },
    {
      id: "category5",
      name: "College",
      icon: ICONS_NAMES.COLLEGE,
      url: "/scroll-and-lol",
    },
    {
      id: "category6",
      name: "Office",
      icon: ICONS_NAMES.OFFICE,
      url: "/scroll-and-lol",
    },
    {
      id: "category7",
      name: "Family",
      icon: ICONS_NAMES.FAMILY,
      url: "/scroll-and-lol",
    },
    {
      id: "category8",
      name: "Friends",
      icon: ICONS_NAMES.FRIENDS,
      url: "/scroll-and-lol",
    },
    {
      id: "category9",
      name: "Finance",
      icon: ICONS_NAMES.FINANCE,
      url: "/scroll-and-lol",
    },
    {
      id: "category10",
      name: "Daily Humour",
      icon: ICONS_NAMES.DAILY_HUMOR,
      url: "/scroll-and-lol",
    },
    {
      id: "category11",
      name: "Self",
      icon: ICONS_NAMES.SELF,
      url: "/scroll-and-lol",
    },
    {
      id: "category12",
      name: "Adulting",
      icon: ICONS_NAMES.ADULTING,
      url: "/scroll-and-lol",
    },
    {
      id: "category13",
      name: "Observation",
      icon: ICONS_NAMES.OBSERVING,
      url: "/scroll-and-lol",
    },
    {
      id: "category14",
      name: "Internet",
      icon: ICONS_NAMES.INTERNET,
      url: "/scroll-and-lol",
    },
    {
      id: "category15",
      name: "Pollution",
      icon: ICONS_NAMES.POLLUTION,
      url: "/scroll-and-lol",
    },
    {
      id: "category16",
      name: "Travel",
      icon: ICONS_NAMES.TRAVEL,
      url: "/scroll-and-lol",
    },
    {
      id: "category17",
      name: "Dating",
      icon: ICONS_NAMES.DATING,
      url: "/scroll-and-lol",
    },
    {
      id: "category18",
      name: "Traffic",
      icon: ICONS_NAMES.TRAFFIC,
      url: "/scroll-and-lol",
    },
    {
      id: "category19",
      name: "OTT",
      icon: ICONS_NAMES.OTT,
      url: "/scroll-and-lol",
    },
    {
      id: "category20",
      name: "Non-Genre",
      icon: ICONS_NAMES.NON_GENRE,
      url: "/scroll-and-lol",
    },
  ];

  return (
    <>
      <MobileTempNavBar
        title="Pick Mood"
        subtitle="Pick your Delulu, Get your Solulu"
      />
      <ScreenWrapper className="md:bg-[#F2F2F2] bg-white border-t-[14px] border-[#F2F2F2] md:mt-[100px] mt-0">
        <Header
          title="Pick Mood"
          description="Pick your Delulu, Get your Solulu"
          className="md:block hidden"
        />
        <div className="grid md:grid-cols-5 grid-cols-3 md:mt-[40px] md:gap-y-[24px] gap-y-[20px] justify-between">
          {categories.map((category) => (
            <div
              className={`flex flex-col items-center justify-center gap-[8px] cursor-pointer `}
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
            >
              <div
                className={`w-[90px] md:w-[140px] h-[90px] md:h-[140px] rounded-full flex items-center justify-center gap-[8px] hover:border-2 hover:border-green bg-white transition-border duration-600 ${
                  selectedCategory === category.id
                    ? "border-2 border-green"
                    : ""
                }`}
              >
                <SvgIcons
                  name={category.icon}
                  width={50}
                  height={50}
                  className="md:w-[86px] w-[50px] h-auto"
                />
              </div>
              <AktivGroteskText
                text={category.name}
                fontSize="text-[12px] md:text-[20px]"
                fontWeight="font-[400]"
              />
            </div>
          ))}
        </div>

        <div className="md:mt-[40px] mt-[20px] justify-center md:flex hidden">
          <button className="bg-green text-white px-[60px] py-[20px] rounded-full flex items-center gap-[4px] transition-colors duration-200 text-[20px] hover:bg-[#73C392]">
            Submit
          </button>
        </div>
      </ScreenWrapper>
    </>
  );
};

export default PickMood;
