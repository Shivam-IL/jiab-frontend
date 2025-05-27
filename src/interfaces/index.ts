export interface IQueryClientAndReduxWrapper {
  children: React.ReactNode;
}

export interface ILogoAndProfileImageProps {
  spriteLogo: string;
  profileImage: string;
}

export interface ILoginSignupWrapper {
  children: React.ReactNode;
  logo?: Boolean;
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
}

export interface IGreenCTA {
  onClick: () => void;
  text: string;
  paddingClass?: string;
  fontSize?: string;
  fontWeight?: string;
  className?: string;
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
  imageUrl?: string;
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

export interface IReferNowModal {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IMobileTempNavBar {
  title: string;
  subtitle?: string;
}

export interface IArtistCard {
  artistId: string;
  image: string;
  name: string;
  followers: string;
}
export interface ILoginSignupWrapper {
  children: React.ReactNode;
  logo?: Boolean;
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
  id:string;
}
