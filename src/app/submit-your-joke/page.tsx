"use client";

import MobileTempNavBar from "@/components/common/MobileTempNavBar";
import ScreenWrapper from "@/components/common/ScreenWrapper";
import {
  ALL_FIElDS_ARE_MANDATORY,
  CATEGORIES_CAROUSEL_DATA,
  FORMAT_OPTIONS,
  ICONS_NAMES,
  LANGUAGE_OPTIONS,
  MOBILE_TEMP_NAVBAR_DATA,
  SUBMIT,
  SUBMIT_JOKES_TERMS_AND_CONDITIONS,
} from "@/constants";
import useWindowWidth from "@/hooks/useWindowWidth";
import { FileType, IJokeData } from "@/types";
import React, { forwardRef, useRef, useState } from "react";
import Input from "@/components/Input";
import LabeledInput from "@/components/LabeledInput";
import ImageIconCard from "@/components/common/ImageIconCard";
import SvgIcons from "@/components/common/SvgIcons";
import AktivGroteskText from "@/components/common/AktivGroteskText";
import CustomCarousel from "@/components/common/CustomCarousel";
import { Checkbox } from "@/components/ui/checkbox";
import GreenCTA from "@/components/GreenCTA";
import {
  ApproveJokePopup,
  JokeFeaturedPopup,
  JokeNotSuitablePopup,
  JokeNotGoodEnoughPopup,
  JokeOffensivePopup,
} from "@/components/JokeSubmissionPopup";

interface FileContainerProps {
  title: string;
  subtitle: string;
}

const FileContainer = forwardRef<HTMLDivElement, FileContainerProps>(
  ({ title, subtitle }, ref) => {
    const handleClick = () => {
      if (ref && "current" in ref && ref.current) {
        ref.current.click();
      }
    };

    return (
      <div
        ref={ref}
        onClick={handleClick}
        className="w-full mt-[24px] h-[147px] md:h-[195px] flex flex-col justify-center items-center bg-[#9BD4B1] border-[1px] border-[#11A64B] rounded-[10px] cursor-pointer"
      >
        <div className="flex flex-col justify-center items-center gap-[16px]">
          <SvgIcons
            className="w-[40px] h-[40px] md:w-[69px] md:h-[69px]"
            name={ICONS_NAMES.UPLOAD_FILE}
          />
          <div className="flex flex-col justify-center items-center">
            <AktivGroteskText
              text={title}
              fontSize="text-[16px] md:text-[20px]"
              fontWeight="font-[700]"
            />
            <AktivGroteskText
              text={subtitle}
              fontSize="text-[12px] md:text-[16px]"
              fontWeight="font-[400]"
            />
            {title.includes("Image") && (
              <AktivGroteskText
                text="Preferred Dimensions : Square"
                fontSize="text-[8px] md:text-[14px]"
                fontWeight="font-[400]"
              />
            )}
          </div>
        </div>
      </div>
    );
  }
);

FileContainer.displayName = "FileContainer";

