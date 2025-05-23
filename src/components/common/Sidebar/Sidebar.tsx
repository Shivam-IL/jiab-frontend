"use client";
import React, { useEffect, useState } from "react";
import {
  X,
  Home,
  Trophy,
  Search,
  ChevronRight,
  ChevronDown,
  MessageCircle,
  Phone,
  HelpCircle,
  FileText,
  Shield,
  LogOut,
} from "lucide-react";
import Image from "next/image";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  spriteLogo?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, spriteLogo }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);

  const mainMenuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Trophy, label: "Contest", href: "/contest" },
  ];

  const exploreSubItems = [
    { label: "Scroll & LOL", href: "/explore/scroll-lol" },
    { label: "PJ Challenge?", href: "/explore/pj-challenge" },
    { label: "Pick your mood", href: "/explore/mood" },
    { label: "Joke Box", href: "/explore/jokes" },
    { label: "HALL-OF-LAME 😊", href: "/explore/hall-of-lame" },
    { label: "Refer A Friend", href: "/explore/refer" },
    { label: "Have an Invite Code?", href: "/explore/invite" },
  ];

  const bottomMenuItems = [
    { icon: Phone, label: "Contact Us", href: "/contact" },
    { icon: HelpCircle, label: "FAQs", href: "/faqs" },
    { icon: FileText, label: "Terms & Conditions", href: "/terms" },
    { icon: Shield, label: "Privacy Policy", href: "/privacy" },
  ];

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black z-[60] transition-all duration-300 ease-out ${
          isOpen ? "bg-opacity-70 visible" : "bg-opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-70 bg-white z-[70] transform transition-all duration-300 ease-out shadow-2xl scrollbar-hide ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } overflow-y-auto`}
      >
        {/* User Profile Section */}
        <div
          className={`mt-5 mx-4 bg-[#fef6b3] transition-all duration-500 delay-100 rounded-lg ${
            isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  
                </span>
              </div>
              <div className="ml-3">
                <h3 className="font-bold text-gray-800">Satvik Sharma</h3>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-gray-800">2</span>
                  {spriteLogo && (
                    <Image
                      src={spriteLogo}
                      alt="Sprite"
                      className="h-5 ml-1"
                      width={20}
                      height={20}
                    />
                  )}
                </div>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-4 px-2">
          <ul className="space-y-1">
            {/* Main Menu Items */}
            {mainMenuItems.map((item, index) => (
              <li
                key={index}
                className={`transition-all duration-300 ease-out ${
                  isOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-8"
                }`}
                style={{
                  transitionDelay: isOpen ? `${100 + index * 50}ms` : "0ms",
                }}
              >
                <a
                  href={item.href}
                  className="flex items-center justify-between px-4 py-3 mx-2 text-gray-700 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-lime-50 hover:shadow-sm transition-all duration-200 group"
                  onClick={onClose}
                >
                  <div className="flex items-center">
                    <item.icon className="h-5 w-5 text-gray-600 mr-3" />
                    <span className="font-medium text-gray-800">
                      {item.label}
                    </span>
                  </div>
                </a>
              </li>
            ))}

            {/* Explore Section */}
            <li
              className={`transition-all duration-300 ease-out ${
                isOpen
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
              style={{
                transitionDelay: isOpen
                  ? `${100 + mainMenuItems.length * 50}ms`
                  : "0ms",
              }}
            >
              <button
                onClick={() => setIsExploreOpen(!isExploreOpen)}
                className="w-full flex items-center justify-between px-4 py-3 mx-2 text-gray-700 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-lime-50 hover:shadow-sm transition-all duration-200 group"
              >
                <div className="flex items-center">
                  <Search className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="font-medium text-gray-800">Explore</span>
                </div>
                {isExploreOpen ? (
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                )}
              </button>

              {/* Explore Sub-items */}
              {isExploreOpen && (
                <ul className="mt-2 ml-8 space-y-1">
                  {exploreSubItems.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <a
                        href={subItem.href}
                        className="block px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all duration-200"
                        onClick={onClose}
                      >
                        {subItem.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Vote Button */}
            <li
              className={`transition-all duration-300 ease-out ${
                isOpen
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
              style={{
                transitionDelay: isOpen
                  ? `${100 + (mainMenuItems.length + 1) * 50}ms`
                  : "0ms",
              }}
            >
              <div className="mx-4 my-4">
                <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200">
                  Vote for the funniest PJs
                  <br />
                  Collect Comic Coins!
                </button>
              </div>
            </li>

            {/* Text me, Maybe? */}
            <li
              className={`transition-all duration-300 ease-out ${
                isOpen
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
              style={{
                transitionDelay: isOpen
                  ? `${100 + (mainMenuItems.length + 2) * 50}ms`
                  : "0ms",
              }}
            >
              <div className="flex items-center justify-between px-4 py-3 mx-2">
                <span className="text-gray-800 font-medium">
                  Text me, Maybe?
                </span>
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full flex items-center text-sm transition-colors duration-200">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Chat
                </button>
              </div>
            </li>

            {/* Bottom Menu Items */}
            {bottomMenuItems.map((item, index) => (
              <li
                key={index}
                className={`transition-all duration-300 ease-out ${
                  isOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-8"
                }`}
                style={{
                  transitionDelay: isOpen
                    ? `${100 + (mainMenuItems.length + 3 + index) * 50}ms`
                    : "0ms",
                }}
              >
                <a
                  href={item.href}
                  className="flex items-center px-4 py-3 mx-2 text-gray-700 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-lime-50 hover:shadow-sm transition-all duration-200 group"
                  onClick={onClose}
                >
                  <item.icon className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="font-medium text-gray-800">
                    {item.label}
                  </span>
                </a>
              </li>
            ))}

            {/* Logout */}
            <li
              className={`transition-all duration-300 ease-out ${
                isOpen
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
              style={{
                transitionDelay: isOpen
                  ? `${
                      100 +
                      (mainMenuItems.length + 3 + bottomMenuItems.length) * 50
                    }ms`
                  : "0ms",
              }}
            >
              <button
                onClick={onClose}
                className="w-full flex items-center px-4 py-3 mx-2 text-green-600 hover:text-green-700 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-lime-50 hover:shadow-sm transition-all duration-200 group"
              >
                <LogOut className="h-5 w-5 mr-3" />
                <span className="font-medium">Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
