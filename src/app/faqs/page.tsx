"use client";
import React, { useEffect, useState } from "react";
import MobileTempNavBar from "@/components/common/MobileTempNavBar";
import ScreenWrapper from "@/components/common/ScreenWrapper";
import Header from "@/components/common/Header/Header";

const page: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqData = [
    {
      question: "What prizes are available to be won?",
      answer:
        "Sprite® Joke In A Bottle is an online comedy portal owned by Coca-Cola India Private Limited. It serves exclusive jokes from India's top comedians in multiple languages. It also allows users to engage with these jokes in multiple ways, participate in promotions, submit their own jokes, and explore jokes submitted by other users.",
    },
    {
      question: "How do I participate in the contest?",
      answer:
        "To participate, simply visit our website, create an account, and follow the contest guidelines. You can submit your entries through the designated submission portal and track your progress through your dashboard.",
    },
    {
      question: "When will the winners be announced?",
      answer:
        "Winners will be announced at the end of each contest period. You'll be notified via email and the results will also be posted on our website and social media channels.",
    },
    {
      question: "Are there any age restrictions?",
      answer:
        "Yes, participants must be at least 18 years old to enter the contest. Valid identification may be required for prize verification.",
    },
    {
      question: "Can I submit multiple entries?",
      answer:
        "The number of entries allowed depends on the specific contest rules. Please check the terms and conditions for each contest to understand the submission limits.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <>
      <MobileTempNavBar
        title="FREQUENTLY ASKED QUESTIONS"
        subtitle="Hello curious beings, here are all the answers!"
      />
      <ScreenWrapper className="px-4 md:mt-0 mt-[-30px]">
        <Header
          title="Frequently Asked Questions"
          description="Hello curious beings, here are all the answers!"
          className="md:block hidden mt-[100px] max-w-4xl mx-auto px-6"
        />

        <div className="max-w-4xl mx-auto mt-8 md:mt-12 mb-16">
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-200 overflow-hidden transition-all duration-300 max-w-4xl"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-[16px] md:py-[24px] text-left flex justify-between items-center"
                  aria-expanded={openFAQ === index}
                >
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 pr-4">
                    {index + 1}. {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openFAQ === index ? (
                      <svg
                        className="w-5 h-5 md:w-6 md:h-6 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18 12H6"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 md:w-6 md:h-6 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    )}
                  </div>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-out overflow-hidden ${
                    openFAQ === index
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="mt-[-4px] px-6 md:px-8 pb-4 md:pb-6">
                      <div className="border-t border-gray-100">
                        <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScreenWrapper>
    </>
  );
};

export default page;
