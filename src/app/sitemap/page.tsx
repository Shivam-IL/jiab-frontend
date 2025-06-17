"use client";
import React, { useState } from "react";
import Header from "@/components/common/Header/Header";
import MobileTempNavBar from "@/components/common/MobileTempNavBar";
import ScreenWrapper from "@/components/common/ScreenWrapper";
import Link from "next/link";
import ContactCard from "@/components/ContactCard";

// Homepage links data
const homepageLinks = [
  { href: "/user-generated-jokes", label: "Joke Box", id: 1 },
  { href: "/hall-of-lame", label: "Hall Of Lame", id: 2 },
  { href: "/wallet", label: "Wallet", id: 3 },
  { href: "/contest", label: "Contest", id: 4 },
  { href: "/profile", label: "My Profile", id: 5 },
];

// Footer links data
const footerLinks = [
  { href: "/faq", label: "FAQ's", id: 1 },
  { href: "/privacy-policy", label: "Privacy Policy", id: 2 },
  { href: "/terms-and-conditions", label: "Terms & Conditions", id: 3 },
  { href: "", label: "Contact Us", isContactUs: true, id: 4 },
];

const Sitemap = () => {
  const [isContactCardOpen, setIsContactCardOpen] = useState(false);

  const handleContactUsClick = () => {
    setIsContactCardOpen(true);
  };

  return (
    <>
      <MobileTempNavBar title="Sitemap" />
      <ScreenWrapper className=" md:pt-[10rem] mt-[-30px] md:min-h-[calc(100vh-20rem)]">
        <div className="mx-[156px]">
          <Header title="Homepage" className="mt-[-10px] pb-[12px]" />

          <ul className="md:text-[20px] text-[16px] md:leading-[32px]">
            {homepageLinks.map((link) => (
              <li key={link.id}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>

          <Header title="Footer" className="mt-[24px]" />
          <ul className="md:text-[20px] text-[16px] md:leading-[32px]">
            {footerLinks.map((link) => (
              <li key={link.id}>
                {link.isContactUs ? (
                  <button
                    onClick={handleContactUsClick}
                    className="text-left"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link href={link.href}>{link.label}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </ScreenWrapper>

      <ContactCard
        isOpen={isContactCardOpen}
        onClose={() => setIsContactCardOpen(false)}
      />
    </>
  );
};

export default Sitemap;
