import React, { useEffect, useState } from "react";
import AktivGroteskText from "../AktivGroteskText";
import AddressModal from "../AddressModal";
import AddressCard from "@/components/AddressCard";
import useAppSelector from "@/hooks/useSelector";
import { AddressModalType } from "@/types";
import { useGetUserProfileDetails } from "@/api/hooks/ProfileHooks";
import useAppDispatch from "@/hooks/useDispatch";
import { updateUser } from "@/store/profile/profile.slice";

const UserAddressCard = ({
  addressTextField,
  addClickableText,
  setAsDefault,
}: {
  addressTextField: string;
  addClickableText: string;
  setAsDefault: string;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { addresses } = useAppSelector((state) => state.profile);
  const { data: userProfileData } = useGetUserProfileDetails({ open });

  useEffect(() => {
    if (userProfileData?.ok) {
      const { data } = userProfileData?.data ?? {};
      dispatch(updateUser({ user: { ...data?.user } }));
      
    }
  }, [userProfileData, dispatch]);

  return (
    <div className="bg-white p-[16px] md:py-[25px] md:px-[33px] gap-[10px] flex flex-col md:gap-[32px] rounded-[5px] md:rounded-[20px]">
      <div className="flex justify-between items-center">
        <AktivGroteskText
          text={addressTextField}
          fontSize="text-[16px] md:text-[28px]"
          fontWeight="font-[700]"
        />
        <button
          onClick={() => setOpen(true)}
          disabled={addresses?.length === 3}
          className={`bg-transparent shadow-none ${addresses?.length === 3 ? 'text-[#999999]' : 'text-[#11A64B]'} p-0 m-0 font-[500] text-[12px] md:text-[24px]`}
        >
          {addClickableText}
        </button>
      </div>
      {addresses?.length > 0 && (
        <div className="flex flex-col gap-2 md:gap-[20px]">
          {addresses?.map((address, index) => (
            <AddressCard
              addressLength={addresses?.length}
              address={address}
              index={index}
              allowBottomBorder={index !== addresses.length - 1}
              key={address?.id}
              setAsDefault={setAsDefault}
            />
          ))}
        </div>
      )}
      {open && (
        <AddressModal
          type={AddressModalType.ADD}
          open={open}
          setOpen={setOpen}
          addressLength={addresses?.length}
        />
      )}
    </div>
  );
};

export default UserAddressCard;
