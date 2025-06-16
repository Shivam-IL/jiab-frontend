"use client";
import React, { useState, useEffect } from "react";
import MobileTempNavBar from "@/components/common/MobileTempNavBar";
import ScreenWrapper from "@/components/common/ScreenWrapper";
import Header from "@/components/common/Header/Header";
import { useCMSData } from "@/data";

const Page: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const cmsData = useCMSData(mounted);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Helper function to safely render HTML content
  const createMarkup = (htmlString: string) => {
    return { __html: htmlString };
  };

  const faqData = [
    {
      question: "What is Sprite® Joke In A Bottle?",
      answer:
        "<strong>Sprite® Joke In A Bottle</strong> is an online comedy portal owned by <em>Coca-Cola India Private Limited</em>. It serves exclusive jokes from India's top comedians in multiple languages. It also allows users to engage with these jokes in multiple ways, participate in promotions, submit their own jokes, and explore jokes submitted by other users.",
    },
    {
      question: "What is Sprite® Joke In A Bottle Promotion?",
      answer:
        '<strong>Sprite® Joke-In-A-Bottle Promotion</strong> ("Promotion") is an online promotion activity where all consumers of Sprite® are invited to participate and win <strong>Prizes worth up to Rs.25,000</strong>.',
    },
    {
      question: "What are the Prizes available to be won?",
      answer:
        "<ul><li><strong>MakeMyTrip gift cards worth Rs.25000:</strong> Top five (5) users daily on the Leaderboard will win this Prize. Users can win this Prize only once during the Promotion Period per mobile number.</li><li><strong>PhonePe gift card worth Rs.10:</strong> Upon entering a valid unique code from behind the label of a Sprite® promotion pack, a participant will win this reward. There are a total of 100 rewards of this type available to be won each hour on a first-come-first served basis. A user can win maximum of 5 PhonePe rewards in a day, and a maximum of fifty (50) PhonePe gift cards during the Promotion Period.</li></ul>",
    },
    {
      question: "What is the Promotion duration & timings?",
      answer:
        'This Promotion will commence at <strong>08:00:00 pm Indian Standard Time ("IST")</strong> on <strong>15th July 2024</strong> ("Start Date") and will continue until <strong>15th November 2024 07:59:59 pm IST</strong> ("End Date") ("Promotion Period"). Entries received outside the Promotion Period shall not be eligible for the Prize(s) and shall not be carried forward to any other promotional scheme ahead.',
    },
    {
      question: "On which product is this Promotion applicable?",
      answer:
        "The offer is applicable on purchase of any <strong>250ml, 300ml, 400ml, 500ml, 600ml, 750ml, 1L, 1.25L, 1.5L, 2L, 2.25L PET packs</strong> of <strong>Sprite® brand</strong> only.",
    },
    {
      question: "How do I participate?",
      answer:
        "In order to participate in this promotion, you need to:<br/><br/><strong>1.</strong> Buy a Sprite® Promotion Product<br/><strong>2.</strong> Scan the QR code on the label to visit the official Sprite® WhatsApp channel<br/><strong>3.</strong> Press 'Send' on the autotyped message on the Sprite® channel to begin the conversation with the Sprite® WhatsApp bot<br/><strong>4.</strong> Continue to explore our jokes or react to them to collect Comic Coins<br/><strong>5.</strong> Visit the Sprite® website through a link provided therein and continue participating in the Promotion by entering the unique code behind the label of the Sprite® pack, or engaging in other activities, to collect more Comic Coins in the process<br/><br/>Basis your collected Comic Coins you can progress up the Leaderboard to win Prize(s).",
    },
    {
      question: "Why do I need to consent to TnCs?",
      answer:
        "We need you to <strong>login/register</strong> and consent to our <strong>Terms and Conditions</strong> so we can verify your participation eligibility, disburse your prizes, and notify you on your win.",
    },
    {
      question: "What is a unique code?",
      answer:
        "A unique code is a <strong>10-digit alphanumeric code</strong> printed behind the label of a Sprite® promotion pack. You can enter the unique code on the Unique Code page made available on the Promotion website to participate in the Promotion. You can collect <strong>20 Comic Coins</strong> and also win <strong>PhonePe cashback worth Rs.10</strong> for every valid unique code entered, subject to the T&Cs of the Promotion.",
    },
    {
      question:
        "Is there a limit on how many times I can win PhonePe cashback?",
      answer:
        "You can enter up to <strong>5 valid unique codes in a day</strong> and win <strong>5 PhonePe cashbacks</strong> in lieu of the unique codes, subject to the T&Cs of the Promotion. You can win the PhonePe cashbacks up to <strong>50 times</strong> during the entire Promotion Period.",
    },
    {
      question: "What is a Comic Coin?",
      answer:
        "A <strong>Comic Coin</strong> is a <em>digital currency</em> that you can collect by engaging with the Sprite® Joke in A Bottle WhatsApp chatbot or Website, or by entering the unique code from behind the label of a Sprite® promotion pack. It can be used to participate in the Promotion to win Prize(s).",
    },
    {
      question:
        "How do I collect Comic Coins on the Sprite® Joke In A Bottle WhatsApp chatbot?",
      answer:
        "You can collect Comic Coins for engaging with the WhatsApp channel by reacting to the jokes with one of the emojis as served after the joke – <strong>One (1) Comic Coin per joke</strong>. You can react to a joke any number of times but can earn Coins only once per joke.",
    },
    {
      question:
        "How do I collect Comic Coins on the Sprite® Joke In A Bottle Website?",
      answer:
        "You can collect Comic Coins for engaging with the Website by:<br/><br/><strong>a.</strong> Entering Unique Code - <strong>Twenty (20) Comic Coins</strong> per valid unique code entered from behind the label of Sprite® promotion pack.<br/><strong>b.</strong> Reacting to a Joke available on the site - <strong>One (1) Comic Coin</strong> per joke. You can react to a joke any number of times but can earn Coins only once per joke.<br/><strong>c.</strong> Vote for favourite joke – <strong>One (1) Comic Coin</strong> per Vote. You can vote once per week across each language of user submitted jokes only – these will be listed under the JokeBox section of the Promotion Website.<br/><strong>d.</strong> Referring friends – <strong>Five (5) Comic Coins</strong> per referral, credited only when referee registers and enters your unique Referral Code on the Promotion Website. You can refer any number of friends.<br/><strong>e.</strong> Using your friend's invite code – You get <strong>One (1) coin</strong> for using your friend's Referral Code on the Promotion Website post signing up.<br/><strong>f.</strong> Completing profile – Get <strong>ten (10) coins</strong> for completing your profile on the Website.",
    },
    {
      question: "Where can I see how many Comic Coins I have collected so far?",
      answer:
        "Collected Comic Coins across the Sprite® WhatsApp channel and the Website will be visible (<strong>15th November 2024</strong>). Basis the coins collected you will progress up the Leaderboard and can unlock Prize(s) basis Leaderboard position in the Comic Coins section of the Website and will be valid through the end of the Promotion.",
    },
    {
      question: "When does the winning day start and end?",
      answer:
        "A day for the purposes of this Promotion will start <strong>08:00 pm every day</strong> and end <strong>07:59 pm the subsequent day</strong> during the Promotion Period.",
    },
    {
      question: "Will I be given a choice of which Prize(s) I want?",
      answer:
        "<strong>No.</strong> Prize(s) get allocated to you, if eligible, basis your position on the Leaderboard.",
    },
    {
      question: "How many times can I win during this Promotion?",
      answer:
        "You can participate in the Promotion multiple times during the Promotion Period, but you will be eligible to win up to a maximum of <strong>one (1) MakeMyTrip gift card</strong>, and <strong>fifty (50) PhonePe gift cards</strong> per mobile number during the Promotion Period.",
    },
    {
      question: "When and where will the Prize(s) be announced?",
      answer:
        "The <strong>PhonePe cashback winning notification</strong> will be instantly shared with the participant upon entering a valid unique code. The <strong>MakeMyTrip gift card rewards</strong> will be announced every day at <strong>8:00:00 pm</strong> for the previous day. A day for the purposes of this Promotion starts at 8:00:00pm every day and ends at 7:59:59pm the next day. The winners list for any previous day can be accessed by selecting the date from the calendar on top of the Leaderboard section of the Promotion Website.",
    },
    {
      question:
        "Where can I check if I have won the MakeMyTrip gift card or not?",
      answer:
        "You can access details of your collected Prize(s) on the <strong>Comic Coins page</strong> of the Promotion Website.",
    },
    {
      question: "How can I redeem my Prize(s)?",
      answer:
        "If you are a Winner, you will be notified on the Promotion Website as well as via <strong>SMS/WhatsApp/Email</strong> on your winning status and next steps to redeem your Prize(s). You will be provided with voucher code and link to partner site for redemption. All digital vouchers must be redeemed latest by <strong>31st December 2024</strong>. You may also choose to save Gift Tax by clicking on <strong>'Save Gift Tax'</strong> option and submitting your PAN card details.",
    },
    {
      question: "What is the 'Leaderboard'?",
      answer:
        "The <strong>Leaderboard</strong> is where the top participants of the day are listed along with their scores and ranks. You can also see your own rank and score here. Depending on your position on the Leaderboard, you may/may not be eligible for the MakeMyTrip reward on that day. You can also access winner list of a previous day by clicking on the calendar icon and selecting the corresponding date.",
    },
    {
      question: "What is the 'Surprise Me'?",
      answer:
        "You can pull any <em>random joke</em> by simply clicking on this.",
    },
    {
      question:
        "I am unable to pull more jokes on the WhatsApp bot. What happened?",
      answer:
        "You can explore a maximum of <strong>three jokes in a day</strong> on our WhatsApp bot.",
    },
    {
      question:
        "I am unable to pull more jokes using 'Surprise Me' on the Website. What happened?",
      answer:
        "You can explore a maximum of <strong>three jokes in a day</strong> on our Website.",
    },
    {
      question: "What is the 'PJ challenge'?",
      answer:
        "We brought back our famous <strong>PJ Challenge</strong> with a bang! Submit your own jokes, if it passes our moderation standards, it will be listed on the Sprite® Joke in A Bottle website!",
    },
    {
      question: "How many jokes can I submit in a day?",
      answer: "You can submit a maximum of <strong>5 jokes per day</strong>.",
    },
    {
      question: "I submitted a joke in the 'PJ challenge', what happens next?",
      answer:
        "Sit back and relax, we are reviewing your joke. You will be notified within <strong>14 business days</strong> of you joke submission on whether it passed our moderation standards. If your joke passes, it can get listed in our <strong>JokeBox</strong>. If other users find it funny and vote for your joke, it gets featured in the <strong>Hall-Of-Lame</strong> on the Promotion Website!",
    },
    {
      question: "What is the 'JokeBox'?",
      answer:
        "Jokes submitted by users of the Sprite® Joke In A Bottle WhatsApp channel or Website get listed in the <strong>JokeBox</strong>, upon passing the evaluation at our end. Go ahead and explore these for more laughs and vote for your favourite one. If you have submitted one yourself, check whether it got featured here.",
    },
    {
      question: "What is the 'Hall-Of-Lame'?",
      answer:
        "<strong>Hall-Of-Lame</strong> is the fun name we gave to the <em>Joke Leaderboard</em> where all the funniest PJs submitted by our users are listed. Only Jokes that got <strong>Voted</strong> on by other users get featured here. Get your friends voting for your joke and get on top of the Hall-of-Lame for <strong>bragging rights</strong>!",
    },
    {
      question:
        "Will Sprite® Joke In A Bottle verify the originality of submitted jokes?",
      answer:
        "<strong>Yes</strong>, we will conduct checks to uphold the integrity of submitted jokes.",
    },
    {
      question:
        "I saw a Joke listed in the JokeBox that is plagiarized from another source. What do I do?",
      answer:
        "Ah! While we try to evaluate all jokes for appropriateness and originality, a few may slip our notice. You can be a hero and <strong>report the joke</strong> using the Report feature against each joke listed in our JokeBox. You will need to also provide the original source of the joke (as a link to the website or app where you saw it), we will evaluate your report within <strong>14 business days</strong>, and if found valid, we will take the reported joke down and inform the submitter.",
    },
    {
      question: "How do I refer a friend & what do I get for it?",
      answer:
        "Once you've signed up on the Joke-in-a-Bottle Promotion Website or WhatsApp bot successfully, you can invite your friends to join in the fun from the <strong>'Refer-a-Friend'</strong> option in the Menu or on the homepage or contest page. You'll get <strong>+5 Comic Coins</strong> for every successful referral you make. Your buddy that signs up with your referral code gets <strong>+1 Comic Coin</strong> too. Sounds like a win-win!",
    },
    {
      question: "How to redeem your MakeMyTrip gift card?",
      answer:
        "<ul><li>Visit <a href='https://www.makemytrip.com/' target='_blank' rel='noopener noreferrer'><strong>https://www.makemytrip.com/</strong></a> or download the MakeMyTrip app.</li><li>Search for your desired flight or hotel and proceed through booking.</li><li>During checkout, select <strong>'Gift Card'</strong> as your payment method (website: 'More Options').</li><li>Enter your <strong>16-digit gift card number</strong> and <strong>6-digit PIN</strong>.</li><li>If your balance is insufficient, use other listed methods to complete your purchase.</li></ul>",
    },
    {
      question: "How to Redeem PhonePe Cashback?",
      answer:
        "<ul><li>Open the <strong>PhonePe mobile app</strong> and navigate to the <strong>'My Profile'</strong> section.</li><li>Within 'My Profile,' locate the <strong>'PhonePe Gift Card'</strong> section under 'Payment Methods.'</li><li>Click on the <strong>'Claim Now'</strong> button.</li><li>Enter the <strong>16-digit Gift Card Number</strong> and the corresponding <strong>6-digit PIN</strong> to add the Gift Card balance to your PhonePe wallet.</li><li>The value of the Gift Card will be reflected in your PhonePe Gift Card balance.</li></ul>",
    },
    {
      question: "I have more questions.",
      answer:
        "Please get in touch with us at <a href='mailto:indiahelpline@coca-cola.com'><strong>indiahelpline@coca-cola.com</strong></a> or call us at <strong>1800-208-2653</strong> (Timings: <em>09:00am-09:00pm Mon-Sat, 09:00am-06:00pm Sun</em>).",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <>
      <MobileTempNavBar
        title={cmsData?.faq?.faqHeading.toUpperCase()}
        subtitle={cmsData?.faq?.faqSubHeading}
      />
      <ScreenWrapper className="px-4 md:mt-0 mt-[-30px]">
        <Header
          title={cmsData?.faq?.faqHeading}
          description={cmsData?.faq?.faqSubHeading}
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
                        <div
                          className="text-sm md:text-base text-gray-700 leading-relaxed mt-4 faq-content"
                          dangerouslySetInnerHTML={createMarkup(faq.answer)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScreenWrapper>
      <style jsx>{`
        .faq-content ul {
          list-style-type: none;
          padding-left: 0;
          margin: 16px 0;
        }
        .faq-content li {
          margin-bottom: 8px;
          padding-left: 16px;
          position: relative;
        }
        .faq-content li:before {
          content: "•";
          position: absolute;
          left: 0;
          color: #666;
          font-weight: bold;
        }
        .faq-content a {
          color: blue;
          text-decoration: underline;
        }
        .faq-content a:hover {
          color: blue;
        }
        .faq-content strong {
          font-weight: 600;
        }
        .faq-content em {
          font-style: italic;
        }
      `}</style>
    </>
  );
};

export default Page;
