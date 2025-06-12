import { AddressModalType } from "@/types";

export interface IQueryClientAndReduxWrapper {
  children: React.ReactNode;
}

export interface ILogoAndProfileImageProps {
  spriteLogo: string;
  profileImage: string;
}

export interface ILoginSignupWrapper {
  children: React.ReactNode;
  logo?: boolean;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IInput {
  type: string;
  value: string;
  placeholder: string;
  onChange: (key: string, value: any) => void;
  name: string;
  error?: string;
  readonly?: boolean;
  required?: boolean;
  fontSize?: string;
  bgColor?: string;
  options?: Array<{
    value: string;
    label: string;
  }>;
  isSearchable?: boolean;
  paddingClass?: string;
  className?: string;
  rows?: number;
  borderRadius?: string;
}

export interface IGreenCTA {
  onClick: () => void;
  text: string;
  paddingClass?: string;
  fontSize?: string;
  fontWeight?: string;
  className?: string;
  disabled?: boolean;
  isCoinIcon?: boolean;
  children?: React.ReactNode;
  childrenPosition?: string;
}

export interface IEditProfileImage {
  editProfileImage: boolean;
  setEditProfileImage: React.Dispatch<React.SetStateAction<boolean>>;
  image: string;
  name: string;
  onChange: (key: string, value: string) => void;
}

export interface ISvgIcons {
  name: string;
  width?: number;
  height?: number;
  fontSize?: string;
  className?: string;
}

export interface ISurpriseMeCTA {
  onClick: () => void;
  name: string;
  text: string;
}

export interface IAktivGroteskText {
  text: string;
  className?: string;
  fontSize?: string;
  fontWeight?: string;
}

export interface ITimerBox {
  text: string;
}

export interface IImageIconCard {
  image?: string;
  icon?: string;
  text: string;
  iconWidth?: string;
  iconHeight?: string;
  iconClassName?: string;
  className?: string;
  itemsGapClass?: string;
  fontSize?: string;
  fontWeight?: string;
  boxWidth?: string;
  imageClassName?: string;
  textColor?: string;
}

export interface IUserInfoCard {
  iconWidth?: number;
  iconHeight?: number;
  iconClassName?: string;
  iconName: string;
  text: string;
  className?: string;
  textFontSize?: string;
  textFontWeight?: string;
}

export interface IAddressModal {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: AddressModalType;
  addressId?: number | null;
}

export interface IUserGeneratedJokeCard {
  image: string;
  title: string;
  date: string;
  status: string;
}

export interface IScreenWrapper {
  children: React.ReactNode;
  className?: string;
  desktopWidth?: string;
}

export interface IUgcFilterModal {
  open: boolean;
  onClose: () => void;
  onApply?: (filters: { language: string; category: string }) => void;
}

export interface IReferNowModal {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  ctaText: string;
  phoneNumber: string;
  onChange: (key: string, value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
}

export interface IInviteCodePopup {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  subtitle: string;
  ctaText: string;
  code: string;
  onChange: (key: string, value: string) => void;
}

export interface IMobileTempNavBar {
  title: string;
  subtitle?: string;
}

export interface ILabeledInput {
  children: React.ReactNode;
  label: string;
  width?: string;
  labelFontSize?: string;
  labelFontWeight?: string;
  labelClassName?: string;
  tooltip?: boolean;
  tooltipText?: string;
}

export interface IArtistCard {
  artistId: string;
  image: string;
  name: string;
  followers: string;
}

export interface ILoginSignupWrapper {
  children: React.ReactNode;
  logo?: boolean;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IInput {
  type: string;
  value: string;
  placeholder: string;
  onChange: (key: string, value: any) => void;
  name: string;
  error?: string;
  readonly?: boolean;
  required?: boolean;
}

export interface IGreenCTA {
  onClick: () => void;
  text: string;
}

export interface IEditProfileImage {
  editProfileImage: boolean;
  setEditProfileImage: React.Dispatch<React.SetStateAction<boolean>>;
  image: string;
  name: string;
  onChange: (key: string, value: string) => void;
}

export interface ISvgIcons {
  name: string;
  width?: number;
  height?: number;
  fontSize?: string;
  className?: string;
}

export interface ISurpriseMeCTA {
  onClick: () => void;
  name: string;
  text: string;
}

// Home Page
export interface IBannerProps {
  type: "video" | "image";
  src: string;
  msrc?: string; // Mobile source for responsive images
  alt?: string;
  className?: string;
  overlayColor?: string;
  overlayOpacity?: number;
  height?: string;
  width?: string;
}

export interface IExploreMoreArtistCard {
  image: string;
  name: string;
  followers: number;
  id: string;
}

export interface IContentButton {
  text: string;
  onClick?: () => void;
  icon?: string;
  className?: string;
}

export interface ICustomDialogWrapper {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface IExitPopupWrapper {
  open: boolean;
  onClose: () => void;
  icon: string;
  title: string;
  subtitle: string;
  children?: React.ReactNode;
  singleButton?: boolean;
  singleButtonText?: string;
  singleButtonOnClick?: () => void;
  doubleButton?: boolean;
  childrenPosition?: string;
}

export interface IUgcComponent {
  filters?: {
    language: string;
    category: string;
  };
  isUnmounting?: boolean;
}

export interface IAddressData {
  address_line_1: string;
  address_line_2: string;
  nearest_landmark: string;
  alternate_phone_number: string;
  pincode: string;
  state: string;
  city: string;
  default: boolean;
}

export interface IAddressError {
  address_line_1: string;
  pincode: string;
  state: string;
  city: string;
}
export interface IRewardPool {
  imageUrl: string;
  imageAlt: string;
  textContent: string;
}

export interface IContestActivities {
  id: number;
  icon: string;
  title: string;
  reward: number;
  rewardText: string;
  action: () => void;
}

export interface IInviteeData {
  id: number;
  mobile_number: string;
  status: string;
}


export interface UgcCardProps {
  disclaimerText: string
}