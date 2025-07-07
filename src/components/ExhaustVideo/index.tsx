import React from "react";
import { LANGUAGE_MNEMONICS } from "@/constants";

const languageButtons = [
  { label: "English", code: LANGUAGE_MNEMONICS.ENGLISH },
  { label: "हिंदी", code: LANGUAGE_MNEMONICS.HINDI },
  { label: "తెలుగు", code: LANGUAGE_MNEMONICS.TELUGU },
  { label: "ଓଡ଼ିଆ", code: LANGUAGE_MNEMONICS.ORIYA },
  { label: "বাংলা", code: LANGUAGE_MNEMONICS.BENGALI },
  { label: "मराठी", code: LANGUAGE_MNEMONICS.MARATHI },
  { label: "ಕನ್ನಡ", code: LANGUAGE_MNEMONICS.KANNADA },
  { label: "भोजपुरी", code: LANGUAGE_MNEMONICS.BHOJPURI },
  { label: "मैथिली", code: LANGUAGE_MNEMONICS.MAITHILI },
  { label: "தமிழ்", code: LANGUAGE_MNEMONICS.TAMIL },
  { label: "ತುಳು", code: LANGUAGE_MNEMONICS.TULU },
];

interface ExhaustVideoProps {
  selectedLanguage: string;
  onLanguageSelect: (code: string) => void;
  headerText: string;
  subText: string;
}

const ExhaustVideo: React.FC<ExhaustVideoProps> = ({
  selectedLanguage,
  onLanguageSelect,
  headerText,
  subText,
}) => {
  // Arrange buttons in pairs for grid layout
  const buttonRows = [];
  for (let i = 0; i < languageButtons.length; i += 2) {
    buttonRows.push(languageButtons.slice(i, i + 2));
  }

  return (
    <div className="md:min-h-screen min-h-[calc(100vh-53px)] flex flex-col items-center justify-center bg-white px-4 md:w-[442px] w-full">
      <div className="text-center">
        <h1 className="text-[15px] font-bold mb-4 w-[279px]">{headerText}</h1>
        <p className="text-[14px] mb-8 w-[279px]">{subText}</p>
        <div className="flex flex-col gap-4">
          {buttonRows.map((row, i) => (
            <div key={i} className="flex flex-row gap-6 justify-center">
              {row.map((lang) => (
                <button
                  key={lang.code}
                  className={`px-8 w-[117.06px] py-2 border border-black rounded-full text-[14px] transition ${
                    selectedLanguage === lang.code
                      ? "bg-green text-white cursor-not-allowed"
                      : "hover:bg-green hover:text-white"
                  }`}
                  onClick={() => onLanguageSelect(lang.code)}
                  disabled={selectedLanguage === lang.code}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExhaustVideo;
