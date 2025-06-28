import { Dialog, DialogContent } from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import SvgIcons from "../SvgIcons";
import { ICONS_NAMES, REDUX_UPDATION_TYPES } from "@/constants";
import AktivGroteskText from "../AktivGroteskText";
import Input from "@/components/Input";
import GreenCTA from "@/components/GreenCTA";
import { Checkbox } from "@/components/ui/checkbox";
import useAppDispatch from "@/hooks/useDispatch";
import { IAddressData, IAddressError, IAddressModal } from "@/interfaces";
import {
  useAddNewAddress,
  useEditAddress,
  useGetPincodeData,
} from "@/api/hooks/ProfileHooks";
import { AddressModalType } from "@/types";
import { editAddress, updateAddresses } from "@/store/profile/profile.slice";
import useAppSelector from "@/hooks/useSelector";
import { useCMSData } from "@/data";
import {
  AddressCDPEventPayload,
  CDPEventPayloadBuilder,
} from "@/api/utils/cdpEvents";
import { useSendCDPEvent } from "@/api/hooks/CDPHooks";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

const AddressModal: React.FC<IAddressModal> = ({
  open,
  setOpen,
  type,
  addressId,
  addressLength,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cmsData = useCMSData(mounted);
  const { user } = useAppSelector((state) => state.profile);
  const { mutate: sendCDPEvent } = useSendCDPEvent();

  const [data, setData] = useState<IAddressData>({
    address_line_1: "",
    address_line_2: "",
    nearest_landmark: "",
    alternate_phone_number: "",
    pincode: "",
    state: "",
    city: "",
    default: false,
  });
  const [initialEditData, setInitialEditData] = useState<IAddressData>({
    address_line_1: "",
    address_line_2: "",
    nearest_landmark: "",
    alternate_phone_number: "",
    pincode: "",
    state: "",
    city: "",
    default: false,
  });

  const [error, setError] = useState<IAddressError>({
    address_line_1: "",
    pincode: "",
    state: "",
    city: "",
    alternate_phone_number: "",
  });

  const { addresses } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const {
    mutate: addNewAddress,
    isPending,
    data: addNewAddressData,
  } = useAddNewAddress();
  const { mutate: editNewAddress, data: editNewAddressData } = useEditAddress();

  const { mutate: getPincodeData, data: pincodeData } = useGetPincodeData();
  const router = useRouter();

  const handleChange = (key: string, value: string | boolean) => {
    if (key === "pincode") {
      const numericValue = value?.toString()?.replace(/[^0-9]/g, "");
      const valueString = numericValue?.slice(0, 6);
      setData({ ...data, [key]: valueString });
    } else if (key === "alternate_phone_number") {
      const numericValue = value?.toString()?.replace(/[^0-9]/g, "");
      const valueString = numericValue?.slice(0, 10);
      setData({ ...data, [key]: valueString ?? "" });
    } else {
      setData({ ...data, [key]: value });
    }
  };

  const trigger_CDP_ADD_ADDRESS = ({
    address_line_1,
    address_line_2,
    pincode,
    state,
    city,
  }: {
    address_line_1: string;
    address_line_2?: string;
    pincode: string;
    state: string;
    city: string;
  }) => {
    if (address_line_1 && pincode && state && city && user?.id) {
      const payload: AddressCDPEventPayload =
        CDPEventPayloadBuilder.buildAddAddressPayload({
          address_line1: address_line_1,
          address_line2: address_line_2 ?? "",
          address_city: city,
          address_state: state,
          geo_postal_code: pincode,
          user_identifier: user.id ?? "",
        });
      sendCDPEvent(payload);
    }
  };

  const submitAddress = () => {
    let errorValidation = false;
    if (data?.address_line_1 === "") {
      setError((prev) => ({
        ...prev,
        address_line_1: cmsData.validation.plusAddMyProfileAddress1Required,
      }));
      errorValidation = true;
    }
    if (data?.pincode?.length < 6) {
      setError((prev) => ({
        ...prev,
        pincode: cmsData.validation.plusAddMyProfilePincodeRequired,
      }));
      errorValidation = true;
    }
    if (data?.state === "") {
      setError((prev) => ({
        ...prev,
        state: cmsData.validation.plusAddMyProfileStateRequired,
      }));
      errorValidation = true;
    }
    if (data?.city === "") {
      setError((prev) => ({
        ...prev,
        city: cmsData.validation.plusAddMyProfileCityError,
      }));
      errorValidation = true;
    }
    if (
      (data?.alternate_phone_number?.length > 0 &&
        data?.alternate_phone_number?.length < 10) ||
      (data?.alternate_phone_number?.length === 10 &&
        parseInt(data?.alternate_phone_number?.[0], 10) < 6)
    ) {
      setError((prev) => ({
        ...prev,
        alternate_phone_number: "Invalid Alternate Number",
      }));
      errorValidation = true;
    }

    if (errorValidation) {
      return;
    }
    console.log("data", error, errorValidation);
    if (!errorValidation) {
      const addressData = {
        address1: data?.address_line_1 || "",
        address2: data?.address_line_2 || "",
        city: data?.city || "",
        is_default: data?.default || false,
        nearest_landmark: data?.nearest_landmark || "",
        pincode: parseInt(data?.pincode) ?? 0,
        shipping_mobile: data?.alternate_phone_number || "",
        state: data?.state || "",
      };
      if (type === AddressModalType.ADD) {
        if (addressLength === 0) {
          addressData.is_default = true;
        }
        addNewAddress(addressData);
      } else {
        if (addressId) {
          editNewAddress({ ...addressData, address_id: addressId });
        }
      }
    }
  };

  useEffect(() => {
    if (data?.address_line_1 !== "") {
      setError((prev) => ({
        ...prev,
        address_line_1: "",
      }));
    }
  }, [data?.address_line_1]);

  useEffect(() => {
    if (!isPending && addNewAddressData?.ok) {
      const { data } = addNewAddressData ?? {};
      trigger_CDP_ADD_ADDRESS({
        address_line_1: data?.address1,
        address_line_2: data?.address2 ?? "",
        pincode: data?.pincode.toString(),
        state: data?.state,
        city: data?.city,
      });
      dispatch(
        updateAddresses({
          type: REDUX_UPDATION_TYPES.SINGLE_ADDED,
          address: [data],
        })
      );
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending, addNewAddressData]);

  useEffect(() => {
    if (editNewAddressData?.ok && addressId) {
      const { data } = editNewAddressData ?? {};
      trigger_CDP_ADD_ADDRESS({
        address_line_1: data?.address1,
        address_line_2: data?.address2 ?? "",
        pincode: data?.pincode.toString(),
        state: data?.state,
        city: data?.city,
      });
      dispatch(
        editAddress({
          addressId: addressId,
          address: data,
        })
      );
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editNewAddressData]);

  useEffect(() => {
    if (addressId && type === AddressModalType.EDIT) {
      console.log("addressId", addressId);
      const address = addresses?.find(
        (address: { id: number }) => address.id === addressId
      );
      if (address) {
        setData({
          address_line_1: address?.address1 || "",
          address_line_2: address?.address2 || "",
          nearest_landmark: address?.nearest_landmark || "",
          alternate_phone_number: address?.shipping_mobile || "",
          pincode: address?.pincode.toString() || "",
          state: address?.state || "",
          city: address?.city || "",
          default: address?.is_default || false,
        });
        setInitialEditData({
          address_line_1: address?.address1 || "",
          address_line_2: address?.address2 || "",
          nearest_landmark: address?.nearest_landmark || "",
          alternate_phone_number: address?.shipping_mobile || "",
          pincode: address?.pincode.toString() || "",
          state: address?.state || "",
          city: address?.city || "",
          default: address?.is_default || false,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressId]);

  useEffect(() => {
    if (data?.pincode?.length === 6) {
      setData((prev) => ({
        ...prev,
        state: "",
        city: "",
      }));
      setError((prev) => ({
        ...prev,
        pincode: "",
        state: "",
        city: "",
      }));
      getPincodeData(data?.pincode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.pincode]);

  useEffect(() => {
    if (
      data?.alternate_phone_number?.length === 10 &&
      parseInt(data?.alternate_phone_number?.[0], 10) < 6
    ) {
      setError((prev) => ({
        ...prev,
        alternate_phone_number: "Invalid Alternate Mobile Number",
      }));
    } else {
      setError((prev) => ({
        ...prev,
        alternate_phone_number: "",
      }));
    }
  }, [data?.alternate_phone_number]);

  useEffect(() => {
    if (pincodeData?.ok) {
      const { data } = pincodeData ?? {};
      setData((prev) => ({
        ...prev,
        state: data?.state,
        city: data?.city,
      }));
      setError((prev) => ({
        ...prev,
        pincode: "",
        state: "",
        city: "",
      }));
    } else if (pincodeData?.ok === false) {
      setError((prev) => ({
        ...prev,
        pincode: cmsData.validation.plusAddMyProfilePincodeRequired,
      }));
    }
  }, [pincodeData, cmsData.validation.plusAddMyProfilePincodeRequired]);

  useEffect(() => {
    return () => {
      setError({
        address_line_1: "",
        pincode: "",
        state: "",
        city: "",
        alternate_phone_number: "",
      });
      setData({
        address_line_1: "",
        address_line_2: "",
        nearest_landmark: "",
        alternate_phone_number: "",
        pincode: "",
        state: "",
        city: "",
        default: false,
      });
    };
  }, []);

  console.log("data", data);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="box-border p-0  overflow-scroll md:rouned-[20px] rounded-[20px] md:max-w-[398px] flex flex-col px-0 gap-[32px]  py-[20px] md:pt-[28px] md:pb-[20px] max-w-[358px] max-h-[90vh] overflow-y-auto">
        <div className="w-full flex px-[15px] md:px-[19px] justify-between items-center box-border ">
          <AktivGroteskText
            text={
              type === AddressModalType.ADD
                ? cmsData?.plusAddInsideProfile?.addAddress
                : cmsData?.plusAddInsideProfile?.editAddress
            }
            className="leading-tight"
            fontSize="text-[16px] md:text-[20px]"
            fontWeight="font-[700]"
          />
          <button
            className="flex justify-center items-center"
            onClick={() => {
              setOpen(false);
            }}
          >
            <SvgIcons name={ICONS_NAMES.CROSS} className="w-[20px] h-[20px]" />
          </button>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
          className="flex flex-col px-[8px] md:px-[10px] gap-[20px]"
        >
          <div className="flex flex-col md:gap-[32px] gap-[28px]">
            <Input
              name="address_line_1"
              type="text"
              placeholder={cmsData?.plusAddInsideProfile?.addressLine1}
              value={data.address_line_1}
              onChange={handleChange}
              error={error.address_line_1}
              paddingClass="py-[10px] px-[17px] "
            />
            <Input
              name="address_line_2"
              type="text"
              placeholder={cmsData?.plusAddInsideProfile?.addressLine2}
              value={data.address_line_2}
              onChange={handleChange}
              paddingClass="py-[10px] px-[17px] "
            />
            <Input
              name="nearest_landmark"
              type="text"
              placeholder={cmsData?.plusAddInsideProfile?.nearestLandmark}
              value={data.nearest_landmark}
              onChange={handleChange}
              paddingClass="py-[10px] px-[17px] "
            />
            <Input
              name="alternate_phone_number"
              type="text"
              placeholder={cmsData?.plusAddInsideProfile?.altMobileNumber}
              value={data.alternate_phone_number}
              onChange={handleChange}
              error={error.alternate_phone_number}
              paddingClass="py-[10px] px-[17px] "
            />
            <Input
              name="pincode"
              type="text"
              placeholder={cmsData?.plusAddInsideProfile?.pincode}
              value={data.pincode}
              error={error.pincode}
              onChange={handleChange}
              paddingClass="py-[10px] px-[17px] "
            />
            <Input
              name="state"
              type="text"
              placeholder={cmsData?.plusAddInsideProfile?.state}
              value={data.state}
              error={error.state}
              paddingClass="py-[10px] px-[17px] "
              onChange={handleChange}
              readonly={true}
            />
            <Input
              name="city"
              type="text"
              placeholder={cmsData?.plusAddInsideProfile?.city}
              value={data.city}
              error={error.city}
              paddingClass="py-[10px] px-[17px] "
              onChange={handleChange}
              readonly={true}
            />
          </div>
          <div className="px-[8px] flex gap-3">
            <Checkbox
              checked={data.default}
              name="default"
              disabled={
                type !== AddressModalType.ADD && initialEditData?.default
              }
              onCheckedChange={() => {
                handleChange("default", !data.default);
              }}
            />
            <AktivGroteskText
              text={cmsData?.plusAddInsideProfile?.setAsDefault}
              fontSize="text-[12px]"
              fontWeight="font-[400]"
            />
          </div>
          <div className="px-[8px] flex justify-between items-center box-border py-[10px]">
            <GreenCTA
              disabled={isPending}
              paddingClass="py-[13px]"
              fontSize="text-[16px] md:text-[18px]"
              fontWeight="font-[700]"
              text={cmsData?.plusAddInsideProfile?.saveAddress}
              className="leading-tight w-full"
              onClick={submitAddress}
            />
          </div>
        </form>
        <div className="md:hidden flex justify-between px-[10px]">
          <div className="flex items-center gap-[5px]">
            <button
              onClick={() => router.push("/terms-and-conditions")}
              className="cursor-pointer border-none outline-none"
            >
              <AktivGroteskText
                text={cmsData?.plusAddInsideProfile?.tAndC}
                fontSize="text-[7px]"
                fontWeight="font-[400]"
              />
            </button>
            <Separator className="h-[80%] self-center w-[0.5px] bg-black" />
            <button
              onClick={() => router.push("/privacy-policy")}
              className="cursor-pointer border-none outline-none"
            >
              <AktivGroteskText
                text={cmsData?.plusAddInsideProfile?.privacyPolicy}
                fontSize="text-[7px]"
                fontWeight="font-[400]"
              />
            </button>
          </div>
          <div className="relative flex gap-2 items-center">
            <AktivGroteskText
              text={cmsData?.plusAddInsideProfile?.trademark}
              fontSize="text-[6px]"
              fontWeight="font-[400]"
            />
            <div className="relative min-w-[4.75px] min-h-[4.75px] bg-[#00953B] flex flex-col justify-center items-center">
              <div className="relative bottom-[0.0107px] left-[0.070px] rounded-full min-w-[3px] min-h-[3px] bg-[#E0E0E0] self-center"></div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddressModal;