const SubmitYourJoke = () => {
  const width = useWindowWidth();

  const [openApproveJokePopup, setOpenApproveJokePopup] =
    useState<boolean>(false);
  const [openJokeFeaturedPopup, setOpenJokeFeaturedPopup] =
    useState<boolean>(false);
  const [openJokeNotSuitablePopup, setOpenJokeNotSuitablePopup] =
    useState<boolean>(false);
  const [openJokeNotGoodEnoughPopup, setOpenJokeNotGoodEnoughPopup] =
    useState<boolean>(false);
  const [openJokeOffensivePopup, setOpenJokeOffensivePopup] =
    useState<boolean>(false);

  const [jokeData, setJokeData] = useState<IJokeData>({
    language: "",
    format: "Image",
    fileType: FileType.IMAGE,
    acceptedFormats: ".jpg,.jpeg,.png",
    accptedFormatText: "Accepted formats .jpg, .jpeg & .png",
    jokeText: "",
    title: "",
    file: [],
    category: "",
    agreeToTerms: false,
  });

  const fileRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    key: string,
    value: string | boolean | FileList | null
  ) => {
    setJokeData((prev) => ({ ...prev, [key]: value }));
  };

  console.log(jokeData, "jokeData");

  return (
    <div className="flex flex-col gap-3">
      <MobileTempNavBar
        title={MOBILE_TEMP_NAVBAR_DATA.SUBMIT_JOKES.TITLE}
        subtitle={MOBILE_TEMP_NAVBAR_DATA.SUBMIT_JOKES.SUB_TITLE}
      />
      <ScreenWrapper
        className={`${
          width > 750 ? "mt-[71px] flex justify-center" : "pb-[100px] mt-0"
        }`}
      >
        <div className="md:flex md:flex-col justify-center items-center md:mt-[60px] md:mb-[86px] gap-[12px] hidden">
          <AktivGroteskText
            text={MOBILE_TEMP_NAVBAR_DATA.SUBMIT_JOKES.TITLE}
            fontSize="text-[30px]"
            fontWeight="font-[700]"
          />
          <AktivGroteskText
            text={MOBILE_TEMP_NAVBAR_DATA.SUBMIT_JOKES.SUB_TITLE}
            fontSize="text-[20px]"
            fontWeight="font-[400]"
          />
        </div>
        <div className="md:mt-0 flex flex-col md:justify-center md:items-center gap-[24px] md:gap-[32px]">
          <LabeledInput
            labelClassName="md:text-center"
            label="Select Language*"
          >
            <Input
              bgColor="bg-white"
              name="language"
              type="select"
              options={LANGUAGE_OPTIONS}
              onChange={handleChange}
              value={jokeData.language}
              placeholder="Select Language"
            />
          </LabeledInput>
          <LabeledInput
            labelClassName="md:text-center"
            width="w-full"
            label="Select Format*"
          >
            <div className="flex w-full  md:flex-row md:justify-center">
              <div className="flex w-full md:w-[600px] gap-[8px]  justify-between">
                {FORMAT_OPTIONS.map((item) => {
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className="w-1/4"
                      onClick={() => {
                        handleChange("format", item.label);
                        handleChange("acceptedFormats", item.acceptedFormats);
                        handleChange(
                          "accptedFormatText",
                          item.accptedFormatText
                        );
                      }}
                    >
                      <ImageIconCard
                        key={item.label}
                        boxWidth=""
                        itemsGapClass="gap-[8px]"
                        fontSize="text-[12px] md:text-[14px]"
                        fontWeight="font-[400]"
                        iconClassName={
                          "w-[31px] h-[39px] md:w-[43px] md:h-[56px]"
                        }
                        className={`${
                          item.label.toLowerCase() ===
                          jokeData.format.toLowerCase()
                            ? "border-[1px] border-[#11A64B]"
                            : ""
                        } max-w-[80px] box-border min-h-[80px] md:min-w-[120px] md:min-h-[120px] flex flex-col justify-center items-center bg-white px-[24px] py-[9px] rounded-[10px]`}
                        icon={item.icon}
                        text={item.label}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
            {jokeData.format.toLowerCase() !== FileType.TEXT.toLowerCase() && (
              <>
                <FileContainer
                  ref={fileRef}
                  title={`Upload Your ${jokeData.format}`}
                  subtitle={jokeData.accptedFormatText}
                />
                <input
                  ref={fileRef}
                  hidden
                  type="file"
                  accept={jokeData.acceptedFormats}
                  onChange={(event) => handleChange("file", event.target.files)}
                />
              </>
            )}
            {jokeData.format.toLowerCase() === FileType.TEXT.toLowerCase() && (
              <div>
                <div className="flex flex-col gap-[8px]">
                  <AktivGroteskText
                    className="w-full md:text-center"
                    text="Add your Joke*  👇"
                    fontSize="md:text-[16px] text-[14px]"
                    fontWeight="font-[700]"
                  />
                  <Input
                    name="jokeText"
                    type="textarea"
                    bgColor="bg-[#9BD4B1]"
                    paddingClass="p-[12px]"
                    borderRadius="rounded-[10px]"
                    fontSize="text-[12px] md:text-[20px] font-[400]"
                    className=""
                    rows={6}
                    onChange={handleChange}
                    value={jokeData.jokeText}
                    placeholder="Type your joke here..."
                  />
                </div>
                <AktivGroteskText
                  text="Max. limit 200 words"
                  className="text-[rgba(0,0,0,0.5)] mt-[10px] md:mt-[12px]"
                  fontSize="text-[8px] md:text-[16px]"
                  fontWeight="font-[400]"
                />
              </div>
            )}
          </LabeledInput>
          <LabeledInput labelClassName="md:text-center" label="Title*">
            <Input
              bgColor="bg-white"
              name="title"
              type="text"
              onChange={handleChange}
              value={jokeData.title}
              paddingClass="md:p-[16px] py-[19px] px-[16px]"
              placeholder="Joke Title"
            />
            <AktivGroteskText
              text="Max 30 character limit"
              className="w-full md:text-center"
              fontSize="text-[8px] md:text-[12px]"
              fontWeight="font-[400]"
            />
          </LabeledInput>
          <LabeledInput
            labelClassName="md:text-center"
            width="md:max-w-[720px] lg:max-w-[920px]"
            label="Category* "
          >
            <CustomCarousel>
              {CATEGORIES_CAROUSEL_DATA.map((item) => {
                return (
                  <div
                    onClick={() => handleChange("category", item.name)}
                    key={item.id}
                  >
                    <ImageIconCard
                      key={item.name}
                      boxWidth=""
                      itemsGapClass="gap-[8px]"
                      fontSize="text-[12px] md:text-[14px]"
                      fontWeight="font-[400]"
                      iconClassName={
                        "w-[31px] h-[39px] md:w-[55px] md:h-[56px]"
                      }
                      className={`cursor-pointer ${
                        item.name.toLowerCase() ===
                        jokeData.category.toLowerCase()
                          ? "border-[1px] border-[#11A64B]"
                          : ""
                      } text-center max-w-[80px] min-h-[80px] box-border md:max-w-[120px] md:min-h-[120px] flex-col justify-center items-center bg-white px-[24px] py-[9px] rounded-[10px]`}
                      icon={item.icon}
                      text={item.name}
                    />
                  </div>
                );
              })}
            </CustomCarousel>
          </LabeledInput>
          <div className="flex gap-[8px] items-start">
            <Checkbox
              className="w-[16px] h-[16px] md:top-[3px] relative"
              name="agreeToTerms"
              checked={jokeData.agreeToTerms}
              onCheckedChange={() =>
                handleChange("agreeToTerms", !jokeData.agreeToTerms)
              }
            />
            <AktivGroteskText
              text={SUBMIT_JOKES_TERMS_AND_CONDITIONS}
              fontSize="text-[12px] md:text-[16px]"
              fontWeight="font-[400]"
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-[4px]">
            <GreenCTA
              onClick={() => {
                setOpenApproveJokePopup(true);
              }}
              className="w-full md:w-[480px]"
              fontSize="text-[16px] md:text-[32px]"
              fontWeight="font-[400]"
              text={SUBMIT}
              paddingClass="pt-[17px] pb-[12px] md:py-[24px]"
            />
            <AktivGroteskText
              text={ALL_FIElDS_ARE_MANDATORY}
              fontWeight="font-[400] md:font-[700]"
              fontSize="text-[8px] md:text-[14px]"
            />
          </div>
        </div>
      </ScreenWrapper>
      {openApproveJokePopup && (
        <ApproveJokePopup
          open={openApproveJokePopup}
          onClose={() => {
            setOpenApproveJokePopup(false);
            setOpenJokeFeaturedPopup(true);
          }}
        />
      )}
      {openJokeFeaturedPopup && (
        <JokeFeaturedPopup
          open={openJokeFeaturedPopup}
          onClose={() => {
            setOpenJokeFeaturedPopup(false);
            setOpenJokeNotSuitablePopup(true);
          }}
        />
      )}
      {openJokeNotSuitablePopup && (
        <JokeNotSuitablePopup
          open={openJokeNotSuitablePopup}
          onClose={() => {
            setOpenJokeNotSuitablePopup(false);
            setOpenJokeNotGoodEnoughPopup(true);
          }}
        />
      )}
      {openJokeNotGoodEnoughPopup && (
        <JokeNotGoodEnoughPopup
          open={openJokeNotGoodEnoughPopup}
          onClose={() => {
            setOpenJokeNotGoodEnoughPopup(false);
            setOpenJokeOffensivePopup(true);
          }}
        />
      )}
      {openJokeOffensivePopup && (
        <JokeOffensivePopup
          open={openJokeOffensivePopup}
          onClose={() => {
            setOpenJokeOffensivePopup(false);
            setOpenApproveJokePopup(false);
          }}
        />
      )}
    </div>
  );
};

export default SubmitYourJoke;
