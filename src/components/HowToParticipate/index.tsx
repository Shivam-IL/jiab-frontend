import React from "react";
import { aktivGrotesk } from "@/app/layout";
import SvgIcons from "../common/SvgIcons";
import { ICONS_NAMES } from "@/constants";

const HowToParticipate: React.FC = () => {
  const steps = [
    {
      stepNumber: "Step 1",
      icon: ICONS_NAMES.STEP_1,
      title: "Buy a Sprite®",
      subtitle: "Promotion Pack",
      color: "#00953B", // Green
    },
    {
      stepNumber: "Step 2",
      icon: ICONS_NAMES.STEP_2,
      title: "Enter the code from",
      subtitle: "behind the label to collect Comic Coins",
      color: "#00953B", // Green
    },
    {
      stepNumber: "Step 3",
      icon: ICONS_NAMES.STEP_3,
      title: "Engage with the site",
      subtitle: "to collect extra Comic Coins",
      color: "#00953B", // Green
    },
    {
      stepNumber: "Step 4",
      icon: ICONS_NAMES.STEP_4,
      title: "Climb up the",
      subtitle: "leaderboard & win* rewards",
      color: "#00953B", // Green
    },
  ];

  const StepItem = ({ step }: { step: (typeof steps)[0] }) => (
    <div className="flex flex-col items-center text-center">
      {/* Icon */}
      <div className="mb-2 md:mb-6">
        <SvgIcons name={step.icon} className="w-24 h-[40px] md:w-24 md:h-24" />
      </div>

      {/* Step Number */}
      <h3
        className={`${aktivGrotesk.className} text-[8px] md:text-2xl font-semibold mb-1 md:mb-3`}
        style={{ color: step.color }}
      >
        {step.stepNumber}
      </h3>

      {/* Title and Subtitle */}
      <div className="space-y-1">
        <p
          className={`${aktivGrotesk.className} text-[8px] md:text-lg text-black font-[500]`}
        >
          {step.title}
          <br />
          {step.subtitle}
        </p>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-white py-[7px] md:py-16 rounded-[5px] md:rounded-[33.33px]">
      <div className="container mx-auto px-2 md:px-4">
        {/* Title */}
        <h2
          className={`${aktivGrotesk.className} text-center text-[16px] md:text-4xl font-bold text-black mb-[10px] md:mb-16`}
        >
          How to Participate
        </h2>

        {/* Grid for both mobile and desktop */}
        <div className="grid grid-cols-4 gap-2 md:gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <StepItem key={index} step={step} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowToParticipate;
