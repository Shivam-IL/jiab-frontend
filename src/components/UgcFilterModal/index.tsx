import React, { useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import SvgIcons from "../common/SvgIcons";
import { ICONS_NAMES } from "@/constants";
import { IUgcFilterModal } from "@/interfaces";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { ChevronDown } from "lucide-react";
import AktivGroteskText from "../common/AktivGroteskText";
import GreenCTA from "../GreenCTA";

const languageOptions = [
  { value: "english", label: "English" },
  { value: "hindi", label: "हिन्दी" },
  { value: "marathi", label: "मराठी" },
  { value: "telugu", label: "తెలుగు" },
  { value: "bengali", label: "বাংলা" },
  { value: "kannada", label: "ಕನ್ನಡ" },
  { value: "odia", label: "ଓଡ଼ିଆ" },
  { value: "bhojpuri", label: "भोजपुरी" },
  { value: "maithili", label: "मैथिली" },
];

const categoryOptions = [
  { value: "all", label: "All Categories" },
  { value: "entertainment", label: "Entertainment" },
  { value: "news", label: "News" },
  { value: "sports", label: "Sports" },
  { value: "education", label: "Education" },
];

const UgcFilterModal: React.FC<IUgcFilterModal> = ({
  open,
  onClose,
  onApply,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const handleApply = () => {
    if (onApply) {
      onApply({
        language: selectedLanguage,
        category: selectedCategory,
      });
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[343px] rounded-[10px] py-[16px] px-[16px]">
        <div className="flex items-center justify-end pb-[8px]">
          <button
            onClick={onClose}
            className="border-none outline-none bg-transparent hover:opacity-70 transition-opacity"
          >
            <SvgIcons name={ICONS_NAMES.CROSS} className="w-[16px] h-[16px]" />
          </button>
        </div>
        <div className="flex flex-col gap-[16px]">
          <AktivGroteskText
            text="Pick your chill mode"
            fontSize="text-[16px]"
            fontWeight="font-[700]"
          />
          <div className="w-full flex justify-end">
            <button
              onClick={() => {
                setSelectedLanguage("");
                setSelectedCategory("");
                setIsLanguageOpen(false);
                setIsCategoryOpen(false);
              }}
              className="border-none outline-none bg-transparent"
            >
              <AktivGroteskText
                className="text-[#1985D3]"
                text="Clear Filters"
                fontSize="text-[10px]"
                fontWeight="font-[400]"
              />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col gap-6">
            <div className="space-y-2">
              <div
                className="flex items-center justify-between py-[16px] px-[20px] border-[1px] border-gray-200 rounded-full cursor-pointer"
                onClick={() => {
                  setIsLanguageOpen(!isLanguageOpen);
                  setIsCategoryOpen(false);
                }}
              >
                <span
                  className={!selectedLanguage ? "text-[rgba(0,0,0,0.3)]" : ""}
                >
                  {selectedLanguage
                    ? languageOptions.find(
                        (opt) => opt.value === selectedLanguage
                      )?.label
                    : "Select Language"}
                </span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    isLanguageOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
              {isLanguageOpen && (
                <RadioGroup
                  value={selectedLanguage}
                  onValueChange={(value) => {
                    setSelectedLanguage(value);
                    setIsLanguageOpen(false);
                  }}
                  className="flex flex-col gap-[8px] px-[15px] py-[13px] border border-gray-200 rounded-[10px] "
                >
                  {languageOptions.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50"
                    >
                      <RadioGroupItem
                        value={option.value}
                        id={`language-${option.value}`}
                      />
                      <Label
                        htmlFor={`language-${option.value}`}
                        className="flex-grow cursor-pointer text-[12px] font-[400]"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </div>

            <div className="space-y-2">
              <div
                className="flex items-center justify-between py-[16px] px-[20px] border-[1px] border-gray-200 rounded-full cursor-pointer"
                onClick={() => {
                  setIsCategoryOpen(!isCategoryOpen);
                  setIsLanguageOpen(false);
                }}
              >
                <span
                  className={!selectedCategory ? "text-[rgba(0,0,0,0.3)]" : ""}
                >
                  {selectedCategory
                    ? categoryOptions.find(
                        (opt) => opt.value === selectedCategory
                      )?.label
                    : "Select Category"}
                </span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    isCategoryOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
              {isCategoryOpen && (
                <RadioGroup
                  value={selectedCategory}
                  onValueChange={(value) => {
                    setSelectedCategory(value);
                    setIsCategoryOpen(false);
                  }}
                  className="flex flex-col gap-[8px] px-[15px] py-[13px] border border-gray-200 rounded-[10px]"
                >
                  {categoryOptions.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50"
                    >
                      <RadioGroupItem
                        value={option.value}
                        id={`category-${option.value}`}
                      />
                      <Label
                        htmlFor={`category-${option.value}`}
                        className="flex-grow cursor-pointer text-[12px] font-[400]"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </div>
          </div>

          <GreenCTA
            onClick={handleApply}
            text="Apply"
            className="w-full"
            paddingClass="pt-[19px] pb-[14px]"
            fontSize="text-[16px]"
            fontWeight="font-[700]"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UgcFilterModal;
