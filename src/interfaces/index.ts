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
  type: 'video' | 'image';
  src: string;
  alt?: string;
  className?: string;
  overlayColor?: string;
  overlayOpacity?: number;
  height?: string;
  width?: string;
}