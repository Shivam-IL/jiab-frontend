"use client";

import React from "react";
import { Dialog, DialogOverlay, DialogPortal } from "@/components/ui/dialog2";
import { ILoginSignupWrapper } from "@/interfaces";
import { aktivGrotesk } from "@/app/layout";
import * as DialogPrimitive from "@radix-ui/react-dialog";

export const AuthHeading: React.FC<{ title: string }> = ({ title }) => {
  return (
    <span
      className={`${aktivGrotesk.className} uppercase font-[700] text-[20px]`}
    >
      {title}
    </span>
  );
};

const LoginSignupWrapper: React.FC<ILoginSignupWrapper> = ({
  children,
  open,
  setOpen,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-50 md:bg-[#000000bd] bg-[#666] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 grid w-full rounded-[5px] md:max-w-[401px] max-w-[346px] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-300 ease-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-100 data-[state=closed]:slide-out-to-top-[-100%] data-[state=open]:slide-in-from-top-[-100%]">
          {children}
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
};

export default LoginSignupWrapper;
