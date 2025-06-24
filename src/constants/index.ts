export const PROFILE_IMAGES = [
  {
    id: 1,
    name: "1.svg",
    imageURL:
      "https://017526-content-prod.s3.ap-south-1.amazonaws.com/Avatars/1.svg",
  },
  {
    id: 2,
    name: "2.svg",
    imageURL:
      "https://017526-content-prod.s3.ap-south-1.amazonaws.com/Avatars/2.svg",
  },
  {
    id: 3,
    name: "3.svg",
    imageURL:
      "https://017526-content-prod.s3.ap-south-1.amazonaws.com/Avatars/3.svg",
  },
  {
    id: 4,
    name: "4.svg",
    imageURL:
      "https://017526-content-prod.s3.ap-south-1.amazonaws.com/Avatars/4.svg",
  },
  {
    id: 5,
    name: "5.svg",
    imageURL:
      "https://017526-content-prod.s3.ap-south-1.amazonaws.com/Avatars/5.svg",
  },
  {
    id: 6,
    name: "6.svg",
    imageURL:
      "https://017526-content-prod.s3.ap-south-1.amazonaws.com/Avatars/6.svg",
  },
  {
    id: 7,
    name: "7.svg",
    imageURL:
      "https://017526-content-prod.s3.ap-south-1.amazonaws.com/Avatars/7.svg",
  },
  {
    id: 8,
    name: "8.svg",
    imageURL:
      "https://017526-content-prod.s3.ap-south-1.amazonaws.com/Avatars/8.svg",
  },
  {
    id: 9,
    name: "9.svg",
    imageURL:
      "https://017526-content-prod.s3.ap-south-1.amazonaws.com/Avatars/9.svg",
  },
  {
    id: 10,
    name: "10.svg",
    imageURL:
      "https://017526-content-prod.s3.ap-south-1.amazonaws.com/Avatars/10.svg",
  },
  {
    id: 11,
    name: "11.svg",
    imageURL:
      "https://017526-content-prod.s3.ap-south-1.amazonaws.com/Avatars/11.svg",
  },
  {
    id: 12,
    name: "12.svg",
    imageURL:
      "https://017526-content-prod.s3.ap-south-1.amazonaws.com/Avatars/12.svg",
  },
];

export const SVG_ICON_URL: string = "/static/sprite/sprite.svg#";

export let CLIENT_URL: string;

// Check if window is defined (client-side) before accessing it
if (typeof window !== "undefined") {
  CLIENT_URL = window.location.origin;
} else {
  // Fallback for server-side rendering
  // You can set a default URL or environment variable here
  CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000";
}

export const LIMIT_EXCEED = "Limit Exceed";

export const LANGUAGE_IDS = {
  1: "en",
  2: "hi",
  3: "te",
  4: "or",
  5: "bn",
  6: "mr",
  7: "kn",
  8: "gu",
  9: "bho",
  10: "mai",
};

export const MNEMONICS_TO_ID = {
  en: 1,
  hi: 2,
  te: 3,
  or: 4,
  bn: 5,
  mr: 6,
  kn: 7,
  gu: 8,
  bho: 9,
  mai: 10,
};

// Language mnemonics constant
export const LANGUAGE_MNEMONICS = {
  ENGLISH: "en",
  HINDI: "hi",
  MALAYALAM: "ml",
  TELUGU: "te",
  MARATHI: "mr",
  ORIYA: "or",
  BENGALI: "bn",
  KANNADA: "kn",
  TAMIL: "ta",
  GUJARATI: "gu",
  PUNJABI: "pa",
  BHOJPURI: "bho",
  MAITHILI: "mai",
  TULU: "tu",
} as const;

// Language options for dropdowns and UI
export const LANGUAGE_OPTIONS = [
  {
    value: LANGUAGE_MNEMONICS.ENGLISH,
    label: "English",
  },
  {
    value: LANGUAGE_MNEMONICS.HINDI,
    label: "हिंदी",
  },
  {
    value: LANGUAGE_MNEMONICS.MALAYALAM,
    label: "മലയാളം", // Malayalam
  },
  {
    value: LANGUAGE_MNEMONICS.TELUGU,
    label: "తెలుగు", // Telugu
  },
  {
    value: LANGUAGE_MNEMONICS.MARATHI,
    label: "मराठी", // Marathi
  },
  {
    value: LANGUAGE_MNEMONICS.ORIYA,
    label: "ଓଡ଼ିଆ", // Odia
  },
  {
    value: LANGUAGE_MNEMONICS.BENGALI,
    label: "বাংলা", // Bengali
  },
  {
    value: LANGUAGE_MNEMONICS.KANNADA,
    label: "ಕನ್ನಡ", // Kannada
  },
  {
    value: LANGUAGE_MNEMONICS.TAMIL,
    label: "தமிழ்", // Tamil
  },
  {
    value: LANGUAGE_MNEMONICS.GUJARATI,
    label: "ગુજરાતી", // Gujarati
  },
  {
    value: LANGUAGE_MNEMONICS.PUNJABI,
    label: "ਪੰਜਾਬੀ", // Punjabi
  },
];

export const REFER_NOW_MODAL_DATA = {
  DEFAULT: {
    title: "Bro-code we follow!",
    subtitle: "Get one friend laughing, get 5 Comic Coins stacking!",
    ctaText: "Refer Now",
  },
  PRANK_US: {
    title: "Trying to prank us?",
    subtitle:
      "This number is not valid. 🙅‍♂️ Retry or refer another friend to collect Comic Coins",
    ctaText: "Refer Now",
  },
  SELF_LOVE: {
    title: "Ahem Ahem!",
    subtitle:
      "Self-love is great, but you can't refer yourself.Refer a friend please!",
    ctaText: "Refer Now",
  },
};
export const DAILY_WINNERS = "Daily Winners";

export const IMAGES = {
  COUPON: "coupon.png",
};

export const ICONS_NAMES = {
  SPRITE_BOTTLE: "sprite-bottle",
  SPRITE_SMILE: "sprite-smile",
  CLAP: "clap",
  MULTIPLE_SMILE_MOBILE: "multiple-smile-mobile",
  SPRITE_PLAY: "sprite-play",
  LOCK: "lock",
  SURPRISE_ME: "surprise-me",
  CROSS: "cross",
  MAN_WITH_SEARCH: "man-with-search",
  FUNNY: "funny",
  MAD: "mad",
  ANGRY: "angry",
  VIEWS: "views",
  LEFT_ARROW: "left-arrow",
  COLON: "colon",
  PROFILE_BADGE: "profile-badge",
  PENCIL: "pencil",
  PHONE_ICON: "phone-icon",
  MAIL: "mail",
  CALENDAR: "calendar",
  GENDER: "gender",
  RANK: "rank",
  TRASH: "trash",
  USER: "user",
  RIGHT_ARROW: "right-arrow",
  LONG_ARROW: "long-arrow",
  CALENDAR2: "calendar2",
  MAKE_MY_TRIP: "make-my-trip",
  VIDEO: "video",
  HEADPHONE: "headphone",
  IMAGE: "image",
  TEXT: "text",
  UPLOAD_FILE: "upload-file",
  SUCCESS: "success",
  INFO: "info",
  STEP_1: "step-1",
  STEP_2: "step-2",
  STEP_3: "step-3",
  STEP_4: "step-4",
  BELL: "bell",
  LANG: "lang",
  HOME: "home",
  CUP: "cup",
  UNIQUE_CODE: "unique-code",
  COMIC_COINS: "comic-coin",
  NEW_USER: "new-user",
  HAMBURGER: "hamburger",
  CLOCK: "clock",
  SMILE: "smile",
  FOMO: "fomo",
  USER_CHECK: "user-check",
  COUPON: "coupon",
  VOTE: "vote",
  GLASS: "glass",
  FILTER: "filter",
  REPORT: "report",
  TRAFFIC_LIGHT: "traffic-light",
  SPRITE_WITH_BUBBLE: "sprite-with-bubbles",
  HEADPHONE2: "headphone2",
  UGC_MARK: "ugc-mark",
  PARTY: "party",
  SAD: "sad",
  THANK_YOU: "thank-you",
  APPLAUSE: "applause",
  CHECK: "check",
  CRYING: "crying",
  CALENDAR_NOTIFICATION: "calendar-notification",
  HAPPY_PERSON: "happy-person",
  FACEBOOK: "facebook",
  INSTAGRAM: "instagram",
  YOUTUBE: "youtube",
  WHATSAPP: "whatsapp",
  ADULTING: "category-adulting",
  ANIMAL: "category-animal",
  COLLEGE: "category-college",
  CRICKET: "category-cricket",
  DAILY_HUMOR: "category-daily-humor",
  DATING: "category-dating",
  FAMILY: "category-family",
  FINANCE: "category-finance",
  FOOD: "category-food",
  FRIENDS: "category-friends",
  INTERNET: "category-internet",
  NON_GENRE: "category-non-genre",
  OBSERVING: "category-observing",
  OFFICE: "category-office",
  OTT: "category-ott",
  POLLUTION: "category-pollution",
  RELATIONSHIP: "category-relationship",
  SELF: "category-self",
  TRAFFIC: "category-traffic",
  TRAVEL: "category-travel",
  SURPRISE: "surprise",
  EXTREME_LAUGH: "exteme-smiley",
  LOGOUT_ICON: "logout-icon-desktop",
  PROFILE_ICON: "profile-icon-desktop",
  WALLET_ICON: "wallet-icon-desktop",
  PROFILE: "profile",
  LEADERBOARD: "leaderboard",
  STAIRS: "stairs",
  REFRESH_RINGS: "refresh-rings",
  NEW_HOME: "new-home",
  NEW_CUP: "new-cup",
  NEW_COMIC_COINS: "new-comic",
  NEW_REFRESH_RING: "new-refresh-ring",
  CROSS2: "cross2",
  HASHTAG: "hashtag",
};

export const INVITE_CODE_POPUP_DATA = {
  INVITE_CODE: {
    TITLE: "Have an Invite Code?",
    SUB_TITLE: "Enter & collect Comic Coins",
    CTA_TEXT: "Submit",
  },
  CHEAT_CODE_NOT_ALLOWED: {
    TITLE: "Cheat codes not allowed! 🚫",
    SUB_TITLE:
      "You've entered a used referral code. Please enter a valid code to proceed!",
    CTA_TEXT: "Submit",
  },
};

export const LANG_VERNICULAR_MAP = {
  English: "English",
  Hindi: "हिंदी",
  Telugu: "తెలుగు",
  Oriya: "ଓଡ଼ିଆ",
  Bengali: "বাংলা",
  Marathi: "मराठी",
  Kannada: "ಕನ್ನಡ",
  Bhojpuri: "भोजपुरी",
  Gujarati: "ગુજરાતી",
  Maithli: "मैथिली",
  Tamil: "தமிழ்",
  tulu: "ತುಳು",
};

export const MOBILE_TEMP_NAVBAR_DATA = {
  EDIT_PROFILE: {
    TITLE: "Personal Information",
    SUB_TITLE: "Edit your personal information",
    SUB_TITLE_2: "Please check and confirm your personal details",
  },
  SEND_REMINDER: {
    TITLE: "SEND REMINDER",
  },
  LEADERBOARD: {
    TITLE: "LEADERBOARD",
    SUB_TITLE: "Look who’s on top of their game",
  },
  HALL_OF_LAME_LEADERBOARD: {
    TITLE: "HALL-OF-LAME🤪",
    SUB_TITLE: "Jokes that got the most laughs",
  },
  SUBMIT_JOKES: {
    TITLE: "SUBMIT YOUR JOKE",
    SUB_TITLE: "Hit us with your funniest joke!",
  },
  CLAIM_FORM: {
    TITLE: "Claim Form",
  },
  NOTIFICATIONS: {
    TITLE: "NOTIFICATIONS",
    SUB_TITLE: "Keep up with the build-up.",
  },
};

export const EXIT_POPUP_DATA = {
  DONT_STEAL_THUNDER: {
    ICON: ICONS_NAMES.CLOCK,
    TITLE: "Don’t let someone else steal your thunder",
    SUB_TITLE: "Claim your prize before it expires, only xx hours to go!",
    SINGLE_BUTTON: true,
    SINGLE_BUTTON_TEXT: "Claim Now",
  },
  MAKE_LAUGH: {
    ICON: ICONS_NAMES.SMILE,
    TITLE: "Did that make you laugh 😂,😑 or not 😡?",
    SUB_TITLE: "Don't forget to react to the joke and collect Comic Coins!",
  },
  FOMO: {
    ICON: ICONS_NAMES.FOMO,
    TITLE: "Warning: FOMO incoming!",
    SUB_TITLE:
      "You'll miss out on jokes from top comedians & other hidden surprises!",
  },
  BREAK_THE_ICE: {
    ICON: ICONS_NAMES.USER_CHECK,
    TITLE: "Break the ice, maybe?",
    SUB_TITLE: "Earn 10 Comic Coins by completing your profile",
  },
  DONT_MISS_OUT: {
    ICON: ICONS_NAMES.COUPON,
    TITLE: "Don't miss out!",
    SUB_TITLE:
      "Submit a joke, get a chance to win vouchers worth Rs.5000 & some 🔥 fame!",
  },
  MADE_YOU_LAUGH: {
    ICON: ICONS_NAMES.VOTE,
    TITLE: "Made you L🤪L?",
    SUB_TITLE: "Collect 1 Comic Coin by voting for your fav joke!",
  },
};

export const CLAIM_POPUP_DATA = {
  CLAIMED: {
    ICON: ICONS_NAMES.PARTY,
    TITLE: "All boxes ✔️",
    SUB_TITLE:
      "You've successfully claimed your reward. It will be delivered to you in 14 business days!",
    SINGLE_BUTTON: true,
    SINGLE_BUTTON_TEXT: "Explore more jokes",
  },
  CLAIM_EXPIRED: {
    ICON: ICONS_NAMES.SAD,
    TITLE: "Claim expired! 🥲",
    SUB_TITLE:
      "You've successfully claimed your reward. It will be delivered to you in 14 business days!",
    THIRD_TEXT:
      "But hey, you can always win next time! Keep collecting coins to try again",
    SINGLE_BUTTON: true,
    SINGLE_BUTTON_TEXT: "Explore more jokes",
  },
  CLAIM_ALERT: {
    ICON: ICONS_NAMES.CLOCK,
    TITLE: "Don’t let someone else steal your thunder",
    SUB_TITLE: "Claim your prize before it expires, only 72 hours to go!",
    SINGLE_BUTTON: true,
    SINGLE_BUTTON_TEXT: "Claim Now",
  },
};

export const JOKES_POPUP_DATA = {
  JOKE_SUBMITTED: {
    ICON: ICONS_NAMES.CLAP,
    TITLE: "Your joke is in!",
    SUB_TITLE: "You did good, we'll take it from here. Ping you in 14 days!",
    SINGLE_BUTTON: true,
    SINGLE_BUTTON_TEXT: "Explore More",
  },
  JOKE_FEATURED: {
    ICON: ICONS_NAMES.APPLAUSE,
    TITLE: "The crowd's going crazy!",
    SUB_TITLE: "Your joke just got featured in the Sprite® Joke Box 🙌",
    SINGLE_BUTTON: true,
    SINGLE_BUTTON_TEXT: "Check it out",
  },
  JOKE_NOT_SUITABLE: {
    ICON: ICONS_NAMES.CROSS,
    TITLE: "Uh-oh!",
    SUB_TITLE:
      "The joke's good,but doesn't work for the crowd. Try something else? 👀",
    SINGLE_BUTTON: true,
    SINGLE_BUTTON_TEXT: "Try Again",
  },
  JOKE_NOT_GOOD_ENOUGH: {
    ICON: ICONS_NAMES.CROSS,
    TITLE: "Not for this crowd!",
    SUB_TITLE:
      "Your joke did not meet our moderation standards, maybe tell us another?",
    SINGLE_BUTTON: true,
    SINGLE_BUTTON_TEXT: "Try Again",
  },
  JOKE_OFFENSIVE: {
    ICON: ICONS_NAMES.CROSS,
    TITLE: "Uh-oh!",
    SUB_TITLE:
      "Your joke was rejected for offensive language. Submit another joke.",
    SINGLE_BUTTON: true,
    SINGLE_BUTTON_TEXT: "Try Again",
  },
};

export const REFFERAL_STATUS_POPUP_DATA = {
  EASY: {
    ICON: ICONS_NAMES.CHECK,
    TITLE: "Easy , Peasy , Lemon Squeezy!",
    SUB_TITLE:
      "You've successfully referred a friend. Your points will be credited when they sign up using your unique invite code.",
    SECOND_TEXT: "“S6876”",
    THIRD_TEXT:
      "Your points will be credited on successful sign up using the invite code",
  },
  SEND_REMINDER: {
    ICON: ICONS_NAMES.CROSS,
    SUB_TITLE:
      "We've sent your friend a reminder! Your points will be on the way once they join with your code.",
  },
  PAST_ON_US: {
    ICON: ICONS_NAMES.CALENDAR_NOTIFICATION,
    TITLE: "Trying to get one past us?",
    SUB_TITLE:
      "You've already referred this person. 👐 Try sending them a reminder, instead!",
    SINGLE_BUTTON: true,
    SINGLE_BUTTON_TEXT: "Refer Another",
  },
  TRUE_COLORS: {
    ICON: ICONS_NAMES.SMILE,
    TITLE: "Your friend has shown their true colors...",
    SUB_TITLE:
      "By joining us! Your gang is growing, and we've added 5 points. Keep'em coming, refer another!",
    SINGLE_BUTTON: true,
    SINGLE_BUTTON_TEXT: "Got it",
  },
};

export const REFERRAL_CODE = {
  SUCCESS: "success",
  ALREADY_REFERRED: "already_referred",
  INVALID_MOBILE_NUMBER: "invalid_mobile_number",
  CANNOT_SEND_TO_SELF: "cannot_send_to_self",
  EXISTING_USER: "existing_user",
};

export const SEND_AGAIN_STATUS = {
  SUCCESS: "success",
  CANT_SEND_AGAIN_IN_A_WEEK: "cant_send_again_in_a_week",
};

export const INVITE_CODE_STATUS = {
  SUCCESS: "success",
  INVALID_REFERRAL_CODE: "invalid_referral_code",
};

export const ARE_YOU_SURE_YOU_WANT_TO_EXIT = "Are you sure you want to exit?";

export const ROUTES_WHICH_DOES_NOT_NEED_DEFAULT_NAVBAR_FOR_MOBILE: string[] = [
  "/my-profile/",
  "/send-reminder",
  "/leaderboard",
  "/pick-mood",
  "/hall-of-lame",
  "/scroll-and-lol",
  "/submit-your-joke",
  "/claim-form",
  "/notifications",
  "/terms-and-conditions",
  "/privacy-policy",
  "/faqs",
  "/sitemap",
];

export const USER_INFO_NUMBER_DATE_ARRAY = [
  {
    id: 1,
    type: "phone_number",
    iconName: ICONS_NAMES.PHONE_ICON,
  },
  {
    id: 3,
    type: "dob",
    iconName: ICONS_NAMES.CALENDAR,
  },
];

export const USER_INFO_EMAIL_GENDER_ARRAY = [
  {
    id: 2,
    type: "email",
    iconName: ICONS_NAMES.MAIL,
    text: "kartikeya@gmail.com",
  },
  {
    id: 4,
    type: "gender",
    iconName: ICONS_NAMES.GENDER,
  },
];

export const PROTECTED_ROUTES = [
  "/my-profile",
  "/send-reminder",
  "/leaderboard",
  "/pick-mood",
  "/hall-of-lame",
  "/scroll-and-lol",
  "/profile",
  "/user-generated-jokes",
  "/my-wallet",
  "/submit-your-joke",
];

export const SESSION_STORAGE_KEYS = {
  CURRENT_PATH: "currentPath",
  PREVIOUS_PATH: "previousPath",
  HAS_SHOWN_LOCK_MODAL: "hasShownLockModal",
  HAS_SHOWN_SERIAL_CHILL_MODAL: "hasShownSerialChiller",
  SIGNUP_KEEP_ALIVE: "signupKeepAlive",
  LANDING_PAGE_EVENT_TRIGGERED: "landingPageEventTriggered",
  CONSENT_PUSH_EVENT_TRIGGERED: "consentPushEventTriggered",
  PROFILE_GA_EVENT_TRIGGERED: "profileCompletionGAEventTriggered",
};

export const LOCAL_IMAGES = {
  SPRITE_GOLD: "sprite-gold.png",
  PROFILE_BG: "profile-bg.png",
  PROFILE_MD_BG: "profile-md-bg.png",
  SURPRISE_ME: "surprise-me.gif",
  USER_JOKE_IMAGE: "user-joke-image.png",
};

export const TOKEN_TYPE = {
  BEARER: "Bearer",
  TEMPORARY: "temp",
};

export const LOCAL_KEYS = {
  CONTEST_TOUR: "contest_tour",
};

export const REDUX_UPDATION_TYPES = {
  SINGLE_ADDED: "single_added",
  MULTIPLE_ADDED: "multiple_added",
  APPENDED: "appended",
  REPLACED: "replaced",
};

export const IMAGES_LINK = {
  PROFILE_BADGE:
    "https://sprite-joke-in-a-bottle.coke2home.com/assets/img/icons/profile-badge.svg",
};

export const PROFILE_QUESTIONS = [
  {
    questionId: 1,
    questionText: "1. How often do you consume Sprite®?",
    isAnswered: true,
    options: [
      {
        optionId: 4,
        displayOrder: 1,
        optionText: "I consume it weekly",
        isSelected: false,
      },
      {
        optionId: 1,
        displayOrder: 2,
        optionText: "I consume it at least once a month",
        isSelected: false,
      },
      {
        optionId: 2,
        displayOrder: 3,
        optionText: "I am an occasional drinker",
        isSelected: true,
      },
      {
        optionId: 3,
        displayOrder: 4,
        optionText: "I dont consume Sprite®",
        isSelected: false,
      },
    ],
    noofQuestion: 0,
  },
  {
    questionId: 2,
    questionText:
      "2. How likely are you to consider choosing Sprite® the next time you drink Soft Drink?",
    isAnswered: true,
    options: [
      {
        optionId: 5,
        displayOrder: 1,
        optionText: "It would be my first choice",
        isSelected: false,
      },
      {
        optionId: 6,
        displayOrder: 2,
        optionText: "I would seriously consider it",
        isSelected: true,
      },
      {
        optionId: 7,
        displayOrder: 3,
        optionText: "I might consider it",
        isSelected: false,
      },
      {
        optionId: 8,
        displayOrder: 4,
        optionText: "I would not consider it",
        isSelected: false,
      },
    ],
    noofQuestion: 0,
  },
  {
    questionId: 3,
    questionText: "3. How do you feel about Sprite®?",
    isAnswered: true,
    options: [
      {
        optionId: 9,
        displayOrder: 1,
        optionText: "3 (I love it)",
        isSelected: true,
      },
      {
        optionId: 10,
        displayOrder: 2,
        optionText: "2 (Nice)",
        isSelected: false,
      },
      {
        optionId: 11,
        displayOrder: 3,
        optionText: "1 (Excellent)",
        isSelected: false,
      },
      {
        optionId: 12,
        displayOrder: 4,
        optionText: "0 (Neutral)",
        isSelected: false,
      },
      {
        optionId: 13,
        displayOrder: 5,
        optionText: "-1 (Bad)",
        isSelected: false,
      },
      {
        optionId: 14,
        displayOrder: 6,
        optionText: "-2 (Very Bad)",
        isSelected: false,
      },
      {
        optionId: 15,
        displayOrder: 7,
        optionText: "-3 (I hate it)",
        isSelected: false,
      },
    ],
    noofQuestion: 0,
  },
];

export const GA_EVENTS = {
  CLICK: "click",
  FIRST_VISIT: "first_visit",
  FORM_START: "form_start",
  PAGE_VIEW: "page_view",
  SCROLL: "scroll",
  SESSION_START: "session_start",
  VIEW_SEARCH_RESULTS: "view_search_results",
  USER_ENGAGEMENT: "user_engagement",
  SPRITE_24_REFERRAL_CODE_SUBMIT: "Sprite24_ReferralCode_Submit",
  SPRITE_J24_COMPLETED_PROFILE_CONSUMER: "SpriteJ24_CompletedProfile_Consumer",
  SPRITE_J24_CONTEST_BUTTON: "SpriteJ24_Contest_button",
  SPRITE_J24_GET_OTP: "SpriteJ24_GetOTP",
  SPRITE_J24_OTP_SUBMIT: "SpriteJ24_OTP_Submit",
  SPRITE_J24_REFER_NOW: "SpriteJ24_ReferNow",
  SPRITE_J24_RESEND_OTP: "SpriteJ24_ResendOTP",
  SPRITE_J24_SIGNUP: "SpriteJ24_Signup",
  SPRITE_J24_SURPRISE_ME: "SpriteJ24_SurpriseMe",
  SPRITE_J24_SUBMIT_JOKE: "SpriteJ24_SubmitJoke",
  SPRITE_J24_IMAGE_JOKE_SUBMIT: "SpriteJ24_Image_JokeSubmit",
  SPRITE_J24_TEXT_JOKE_SUBMIT: "SpriteJ24_Text_JokeSubmit",
  SPRITE_J24_AUDIO_JOKE_SUBMIT: "SpriteJ24_Audio_JokeSubmit",
  SPRITE_J24_VIDEO_JOKE_SUBMIT: "SpriteJ24_Video_JokeSubmit",
  SPRITE_J24_UNIQUE_CODE_SUBMIT: "SpriteJ24_UniqueCode_Submit",
};

export const ANNOUNCING_WINNER_TIMER_TEXT = "Announcing the winners in...";
export const HELP_US_TO_KNOW_YOUR_BETTER = "Help us get to know you better!";
export const REFER_A_FRIEND_TEXT = "Refer A Friend";
export const REFER_NOW = "Refer Now";
export const MY_REFERRAL = "My Referrals";
export const USER = "User";
export const STATUS = "Status";
export const SEND_REMINDER = "Send Reminder";
export const REFER_ANOTHER = "Refer Another";
export const MY_JOKES = "My Jokes";
export const HALL_OF_LAME = "HALL-OF-LAME🤪 >";
export const BRO_CODE_WE_FOLLOW = "Bro-code we follow!";
export const GET_ONE_FRIEND_LAUGHING =
  "Get one friend laughing, get 5 Comic Coins stacking!";

export const ARTISTS_PAGE_HEADERS_DATA = {
  TITLE: "Comedians’ Spotlight",
  SUB_TITLE: "Discover jokes from renowned comics",
};

export const ALL_FIElDS_ARE_MANDATORY = "*All fields are mandatory";
export const FIELDS_MARKED_STAR_ARE_MANDATORY = "Fields marked * are mandatory";
export const PENDING = "Pending";
export const APPROVED = "Approved";
export const NEXT = "Next";
export const SUBMIT = "Submit";
export const SAVE = "Save";
export const PREV = "Prev";
export const EXPLORE_MORE = "Explore More";
export const TAP_TO_SEE_THE_FUNNIEST_LINE_UPS =
  "Tap to see the funniest line-ups";
export const WEEKLY_TOP_JOKES = "Weekly Top Jokes";

export const PLEASE_ENTER_YOUR_DETAILS_TO_CLAIM_YOUR_REWARD =
  "Please enter your details to claim your reward.";

export const SUBMIT_JOKES_TERMS_AND_CONDITIONS =
  "By submitting content to The Coca-Cola Company's Sprite® Joke In A Bottle Platform, you grant TCCC a non-exclusive, worldwide license to use, display, and distribute your content on the Sprite® Joke In A Bottle platform. You acknowledge that TCCC will be the sole owner of the submitted content upon upload. The company reserves the right to moderate and may use the content if it passes moderation checks. This grants TCCC the right to feature, modify, or distribute the content as deemed fit. By submitting, you release TCCC from any claims and agree to indemnify against liabilities arising from the use of your content.";

export const ARTIST_DATA = [
  {
    id: "3ce192f1-7670-4e3b-a70b-e53b2dc60221",
    ordering: 0,
    displayName: "",
    firstName: "biswa",
    lastName: "",
    likeCount: 0,
    playCount: 0,
    viewCount: 0,
    followers: 7864,
    description:
      "Remember the Pretentious Movie Reviews on YouTube? Good. Now forget them. That was just a warm-up to Biswa Kalyan Rath's full comedy prowess. The comedian has moved up a few notches since his YouTube glory days and is using his IIT-Bombay education, along with his knowledge of mathematics, language and life, to make jokes that have never been cracked before. He recently released three comedy specials and has toured every pocket in India.\n\nSoon after, he released his web-series 'Laakhon Mein Ek - Season 1 & 2'. One of the most-followed comedians in the country, Biswas angry rant-styled delivery and his unique perspective turns every topic he touches into comedy gold, making audiences crack up instantly. The stand-up comedian, writer, actor and size-zero enthusiast, has done countless shows across all sorts of venues in the country and has managed to garner 14+ million views on YouTube. Need we say more?",
    duration: 0,
    thumbnail:
      "https://d35f5vastl4boc.cloudfront.net/profileImage/Biswa_kalyan_rath.png",
    url: "https://d35f5vastl4boc.cloudfront.net/profileImage/Biswa_kalyan_rath.png",
    assetId: "3ce192f1-7670-4e3b-a70b-e53b2dc60221",
    contentType: "",
    bannerUrl:
      "https://d35f5vastl4boc.cloudfront.net/profileImage/Biswa_kalyan_rath.png",
    pristine_image: "",
    profile: {
      _id: "3ce192f1-7670-4e3b-a70b-e53b2dc60221",
      userId: "3ce192f1-7670-4e3b-a70b-e53b2dc60221",
      fullName: "Biswa Kalyan Rath",
      userName: "biswa",
      email: "biswa@hogarth.com",
      description:
        "Remember the Pretentious Movie Reviews on YouTube? Good. Now forget them. That was just a warm-up to Biswa Kalyan Rath's full comedy prowess. The comedian has moved up a few notches since his YouTube glory days and is using his IIT-Bombay education, along with his knowledge of mathematics, language and life, to make jokes that have never been cracked before. He recently released three comedy specials and has toured every pocket in India.\n\nSoon after, he released his web-series 'Laakhon Mein Ek - Season 1 & 2'. One of the most-followed comedians in the country, Biswas angry rant-styled delivery and his unique perspective turns every topic he touches into comedy gold, making audiences crack up instantly. The stand-up comedian, writer, actor and size-zero enthusiast, has done countless shows across all sorts of venues in the country and has managed to garner 14+ million views on YouTube. Need we say more?",
      status: "ACTIVE",
      profileImageUrl:
        "https://d35f5vastl4boc.cloudfront.net/profileImage/Biswa_kalyan_rath.png",
      followersCount: 7864,
      followingCount: 0,
      videoCount: 0,
      shareCount: 0,
      likeCount: 0,
      commentCount: 0,
      bookmarkCount: 0,
      backgroundImage:
        "https://d35f5vastl4boc.cloudfront.net/profileImage/Biswa_kalyan_rath.png",
      localisedFullName: {
        en: "Biswa Kalyan Rath",
        hi: "विश्व कल्याण रथ",
        ta: "பிஸ்வ கல்யாண் ராத்",
        te: "బిశ్వ కళ్యాణ్ రాత్",
        ba: "বিশ্ব কল্যাণ রথ",
        or: "ବିଶ୍ୱ କଲ୍ୟାଣ ରଥ |",
        mr: "विश्व कल्याण रथ",
        kn: "ಬಿಸ್ವ ಕಲ್ಯಾಣ ರಥ",
        bh: "विश्व कल्याण रथ के ह",
        mai: "विश्व कल्याण रथ",
        gu: "વિશ્વ કલ્યાણ રથ",
      },
      localisedDescription: {
        en: "Remember the Pretentious Movie Reviews on YouTube? Good. Now forget them. That was just a warm-up to Biswa Kalyan Rath's full comedy prowess. The comedian has moved up a few notches since his YouTube glory days and is using his IIT-Bombay education, along with his knowledge of mathematics, language and life, to make jokes that have never been cracked before. He recently released three comedy specials and has toured every pocket in India.\n\nSoon after, he released his web-series 'Laakhon Mein Ek - Season 1 & 2'. One of the most-followed comedians in the country, Biswas angry rant-styled delivery and his unique perspective turns every topic he touches into comedy gold, making audiences crack up instantly. The stand-up comedian, writer, actor and size-zero enthusiast, has done countless shows across all sorts of venues in the country and has managed to garner 14+ million views on YouTube. Need we say more?",
        hi: "क्या आपको YouTube पर प्रीटेनशियास(दिखावटी) मूवी समीक्षाएँ याद हैं? अच्छी बात है । अब उन्हें भूल जाइये। यह तो विश्व कल्याण रथ की पूर्ण कॉमेडी क्षमता का एक वार्म-अप मात्र है। कॉमेडियन अपने यूट्यूब के गौरव के दिनों से कुछ पायदान आगे बढ़ गए हैं और अपनी आईआईटी-बॉम्बे शिक्षा के साथ-साथ गणित, भाषा और जीवन के अपने ज्ञान का उपयोग ऐसे चुटकुले बनाने के लिए कर रहे हैं जो पहले कभी नहीं किए गए थे। उन्होंने हाल ही में तीन कॉमेडी स्पेशल रिलीज़ की हैं और भारत के हर हिस्से का दौरा किया है।\n\nइसके तुरंत बाद, उन्होंने अपनी वेब-सीरीज़ 'लाखों में एक - सीज़न 1 और 2' रिलीज़ की। देश में सबसे ज्यादा फॉलो किए जाने वाले कॉमेडियन में से एक, बिस्वास एंग्री रेंट-स्टाइल डिलीवरी और उनका अनूठा दृष्टिकोण हर विषय को कॉमेडी गोल्ड में बदल देता है, जिससे दर्शककी हँसी तुरंत छुट जाती हैं। स्टैंड-अप कॉमेडियन, लेखक, अभिनेता और आकार-शून्य उत्साही, ने देश के सभी प्रकार के स्थानों पर अनगिनत शो किए हैं और YouTube पर 14+ मिलियन व्यूज हासिल करने में सफल रहे हैं। क्या हमें कुछ और कहने की ज़रूरत है?",
        ta: "YouTube இல் பாசாங்குத்தனமான திரைப்பட விமர்சனங்கள் நினைவிருக்கிறதா? நல்ல. இப்போது அவற்றை மறந்துவிடு. பிஸ்வ கல்யாண் ராத்தின் முழு நகைச்சுவைத் திறமைக்கு அது ஒரு சூடு-அப் மட்டுமே. நகைச்சுவை நடிகர் தனது யூடியூப் புகழ் நாட்களில் இருந்து சில படிகள் முன்னேறி, தனது ஐஐடி-பாம்பே கல்வியையும், கணிதம், மொழி மற்றும் வாழ்க்கை பற்றிய அறிவையும் பயன்படுத்தி, இதற்கு முன் ஒருபோதும் வெடிக்காத நகைச்சுவைகளைச் செய்கிறார். அவர் சமீபத்தில் மூன்று நகைச்சுவை சிறப்புகளை வெளியிட்டார் மற்றும் இந்தியாவில் உள்ள ஒவ்வொரு பாக்கெட்டையும் சுற்றிப்பார்த்தார்.\n\nவிரைவில், அவர் தனது வலைத் தொடரான ​​'லாகோன் மே ஏக் - சீசன் 1 & 2' ஐ வெளியிட்டார். நாட்டிலேயே அதிகம் பின்தொடரும் நகைச்சுவை நடிகர்களில் ஒருவரான பிஸ்வாஸின் கோபப் பாணியிலான டெலிவரி மற்றும் அவரது தனித்துவமான முன்னோக்கு அவர் தொடும் ஒவ்வொரு தலைப்பையும் நகைச்சுவைத் தங்கமாக மாற்றுகிறது, பார்வையாளர்களை உடனடியாக வெடிக்கச் செய்கிறது. ஸ்டாண்ட்-அப் காமெடியன், எழுத்தாளர், நடிகர் மற்றும் சைஸ்-ஜீரோ ஆர்வலர், நாட்டில் உள்ள அனைத்து வகையான அரங்குகளிலும் எண்ணற்ற நிகழ்ச்சிகளை நிகழ்த்தி யூடியூப்பில் 14+ மில்லியன் பார்வைகளைப் பெற்றுள்ளார். நாம் இன்னும் சொல்ல வேண்டுமா?",
        te: "యూట్యూబ్‌లో ప్రెటెన్షియస్ మూవీ రివ్యూలు గుర్తున్నాయా? మంచిది. ఇప్పుడు వాటిని మర్చిపో. అది బిస్వ కళ్యాణ్ రాత్ యొక్క పూర్తి కామెడీ పరాక్రమానికి సన్నాహకమైనది. హాస్యనటుడు తన యూట్యూబ్ గ్లోరీ రోజుల నుండి కొన్ని స్థానాలు పైకి ఎగబాకాడు మరియు అతని IIT-బాంబే విద్యతో పాటు గణితం, భాష మరియు జీవితంపై అతని జ్ఞానంతో పాటు ఇంతకు ముందెన్నడూ లేని జోకులు వేయడానికి ఉపయోగిస్తున్నాడు. అతను ఇటీవల మూడు కామెడీ స్పెషల్‌లను విడుదల చేశాడు మరియు భారతదేశంలోని ప్రతి జేబులో పర్యటించాడు.\n\nవెంటనే, అతను తన వెబ్-సిరీస్ 'లాఖోన్ మే ఏక్ - సీజన్ 1 & 2'ని విడుదల చేశాడు. దేశంలో అత్యధికంగా ఫాలో అవుతున్న హాస్యనటులలో ఒకరైన బిస్వాస్ కోపంతో కూడిన రాట్-స్టైల్ డెలివరీ మరియు అతని ప్రత్యేక దృక్పథం అతను తాకిన ప్రతి అంశాన్ని కామెడీ గోల్డ్‌గా మారుస్తుంది, ప్రేక్షకులను తక్షణమే విరుచుకుపడేలా చేస్తుంది. స్టాండ్-అప్ కమెడియన్, రైటర్, యాక్టర్ మరియు సైజ్-జీరో ఔత్సాహికుడు, దేశంలోని అన్ని రకాల వేదికల్లో లెక్కలేనన్ని ప్రదర్శనలు ఇచ్చారు మరియు YouTubeలో 14+ మిలియన్ల వీక్షణలను సంపాదించగలిగారు. మనం ఇంకా చెప్పాలా?",
        ba: "ইউটিউবে অভিমানী মুভি রিভিউ মনে আছে? ভাল. এখন তাদের ভুলে যান। এটি ছিল বিশ্ব কল্যাণ রথের সম্পূর্ণ কমেডি দক্ষতার জন্য একটি ওয়ার্ম আপ। কৌতুক অভিনেতা তার YouTube গৌরব দিন থেকে কয়েক ধাপ এগিয়েছে এবং তার IIT-Bombay শিক্ষার সাথে সাথে গণিত, ভাষা এবং জীবন সম্পর্কে তার জ্ঞান ব্যবহার করছেন, এমন রসিকতা তৈরি করতে যা আগে কখনও ফাটল না। তিনি সম্প্রতি তিনটি কমেডি বিশেষ প্রকাশ করেছেন এবং ভারতের প্রতিটি পকেটে ভ্রমণ করেছেন।\n\nশীঘ্রই, তিনি তার ওয়েব-সিরিজ 'লাখোঁ মে এক - সিজন 1 এবং 2' প্রকাশ করেন। দেশের সর্বাধিক অনুসরণ করা কমেডিয়ানদের মধ্যে একজন, বিশ্বাস রাগান্বিত রান্ট-স্টাইলড ডেলিভারি এবং তার অনন্য দৃষ্টিভঙ্গি তার স্পর্শ করা প্রতিটি বিষয়কে কমেডি সোনায় পরিণত করে, দর্শকদের তাত্ক্ষণিকভাবে ক্র্যাক আপ করে তোলে। স্ট্যান্ড-আপ কমেডিয়ান, লেখক, অভিনেতা এবং সাইজ-জিরো উত্সাহী, দেশের সব ধরণের ভেন্যুতে অগণিত শো করেছেন এবং YouTube-এ 14+ মিলিয়ন ভিউ অর্জন করতে সক্ষম হয়েছেন। আমরা আরো বলতে হবে?",
        or: "ୟୁଟ୍ୟୁବରେ ସୁନ୍ଦର ଚଳଚ୍ଚିତ୍ର ସମୀକ୍ଷା ମନେରଖନ୍ତୁ? ଭଲ ବର୍ତ୍ତମାନ ସେମାନଙ୍କୁ ଭୁଲିଯାଅ | ଏହା କେବଳ ବିଶ୍ୱ କଲ୍ୟାଣ ରଥଙ୍କ ପୁରା କମେଡି ପ୍ରବୃତ୍ତି ପାଇଁ ଏକ ଉଷ୍ମତା ଥିଲା | ହାସ୍ୟ ଅଭିନେତା ତାଙ୍କ ୟୁଟ୍ୟୁବ୍ ଗ glory ରବ ଦିନଠାରୁ କିଛି ଖଣ୍ଡ ଉପରକୁ ଯାଇଛନ୍ତି ଏବଂ ତାଙ୍କର ଆଇଆଇଟି-ବମ୍ବେ ଶିକ୍ଷା, ଗଣିତ, ଭାଷା ଏବଂ ଜୀବନ ବିଷୟରେ ଜ୍ଞାନ ସହିତ ବ୍ୟବହାର କରୁଛନ୍ତି, ଯାହା ପୂର୍ବରୁ କେବେ ଫାଟି ନଥିଲା | ନିକଟରେ ସେ ତିନୋଟି କମେଡି ସ୍ପେଶାଲ୍ ରିଲିଜ୍ କରିଛନ୍ତି ଏବଂ ଭାରତର ପ୍ରତ୍ୟେକ ପକେଟ୍ ଭ୍ରମଣ କରିଛନ୍ତି |\n\nକିଛି ସମୟ ପରେ, ସେ ତାଙ୍କର ୱେବ୍ ସିରିଜ୍ 'ଲାଖନ୍ ମେନ୍ ଏକ - ସିଜନ୍ 1 ଏବଂ 2' ରିଲିଜ୍ କଲେ | ଦେଶର ଅନ୍ୟତମ ଅନୁଗାମୀ ହାସ୍ୟ ଅଭିନେତାମାନଙ୍କ ମଧ୍ୟରୁ ବିଶ୍ w ରା ରାଣ୍ଟ ଷ୍ଟାଇଲ୍ ବିତରଣ ଏବଂ ତାଙ୍କର ଅନନ୍ୟ ଦୃଷ୍ଟିକୋଣ ସେ ସ୍ପର୍ଶ କରୁଥିବା ପ୍ରତ୍ୟେକ ବିଷୟକୁ କମେଡି ସୁନାରେ ପରିଣତ କରି ଦର୍ଶକଙ୍କୁ ତୁରନ୍ତ ଫାଟିଯାଏ | ଷ୍ଟାଣ୍ଡ ଅପ୍ ହାସ୍ୟ ଅଭିନେତା, ଲେଖକ, ଅଭିନେତା ଏବଂ ସାଇଜ୍-ଶୂନ ଉତ୍ସାହୀ, ଦେଶର ସମସ୍ତ ପ୍ରକାର ସ୍ଥାନରେ ଅଗଣିତ ଶୋ ’କରିଛନ୍ତି ଏବଂ ୟୁଟ୍ୟୁବରେ 14+ ମିଲିୟନ୍ ଭ୍ୟୁ ପାଇବାରେ ସଫଳ ହୋଇଛନ୍ତି | ଆମେ ଅଧିକ କହିବା ଆବଶ୍ୟକ କି?",
        mr: "YouTube वरील दिखाऊ चित्रपट पुनरावलोकने लक्षात ठेवा? चांगले. आता त्यांना विसरून जा. विश्व कल्याण रथच्या संपूर्ण विनोदी पराक्रमाचा तो सराव होता. कॉमेडियन त्याच्या यूट्यूबच्या गौरवाच्या दिवसांपासून काही उंचीवर गेला आहे आणि त्याच्या IIT-बॉम्बे शिक्षणाचा वापर करून, गणित, भाषा आणि जीवनाच्या त्याच्या ज्ञानाचा वापर करून, यापूर्वी कधीही न फोडलेले विनोद बनवतो आहे. त्याने अलीकडेच तीन कॉमेडी स्पेशल रिलीज केले आणि भारतातील प्रत्येक खिशात फेरफटका मारला.\n\nलवकरच, त्याने त्याची वेब-सिरीज 'लाखों में एक - सीझन 1 आणि 2' रिलीज केली. देशातील सर्वाधिक फॉलो केल्या जाणाऱ्या कॉमेडियनपैकी एक, बिस्वास राग-रंट-स्टाईल डिलिव्हरी आणि त्याचा अनोखा दृष्टीकोन त्याने स्पर्श केलेल्या प्रत्येक विषयाला कॉमेडीचे सोने बनवतो, ज्यामुळे प्रेक्षक त्वरित क्रॅक करतात. स्टँड-अप कॉमेडियन, लेखक, अभिनेता आणि आकार-शून्य उत्साही, यांनी देशातील सर्व प्रकारच्या ठिकाणी असंख्य शो केले आहेत आणि YouTube वर 14+ दशलक्ष दृश्ये मिळवण्यात व्यवस्थापित केले आहेत. आम्हाला अधिक बोलण्याची गरज आहे?",
        kn: "YouTube ನಲ್ಲಿ ಆಡಂಬರದ ಚಲನಚಿತ್ರ ವಿಮರ್ಶೆಗಳು ನೆನಪಿದೆಯೇ? ಒಳ್ಳೆಯದು. ಈಗ ಅವರನ್ನು ಮರೆತುಬಿಡಿ. ಅದು ಬಿಸ್ವ ಕಲ್ಯಾಣ್ ರಾತ್ ಅವರ ಪೂರ್ಣ ಹಾಸ್ಯ ಪರಾಕ್ರಮಕ್ಕೆ ಕೇವಲ ಒಂದು ಅಭ್ಯಾಸವಾಗಿತ್ತು. ಹಾಸ್ಯನಟ ತನ್ನ ಯೂಟ್ಯೂಬ್ ವೈಭವದ ದಿನಗಳಿಂದ ಕೆಲವು ಹಂತಗಳನ್ನು ಮೇಲಕ್ಕೆತ್ತಿದ್ದಾನೆ ಮತ್ತು ತನ್ನ ಐಐಟಿ-ಬಾಂಬೆ ಶಿಕ್ಷಣವನ್ನು ಗಣಿತ, ಭಾಷೆ ಮತ್ತು ಜೀವನದ ಜ್ಞಾನದ ಜೊತೆಗೆ ಹಿಂದೆಂದೂ ಬಿರುಕು ಬಿಡದ ಹಾಸ್ಯಗಳನ್ನು ಮಾಡಲು ಬಳಸುತ್ತಿದ್ದಾನೆ. ಅವರು ಇತ್ತೀಚೆಗೆ ಮೂರು ಹಾಸ್ಯ ವಿಶೇಷತೆಗಳನ್ನು ಬಿಡುಗಡೆ ಮಾಡಿದರು ಮತ್ತು ಭಾರತದ ಪ್ರತಿಯೊಂದು ಪಾಕೆಟ್ ಅನ್ನು ಪ್ರವಾಸ ಮಾಡಿದ್ದಾರೆ.\n\nಶೀಘ್ರದಲ್ಲೇ, ಅವರು ತಮ್ಮ ವೆಬ್-ಸರಣಿ 'ಲಾಖೋನ್ ಮೇ ಏಕ್ - ಸೀಸನ್ 1 ಮತ್ತು 2' ಅನ್ನು ಬಿಡುಗಡೆ ಮಾಡಿದರು. ದೇಶದಲ್ಲಿ ಹೆಚ್ಚು ಹಿಂಬಾಲಿಸುವ ಹಾಸ್ಯನಟರಲ್ಲಿ ಒಬ್ಬರು, ಬಿಸ್ವಾಸ್ ಕೋಪಗೊಂಡ ರಾಂಟ್-ಶೈಲಿಯ ಡೆಲಿವರಿ ಮತ್ತು ಅವರ ವಿಶಿಷ್ಟ ದೃಷ್ಟಿಕೋನವು ಅವರು ಸ್ಪರ್ಶಿಸುವ ಪ್ರತಿಯೊಂದು ವಿಷಯವನ್ನು ಹಾಸ್ಯ ಚಿನ್ನವಾಗಿ ಪರಿವರ್ತಿಸುತ್ತದೆ, ಪ್ರೇಕ್ಷಕರು ತಕ್ಷಣವೇ ಬಿರುಕು ಬಿಡುವಂತೆ ಮಾಡುತ್ತದೆ. ಸ್ಟ್ಯಾಂಡ್-ಅಪ್ ಹಾಸ್ಯನಟ, ಬರಹಗಾರ, ನಟ ಮತ್ತು ಗಾತ್ರ-ಶೂನ್ಯ ಉತ್ಸಾಹಿ, ದೇಶದ ಎಲ್ಲಾ ರೀತಿಯ ಸ್ಥಳಗಳಲ್ಲಿ ಲೆಕ್ಕವಿಲ್ಲದಷ್ಟು ಪ್ರದರ್ಶನಗಳನ್ನು ಮಾಡಿದ್ದಾರೆ ಮತ್ತು YouTube ನಲ್ಲಿ 14+ ಮಿಲಿಯನ್ ವೀಕ್ಷಣೆಗಳನ್ನು ಗಳಿಸುವಲ್ಲಿ ಯಶಸ್ವಿಯಾಗಿದ್ದಾರೆ. ನಾವು ಹೆಚ್ಚು ಹೇಳಬೇಕೇ?",
        bh: "यूट्यूब पर दिखावटी फिल्म के समीक्षा याद बा? नीमन. अब ओह लोग के भुला जाईं. ऊ त बस विश्व कल्याण रथ के पूरा हास्य पराक्रम के वार्मअप रहे. यूट्यूब के गौरवशाली जमाना से ई हास्य अभिनेता अपना आईआईटी-बंबई के पढ़ाई का साथे साथ गणित, भाषा आ जिनिगी के ज्ञान के इस्तेमाल अइसन चुटकुला बनावे में करत बाड़न जवना में पहिले कबो दरार ना पड़ल होखे. हालही में ऊ तीन गो कॉमेडी स्पेशल रिलीज कइले बाड़न आ भारत के हर जेब के दौरा कइले बाड़न.\n\nएकरा तुरंत बाद उ आपन वेब-सीरीज 'लाखोन में एक -",
        mai: "यूट्यूब पर दिखावटी सिनेमा के समीक्षा याद अछि? नीक. आब बिसरि जाउ। जे त बस विश्व कल्याण रथ के पूर्ण हास्य पराक्रम के वार्म-अप छल. हास्य अभिनेता अपनऽ यूट्यूब केरऽ गौरवशाली जमाना स॑ ही कुछ पायदान ऊपर बढ़ी गेलऽ छै आरू गणित, भाषा आरू जीवन केरऽ ज्ञान के साथ-साथ अपनऽ आईआईटी-बंबई शिक्षा के इस्तेमाल करी क॑ ऐसनऽ चुटकुला बनाबै छै जेकरा म॑ पहल॑ कहियो दरार नै पड़लऽ छेलै । हालहि मे ओ तीनटा कॉमेडी स्पेशल रिलीज केने छथि आ भारतक हर जेब मे घुमि चुकल छथि ।\n\nओकरऽ कुछ देर बाद ही अपनऽ वेब-सीरीज ‘लाखोन में एक -",
        gu: "યુટ્યુબ પર પ્રિટેન્ટિયસ મૂવી સમીક્ષાઓ યાદ છે? સારું. હવે તેમને ભૂલી જાઓ. તે માત્ર વિશ્વ કલ્યાણ રથના સંપૂર્ણ કોમેડી પરાક્રમ માટે એક વોર્મ-અપ હતું. હાસ્ય કલાકાર તેના યુટ્યુબના ગૌરવના દિવસોથી થોડાક ઉંચા ગયા છે અને તે તેના IIT-બોમ્બે શિક્ષણનો ઉપયોગ કરીને ગણિત, ભાષા અને જીવનના તેના જ્ઞાનનો ઉપયોગ કરીને જોક્સ બનાવવા માટે કરી રહ્યા છે જે પહેલા ક્યારેય ન હોય. તેણે તાજેતરમાં ત્રણ કોમેડી સ્પેશિયલ રિલીઝ કર્યા છે અને તેણે ભારતના દરેક ખિસ્સામાં પ્રવાસ કર્યો છે.\n\nટૂંક સમયમાં, તેણે તેની વેબ-સિરીઝ 'લાખો મેં એક - સીઝન 1 અને 2' રિલીઝ કરી. દેશના સૌથી વધુ અનુસરવામાં આવતા હાસ્ય કલાકારોમાંના એક, બિસ્વાસ ગુસ્સે ભરેલી રેન્ટ-સ્ટાઈલ ડિલિવરી અને તેમનો અનોખો પરિપ્રેક્ષ્ય તેઓ સ્પર્શે છે તે દરેક વિષયને કોમેડી ગોલ્ડમાં ફેરવે છે, જેનાથી પ્રેક્ષકો તરત જ ક્રેક અપ કરે છે. સ્ટેન્ડ-અપ કોમેડિયન, લેખક, અભિનેતા અને કદ-શૂન્ય ઉત્સાહી, દેશના તમામ પ્રકારના સ્થળો પર અસંખ્ય શો કર્યા છે અને YouTube પર 14+ મિલિયન વ્યૂઝ મેળવવામાં સફળ થયા છે. આપણે વધુ કહેવાની જરૂર છે?",
      },
      reactionCount: 7268,
      reactions: {
        laugh: 5061,
        sad: 871,
        neutral: 1336,
      },
    },
  },
  {
    id: "b5deb7eb-34ed-4a29-b3ea-19243afb82df",
    ordering: 1,
    displayName: "",
    firstName: "kennysebastian",
    lastName: "",
    likeCount: 0,
    playCount: 0,
    viewCount: 0,
    followers: 3035,
    description:
      "The Bangalore-bred and Mumbai based stand-up comedian, writer, showrunner, musician and improviser, is arguably one\nof the biggest in the business.\nHis comedy prowess is seen in his Amazon Prime Video special, Don’t be That Guy, along with the sci-fi comedy web series Starboyz on YouTube, and Comedy Central’s The Living Room. Kenny has also co-written and acted in 'Sketchy Behaviour' (Amazon Prime Video) alongside Kanan Gill. With over 5 million followers online and live vlog shows like 'Chai Time With Kenny', he has created a niche for himself in the space of comedy. After having performed 6 stand-up specials, Kenny’s latest special “The Most Interesting Person in the Room” is available on Netflix. \nKenny has delivered over 1000+ shows across the world. His last World Tour saw him sell over 25000+ Tickets in over 50+ cities globally. Kenny also is the creator & host of the podcast, ‘Simple Ken’ Simpleken is a podcast meant for millennials. With over 30 episodes over the last 2 years and an ever growing audience, the podcast falls under the ‘Top 1% Podcasts Globally’. Kenny has also worked with multiple brands such as Google, KFC, Spotify, Royal Enfield, Taco Bell, OnePlus, Microsoft, Colgate and many more. His knack for understanding a brand's core values and carefully integrating them into his content is highly regarded in the content creator space.\n\nKenny & his passion for creating and exploring more ways for expressing his artistic vision & his ever loving audience,\nhelms him as one of the top creators in India and globally.",
    duration: 0,
    thumbnail:
      "https://d35f5vastl4boc.cloudfront.net/profileImage/Kenny_sebastian.png",
    url: "https://d35f5vastl4boc.cloudfront.net/profileImage/Kenny_sebastian.png",
    assetId: "b5deb7eb-34ed-4a29-b3ea-19243afb82df",
    contentType: "",
    bannerUrl:
      "https://d35f5vastl4boc.cloudfront.net/profileImage/Kenny_sebastian.png",
    pristine_image: "",
    profile: {
      _id: "b5deb7eb-34ed-4a29-b3ea-19243afb82df",
      userId: "b5deb7eb-34ed-4a29-b3ea-19243afb82df",
      fullName: "Kenny Sebastian",
      userName: "kennysebastian",
      email: "kennysebastian@hww.com",
      description:
        "The Bangalore-bred and Mumbai based stand-up comedian, writer, showrunner, musician and improviser, is arguably one\nof the biggest in the business.\nHis comedy prowess is seen in his Amazon Prime Video special, Don’t be That Guy, along with the sci-fi comedy web series Starboyz on YouTube, and Comedy Central’s The Living Room. Kenny has also co-written and acted in 'Sketchy Behaviour' (Amazon Prime Video) alongside Kanan Gill. With over 5 million followers online and live vlog shows like 'Chai Time With Kenny', he has created a niche for himself in the space of comedy. After having performed 6 stand-up specials, Kenny’s latest special “The Most Interesting Person in the Room” is available on Netflix. \nKenny has delivered over 1000+ shows across the world. His last World Tour saw him sell over 25000+ Tickets in over 50+ cities globally. Kenny also is the creator & host of the podcast, ‘Simple Ken’ Simpleken is a podcast meant for millennials. With over 30 episodes over the last 2 years and an ever growing audience, the podcast falls under the ‘Top 1% Podcasts Globally’. Kenny has also worked with multiple brands such as Google, KFC, Spotify, Royal Enfield, Taco Bell, OnePlus, Microsoft, Colgate and many more. His knack for understanding a brand's core values and carefully integrating them into his content is highly regarded in the content creator space.\n\nKenny & his passion for creating and exploring more ways for expressing his artistic vision & his ever loving audience,\nhelms him as one of the top creators in India and globally.",
      status: "ACTIVE",
      profileImageUrl:
        "https://d35f5vastl4boc.cloudfront.net/profileImage/Kenny_sebastian.png",
      followersCount: 3035,
      followingCount: 0,
      videoCount: 0,
      shareCount: 0,
      likeCount: 0,
      commentCount: 0,
      bookmarkCount: 0,
      backgroundImage:
        "https://d35f5vastl4boc.cloudfront.net/profileImage/Kenny_sebastian.png",
      localisedFullName: {
        en: "Kenny Sebastian",
        hi: "केनी सेबस्टियन",
        ta: "கென்னி செபாஸ்டியன்",
        te: "కెన్నీ సెబాస్టియన్",
        ba: "কেনি সেবাস্টিয়ান",
        or: "କେନି ସେବାଷ୍ଟିଆନ୍ |",
        mr: "केनी सेबॅस्टियन",
        kn: "ಕೆನ್ನಿ ಸೆಬಾಸ್ಟಿಯನ್",
        bh: "केनी सेबस्टियन के नाम से जानल जाला",
        mai: "केनी सेबस्टियन",
        gu: "કેની સેબેસ્ટિયન",
      },
      localisedDescription: {
        en: "The Bangalore-bred and Mumbai based stand-up comedian, writer, showrunner, musician and improviser, is arguably one\nof the biggest in the business.\nHis comedy prowess is seen in his Amazon Prime Video special, Don’t be That Guy, along with the sci-fi comedy web series Starboyz on YouTube, and Comedy Central’s The Living Room. Kenny has also co-written and acted in 'Sketchy Behaviour' (Amazon Prime Video) alongside Kanan Gill. With over 5 million followers online and live vlog shows like 'Chai Time With Kenny', he has created a niche for himself in the space of comedy. After having performed 6 stand-up specials, Kenny’s latest special “The Most Interesting Person in the Room” is available on Netflix. \nKenny has delivered over 1000+ shows across the world. His last World Tour saw him sell over 25000+ Tickets in over 50+ cities globally. Kenny also is the creator & host of the podcast, ‘Simple Ken’ Simpleken is a podcast meant for millennials. With over 30 episodes over the last 2 years and an ever growing audience, the podcast falls under the ‘Top 1% Podcasts Globally’. Kenny has also worked with multiple brands such as Google, KFC, Spotify, Royal Enfield, Taco Bell, OnePlus, Microsoft, Colgate and many more. His knack for understanding a brand's core values and carefully integrating them into his content is highly regarded in the content creator space.\n\nKenny & his passion for creating and exploring more ways for expressing his artistic vision & his ever loving audience,\nhelms him as one of the top creators in India and globally.",
        hi: "\"बैंगलोर में जन्मे और मुंबई में रहने वाले स्टैंड-अप कॉमेडियन, लेखक, शो-रनर, संगीतकार और इम्प्रोवाइजर, यकीनन अपने खेत्र के सबसे बड़े खिलारियों मे एक हैं ।\nउनकी कॉमेडी का कौशल उनके अमेज़ॅन प्राइम वीडियो स्पेशल, डोन्ट बी दैट गाइ के साथ-साथ यूट्यूब पर विज्ञान-फाई कॉमेडी वेब श्रृंखला स्टारबॉयज़ और कॉमेडी सेंट्रल के द लिविंग रूम में देखा जाता है। केनी ने कानन गिल के साथ 'स्केची बिहेवियर' (अमेज़ॅन प्राइम वीडियो) में सह-लेखन और अभिनय भी किया है। ऑनलाइन 5 मिलियन से अधिक फॉलोअर्स और 'चाई टाइम विद केनी' जैसे लाइव व्लॉग शो के साथ, उन्होंने कॉमेडी के क्षेत्र में अपने लिए एक जगह बनाई है। 6 स्टैंड-अप स्पेशल प्रदर्शन करने के बाद, केनी का नवीनतम स्पेशल \"द मोस्ट इंटरेस्टिंग पर्सन इन द रूम\" नेटफ्लिक्स पर उपलब्ध है।\nकेनी ने दुनिया भर में 1000 से अधिक शो किए हैं। उनके आखिरी विश्व दौरे में उन्होंने वैश्विक स्तर पर 50 से अधिक शहरों में 25000 से अधिक टिकटें बेचीं। केनी पॉडकास्ट के निर्माता और होस्ट भी हैं, 'सिंपल केन' सिंपलकेन एक पॉडकास्ट है जो मिलेनियल्स के लिए है। पिछले 2 वर्षों में 30 से अधिक एपिसोड और लगातार बढ़ते दर्शकों के साथ, पॉडकास्ट 'विश्व स्तर पर शीर्ष 1% पॉडकास्ट' के अंतर्गत आता है। केनी ने Google, KFC, Spotify, रॉयल एनफील्ड, टैको बेल, वनप्लस, माइक्रोसॉफ्ट, कोलगेट और कई अन्य ब्रांडों के साथ भी काम किया है। किसी ब्रांड के मूल मूल्यों को समझने और उन्हें अपनी कंटेंट में सावधानीपूर्वक एकीकृत करने की उनकी क्षमता को कंटेंट निर्माता क्षेत्र में अत्यधिक माना जाता है।\n\nकेनी और अपनी कलात्मक दृष्टि और अपने सदैव प्रिय दर्शकों को व्यक्त करने के लिए और अधिक तरीके बनाने और तलाशने का उनका जुनून,\nउन्हें भारत और विश्व स्तर पर शीर्ष रचनाकारों में से एक के रूप में प्रतिष्ठित किया है।\"",
        ta: "பெங்களூரில் வளர்க்கப்படும் மற்றும் மும்பையைச் சேர்ந்த ஸ்டாண்ட்-அப் காமெடியன், எழுத்தாளர், நிகழ்ச்சி நடத்துபவர், இசைக்கலைஞர் மற்றும் மேம்பாட்டாளர், விவாதிக்கக்கூடிய ஒருவர்.\nவணிகத்தில் மிகப்பெரியது.\nயூடியூப்பில் உள்ள ஸ்டார்பாய்ஸ் என்ற அறிவியல் புனைகதை நகைச்சுவை வலைத் தொடரான ​​டோன்ட் பி தட் கை, மற்றும் காமெடி சென்ட்ரலின் தி லிவிங் ரூம் ஆகியவற்றுடன் அவரது அமேசான் பிரைம் வீடியோ ஸ்பெஷல், டோன்ட் பி தட் கை ஆகியவற்றில் அவரது நகைச்சுவைத் திறமை காணப்படுகிறது. கென்னி, கனன் கில் உடன் இணைந்து 'ஸ்கெட்ச்சி பிஹேவியர்' (அமேசான் பிரைம் வீடியோ) என்ற படத்திலும் இணைந்து எழுதி நடித்துள்ளார். ஆன்லைனில் 5 மில்லியனுக்கும் அதிகமான பின்தொடர்பவர்களுடன், 'சாய் டைம் வித் கென்னி' போன்ற நேரடி வ்லாக் நிகழ்ச்சிகளுடன், அவர் நகைச்சுவை வெளியில் தனக்கென ஒரு முக்கிய இடத்தை உருவாக்கியுள்ளார். 6 ஸ்டாண்ட்-அப் ஸ்பெஷல்களை நிகழ்த்திய பிறகு, கென்னியின் சமீபத்திய சிறப்பு \"அறையில் மிகவும் சுவாரஸ்யமான நபர்\" Netflix இல் கிடைக்கிறது.\nகென்னி உலகம் முழுவதும் 1000+ நிகழ்ச்சிகளை வழங்கியுள்ளார். அவரது கடைசி உலக சுற்றுப்பயணத்தில் அவர் உலகளவில் 50+ நகரங்களில் 25000+ டிக்கெட்டுகளை விற்றார். கென்னி போட்காஸ்ட்டின் கிரியேட்டர் & ஹோஸ்ட், 'சிம்பிள் கென்' சிம்பிள்கென் என்பது மில்லினியல்களுக்கான போட்காஸ்ட் ஆகும். கடந்த 2 ஆண்டுகளில் 30க்கும் மேற்பட்ட எபிசோடுகள் மற்றும் தொடர்ந்து வளர்ந்து வரும் பார்வையாளர்களுடன், பாட்காஸ்ட் 'உலகளவில் சிறந்த 1% பாட்காஸ்ட்களின்' கீழ் வருகிறது. கென்னி கூகுள், கேஎஃப்சி, ஸ்பாடிஃபை, ராயல் என்ஃபீல்டு, டகோ பெல், ஒன்பிளஸ், மைக்ரோசாப்ட், கோல்கேட் மற்றும் பல பிராண்டுகளுடன் பணியாற்றியுள்ளார். ஒரு பிராண்டின் முக்கிய மதிப்புகளைப் புரிந்துகொள்வதற்கும், அவற்றைத் தனது உள்ளடக்கத்தில் கவனமாக ஒருங்கிணைப்பதற்குமான அவரது திறமை, உள்ளடக்கத்தை உருவாக்கியவர் இடத்தில் மிகவும் மதிக்கப்படுகிறது.\n\nகென்னி மற்றும் அவரது கலைப் பார்வை மற்றும் அவரது அன்பான பார்வையாளர்களை வெளிப்படுத்துவதற்கான பல வழிகளை உருவாக்கி ஆராய்வதில் அவரது ஆர்வம்,\nஇந்தியாவிலும் உலக அளவிலும் சிறந்த படைப்பாளிகளில் ஒருவராக அவரை வழிநடத்துகிறது.",
        te: "బెంగుళూరు-బ్రేడ్ మరియు ముంబైకి చెందిన స్టాండ్-అప్ కమెడియన్, రైటర్, షోరన్నర్, సంగీతకారుడు మరియు ఇంప్రూవైజర్, నిస్సందేహంగా ఒకరు.\nవ్యాపారంలో అతిపెద్దది.\nఅతని హాస్య నైపుణ్యం అతని అమెజాన్ ప్రైమ్ వీడియో స్పెషల్, డోంట్ బి దట్ గై, యూట్యూబ్‌లో సైన్స్ ఫిక్షన్ కామెడీ వెబ్ సిరీస్ స్టార్‌బాయ్జ్ మరియు కామెడీ సెంట్రల్ యొక్క ది లివింగ్ రూమ్‌లో కనిపిస్తుంది. కెన్నీ కూడా కానన్ గిల్‌తో కలిసి 'స్కెచి బిహేవియర్' (అమెజాన్ ప్రైమ్ వీడియో)లో సహ-రచయిత మరియు నటించారు. ఆన్‌లైన్‌లో 5 మిలియన్లకు పైగా అనుచరులతో మరియు 'చాయ్ టైమ్ విత్ కెన్నీ' వంటి లైవ్ వ్లాగ్ షోలతో, అతను కామెడీ ప్రదేశంలో తనకంటూ ఒక సముచిత స్థానాన్ని సృష్టించుకున్నాడు. 6 స్టాండ్-అప్ స్పెషల్‌లను ప్రదర్శించిన తర్వాత, కెన్నీ యొక్క తాజా ప్రత్యేక \"ది మోస్ట్ ఇంట్రెస్టింగ్ పర్సన్ ఇన్ ది రూమ్\" Netflixలో అందుబాటులో ఉంది.\nకెన్నీ ప్రపంచవ్యాప్తంగా 1000+ షోలను అందించారు. అతని చివరి ప్రపంచ పర్యటనలో అతను ప్రపంచవ్యాప్తంగా 50+ నగరాల్లో 25000+ టిక్కెట్లను విక్రయించాడు. కెన్నీ పాడ్‌క్యాస్ట్ సృష్టికర్త & హోస్ట్, 'సింపుల్ కెన్' సింప్లెకెన్ మిలీనియల్స్ కోసం ఉద్దేశించిన పాడ్‌కాస్ట్. గత 2 సంవత్సరాల్లో 30కి పైగా ఎపిసోడ్‌లు మరియు ఎప్పటికప్పుడు పెరుగుతున్న ప్రేక్షకులతో, పాడ్‌క్యాస్ట్ 'ప్రపంచవ్యాప్తంగా టాప్ 1% పాడ్‌క్యాస్ట్‌లు' కిందకు వస్తుంది. కెన్నీ గూగుల్, కెఎఫ్‌సి, స్పాటిఫై, రాయల్ ఎన్‌ఫీల్డ్, టాకో బెల్, వన్‌ప్లస్, మైక్రోసాఫ్ట్, కోల్‌గేట్ మరియు మరెన్నో వంటి బహుళ బ్రాండ్‌లతో కూడా పనిచేశారు. బ్రాండ్ యొక్క ప్రధాన విలువలను అర్థం చేసుకోవడంలో మరియు వాటిని తన కంటెంట్‌లో జాగ్రత్తగా ఏకీకృతం చేయడంలో అతని నైపుణ్యం కంటెంట్ సృష్టికర్త స్థలంలో ఎక్కువగా పరిగణించబడుతుంది.\n\nకెన్నీ & అతని కళాత్మక దృష్టిని మరియు అతనిని ఎప్పుడూ ప్రేమించే ప్రేక్షకులను వ్యక్తీకరించడానికి మరిన్ని మార్గాలను సృష్టించడం మరియు అన్వేషించడం పట్ల అతని అభిరుచి,\nభారతదేశం మరియు ప్రపంచవ్యాప్తంగా అగ్రశ్రేణి సృష్టికర్తలలో ఒకరిగా అతనిని హెల్మ్ చేస్తుంది.",
        ba: "ব্যাঙ্গালোর বংশোদ্ভূত এবং মুম্বাই ভিত্তিক স্ট্যান্ড-আপ কমেডিয়ান, লেখক, শোরানার, মিউজিশিয়ান এবং ইম্প্রোভাইজার, তর্কযোগ্যভাবে একজন\nব্যবসার মধ্যে সবচেয়ে বড়।\nতার কমেডি দক্ষতা তার অ্যামাজন প্রাইম ভিডিও স্পেশাল, ডোন্ট বি দ্যাট গাই, ইউটিউবে সাই-ফাই কমেডি ওয়েব সিরিজ স্টারবয়েজ এবং কমেডি সেন্ট্রালের দ্য লিভিং রুম সহ দেখা যায়। কেনি কানন গিল-এর পাশাপাশি 'স্কেচি বিহেভিয়ার' (অ্যামাজন প্রাইম ভিডিও)-এ সহ-লেখা ও অভিনয় করেছেন। 'চাই টাইম উইথ কেনি'-এর মতো অনলাইনে 5 মিলিয়নেরও বেশি ফলোয়ার এবং লাইভ ভ্লগ শো সহ, তিনি কমেডির জায়গায় নিজের জন্য একটি বিশেষ স্থান তৈরি করেছেন। 6টি স্ট্যান্ড-আপ স্পেশাল পারফর্ম করার পর, কেনির সর্বশেষ বিশেষ \"দ্য মোস্ট ইন্টারেস্টিং পারসন ইন দ্য রুম\" Netflix-এ উপলব্ধ।\nকেনি সারা বিশ্বে 1000টিরও বেশি শো প্রদান করেছে। তার শেষ ওয়ার্ল্ড ট্যুর দেখেছেন তিনি বিশ্বব্যাপী 50টিরও বেশি শহরে 25000+ টিকেট বিক্রি করেছেন। কেনিও পডকাস্টের স্রষ্টা এবং হোস্ট, ‘সিম্পল কেন’ সিম্পলকেন সহস্রাব্দের জন্য একটি পডকাস্ট। গত 2 বছরে 30 টিরও বেশি পর্ব এবং ক্রমাগত ক্রমবর্ধমান দর্শকদের সাথে, পডকাস্টটি 'বিশ্বব্যাপী শীর্ষ 1% পডকাস্ট'-এর অধীনে পড়ে। কেনি একাধিক ব্র্যান্ড যেমন গুগল, কেএফসি, স্পটিফাই, রয়্যাল এনফিল্ড, টাকো বেল, ওয়ানপ্লাস, মাইক্রোসফ্ট, কোলগেট এবং আরও অনেকের সাথে কাজ করেছেন। একটি ব্র্যান্ডের মূল মানগুলি বোঝার এবং সাবধানতার সাথে সেগুলিকে তার সামগ্রীতে একীভূত করার জন্য তাঁর দক্ষতা বিষয়বস্তু নির্মাতার ক্ষেত্রে অত্যন্ত সম্মানিত।\n\nকেনি এবং তার শৈল্পিক দৃষ্টিভঙ্গি এবং তার সর্বদা প্রেমময় শ্রোতাদের প্রকাশ করার জন্য আরও উপায় তৈরি এবং অন্বেষণ করার জন্য তার আবেগ,\nতাকে ভারতে এবং বিশ্বব্যাপী শীর্ষ নির্মাতাদের একজন হিসাবে পরিচালিত করে।",
        or: "ବାଙ୍ଗାଲୋର-ବ୍ରଡ୍ ଏବଂ ମୁମ୍ବାଇ ସ୍ଥିତ ଷ୍ଟାଣ୍ଡ ଅପ୍ ହାସ୍ୟ ଅଭିନେତା, ଲେଖକ, ଶୋ’ରନର୍, ସଙ୍ଗୀତଜ୍ଞ ଏବଂ ଇମ୍ପ୍ରୋଭାଇଜର, ଯୁକ୍ତିତର୍କ ହେଉଛି |\nବ୍ୟବସାୟରେ ସବୁଠାରୁ ବଡ\nତାଙ୍କର କମେଡି ପ୍ରବୃତ୍ତି ତାଙ୍କ ଆମାଜନ ପ୍ରାଇମ ଭିଡିଓ ସ୍ special ତନ୍ତ୍ର, ୟୁଟ୍ୟୁବରେ ସାଇ-ଫାଇ କମେଡି ୱେବ୍ ସିରିଜ୍ ଷ୍ଟାରବୋଜ୍ ଏବଂ କମେଡି ସେଣ୍ଟ୍ରାଲର ଲିଭିଙ୍ଗ୍ ରୁମ୍ ସହିତ ତାଙ୍କ ଆମାଜନ ପ୍ରାଇମ୍ ଭିଡିଓ ସ୍ପେସିଆଲ୍ ରେ ଦେଖାଯାଏ | କେନି କାନନ ଗିଲଙ୍କ ସହ 'ସ୍କେଚି ଆଚରଣ' (ଆମାଜନ ପ୍ରାଇମ ଭିଡିଓ) ରେ ସହ-ଲେଖିଛନ୍ତି ଏବଂ ଅଭିନୟ କରିଛନ୍ତି। ଅନ୍ଲାଇନ୍ରେ 5 ମିଲିୟନରୁ ଅଧିକ ଅନୁସରଣକାରୀ ଏବଂ 'ଚାଇ ଟାଇମ୍ ୱିଥ୍ କେନି' ପରି ଲାଇଭ୍ ଭ୍ଲଗ୍ ସୋ ସହିତ ସେ ହାସ୍ୟରସ ସ୍ଥାନରେ ନିଜ ପାଇଁ ଏକ ଭଲ ସ୍ଥାନ ସୃଷ୍ଟି କରିଛନ୍ତି | Stand ଟି ଷ୍ଟାଣ୍ଡ ଅପ୍ ସ୍ପେଶାଲ୍ କରିବା ପରେ, କେନିଙ୍କ ସର୍ବଶେଷ ସ୍ୱତନ୍ତ୍ର “ରୁମରେ ସବୁଠାରୁ ଆକର୍ଷଣୀୟ ବ୍ୟକ୍ତି” ନେଟଫ୍ଲିକ୍ସରେ ଉପଲବ୍ଧ |\nକେନି ସମଗ୍ର ବିଶ୍ୱରେ 1000+ ରୁ ଅଧିକ ଶୋ ’ବିତରଣ କରିଛନ୍ତି | ତାଙ୍କର ଶେଷ ୱାର୍ଲ୍ଡ ଟୁର୍ ତାଙ୍କୁ ବିଶ୍ୱରେ 50+ ରୁ ଅଧିକ ସହରରେ 25000+ ଟିକେଟ୍ ବିକ୍ରି କରୁଥିବା ଦେଖିଥିଲେ | କେନି ମଧ୍ୟ ପୋଡକାଷ୍ଟର ନିର୍ମାତା ତଥା ହୋଷ୍ଟ, ‘ସରଳ କେନ୍’ ସିମ୍ପଲେକେନ୍ ସହସ୍ର ବର୍ଷ ପାଇଁ ଉଦ୍ଦିଷ୍ଟ ଏକ ପୋଡକାଷ୍ଟ | ଗତ 2 ବର୍ଷ ମଧ୍ୟରେ 30 ରୁ ଅଧିକ ଏପିସୋଡ୍ ଏବଂ ଦିନକୁ ଦିନ ବ growing ୁଥିବା ଦର୍ଶକ ସହିତ, ପୋଡକାଷ୍ଟ ‘ସର୍ବଭାରତୀୟ ସ୍ତରରେ ଟପ୍ 1% ପୋଡକାଷ୍ଟ’ ଅଧୀନରେ ପଡେ | କେନି ଗୁଗୁଲ୍, କେଏଫସି, ସ୍ପୋଟିଫ୍, ରୟାଲ୍ ଏନ୍ଫିଲ୍ଡ, ଟାକୋ ବେଲ୍, ୱାନପ୍ଲସ୍, ମାଇକ୍ରୋସଫ୍ଟ, କୋଲଗେଟ୍ ଏବଂ ଅନ୍ୟାନ୍ୟ ବ୍ରାଣ୍ଡ ସହିତ ମଧ୍ୟ କାମ କରିଛନ୍ତି | ଏକ ବ୍ରାଣ୍ଡର ମୂଳ ମୂଲ୍ୟ ବୁ understanding ିବା ଏବଂ ସେଗୁଡିକୁ ନିଜ ବିଷୟବସ୍ତୁରେ ଯତ୍ନର ସହିତ ସଂଯୋଗ କରିବା ପାଇଁ ତାଙ୍କର ନ୍ୟାକ୍ ବିଷୟବସ୍ତୁ ସୃଷ୍ଟିକର୍ତ୍ତା ସ୍ଥାନରେ ଉଚ୍ଚ ସମ୍ମାନିତ |\n\nକେନି ଏବଂ ତାଙ୍କର କଳାତ୍ମକ ଦୃଷ୍ଟିକୋଣ ଏବଂ ତାଙ୍କର ସର୍ବଦା ଭଲପାଉଥିବା ଦର୍ଶକଙ୍କୁ ପ୍ରକାଶ କରିବା ପାଇଁ ଅଧିକ ଉପାୟ ସୃଷ୍ଟି ଏବଂ ଅନୁସନ୍ଧାନ ପାଇଁ ତାଙ୍କର ଆଗ୍ରହ,\nତାଙ୍କୁ ଭାରତ ତଥା ସର୍ବଭାରତୀୟ ସ୍ତରରେ ଶ୍ରେଷ୍ଠ ସୃଷ୍ଟିକର୍ତ୍ତା ଭାବରେ ସାହାଯ୍ୟ କରେ |",
        mr: "बंगलोर-प्रजनन आणि मुंबई स्थित स्टँड-अप कॉमेडियन, लेखक, शोरनर, संगीतकार आणि सुधारक, वादातीतपणे एक आहे\nव्यवसायातील सर्वात मोठे.\nत्याचा विनोदी पराक्रम त्याच्या Amazon प्राइम व्हिडिओ स्पेशल, डोन्ट बी दॅट गाय, यूट्यूबवरील स्टारबॉयज या साय-फाय कॉमेडी वेब सिरीज आणि कॉमेडी सेंट्रलच्या द लिव्हिंग रूममध्ये दिसून येतो. केनीने कानन गिलसोबत 'स्केची बिहेविअर' (अमेझॉन प्राइम व्हिडिओ) मध्ये सह-लेखन आणि अभिनय देखील केला आहे. 'चाय टाइम विथ केनी' सारख्या ऑनलाइन आणि लाइव्ह व्लॉग शोच्या 5 दशलक्षाहून अधिक फॉलोअर्ससह, त्याने कॉमेडीच्या क्षेत्रात स्वतःसाठी एक स्थान निर्माण केले आहे. 6 स्टँड-अप स्पेशल सादर केल्यानंतर, केनीचे नवीनतम स्पेशल “द मोस्ट इंटरेस्टिंग पर्सन इन द रूम” नेटफ्लिक्सवर उपलब्ध आहे.\nकेनीने जगभरात 1000+ हून अधिक शो वितरित केले आहेत. त्याच्या शेवटच्या वर्ल्ड टूरमध्ये त्याने जागतिक स्तरावर 50+ शहरांमध्ये 25000+ पेक्षा जास्त तिकिटे विकली. केनी पॉडकास्टचा निर्माता आणि होस्ट देखील आहे, ‘सिंपल केन’ सिंपलकेन हे सहस्राब्दी लोकांसाठी असलेले पॉडकास्ट आहे. गेल्या 2 वर्षांत 30 हून अधिक भाग आणि सतत वाढत जाणारे प्रेक्षक, पॉडकास्ट 'जागतिक पातळीवर शीर्ष 1% पॉडकास्ट' अंतर्गत येते. केनीने Google, KFC, Spotify, Royal Enfield, Taco Bell, OnePlus, Microsoft, Colgate आणि इतर अनेक ब्रँड्ससह देखील काम केले आहे. ब्रँडची मूळ मूल्ये समजून घेण्याची आणि ती त्याच्या सामग्रीमध्ये काळजीपूर्वक एकत्रित करण्याची त्यांची हातोटी सामग्री निर्मात्याच्या जागेत अत्यंत मानली जाते.\n\nकेनी आणि त्याची कलात्मक दृष्टी आणि त्याचे सदैव प्रेमळ प्रेक्षक व्यक्त करण्यासाठी आणखी मार्ग तयार करण्याची आणि एक्सप्लोर करण्याची त्याची आवड,\nत्यांना भारतातील आणि जागतिक स्तरावरील सर्वोच्च निर्मात्यांपैकी एक म्हणून मार्गदर्शन केले.",
        kn: "ಬೆಂಗಳೂರು ಮೂಲದ ಮತ್ತು ಮುಂಬೈ ಮೂಲದ ಸ್ಟ್ಯಾಂಡ್-ಅಪ್ ಹಾಸ್ಯನಟ, ಬರಹಗಾರ, ಪ್ರದರ್ಶನಕಾರ, ಸಂಗೀತಗಾರ ಮತ್ತು ಸುಧಾರಕ, ವಾದಯೋಗ್ಯವಾಗಿ ಒಬ್ಬರು\nವ್ಯವಹಾರದಲ್ಲಿ ದೊಡ್ಡದಾಗಿದೆ.\nಅವರ ಹಾಸ್ಯ ಪರಾಕ್ರಮವು ಅವರ ಅಮೆಜಾನ್ ಪ್ರೈಮ್ ವಿಡಿಯೋ ವಿಶೇಷ, ಡೋಂಟ್ ಬಿ ದಟ್ ಗೈ, ಜೊತೆಗೆ ಯೂಟ್ಯೂಬ್‌ನಲ್ಲಿನ ವೈಜ್ಞಾನಿಕ ಹಾಸ್ಯ ವೆಬ್ ಸರಣಿ Starboyz ಮತ್ತು ಕಾಮಿಡಿ ಸೆಂಟ್ರಲ್‌ನ ದಿ ಲಿವಿಂಗ್ ರೂಮ್‌ನಲ್ಲಿ ಕಂಡುಬರುತ್ತದೆ. ಕೆನ್ನಿ ಕಾನನ್ ಗಿಲ್ ಜೊತೆಗೆ 'ಸ್ಕೆಚಿ ಬಿಹೇವಿಯರ್' (ಅಮೆಜಾನ್ ಪ್ರೈಮ್ ವಿಡಿಯೋ) ನಲ್ಲಿ ಸಹ-ಬರೆದಿದ್ದಾರೆ ಮತ್ತು ನಟಿಸಿದ್ದಾರೆ. ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ 5 ಮಿಲಿಯನ್‌ಗಿಂತಲೂ ಹೆಚ್ಚು ಅನುಯಾಯಿಗಳೊಂದಿಗೆ ಮತ್ತು 'ಚಾಯ್ ಟೈಮ್ ವಿತ್ ಕೆನ್ನಿ' ನಂತಹ ಲೈವ್ ವ್ಲಾಗ್ ಶೋಗಳೊಂದಿಗೆ, ಅವರು ಹಾಸ್ಯದ ಜಾಗದಲ್ಲಿ ತನಗಾಗಿ ಒಂದು ಸ್ಥಾನವನ್ನು ಸೃಷ್ಟಿಸಿಕೊಂಡಿದ್ದಾರೆ. 6 ಸ್ಟ್ಯಾಂಡ್-ಅಪ್ ವಿಶೇಷತೆಗಳನ್ನು ಪ್ರದರ್ಶಿಸಿದ ನಂತರ, ಕೆನ್ನಿಯ ಇತ್ತೀಚಿನ ವಿಶೇಷ \"ದಿ ಮೋಸ್ಟ್ ಇಂಟ್ರೆಸ್ಟಿಂಗ್ ಪರ್ಸನ್ ಇನ್ ದಿ ರೂಮ್\" ನೆಟ್‌ಫ್ಲಿಕ್ಸ್‌ನಲ್ಲಿ ಲಭ್ಯವಿದೆ.\nಕೆನ್ನಿ ಪ್ರಪಂಚದಾದ್ಯಂತ 1000+ ಪ್ರದರ್ಶನಗಳನ್ನು ನೀಡಿದ್ದಾರೆ. ಅವರ ಕೊನೆಯ ವಿಶ್ವ ಪ್ರವಾಸದಲ್ಲಿ ಅವರು ಜಾಗತಿಕವಾಗಿ 50+ ನಗರಗಳಲ್ಲಿ 25000+ ಟಿಕೆಟ್‌ಗಳನ್ನು ಮಾರಾಟ ಮಾಡಿದರು. ಕೆನ್ನಿ ಪಾಡ್‌ಕ್ಯಾಸ್ಟ್‌ನ ಸೃಷ್ಟಿಕರ್ತ ಮತ್ತು ಹೋಸ್ಟ್ ಆಗಿದ್ದಾರೆ, 'ಸಿಂಪಲ್ ಕೆನ್' ಸಿಂಪಲ್‌ಕೆನ್ ಮಿಲೇನಿಯಲ್‌ಗಳಿಗೆ ಮೀಸಲಾದ ಪಾಡ್‌ಕ್ಯಾಸ್ಟ್ ಆಗಿದೆ. ಕಳೆದ 2 ವರ್ಷಗಳಲ್ಲಿ 30 ಸಂಚಿಕೆಗಳು ಮತ್ತು ನಿರಂತರವಾಗಿ ಬೆಳೆಯುತ್ತಿರುವ ಪ್ರೇಕ್ಷಕರೊಂದಿಗೆ, ಪಾಡ್‌ಕ್ಯಾಸ್ಟ್ 'ಜಾಗತಿಕವಾಗಿ ಟಾಪ್ 1% ಪಾಡ್‌ಕಾಸ್ಟ್‌ಗಳು' ಅಡಿಯಲ್ಲಿ ಬರುತ್ತದೆ. ಕೆನ್ನಿ ಅವರು ಗೂಗಲ್, ಕೆಎಫ್‌ಸಿ, ಸ್ಪಾಟಿಫೈ, ರಾಯಲ್ ಎನ್‌ಫೀಲ್ಡ್, ಟ್ಯಾಕೋ ಬೆಲ್, ಒನ್‌ಪ್ಲಸ್, ಮೈಕ್ರೋಸಾಫ್ಟ್, ಕೋಲ್ಗೇಟ್ ಮತ್ತು ಇನ್ನೂ ಅನೇಕ ಬ್ರಾಂಡ್‌ಗಳೊಂದಿಗೆ ಕೆಲಸ ಮಾಡಿದ್ದಾರೆ. ಬ್ರ್ಯಾಂಡ್‌ನ ಪ್ರಮುಖ ಮೌಲ್ಯಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಮತ್ತು ಅವರ ವಿಷಯಕ್ಕೆ ಎಚ್ಚರಿಕೆಯಿಂದ ಸಂಯೋಜಿಸಲು ಅವರ ಕೌಶಲ್ಯವು ವಿಷಯ ರಚನೆಕಾರರ ಜಾಗದಲ್ಲಿ ಹೆಚ್ಚು ಪರಿಗಣಿಸಲ್ಪಟ್ಟಿದೆ.\n\nಕೆನ್ನಿ ಮತ್ತು ಅವರ ಕಲಾತ್ಮಕ ದೃಷ್ಟಿಕೋನವನ್ನು ವ್ಯಕ್ತಪಡಿಸಲು ಹೆಚ್ಚಿನ ಮಾರ್ಗಗಳನ್ನು ರಚಿಸುವ ಮತ್ತು ಅನ್ವೇಷಿಸುವ ಅವರ ಉತ್ಸಾಹ ಮತ್ತು ಅವರ ಪ್ರೀತಿಯ ಪ್ರೇಕ್ಷಕರು,\nಭಾರತದಲ್ಲಿ ಮತ್ತು ಜಾಗತಿಕವಾಗಿ ಉನ್ನತ ರಚನೆಕಾರರಲ್ಲಿ ಒಬ್ಬರಾಗಿ ಅವರನ್ನು ಹೆಲ್ಮ್ಸ್ ಮಾಡುತ್ತದೆ.",
        bh: "बंगलौर में पैदा भइल आ मुंबई के ई स्टैंड अप कॉमेडियन, लेखक, शोरनर, संगीतकार आ इम्प्रूवमेंट, तर्कसंगत रूप से एक हउवें\nके कारोबार में सबसे बड़का के.\nइनके कॉमेडी पराक्रम इनके अमेजन प्राइम वीडियो स्पेशल, डोंट बी दैट गाय के साथ यूट्यूब पर साइ-फाई कॉमेडी वेब सीरीज स्टारबॉयज, आ कॉमेडी सेंट्रल के द लिविंग रूम में देखल जाला। केनी कानन गिल के साथे ‘स्केची बिहेवियर’ (अमेजन प्राइम वीडियो) में भी सह-लेखन आ अभिनय कइले बाड़न। 50 लाख से अधिका फॉलोअर्स ऑनलाइन आ लाइव व्लॉग शो जइसे कि 'चाय टी.'",
        mai: "बंगलौर केरऽ नस्ल आरू मुंबई केरऽ ई स्टैंड-अप कॉमेडियन, लेखक, शोरनर, संगीतकार आरू इम्प्रूवमेंट, यकीनन एक छै\nव्यवसाय मे सबसँ पैघ के।\nहुनकऽ हास्य पराक्रम हुनकऽ अमेजन प्राइम वीडियो स्पेशल, डोंट बी दैट गाय के साथ-साथ यूट्यूब प॑ साइ-फाई कॉमेडी वेब सीरीज स्टारबॉयज, आरू कॉमेडी सेंट्रल केरऽ द लिविंग रूम म॑ देखलऽ जाय छै । केनी न॑ कानन गिल के साथ ‘स्केची बिहेवियर’ (अमेज़न प्राइम वीडियो) म॑ भी सह-लेखन आरू अभिनय करल॑ छै । 50 लाख स बेसी फॉलोअर्स के संग ऑनलाइन आ लाइव व्लॉग शो जेना 'चाय टी",
        gu: "બેંગ્લોર વંશ અને મુંબઈ સ્થિત સ્ટેન્ડ-અપ કોમેડિયન, લેખક, શોરનર, સંગીતકાર અને ઇમ્પ્રુવાઇઝર, દલીલપૂર્વક એક છે\nવ્યવસાયમાં સૌથી મોટી.\nતેની કોમેડી પરાક્રમ તેના એમેઝોન પ્રાઇમ વિડીયો સ્પેશિયલ, ડોન્ટ બી ધેટ ગાય, યુટ્યુબ પરની સાયન્સ-ફાઇ કોમેડી વેબ સિરીઝ સ્ટારબોયઝ અને કોમેડી સેન્ટ્રલના ધ લિવિંગ રૂમમાં જોવા મળે છે. કેનીએ કાનન ગિલ સાથે 'સ્કેચી બિહેવિયર' (એમેઝોન પ્રાઇમ વિડિયો)માં સહ-લેખન અને અભિનય પણ કર્યો છે. 5 મિલિયનથી વધુ ફોલોઅર્સ સાથે ઓનલાઈન અને 'ચાઈ ટાઈમ વિથ કેની' જેવા લાઈવ વ્લોગ શો સાથે, તેણે કોમેડીના ક્ષેત્રમાં પોતાના માટે એક વિશિષ્ટ સ્થાન બનાવ્યું છે. 6 સ્ટેન્ડ-અપ સ્પેશિયલ પર્ફોર્મ કર્યા પછી, કેનીનું લેટેસ્ટ સ્પેશિયલ “ધ મોસ્ટ ઇન્ટરેસ્ટિંગ પર્સન ઇન ધ રૂમ” નેટફ્લિક્સ પર ઉપલબ્ધ છે.\nકેનીએ વિશ્વભરમાં 1000+ થી વધુ શો વિતરિત કર્યા છે. તેમની છેલ્લી વર્લ્ડ ટુરમાં તેમણે વૈશ્વિક સ્તરે 50+ શહેરોમાં 25000+ થી વધુ ટિકિટો વેચી હતી. કેની પોડકાસ્ટના સર્જક અને હોસ્ટ પણ છે, ‘સિમ્પલ કેન’ સિમ્પલકેન એ પોડકાસ્ટ છે જે સહસ્ત્રાબ્દીઓ માટે છે. છેલ્લા 2 વર્ષમાં 30 થી વધુ એપિસોડ અને સતત વધતા પ્રેક્ષકો સાથે, પોડકાસ્ટ 'ગ્લોબલલી ટોચના 1% પોડકાસ્ટ' હેઠળ આવે છે. કેનીએ Google, KFC, Spotify, Royal Enfield, Taco Bell, OnePlus, Microsoft, Colgate અને બીજી ઘણી બધી બ્રાન્ડ્સ સાથે પણ કામ કર્યું છે. બ્રાંડના મુખ્ય મૂલ્યોને સમજવા અને તેને તેની સામગ્રીમાં કાળજીપૂર્વક એકીકૃત કરવાની તેમની કુશળતા સામગ્રી સર્જક જગ્યામાં ખૂબ જ માનવામાં આવે છે.\n\nકેની અને તેની કલાત્મક દ્રષ્ટિ અને તેના હંમેશા પ્રેમાળ પ્રેક્ષકોને વ્યક્ત કરવા માટે વધુ માર્ગો બનાવવા અને અન્વેષણ કરવાનો તેમનો જુસ્સો,\nતેમને ભારતમાં અને વૈશ્વિક સ્તરે ટોચના સર્જકોમાંના એક તરીકે સુકાન આપે છે.",
      },
      reactionCount: 21726,
      reactions: {
        laugh: 14604,
        neutral: 4487,
        sad: 2635,
      },
    },
  },
  {
    id: "e400c10c-f208-4795-b78f-a19fe36c058c",
    ordering: 2,
    displayName: "",
    firstName: "mallikadua",
    lastName: "",
    likeCount: 0,
    playCount: 0,
    viewCount: 0,
    followers: 3945,
    description:
      "Mallika Dua is a trained actor who wrote and featured in the video `Shit people say in Sarojni Nagar` which went on to become viral all over the internet. Mallika also makes Instagram videos with characters like Make Up Didi, Komal, Shashi and Daadi. She made a special appearence in the 2017 movie, Hindi Medium. The movie starred Irrfan Khan and Saba Qamar in prominent roles. Her 2020 release includes Indoo Ki Jawani.",
    duration: 0,
    thumbnail:
      "https://d35f5vastl4boc.cloudfront.net/profileImage/Mallika_dua.png",
    url: "https://d35f5vastl4boc.cloudfront.net/profileImage/Mallika_dua.png",
    assetId: "e400c10c-f208-4795-b78f-a19fe36c058c",
    contentType: "",
    bannerUrl:
      "https://d35f5vastl4boc.cloudfront.net/profileImage/Mallika_dua.png",
    pristine_image: "",
    profile: {
      _id: "e400c10c-f208-4795-b78f-a19fe36c058c",
      userId: "e400c10c-f208-4795-b78f-a19fe36c058c",
      fullName: "Mallika Dua",
      userName: "mallikadua",
      email: "mallikadua@hww.com",
      description:
        "Mallika Dua is a trained actor who wrote and featured in the video `Shit people say in Sarojni Nagar` which went on to become viral all over the internet. Mallika also makes Instagram videos with characters like Make Up Didi, Komal, Shashi and Daadi. She made a special appearence in the 2017 movie, Hindi Medium. The movie starred Irrfan Khan and Saba Qamar in prominent roles. Her 2020 release includes Indoo Ki Jawani.",
      status: "ACTIVE",
      profileImageUrl:
        "https://d35f5vastl4boc.cloudfront.net/profileImage/Mallika_dua.png",
      followersCount: 3945,
      followingCount: 0,
      videoCount: 0,
      shareCount: 0,
      likeCount: 0,
      commentCount: 0,
      bookmarkCount: 0,
      backgroundImage:
        "https://d35f5vastl4boc.cloudfront.net/profileImage/Mallika_dua.png",
      localisedFullName: {
        en: "Mallika Dua",
        hi: "मल्लिका दुआ",
        ta: "மல்லிகா துவா",
        te: "మల్లికా దువా",
        ba: "মল্লিকা দুয়া",
        or: "ମଲ୍ଲିକା ଦୁଆ |",
        mr: "मल्लिका दुआ",
        kn: "ಮಲ್ಲಿಕಾ ದುವಾ",
        bh: "मल्लिका दुआ के बा",
        mai: "मल्लिका दुआ",
        gu: "મલ્લિકા દુઆ",
      },
      localisedDescription: {
        en: "Mallika Dua is a trained actor who wrote and featured in the video `Shit people say in Sarojni Nagar` which went on to become viral all over the internet. Mallika also makes Instagram videos with characters like Make Up Didi, Komal, Shashi and Daadi. She made a special appearence in the 2017 movie, Hindi Medium. The movie starred Irrfan Khan and Saba Qamar in prominent roles. Her 2020 release includes Indoo Ki Jawani.",
        hi: "मल्लिका दुआ एक प्रशिक्षित अभिनेत्री हैं, जिन्होंने 'शिट पीपल से इन सरोजनी नगर ' वीडियो में काम किया और उसमें अभिनय किया, जो पूरे इंटरनेट पर वायरल हो गया। मल्लिका मेक अप दीदी, कोमल, शशि और दादी जैसे किरदारों के साथ इंस्टाग्राम वीडियो भी बनाती हैं। उन्होंने 2017 की फिल्म, हिंदी मीडियम में एक विशेष भूमिका निभाई। फिल्म में इरफ़ान खान और सबा क़मर ने प्रमुख भूमिकाएँ निभाईं। उनकी 2020 की रिलीज़ में इंदु की जवानी शामिल है।",
        ta: "மல்லிகா துவா ஒரு பயிற்சி பெற்ற நடிகர் ஆவார், அவர் 'சரோஜ்னி நகரில் ஷிட் பீப்பிள் ஸ்டோ இன் சரோஜ்னி நகரில்' என்ற வீடியோவை எழுதி அதில் இடம்பெற்றுள்ளார், இது இணையம் முழுவதும் வைரலானது. மல்லிகா மேக் அப் திதி, கோமல், சஷி மற்றும் தாடி போன்ற கதாபாத்திரங்களுடன் இன்ஸ்டாகிராம் வீடியோக்களையும் செய்கிறார். அவர் 2017 திரைப்படமான ஹிந்தி மீடியத்தில் சிறப்புத் தோற்றத்தில் நடித்தார். இந்த படத்தில் இர்ஃபான் கான் மற்றும் சபா கமர் ஆகியோர் முக்கிய வேடங்களில் நடித்துள்ளனர். அவரது 2020 வெளியீட்டில் இந்தூ கி ஜவானி அடங்கும்.",
        te: "మల్లికా దువా శిక్షణ పొందిన నటి, ఆమె 'షిట్ పీపుల్ సే ఇన్ సరోజినీ నగర్' వీడియోను వ్రాసి ప్రదర్శించింది, ఇది ఇంటర్నెట్ అంతటా వైరల్ అయ్యింది. మేకప్ దీదీ, కోమల్, శశి మరియు దాడీ వంటి పాత్రలతో మల్లిక Instagram వీడియోలను కూడా చేస్తుంది. 2017లో విడుదలైన హిందీ మీడియం చిత్రంలో ఆమె ప్రత్యేక పాత్ర పోషించింది. ఈ చిత్రంలో ఇర్ఫాన్ ఖాన్ మరియు సబా కమర్ ప్రధాన పాత్రలు పోషించారు. ఆమె 2020 విడుదలలో ఇందూ కి జవానీ కూడా ఉంది.",
        ba: "মল্লিকা দুয়া হলেন একজন প্রশিক্ষিত অভিনেতা যিনি ভিডিও লিখেছেন এবং ফিচার করেছেন `সরোজনী নগরে লোকে বলে` যা ইন্টারনেটে ভাইরাল হয়ে গেছে। মল্লিকা মেক আপ দিদি, কোমল, শশী এবং দাদির মতো চরিত্রগুলির সাথে ইনস্টাগ্রাম ভিডিওও তৈরি করে। তিনি 2017 সিনেমা হিন্দি মিডিয়ামে একটি বিশেষ উপস্থিতি করেছিলেন। মুভিটিতে ইরফান খান এবং সাবা কামার প্রধান চরিত্রে অভিনয় করেছেন। তার 2020 সালে মুক্তি পাওয়া ইন্দু কি জাওয়ানি অন্তর্ভুক্ত।",
        or: "ମଲ୍ଲିକା ଦୁଆ ଜଣେ ତାଲିମପ୍ରାପ୍ତ ଅଭିନେତା ଯିଏ ସାରୋଜନୀ ନାଗରରେ ଶିଟ୍ ଲୋକମାନେ କୁହନ୍ତି ଭିଡିଓରେ ଲେଖିଛନ୍ତି ଏବଂ ଏଥିରେ ଅଭିନୟ କରିଛନ୍ତି ଯାହା ଇଣ୍ଟରନେଟରେ ଭାଇରାଲ ହେବାରେ ଲାଗିଛି। ମଲ୍ଲିକା ମେକ୍ ଇନ୍ ଦିଦି, କୋମଲ, ଶଶି ଏବଂ ଦାଡି ଭଳି ଚରିତ୍ର ସହିତ ଇନଷ୍ଟାଗ୍ରାମ ଭିଡିଓ ମଧ୍ୟ ତିଆରି କରନ୍ତି | ସେ 2017 ଚଳଚ୍ଚିତ୍ର ହିନ୍ଦୀ ମିଡିୟମରେ ଏକ ବିଶେଷ ପ୍ରଦର୍ଶନ କରିଥିଲେ | ଏହି ସିନେମାରେ ଇରଫାନ ଖାନ ଏବଂ ସବା କାମାର ପ୍ରମୁଖ ଭୂମିକାରେ ଅଭିନୟ କରିଥିଲେ। ତାଙ୍କର 2020 ରିଲିଜରେ ଇଣ୍ଡୋ କି ଜାୱାନୀ ଅନ୍ତର୍ଭୁକ୍ତ |",
        mr: "मल्लिका दुआ ही एक प्रशिक्षित अभिनेत्री आहे जिने `सरोजनी नगरमध्ये शिट पीपल सेल्स` हा व्हिडिओ लिहिला आणि दाखवला जो इंटरनेटवर व्हायरल झाला. मल्लिका मेक अप दीदी, कोमल, शशी आणि दादी या पात्रांसह इंस्टाग्राम व्हिडिओ देखील बनवते. 2017 मध्ये आलेल्या हिंदी मीडियम या सिनेमात तिने खास भूमिका साकारली होती. या चित्रपटात इरफान खान आणि सबा कमर प्रमुख भूमिकेत होते. तिच्या 2020 च्या रिलीजमध्ये इंदू की जवानी समाविष्ट आहे.",
        kn: "ಮಲ್ಲಿಕಾ ದುವಾ ಅವರು ತರಬೇತಿ ಪಡೆದ ನಟ, ಅವರು ಬರೆದು ಕಾಣಿಸಿಕೊಂಡಿರುವ ವೀಡಿಯೊ `ಶಿಟ್ ಪೀಪಲ್ ಸೇ ಇನ್ ಸರೋಜನಿ ನಗರದಲ್ಲಿ~ ಇದು ಅಂತರ್ಜಾಲದಲ್ಲಿ ವೈರಲ್ ಆಗಿದೆ. ಮಲ್ಲಿಕಾ ಮೇಕಪ್ ದೀದಿ, ಕೋಮಲ್, ಶಶಿ ಮತ್ತು ದಾದಿಯಂತಹ ಪಾತ್ರಗಳೊಂದಿಗೆ Instagram ವೀಡಿಯೊಗಳನ್ನು ಸಹ ಮಾಡುತ್ತಾರೆ. ಅವರು 2017 ರ ಚಲನಚಿತ್ರ ಹಿಂದಿ ಮೀಡಿಯಂನಲ್ಲಿ ವಿಶೇಷ ಕಾಣಿಸಿಕೊಂಡರು. ಚಿತ್ರದಲ್ಲಿ ಇರ್ಫಾನ್ ಖಾನ್ ಮತ್ತು ಸಬಾ ಕಮರ್ ಪ್ರಮುಖ ಪಾತ್ರಗಳಲ್ಲಿ ನಟಿಸಿದ್ದಾರೆ. ಅವರ 2020 ರ ಬಿಡುಗಡೆಯು ಇಂಡೋ ಕಿ ಜವಾನಿಯನ್ನು ಒಳಗೊಂಡಿದೆ.",
        bh: "मल्लिका दुआ एगो प्रशिक्षित अभिनेत्री हई जे `सरोजनी नगर में गंदगी लोग कहेला` वीडियो में लिखले बाड़ी जवन पूरा इंटरनेट पर वायरल हो गइल. मल्लिका मेक अप दीदी, कोमल, शशि अवुरी दादी जईसन किरदार के संगे इंस्टाग्राम वीडियो भी बनावेली। साल 2017 के फिलिम हिंदी मीडियम में ऊ खास नजर अइली. एह फिलिम में इरफान खान आ सबा कमर प्रमुख भूमिका में रहलें। साल 2020 में रिलीज भइल उनकर इंडू की जवानी के नाम शामिल बा.",
        mai: "मल्लिका दुआ एकटा प्रशिक्षित अभिनेत्री छथि जे `सरोजनी नगर मे गंदगी कहैत छथि` वीडियो मे लिखलनि आ फीचर केलथि जे आगू पूरा इंटरनेट पर वायरल भ गेल। मल्लिका मेक अप दीदी, कोमल, शशि आ दादी सन किरदारक संग इंस्टाग्राम वीडियो सेहो बनबैत छथि। २०१७ मे बनल सिनेमा हिन्दी मीडियम मे ओ विशेष उपस्थिति दर्ज करौलनि । एहि सिनेमा मे इरफान खान आ सबा कमर प्रमुख भूमिका मे छलाह । हुनकऽ २०२० रिलीज म॑ इंडू की जवानी भी शामिल छै ।",
        gu: "મલ્લિકા દુઆ એક પ્રશિક્ષિત અભિનેતા છે જેણે વિડિયો લખ્યો અને દર્શાવ્યો `શિટ લોકો કહે છે સરોજની નગરમાં` ​​જે આખા ઇન્ટરનેટ પર વાયરલ થયો હતો. મલ્લિકા મેક અપ દીદી, કોમલ, શશી અને દાદી જેવા પાત્રો સાથે ઇન્સ્ટાગ્રામ વીડિયો પણ બનાવે છે. તેણીએ 2017 ની મૂવી હિન્દી મીડિયમમાં ખાસ ભૂમિકા ભજવી હતી. આ ફિલ્મમાં ઈરફાન ખાન અને સબા કમર મુખ્ય ભૂમિકામાં હતા. તેણીની 2020 ની રિલીઝમાં ઇન્દુ કી જવાનીનો સમાવેશ થાય છે.",
      },
      reactionCount: 3458,
      reactions: {
        sad: 480,
        neutral: 612,
        laugh: 2366,
      },
    },
  },
  {
    id: "d04a206d-5832-4f2d-b1c6-af3c728dfdc1",
    ordering: 3,
    displayName: "",
    firstName: "prashastisingh",
    lastName: "",
    likeCount: 0,
    playCount: 0,
    viewCount: 0,
    followers: 2127,
    description:
      "Prashasti Singh is yet another IIM graduate searching for meaning outside academic excellence and material achievement. Between stand-up and Improv she has found space for expressing her small-town sensibilities amidst big town hustle. In the end, it may just turn out to be another Amethi to Andheri story but at least we had some good laughs along the way. She was part of Comicstaan. She featured as a host on MX Players Kiski Sarkar. She has worked with a major television company for four years before deciding that she'd rather be funny than rich. In 2021, she was one of Indias 16 funniest entertainers to be part of an original series: Comedy Premium League.",
    duration: 0,
    thumbnail:
      "https://d35f5vastl4boc.cloudfront.net/profileImage/Prashasti_singh.png",
    url: "https://d35f5vastl4boc.cloudfront.net/profileImage/Prashasti_singh.png",
    assetId: "d04a206d-5832-4f2d-b1c6-af3c728dfdc1",
    contentType: "",
    bannerUrl:
      "https://d35f5vastl4boc.cloudfront.net/profileImage/Prashasti_singh.png",
    pristine_image: "",
    profile: {
      _id: "d04a206d-5832-4f2d-b1c6-af3c728dfdc1",
      userId: "d04a206d-5832-4f2d-b1c6-af3c728dfdc1",
      fullName: "Prashasti Singh",
      userName: "prashastisingh",
      email: "prashastisingh@wpp.com",
      description:
        "Prashasti Singh is yet another IIM graduate searching for meaning outside academic excellence and material achievement. Between stand-up and Improv she has found space for expressing her small-town sensibilities amidst big town hustle. In the end, it may just turn out to be another Amethi to Andheri story but at least we had some good laughs along the way. She was part of Comicstaan. She featured as a host on MX Players Kiski Sarkar. She has worked with a major television company for four years before deciding that she'd rather be funny than rich. In 2021, she was one of Indias 16 funniest entertainers to be part of an original series: Comedy Premium League.",
      status: "ACTIVE",
      profileImageUrl:
        "https://d35f5vastl4boc.cloudfront.net/profileImage/Prashasti_singh.png",
      followersCount: 2127,
      followingCount: 0,
      videoCount: 0,
      shareCount: 0,
      likeCount: 0,
      commentCount: 0,
      bookmarkCount: 0,
      backgroundImage:
        "https://d35f5vastl4boc.cloudfront.net/profileImage/Prashasti_singh.png",
      localisedFullName: {
        en: "Prashasti Singh",
        hi: "प्रशस्ति सिंह",
        ta: "பிரஷாஸ்தி சிங்",
        te: "ప్రశస్తి సింగ్",
        ba: "প্রশস্তি সিং",
        or: "ପ୍ରଶସ୍ତି ସିଂ",
        mr: "प्रशस्ती सिंग",
        kn: "ಪ್ರಶಸ್ತಿ ಸಿಂಗ್",
        bh: "प्रशस्ती सिंह के ह",
        mai: "प्रशस्ति सिंह",
        gu: "પ્રશસ્તિ સિંહ",
      },
      localisedDescription: {
        en: "Prashasti Singh is yet another IIM graduate searching for meaning outside academic excellence and material achievement. Between stand-up and Improv she has found space for expressing her small-town sensibilities amidst big town hustle. In the end, it may just turn out to be another Amethi to Andheri story but at least we had some good laughs along the way. She was part of Comicstaan. She featured as a host on MX Players Kiski Sarkar. She has worked with a major television company for four years before deciding that she'd rather be funny than rich. In 2021, she was one of Indias 16 funniest entertainers to be part of an original series: Comedy Premium League.",
        hi: "एक और आईआईएम स्नातक हैं प्रशस्ति सिंह, जो अकादमिक उत्कृष्टता और भौतिक उपलब्धि के बाहर अर्थ की तलाश कर रही हैं। स्टैंड-अप और इम्प्रोव के बीच उन्हें बड़े शहर की हलचल के बीच अपने छोटे शहर की संवेदनाओं को व्यक्त करने के लिए जगह मिल गई है। अंत में, यह शायद एक और 'अमेठी से अंधेरी' की कहानी बनकर रह जाएगी, लेकिन कम से कम हमने इस दौरान कुछ अच्छे ठहाके तो लगाए। वह कॉमिकस्टान का हिस्सा थीं। वह एमएक्स प्लेयर्स किसकी सरकार में एक मेजबान के रूप में दिखाई दीं थी। उन्होंने यह निर्णय लेने से पहले कि वह अमीर बनने के बजाय मजाकिया बनना पसंद करेगी, चार साल तक एक प्रमुख टेलीविजन कंपनी के साथ काम किया है। 2021 में, वह मूल श्रृंखला: कॉमेडी प्रीमियम लीग का हिस्सा बनने वाली भारत की 16 सबसे मजेदार मनोरंजनकर्ताओं में से एक थीं।",
        ta: "பிரஷாஸ்தி சிங் மற்றொரு ஐஐஎம் பட்டதாரி, கல்விசார் சிறப்பு மற்றும் பொருள் சாதனைக்கு வெளியே அர்த்தத்தைத் தேடுகிறார். ஸ்டாண்ட்-அப் மற்றும் இம்ப்ரூவ் இடையே, பெரிய நகர சலசலப்புகளுக்கு மத்தியில் தனது சிறிய நகர உணர்வுகளை வெளிப்படுத்துவதற்கான இடத்தைக் கண்டுபிடித்தார். இறுதியில், அது அந்தேரிக்கு மற்றொரு அமேதி கதையாக மாறலாம், ஆனால் குறைந்த பட்சம் நாங்கள் சில நல்ல சிரிப்புகளை சந்தித்தோம். அவர் காமிக்ஸ்தானின் ஒரு பகுதியாக இருந்தார். அவர் MX பிளேயர்ஸ் கிஸ்கி சர்க்கார் தொகுப்பாளராக நடித்தார். அவர் பணக்காரராக இருப்பதை விட வேடிக்கையாக இருக்க வேண்டும் என்று முடிவு செய்வதற்கு முன் நான்கு ஆண்டுகள் ஒரு பெரிய தொலைக்காட்சி நிறுவனத்தில் பணிபுரிந்தார். 2021 ஆம் ஆண்டில், காமெடி பிரீமியம் லீக்கின் அசல் தொடரின் ஒரு பகுதியாக இருக்கும் இந்தியாவின் 16 வேடிக்கையான பொழுதுபோக்குகளில் இவரும் ஒருவர்.",
        te: "ప్రశస్తి సింగ్ మరో IIM గ్రాడ్యుయేట్, అకడమిక్ ఎక్సలెన్స్ మరియు మెటీరియల్ అచీవ్‌మెంట్ వెలుపల అర్థం కోసం వెతుకుతున్నారు. స్టాండ్-అప్ మరియు ఇంప్రూవ్ మధ్య ఆమె తన చిన్న-పట్టణ సున్నితత్వాన్ని పెద్ద టౌన్ హస్టిల్ మధ్య వ్యక్తీకరించడానికి స్థలాన్ని కనుగొంది. చివరికి, ఇది అంధేరీ కథకు మరో అమేథీగా మారవచ్చు, కానీ కనీసం మేము దారిలో కొంత నవ్వుకున్నాము. ఆమె కామిక్‌స్టాన్‌లో భాగం. ఆమె MX ప్లేయర్స్ కిస్కీ సర్కార్‌లో హోస్ట్‌గా కనిపించింది. ఆమె ధనవంతుల కంటే తమాషాగా ఉండాలని నిర్ణయించుకోవడానికి ముందు ఆమె నాలుగు సంవత్సరాల పాటు ఒక పెద్ద టెలివిజన్ కంపెనీతో పని చేసింది. 2021లో, ఒరిజినల్ సిరీస్: కామెడీ ప్రీమియం లీగ్‌లో భాగమైన భారతదేశంలోని 16 హాస్యాస్పదమైన ఎంటర్‌టైనర్‌లలో ఆమె ఒకరు.",
        ba: "প্রশস্তি সিং হলেন আরেকজন আইআইএম স্নাতক যিনি একাডেমিক শ্রেষ্ঠত্ব এবং বস্তুগত কৃতিত্বের বাইরে অর্থ অনুসন্ধান করছেন। স্ট্যান্ড-আপ এবং ইমপ্রোভের মধ্যে তিনি বড় শহরের ব্যস্ততার মধ্যে তার ছোট-শহরের সংবেদনশীলতা প্রকাশ করার জন্য জায়গা খুঁজে পেয়েছেন। শেষ পর্যন্ত, এটি কেবল আরেকটি আমেথি থেকে আন্ধেরির গল্প হতে পারে তবে অন্তত পথে আমরা কিছু ভাল হাসি পেয়েছি। তিনি কমিকস্টানের অংশ ছিলেন। তিনি এমএক্স প্লেয়ার্স কিস্কি সরকার-এ হোস্ট হিসেবে অভিনয় করেছেন। তিনি ধনী হওয়ার চেয়ে মজাদার হবেন বলে সিদ্ধান্ত নেওয়ার আগে চার বছর ধরে একটি বড় টেলিভিশন কোম্পানির সাথে কাজ করেছেন। 2021 সালে, তিনি একটি আসল সিরিজের অংশ হওয়ার জন্য ভারতের 16 জন মজাদার বিনোদনের একজন ছিলেন: কমেডি প্রিমিয়াম লীগ।",
        or: "ପ୍ରଶସ୍ତ ସିଂ ଆଉ ଜଣେ ଆଇଆଇଏମ୍ ସ୍ନାତକ, ଯାହାକି ଏକାଡେମିକ୍ ଉତ୍କର୍ଷ ଏବଂ ସାମଗ୍ରୀକ ସଫଳତା ବାହାରେ ସନ୍ଧାନ କରୁଛି | ଷ୍ଟାଣ୍ଡ ଅପ୍ ଏବଂ ଇମ୍ପ୍ରୋଭ୍ ମଧ୍ୟରେ ସେ ବଡ ଟାଉନ୍ ହଷ୍ଟେଲ ମଧ୍ୟରେ ନିଜର ଛୋଟ ସହରର ସମ୍ବେଦନଶୀଳତା ପ୍ରକାଶ କରିବାକୁ ସ୍ଥାନ ପାଇଛନ୍ତି | ଶେଷରେ, ଏହା ହୁଏତ ଆନ୍ଧେରି କାହାଣୀର ଅନ୍ୟ ଏକ ଆମେଥୀ ହୋଇପାରେ କିନ୍ତୁ ଅନ୍ତତ least ପକ୍ଷେ ରାସ୍ତାରେ କିଛି ଭଲ ହସ | ସେ କମିକଷ୍ଟାନର ଅଂଶ ଥିଲେ | ସେ MX ପ୍ଲେୟାର କିସ୍କି ସାର୍କରେ ହୋଷ୍ଟ ଭାବରେ ଅଭିନୟ କରିଥିଲେ | ସେ ଧନୀ ହେବା ଅପେକ୍ଷା ମଜାଳିଆ ହେବାକୁ ନିଷ୍ପତ୍ତି ନେବା ପୂର୍ବରୁ ସେ ଏକ ପ୍ରମୁଖ ଟେଲିଭିଜନ କମ୍ପାନୀ ସହିତ ଚାରି ବର୍ଷ ଧରି କାର୍ଯ୍ୟ କରିଛନ୍ତି | 2021 ମସିହାରେ, ସେ ଏକ ମୂଳ ଧାରାବାହିକ: କମେଡି ପ୍ରିମିୟମ୍ ଲିଗ୍ ର ଅଂଶ ହେବା ପାଇଁ ଇଣ୍ଡିଆସ୍ 16 ମଜାଳିଆ ମନୋରଞ୍ଜନକାରୀଙ୍କ ମଧ୍ୟରୁ ଜଣେ |",
        mr: "प्रशस्ती सिंग ही आणखी एक आयआयएम पदवीधर आहे जी शैक्षणिक उत्कृष्टता आणि भौतिक कामगिरीच्या बाहेर अर्थ शोधत आहे. स्टँड-अप आणि इम्प्रूव्ह दरम्यान तिला शहराच्या मोठ्या गर्दीत तिच्या लहान-शहरातील संवेदनशीलता व्यक्त करण्यासाठी जागा मिळाली आहे. सरतेशेवटी, कदाचित ही आणखी एक अमेठी ते अंधेरी कथा असेल परंतु किमान आम्हाला वाटेत काही चांगले हसू आले. ती Comicstaan ​​चा भाग होती. तिने MX Players Kiski Sarkar वर होस्ट म्हणून काम केले. तिने श्रीमंत होण्यापेक्षा मजेदार बनायचे हे ठरवण्यापूर्वी चार वर्षे एका मोठ्या टेलिव्हिजन कंपनीमध्ये काम केले आहे. 2021 मध्ये, ती मूळ मालिकेचा भाग असलेल्या भारतातील 16 सर्वात मजेदार मनोरंजनकर्त्यांपैकी एक होती: कॉमेडी प्रीमियम लीग.",
        kn: "ಪ್ರಶಸ್ತಿ ಸಿಂಗ್ ಮತ್ತೊಬ್ಬ IIM ಪದವೀಧರರಾಗಿದ್ದು, ಶೈಕ್ಷಣಿಕ ಶ್ರೇಷ್ಠತೆ ಮತ್ತು ವಸ್ತು ಸಾಧನೆಯ ಹೊರಗಿನ ಅರ್ಥವನ್ನು ಹುಡುಕುತ್ತಿದ್ದಾರೆ. ಸ್ಟ್ಯಾಂಡ್-ಅಪ್ ಮತ್ತು ಇಂಪ್ರೂವ್ ನಡುವೆ ಅವರು ದೊಡ್ಡ ಪಟ್ಟಣದ ಹಸ್ಲ್ ನಡುವೆ ತನ್ನ ಸಣ್ಣ-ಪಟ್ಟಣದ ಸಂವೇದನೆಗಳನ್ನು ವ್ಯಕ್ತಪಡಿಸಲು ಜಾಗವನ್ನು ಕಂಡುಕೊಂಡಿದ್ದಾರೆ. ಕೊನೆಯಲ್ಲಿ, ಇದು ಅಂಧೇರಿ ಕಥೆಗೆ ಮತ್ತೊಂದು ಅಮೇಥಿಯಾಗಿ ಬದಲಾಗಬಹುದು ಆದರೆ ನಾವು ದಾರಿಯುದ್ದಕ್ಕೂ ಸ್ವಲ್ಪ ಒಳ್ಳೆಯ ನಗುವನ್ನು ಹೊಂದಿದ್ದೇವೆ. ಅವಳು ಕಾಮಿಕ್‌ಸ್ಟಾನ್‌ನ ಭಾಗವಾಗಿದ್ದಳು. ಅವರು MX ಪ್ಲೇಯರ್ಸ್ ಕಿಸ್ಕಿ ಸರ್ಕಾರ್ ನಲ್ಲಿ ಹೋಸ್ಟ್ ಆಗಿ ಕಾಣಿಸಿಕೊಂಡರು. ಅವರು ಶ್ರೀಮಂತರಿಗಿಂತ ತಮಾಷೆಯಾಗಿರಬೇಕೆಂದು ನಿರ್ಧರಿಸುವ ಮೊದಲು ಅವರು ನಾಲ್ಕು ವರ್ಷಗಳ ಕಾಲ ಪ್ರಮುಖ ದೂರದರ್ಶನ ಕಂಪನಿಯೊಂದಿಗೆ ಕೆಲಸ ಮಾಡಿದ್ದಾರೆ. 2021 ರಲ್ಲಿ, ಅವರು ಕಾಮಿಡಿ ಪ್ರೀಮಿಯಂ ಲೀಗ್‌ನ ಮೂಲ ಸರಣಿಯ ಭಾಗವಾಗಲು ಭಾರತದ 16 ಮೋಜಿನ ಮನರಂಜನೆಗಾರರಲ್ಲಿ ಒಬ್ಬರಾಗಿದ್ದರು.",
        bh: "प्रशस्ति सिंह एगो अउरी आईआईएम स्नातक हई जे शैक्षणिक उत्कृष्टता आ भौतिक उपलब्धि से बाहर के अर्थ खोजत बाड़ी. स्टैंड अप आ इम्प्रूव के बीच उनुका बड़ शहर के चहल-पहल के बीच आपन छोट शहर के संवेदना व्यक्त करे के जगह मिल गईल बा। अंत में हो सकेला कि बस एगो अउरी अमेठी से अंधेरी के कहानी निकले बाकिर कम से कम रास्ता में हमनी के कुछ बढ़िया हँसी त भइल. उ कॉमिक्सस्टन के हिस्सा रहली। ऊ एमएक्स प्लेयर्स किस्की सरकार पर होस्ट के रूप में काम कइली। चार साल से एगो बड़ टेलीविजन कंपनी के संगे काम कईले बाड़ी",
        mai: "प्रशस्ति सिंह एकटा आओर आईआईएम स्नातक छथि जे शैक्षणिक उत्कृष्टता आ भौतिक उपलब्धि स बाहर अर्थ क तलाश मे छथि । स्टैंड-अप आरू इम्प्रूव के बीच ओकरा बड़ऽ शहर के चहल-पहल के बीच अपनऽ छोटऽ शहर के संवेदना व्यक्त करै के जगह मिललऽ छै । अंत मे भ सकैत अछि जे बस एकटा आओर अमेठी सं अंधेरी के कहानी निकलय मुदा कम सं कम रास्ता मे हमरा सभ के किछ नीक हंसी त भेल. ओ कॉमिक्सस्टन के हिस्सा छलीह। ओ एमएक्स प्लेयर्स किस्की सरकार पर होस्ट के रूप मे फीचर केने छलीह. चारि साल स एकटा पैघ टेलीविजन कंपनी मे काज क चुकल छथि",
        gu: "પ્રશસ્તિ સિંઘ એ અન્ય IIM સ્નાતક છે જે શૈક્ષણિક શ્રેષ્ઠતા અને ભૌતિક સિદ્ધિઓની બહાર અર્થ શોધે છે. સ્ટેન્ડ-અપ અને ઇમ્પ્રુવ વચ્ચે તેણીને શહેરની મોટી હસ્ટલ વચ્ચે તેણીના નાના-નગરની સંવેદનશીલતા વ્યક્ત કરવા માટે જગ્યા મળી છે. અંતે, તે કદાચ બીજી અમેઠીથી અંધેરી વાર્તા બની શકે, પરંતુ ઓછામાં ઓછા અમે રસ્તામાં કેટલાક સારા હસ્યા. તે કોમિક્સસ્ટાનનો ભાગ હતી. તેણીએ એમએક્સ પ્લેયર્સ કિસ્કી સરકાર પર હોસ્ટ તરીકે દર્શાવ્યું હતું. તેણીએ ચાર વર્ષ સુધી એક મોટી ટેલિવિઝન કંપની સાથે કામ કર્યું છે અને તે નક્કી કર્યું છે કે તે સમૃદ્ધ કરતાં રમુજી બનવાનું પસંદ કરશે. 2021 માં, તેણી એક મૂળ શ્રેણી: કોમેડી પ્રીમિયમ લીગનો ભાગ બનવા માટે ભારતના 16 સૌથી મનોરંજક મનોરંજનકારોમાંની એક હતી.",
      },
      reactionCount: 2747,
      reactions: {
        sad: 339,
        neutral: 465,
        laugh: 1943,
      },
    },
  },
  {
    id: "d5d4c2bc-2f41-4137-9ee1-f4cb69ade2ea",
    ordering: 4,
    displayName: "",
    firstName: "anirbandasgupta",
    lastName: "",
    likeCount: 0,
    playCount: 0,
    viewCount: 0,
    followers: 1355,
    description:
      "Coming from Kolkata and now rocking Mumbai, Anirban is not just a stand-up comedian; he's a screenwriter and a new dad with a style that's uniquely his own. Once a corporate hotshot, he's graced stages across India and the globe, smashing the prestigious Just For Laughs in Montreal and last year’s Melbourne Comedy Festival’s Best of Comedy Zone Asia. With widespread acclaim from his first stand-up special Take It Easy on Amazon Prime Video and the popular dark comedy series Afsos, you can expect a wild ride from this comedy maestro.",
    duration: 0,
    thumbnail:
      "https://d35f5vastl4boc.cloudfront.net/profileImage/Anirban_dasgupta.png",
    url: "https://d35f5vastl4boc.cloudfront.net/profileImage/Anirban_dasgupta.png",
    assetId: "d5d4c2bc-2f41-4137-9ee1-f4cb69ade2ea",
    contentType: "",
    bannerUrl:
      "https://d35f5vastl4boc.cloudfront.net/profileImage/Anirban_dasgupta.png",
    pristine_image: "",
    profile: {
      _id: "d5d4c2bc-2f41-4137-9ee1-f4cb69ade2ea",
      userId: "d5d4c2bc-2f41-4137-9ee1-f4cb69ade2ea",
      fullName: "Anirban Dasgupta",
      userName: "anirbandasgupta",
      email: "anirbandasgupta@hww.com",
      description:
        "Coming from Kolkata and now rocking Mumbai, Anirban is not just a stand-up comedian; he's a screenwriter and a new dad with a style that's uniquely his own. Once a corporate hotshot, he's graced stages across India and the globe, smashing the prestigious Just For Laughs in Montreal and last year’s Melbourne Comedy Festival’s Best of Comedy Zone Asia. With widespread acclaim from his first stand-up special Take It Easy on Amazon Prime Video and the popular dark comedy series Afsos, you can expect a wild ride from this comedy maestro.",
      status: "ACTIVE",
      profileImageUrl:
        "https://d35f5vastl4boc.cloudfront.net/profileImage/Anirban_dasgupta.png",
      followersCount: 1355,
      followingCount: 0,
      videoCount: 0,
      shareCount: 0,
      likeCount: 0,
      commentCount: 0,
      bookmarkCount: 0,
      backgroundImage:
        "https://d35f5vastl4boc.cloudfront.net/profileImage/Anirban_dasgupta.png",
      localisedFullName: {
        en: "Anirban Dasgupta",
        hi: " अनिर्बान दासगुप्ता",
        ta: "அனிர்பன் தாஸ்குப்தா",
        te: "అనిర్బన్ దాస్‌గుప్తా",
        ba: "অনির্বাণ দাশগুপ্ত",
        or: "ଅନୀରବାନ୍ ଦାସଗୁପ୍ତ |",
        mr: "अनिर्बन दासगुप्ता",
        kn: "ಅನಿರ್ಬನ್ ದಾಸ್ಗುಪ್ತ",
        bh: "अनिर्बन दासगुप्ता के ह",
        mai: "अनिर्बन दासगुप्त",
        gu: "અનિર્બાન દાસગુપ્તા",
      },
      localisedDescription: {
        en: "Coming from Kolkata and now rocking Mumbai, Anirban is not just a stand-up comedian; he's a screenwriter and a new dad with a style that's uniquely his own. Once a corporate hotshot, he's graced stages across India and the globe, smashing the prestigious Just For Laughs in Montreal and last year’s Melbourne Comedy Festival’s Best of Comedy Zone Asia. With widespread acclaim from his first stand-up special Take It Easy on Amazon Prime Video and the popular dark comedy series Afsos, you can expect a wild ride from this comedy maestro.",
        hi: "अनिर्बान सिर्फ एक स्टैंड-अप कॉमेडियन नहीं हैं, कोलकाता से आकर अब मुंबई में धूम मचा रहे यह कॉमेडियन वह एक पटकथा लेखक और एक नये पिता भी हैं जिनकी शैली विशिष्ट रूप से उनकी अपनी है। एक समय कॉरपोरेट जगत में मशहूर रहे, उन्होंने मॉन्ट्रियल में प्रतिष्ठित जस्ट फॉर लाफ्स और पिछले साल के मेलबर्न कॉमेडी फेस्टिवल के बेस्ट ऑफ कॉमेडी जोन एशिया में धूम मचाते हुए भारत और दुनिया भर के मंचों की शोभा बढ़ाई है। अमेज़ॅन प्राइम वीडियो पर उनके पहले स्टैंड-अप स्पेशल टेक इट इज़ी और लोकप्रिय डार्क कॉमेडी सीरीज़ अफ़सोस से व्यापक प्रशंसा के साथ, आप इस कॉमेडी उस्ताद से एक जंगली सवारी की उम्मीद कर सकते हैं।",
        ta: "கொல்கத்தாவில் இருந்து வந்து தற்போது மும்பையை உலுக்கி வரும் அனிர்பன் வெறும் நகைச்சுவை நடிகர் மட்டுமல்ல; அவர் ஒரு திரைக்கதை எழுத்தாளர் மற்றும் அவரது தனித்துவமான பாணியைக் கொண்ட ஒரு புதிய அப்பா. கார்ப்பரேட் ஹாட்ஷாட் ஒருமுறை, அவர் இந்தியாவிலும் உலகெங்கிலும் உள்ள மேடைகளை அலங்கரித்தார், மாண்ட்ரீலில் மதிப்புமிக்க ஜஸ்ட் ஃபார் லாஃப்ஸ் மற்றும் கடந்த ஆண்டு மெல்போர்ன் காமெடி ஃபெஸ்டிவலின் பெஸ்ட் ஆஃப் காமெடி ஜோன் ஆசியாவை அடித்து நொறுக்கினார். அமேசான் பிரைம் வீடியோவில் அவரது முதல் ஸ்டாண்ட்-அப் ஸ்பெஷல் டேக் இட் ஈஸி மற்றும் பிரபலமான டார்க் காமெடி தொடரான ​​அஃப்சோஸ் ஆகியவற்றிலிருந்து பரவலான பாராட்டுகளைப் பெற்றதால், இந்த காமெடி மேஸ்ட்ரோவிடமிருந்து நீங்கள் ஒரு வைல்ட் ரைடை எதிர்பார்க்கலாம்.",
        te: "కోల్‌కతా నుండి వచ్చి ఇప్పుడు ముంబైని ఊపేస్తున్న అనిర్బన్ కేవలం స్టాండ్-అప్ కమెడియన్ మాత్రమే కాదు; అతను స్క్రీన్ రైటర్ మరియు అతని స్వంత శైలిని కలిగి ఉన్న కొత్త తండ్రి. ఒకప్పుడు కార్పొరేట్ హాట్‌షాట్‌గా, అతను భారతదేశం మరియు ప్రపంచవ్యాప్తంగా వేదికలను అలంకరించాడు, మాంట్రియల్‌లో ప్రతిష్టాత్మకమైన జస్ట్ ఫర్ లాఫ్స్ మరియు గత సంవత్సరం మెల్‌బోర్న్ కామెడీ ఫెస్టివల్ యొక్క బెస్ట్ ఆఫ్ కామెడీ జోన్ ఆసియాను ధ్వంసం చేశాడు. అమెజాన్ ప్రైమ్ వీడియో మరియు ప్రముఖ డార్క్ కామెడీ సిరీస్ అఫ్సోస్‌లో అతని మొదటి స్టాండ్-అప్ స్పెషల్ టేక్ ఇట్ ఈజీ నుండి విస్తృతమైన ప్రశంసలతో, మీరు ఈ కామెడీ మాస్ట్రో నుండి వైల్డ్ రైడ్‌ను ఆశించవచ్చు.",
        ba: "কলকাতা থেকে এসে এখন মুম্বাই দোলা দিচ্ছে, অনির্বাণ শুধু একজন স্ট্যান্ড-আপ কমেডিয়ান নন; তিনি একজন চিত্রনাট্যকার এবং একজন নতুন বাবা যার শৈলী অনন্যভাবে তার নিজস্ব। একবার কর্পোরেট হটশট, তিনি মন্ট্রিলে মর্যাদাপূর্ণ জাস্ট ফর লাফস এবং গত বছরের মেলবোর্ন কমেডি ফেস্টিভ্যাল-এর সেরা অফ কমেডি জোন এশিয়া জুড়ে, ভারত এবং বিশ্ব জুড়ে মঞ্চে স্থান করে নিয়েছেন৷ অ্যামাজন প্রাইম ভিডিওতে তার প্রথম স্ট্যান্ড-আপ স্পেশাল টেক ইট ইজি এবং জনপ্রিয় ডার্ক কমেডি সিরিজ আফসোস থেকে ব্যাপক প্রশংসার সাথে, আপনি এই কমেডি মাস্টারের কাছ থেকে একটি বন্য যাত্রা আশা করতে পারেন।",
        or: "କୋଲକାତାରୁ ଆସୁଛି ଏବଂ ବର୍ତ୍ତମାନ ମୁମ୍ବାଇକୁ ରୋକ୍ କରୁଛି, ଅନିର୍ବାନ୍ କେବଳ ଜଣେ ଷ୍ଟାଣ୍ଡ ଅପ୍ ହାସ୍ୟ ଅଭିନେତା ନୁହଁନ୍ତି; ସେ ଜଣେ ସ୍କ୍ରିନ୍ ରାଇଟର୍ ଏବଂ ଏକ ନୂତନ ବାବା ଯାହା ଏକ ସ୍ୱତନ୍ତ୍ର ଶ style ଳୀ ସହିତ | ଥରେ ଏକ କର୍ପୋରେଟ୍ ହଟଚଟ୍, ସେ ଭାରତ ଏବଂ ସମଗ୍ର ବିଶ୍ୱରେ ପର୍ଯ୍ୟାୟ କ୍ରମେ ମଣ୍ଟ୍ରିଆଲ୍ ର ସମ୍ମାନଜନକ ଜଷ୍ଟ୍ ଫର୍ ହସ୍ ଏବଂ ଗତ ବର୍ଷର ମେଲବୋର୍ଣ୍ଣ କମେଡି ଫେଷ୍ଟିଭାଲର ବେଷ୍ଟ ଅଫ୍ କମେଡି ଜୋନ୍ ଏସିଆକୁ ଭାଙ୍ଗି ଦେଇଛନ୍ତି | ତାଙ୍କର ପ୍ରଥମ ଷ୍ଟାଣ୍ଡ ଅପ୍ ସ୍ପେସିଆଲ୍ ଟେକ୍ ଇଜ୍ ଆମାଜନ୍ ପ୍ରାଇମ୍ ଭିଡିଓ ଏବଂ ଲୋକପ୍ରିୟ ଡାର୍କ କମେଡି ଧାରାବାହିକ ଆଫସୋସ୍ ଠାରୁ ବ୍ୟାପକ ପ୍ରଶଂସା ସହିତ, ଆପଣ ଏହି କମେଡି ମେଷ୍ଟ୍ରୋରୁ ଏକ ବନ୍ୟ ଯାତ୍ରା ଆଶା କରିପାରନ୍ତି |",
        mr: "कोलकात्याहून आलेला आणि आता मुंबईत धुमाकूळ घालणारा अनिर्बन हा केवळ स्टँड-अप कॉमेडियन नाही; तो एक पटकथा लेखक आहे आणि एक नवीन बाबा आहे ज्याची शैली त्याच्या स्वतःची आहे. एकेकाळी कॉर्पोरेट हॉटशॉट, त्याने मॉन्ट्रियलमधील प्रतिष्ठित जस्ट फॉर लाफ्स आणि गेल्या वर्षीच्या मेलबर्न कॉमेडी फेस्टिव्हलच्या कॉमेडी झोन ​​आशियातील सर्वोत्कृष्ट स्पर्धा जिंकून संपूर्ण भारत आणि जगभर बाजी मारली आहे. Amazon Prime Video वरील त्याच्या पहिल्या स्टँड-अप स्पेशल टेक इट इझी आणि लोकप्रिय गडद कॉमेडी मालिका Afsos मधून मोठ्या प्रमाणावर प्रशंसा मिळवून, तुम्ही या कॉमेडी उस्तादाकडून वाइल्ड राईडची अपेक्षा करू शकता.",
        kn: "ಕೋಲ್ಕತ್ತಾದಿಂದ ಬಂದು ಈಗ ಮುಂಬೈಯನ್ನು ರಾಕಿಂಗ್ ಮಾಡುತ್ತಿರುವ ಅನಿರ್ಬನ್ ಕೇವಲ ಸ್ಟ್ಯಾಂಡ್ ಅಪ್ ಕಾಮಿಡಿಯನ್ ಅಲ್ಲ; ಅವರು ಚಿತ್ರಕಥೆಗಾರ ಮತ್ತು ಹೊಸ ತಂದೆಯಾಗಿದ್ದು, ಅನನ್ಯವಾಗಿ ತನ್ನದೇ ಆದ ಶೈಲಿಯನ್ನು ಹೊಂದಿದ್ದಾರೆ. ಒಮ್ಮೆ ಕಾರ್ಪೊರೇಟ್ ಹಾಟ್‌ಶಾಟ್, ಅವರು ಭಾರತ ಮತ್ತು ಜಗತ್ತಿನಾದ್ಯಂತ ವೇದಿಕೆಗಳನ್ನು ಅಲಂಕರಿಸಿದ್ದಾರೆ, ಮಾಂಟ್ರಿಯಲ್‌ನಲ್ಲಿನ ಪ್ರತಿಷ್ಠಿತ ಜಸ್ಟ್ ಫಾರ್ ಲಾಫ್ಸ್ ಮತ್ತು ಕಳೆದ ವರ್ಷದ ಮೆಲ್ಬೋರ್ನ್ ಕಾಮಿಡಿ ಫೆಸ್ಟಿವಲ್‌ನ ಬೆಸ್ಟ್ ಆಫ್ ಕಾಮಿಡಿ ಝೋನ್ ಏಷ್ಯಾವನ್ನು ಸ್ಮ್ಯಾಶ್ ಮಾಡಿದರು. ಅವರ ಮೊದಲ ಸ್ಟ್ಯಾಂಡ್-ಅಪ್ ಸ್ಪೆಷಲ್ ಟೇಕ್ ಇಟ್ ಈಸಿ ಆನ್ ಅಮೆಜಾನ್ ಪ್ರೈಮ್ ವಿಡಿಯೋ ಮತ್ತು ಜನಪ್ರಿಯ ಡಾರ್ಕ್ ಕಾಮಿಡಿ ಸರಣಿ ಅಫ್ಸೋಸ್‌ನಿಂದ ವ್ಯಾಪಕ ಮೆಚ್ಚುಗೆಯೊಂದಿಗೆ, ಈ ಕಾಮಿಡಿ ಮೆಸ್ಟ್ರೋನಿಂದ ನೀವು ವೈಲ್ಡ್ ರೈಡ್ ಅನ್ನು ನಿರೀಕ್ಷಿಸಬಹುದು.",
        bh: "कोलकाता से आके अब मुंबई के हिलावत अनिरबन खाली स्टैंड-अप कॉमेडियन ना हउवें; ऊ एगो पटकथा लेखक आ एगो नया पापा हउवें जिनकर स्टाइल अनोखा तरीका से उनकर आपन बा. कबो कॉरपोरेट हॉटशॉट रहल ऊ पूरा भारत आ दुनिया में मंचन के शोभा बढ़ा दिहले बाड़न आ मॉन्ट्रियल में प्रतिष्ठित जस्ट फॉर लाफ आ पिछला साल मेलबर्न कॉमेडी फेस्टिवल के बेस्ट ऑफ कॉमेडी जोन एशिया के तोड़ दिहले बाड़न. अमेजन प्राइम वीडियो पर उनकर पहिला स्टैंड अप स्पेशल टेक इट ईजी आ लोकप्रिय डार्क कॉमेडी सीरीज अफसोस से व्यापक प्रशंसा के साथ, रउआ उम्मीद कर सकेनी",
        mai: "कोलकाता सं आबि आब मुंबई के हिला रहल अनिरबन सिर्फ स्टैंड-अप कॉमेडियन नहिं छथि; ओ पटकथा लेखक आ नव पापा छथि जिनकर शैली विशिष्ट रूप स हुनकर अपन अछि । एक समय म॑ कॉर्पोरेट हॉटशॉट रहलऽ हुनी पूरा भारत आरू दुनिया म॑ मंचऽ के शोभा बढ़ाबै छै, मॉन्ट्रियल म॑ प्रतिष्ठित जस्ट फॉर लाफ आरू पिछला साल मेलबर्न कॉमेडी फेस्टिवल केरऽ बेस्ट ऑफ कॉमेडी जोन एशिया क॑ तोड़ी क॑ । अमेजन प्राइम वीडियो आरू लोकप्रिय डार्क कॉमेडी सीरीज अफसोस प॑ हुनकऽ पहलऽ स्टैंड-अप स्पेशल टेक इट ईजी स॑ व्यापक प्रशंसा के साथ, आपने उम्मीद करी सकै छियै",
        gu: "કોલકાતાથી આવીને હવે મુંબઈમાં ધમાલ મચાવી રહી છે, અનિર્બાન માત્ર સ્ટેન્ડ-અપ કોમેડિયન નથી; તે એક પટકથા લેખક છે અને એક નવા પિતા છે જેની શૈલી તેની પોતાની છે. એકવાર કોર્પોરેટ હોટશોટ, તેણે મોન્ટ્રીયલમાં પ્રતિષ્ઠિત જસ્ટ ફોર લાફ્સ અને ગયા વર્ષના મેલબોર્ન કોમેડી ફેસ્ટિવલના બેસ્ટ ઓફ કોમેડી ઝોન એશિયાને તોડીને ભારત અને સમગ્ર વિશ્વમાં સ્ટેજ મેળવ્યા છે. એમેઝોન પ્રાઇમ વિડિયો પર તેના પ્રથમ સ્ટેન્ડ-અપ વિશેષ ટેક ઇટ ઇઝી અને લોકપ્રિય ડાર્ક કોમેડી શ્રેણી Afsos દ્વારા વ્યાપક પ્રશંસા સાથે, તમે આ કોમેડી ઉસ્તાદ પાસેથી જંગલી સવારીની અપેક્ષા રાખી શકો છો.",
      },
      reactionCount: 2731,
      reactions: {
        sad: 290,
        neutral: 441,
        laugh: 2000,
      },
    },
  },
  {
    id: "c52a224f-1e2c-41f2-aae7-9a5f4a4a33f8",
    ordering: 5,
    displayName: "",
    firstName: "saikiranrayaprolu",
    lastName: "",
    likeCount: 0,
    playCount: 0,
    viewCount: 0,
    followers: 1469,
    description:
      "Sai Kiran is Tall, Dark and Err... Hilarious. If failures are truly the foundation of success then Saikiran has enough foundation to balance the Charminar on his bare hands. But, his father thinks he was specially created by god as a tale of caution to all Indian parents who pray too hard for a male child. After well received performances all over Hyderabad he is now foraying into other cities like Secunderabad.",
    duration: 0,
    thumbnail:
      "https://d35f5vastl4boc.cloudfront.net/profileImage/saikiran.png",
    url: "https://d35f5vastl4boc.cloudfront.net/profileImage/saikiran.png",
    assetId: "c52a224f-1e2c-41f2-aae7-9a5f4a4a33f8",
    contentType: "",
    bannerUrl:
      "https://d35f5vastl4boc.cloudfront.net/profileImage/saikiran.png",
    pristine_image: "",
    profile: {
      _id: "c52a224f-1e2c-41f2-aae7-9a5f4a4a33f8",
      userId: "c52a224f-1e2c-41f2-aae7-9a5f4a4a33f8",
      fullName: "Saikiran Rayaprolu",
      userName: "saikiranrayaprolu",
      email: "saikiranrayaprolu@wpp.com",
      description:
        "Sai Kiran is Tall, Dark and Err... Hilarious. If failures are truly the foundation of success then Saikiran has enough foundation to balance the Charminar on his bare hands. But, his father thinks he was specially created by god as a tale of caution to all Indian parents who pray too hard for a male child. After well received performances all over Hyderabad he is now foraying into other cities like Secunderabad.",
      status: "ACTIVE",
      profileImageUrl:
        "https://d35f5vastl4boc.cloudfront.net/profileImage/saikiran.png",
      followersCount: 1469,
      followingCount: 0,
      videoCount: 0,
      shareCount: 0,
      likeCount: 0,
      commentCount: 0,
      bookmarkCount: 0,
      backgroundImage:
        "https://d35f5vastl4boc.cloudfront.net/profileImage/saikiran.png",
      localisedFullName: {
        en: "Saikiran Rayaprolu",
        hi: "सैकिरण रायप्रोलू",
        ta: "சாய்கிரண் ராயப்ரோலு",
        te: "సాయికిరణ్ రాయప్రోలు",
        ba: "সাইকিরন রায়প্রলু",
        or: "ସାଇକିରାନ ରାୟାପ୍ରୋଲୁ |",
        mr: "सायकिरण रायप्रोलु",
        kn: "ಸಾಯಿಕಿರಣ್ ರಾಯಪ್ರೋಲು",
        bh: "सैकिरन रायाप्रोलू के ह",
        mai: "सैकिरन रायाप्रोलू",
        gu: "સાઇકિરણ રાયપ્રોલુ",
      },
      localisedDescription: {
        en: "Sai Kiran is Tall, Dark and Err... Hilarious. If failures are truly the foundation of success then Saikiran has enough foundation to balance the Charminar on his bare hands. But, his father thinks he was specially created by god as a tale of caution to all Indian parents who pray too hard for a male child. After well received performances all over Hyderabad he is now foraying into other cities like Secunderabad.",
        hi: "एक लंबी, सांवली और ..... प्रफुल्लित करने वाली शख्सियत का नाम है साईं किरण ।।यदि असफलताएं वास्तव में सफलता की नींव हैं तो साईकिरण के पास अपने नंगे हाथों पर चारमीनार को संतुलित करने के लिए पर्याप्त आधार है। लेकिन, उनके पिता का मानना है कि उन्हें भगवान ने विशेष रूप से उन सभी भारतीय माता-पिता के लिए सावधानी बरतने के लिए बनाया है जो एक बेटे के लिए बहुत अधिक प्रार्थना करते हैं। पूरे हैदराबाद में अच्छे प्रदर्शन के बाद अब वह सिकंदराबाद जैसे अन्य शहरों में भी प्रवेश कर रहे हैं।",
        ta: "சாய் கிரண் உயரம், கருமை மற்றும் தவறு... பெருங்களிப்புடையவர். தோல்விகள் உண்மையிலேயே வெற்றியின் அடித்தளம் என்றால், சாய்கிரண் சார்மினார் தனது வெறும் கைகளில் சமநிலைப்படுத்த போதுமான அடித்தளம் உள்ளது. ஆனால், ஆண் குழந்தைக்காக மிகவும் கடினமாக பிரார்த்தனை செய்யும் அனைத்து இந்திய பெற்றோருக்கும் எச்சரிக்கையாக கடவுளால் உருவாக்கப்பட்டதாக அவரது தந்தை நினைக்கிறார். ஹைதராபாத் முழுவதும் நல்ல வரவேற்பைப் பெற்ற பிறகு, அவர் இப்போது செகந்திராபாத் போன்ற பிற நகரங்களுக்கும் செல்கிறார்.",
        te: "సాయి కిరణ్ పొడుగ్గా, ముదురుగా, ఉల్లాసంగా ఉన్నాడు. వైఫల్యాలు నిజంగా విజయానికి పునాది అయితే, సాయికిరణ్‌కి చార్మినార్‌ను తన చేతుల్లోనే బ్యాలెన్స్ చేయడానికి తగినంత పునాది ఉంది. కానీ, మగబిడ్డ కోసం చాలా కష్టపడి ప్రార్థించే భారతీయ తల్లిదండ్రులందరికీ హెచ్చరికగా దేవుడు ప్రత్యేకంగా సృష్టించాడని అతని తండ్రి భావిస్తాడు. హైదరాబాద్ అంతటా మంచి ఆదరణ పొందిన తరువాత అతను ఇప్పుడు సికింద్రాబాద్ వంటి ఇతర నగరాల్లోకి ప్రవేశిస్తున్నాడు.",
        ba: "সাই কিরণ লম্বা, অন্ধকার এবং ভুল... হাসিখুশি। ব্যর্থতাই যদি সত্যিকার অর্থে সাফল্যের ভিত্তি হয় তবে সাইকিরানের খালি হাতে চারমিনারের ভারসাম্য বজায় রাখার জন্য যথেষ্ট ভিত্তি রয়েছে। কিন্তু, তার বাবা মনে করেন যে তিনি বিশেষভাবে ঈশ্বরের দ্বারা সমস্ত ভারতীয় পিতামাতার জন্য সতর্কতার গল্প হিসাবে তৈরি করেছিলেন যারা একটি পুরুষ সন্তানের জন্য খুব কঠিন প্রার্থনা করে। সমস্ত হায়দ্রাবাদ জুড়ে ভাল প্রাপ্ত পারফরম্যান্সের পরে তিনি এখন সেকেন্দ্রাবাদের মতো অন্যান্য শহরে যাত্রা করছেন।",
        or: "ସାଇ କିରଣ ଲମ୍ବା, ଗା ark ଏବଂ ଏର ... ହାସ୍ୟପୁର୍ଣ୍ଣ | ଯଦି ବିଫଳତା ପ୍ରକୃତରେ ସଫଳତାର ମୂଳଦୁଆ ତେବେ ସାଇକିରାନଙ୍କର ଖାଲି ହାତରେ ଚାର୍ମିନାରକୁ ସନ୍ତୁଳିତ କରିବା ପାଇଁ ଯଥେଷ୍ଟ ଭିତ୍ତିଭୂମି ଅଛି | କିନ୍ତୁ, ତାଙ୍କ ପିତା ଭାବନ୍ତି ଯେ ସେ ପୁରୁଷଙ୍କ ପାଇଁ ଅତ୍ୟଧିକ ପ୍ରାର୍ଥନା କରୁଥିବା ସମସ୍ତ ଭାରତୀୟ ପିତାମାତାଙ୍କୁ ସତର୍କତାର କାହାଣୀ ଭାବରେ ଭଗବାନଙ୍କ ଦ୍ created ାରା ସୃଷ୍ଟି ହୋଇଥିଲେ। ସମଗ୍ର ହାଇଦ୍ରାବାଦରେ ଭଲ ପ୍ରଦର୍ଶନ ପରେ ସେ ବର୍ତ୍ତମାନ ସେକଣ୍ଡରାବାଦ ପରି ଅନ୍ୟ ସହରକୁ ଯାଉଛନ୍ତି |",
        mr: "साई किरण उंच, गडद आणि चूक आहे... आनंदी. जर अपयश हा खरोखर यशाचा पाया असेल तर साईकिरणकडे चारमिनारचा समतोल साधण्यासाठी पुरेसा पाया आहे. परंतु, त्याच्या वडिलांना असे वाटते की ते सर्व भारतीय पालकांसाठी सावधगिरीची कहाणी म्हणून देवाने खास तयार केले आहेत जे पुरुष मुलासाठी खूप कठीण प्रार्थना करतात. संपूर्ण हैदराबादमध्ये उत्तम कामगिरी केल्यानंतर तो आता सिकंदराबाद सारख्या इतर शहरांमध्ये प्रवेश करत आहे.",
        kn: "ಸಾಯಿ ಕಿರಣ್ ಎತ್ತರ, ಕಪ್ಪು ಮತ್ತು ತಪ್ಪು... ಉಲ್ಲಾಸದಾಯಕ. ವೈಫಲ್ಯಗಳು ನಿಜವಾಗಿಯೂ ಯಶಸ್ಸಿನ ಅಡಿಪಾಯವಾಗಿದ್ದರೆ ಸಾಯಿಕಿರಣ್ ತನ್ನ ಬರಿಗೈಯಲ್ಲಿ ಚಾರ್ಮಿನಾರ್ ಅನ್ನು ಸಮತೋಲನಗೊಳಿಸಲು ಸಾಕಷ್ಟು ಅಡಿಪಾಯವನ್ನು ಹೊಂದಿದ್ದಾನೆ. ಆದರೆ, ಗಂಡು ಮಗುವಿಗೆ ತುಂಬಾ ಕಷ್ಟಪಟ್ಟು ಪ್ರಾರ್ಥಿಸುವ ಎಲ್ಲಾ ಭಾರತೀಯ ಪೋಷಕರಿಗೆ ಎಚ್ಚರಿಕೆಯ ಕಥೆಯಾಗಿ ಅವನು ವಿಶೇಷವಾಗಿ ದೇವರಿಂದ ರಚಿಸಲ್ಪಟ್ಟಿದ್ದಾನೆ ಎಂದು ಅವನ ತಂದೆ ಭಾವಿಸುತ್ತಾನೆ. ಹೈದರಾಬಾದ್‌ನಾದ್ಯಂತ ಉತ್ತಮ ಪ್ರದರ್ಶನ ನೀಡಿದ ನಂತರ ಅವರು ಈಗ ಸಿಕಂದರಾಬಾದ್‌ನಂತಹ ಇತರ ನಗರಗಳಿಗೆ ಪ್ರವೇಶಿಸುತ್ತಿದ್ದಾರೆ.",
        bh: "साईं किरण लंबा, डार्क आ एरर... प्रफुल्लित करे वाला बाड़ी। अगर असफलता सही मायने में सफलता के नींव ह त सैकिरन के लगे एतना नींव बा कि उ अपना नंगे हाथ प चर्मिनार के संतुलित क सकेले। लेकिन, उनकर पिता के लागता कि उनुका के भगवान के ओर से खास तौर प बनावल गईल बा, जवन कि एगो पुरुष बच्चा खाती बहुत जादे प्रार्थना करेवाला सभ भारतीय माता-पिता खाती सावधानी के कहानी बा। पूरा हैदराबाद में बहुते पसंद कइला का बाद ऊ अब सिकंदराबाद जइसन दोसरा शहरन में घुसपैठ कर रहल बाड़न.",
        mai: "साई किरण लंबा, अन्हार आ एरर... प्रफुल्लित करय वाला अछि. अगर असफलता सही मायने में सफलता के नींव छै त सैकिरन के पास एतेक नींव छै कि ओ अपन नंगे हाथ पर चर्मिनार के संतुलित क सकै छैथ। लेकिन, ओकरऽ पिता क॑ लगै छै कि ओकरा भगवान द्वारा विशेष रूप स॑ बनालऽ गेलऽ छै, जेकरा म॑ सब भारतीय माता-पिता लेली सावधानी के कहानी छै जे एगो पुरुष बच्चा लेली बहुत मेहनत करै छै । पूरा हैदराबाद में नीक स्वागत के बाद आब ओ सिकंदराबाद सन दोसर शहर में घुसपैठ क रहल छथिन्ह.",
        gu: "સાઈ કિરણ ઉંચો, ડાર્ક અને એરર... આનંદી છે. જો નિષ્ફળતાઓ ખરેખર સફળતાનો પાયો હોય તો સાઈકિરણ પાસે તેના ખાલી હાથે ચારમિનારને સંતુલિત કરવા માટે પૂરતો પાયો છે. પરંતુ, તેના પિતાનું માનવું છે કે તે બધા ભારતીય માતા-પિતા કે જેઓ પુરૂષ બાળક માટે ખૂબ જ સખત પ્રાર્થના કરે છે તેમની સાવધાનીની વાર્તા તરીકે તેને ભગવાન દ્વારા ખાસ બનાવવામાં આવ્યો હતો. સમગ્ર હૈદરાબાદમાં સારા પ્રદર્શન બાદ તે હવે સિકંદરાબાદ જેવા અન્ય શહેરોમાં પ્રવેશ કરી રહ્યો છે.",
      },
      reactionCount: 2506,
      reactions: {
        laugh: 1757,
        neutral: 450,
        sad: 299,
      },
    },
  },
  {
    id: "873d92ee-28b0-42cc-bed2-6da36977ccbe",
    ordering: 6,
    displayName: "",
    firstName: "varunthakur",
    lastName: "",
    likeCount: 0,
    playCount: 0,
    viewCount: 0,
    followers: 930,
    description:
      "The man behind the hit social avatar Struggling Actor Vicky Malhotra, Varun Thakur is the latest Internet sensation who has taken over platforms like Snapchat and Facebook with his acidic self-deprecatory humor, making fun of all the CCD-frequenting struggling actors based out of Lokhandwala, Mumbai. Co-founder of SnG Comedy, a popular comedy collective that has amassed 470000 subscribers and 61 million views, the comedian has been selling out shows and venues with his hour-long comedy special, Vicky This Side, Varun That Side. In case reality wasn’t enough for this comic, the show is also streaming on Amazon Prime. Varun has also anchored shows on MTV, MTV Indies, UTV Bindaas and HotStar, and has done corporate shows for Google, Mercedes, HDFC, Standard Chartered, Radio Mirchi and several others. ",
    duration: 0,
    thumbnail:
      "https://d35f5vastl4boc.cloudfront.net/profileImage/varun_thakur.png",
    url: "https://d35f5vastl4boc.cloudfront.net/profileImage/varun_thakur.png",
    assetId: "873d92ee-28b0-42cc-bed2-6da36977ccbe",
    contentType: "",
    bannerUrl:
      "https://d35f5vastl4boc.cloudfront.net/profileImage/varun_thakur.png",
    pristine_image: "",
    profile: {
      _id: "873d92ee-28b0-42cc-bed2-6da36977ccbe",
      userId: "873d92ee-28b0-42cc-bed2-6da36977ccbe",
      fullName: "Varun Thakur",
      userName: "varunthakur",
      email: "varunthakur@hww.com",
      description:
        "The man behind the hit social avatar Struggling Actor Vicky Malhotra, Varun Thakur is the latest Internet sensation who has taken over platforms like Snapchat and Facebook with his acidic self-deprecatory humor, making fun of all the CCD-frequenting struggling actors based out of Lokhandwala, Mumbai. Co-founder of SnG Comedy, a popular comedy collective that has amassed 470000 subscribers and 61 million views, the comedian has been selling out shows and venues with his hour-long comedy special, Vicky This Side, Varun That Side. In case reality wasn’t enough for this comic, the show is also streaming on Amazon Prime. Varun has also anchored shows on MTV, MTV Indies, UTV Bindaas and HotStar, and has done corporate shows for Google, Mercedes, HDFC, Standard Chartered, Radio Mirchi and several others. ",
      status: "ACTIVE",
      profileImageUrl:
        "https://d35f5vastl4boc.cloudfront.net/profileImage/varun_thakur.png",
      followersCount: 930,
      followingCount: 0,
      videoCount: 0,
      shareCount: 0,
      likeCount: 0,
      commentCount: 0,
      bookmarkCount: 0,
      backgroundImage:
        "https://d35f5vastl4boc.cloudfront.net/profileImage/varun_thakur.png",
      localisedFullName: {
        en: "Varun Thakur",
        hi: "वरुण ठाकुर",
        ta: "வருண் தாக்கூர்",
        te: "వరుణ్ ఠాకూర్",
        ba: "বরুণ ঠাকুর",
        or: "ବରୁଣ ଠାକୁର |",
        mr: "वरुण ठाकूर",
        kn: "ವರುಣ್ ಠಾಕೂರ್",
        bh: "वरुण ठाकुर के ह",
        mai: "वरुण ठाकुर",
        gu: "વરુણ ઠાકુર",
      },
      localisedDescription: {
        en: "The man behind the hit social avatar Struggling Actor Vicky Malhotra, Varun Thakur is the latest Internet sensation who has taken over platforms like Snapchat and Facebook with his acidic self-deprecatory humor, making fun of all the CCD-frequenting struggling actors based out of Lokhandwala, Mumbai. Co-founder of SnG Comedy, a popular comedy collective that has amassed 470000 subscribers and 61 million views, the comedian has been selling out shows and venues with his hour-long comedy special, Vicky This Side, Varun That Side. In case reality wasn’t enough for this comic, the show is also streaming on Amazon Prime. Varun has also anchored shows on MTV, MTV Indies, UTV Bindaas and HotStar, and has done corporate shows for Google, Mercedes, HDFC, Standard Chartered, Radio Mirchi and several others. ",
        hi: "वरुण ठाकुर इंटरनेट नया नया वो सनसनी है जो हिट सोशल अवतार स्ट्रगलिंग एक्टर विकी मल्होत्रा के पीछे का किरदार है , जिसने अपने तीखा आत्म-निंदापूर्ण हास्य के साथ स्नैपचैट और फेसबुक जैसे प्लेटफार्मों पर कब्जा कर लिया है, जो लोखंडवाला, मुंबई के सभी सीसीडी-मे रोज आने वाले स्ट्रगलिंग अभिनेताओं का मजाक उड़ाता है। वो एसएनजी कॉमेडी के सह-संस्थापक हैं, एक लोकप्रिय कॉमेडी समूह, जिसने 470000 ग्राहक और 61 मिलियन व्यूज अर्जित किए हैं, कॉमेडियन अपने घंटे भर के कॉमेडी स्पेशल, विकी दिस साइड, वरुण दैट साइड के साथ शो और वेन्यू बेच रहा है। यदि रियलिटी इस कॉमिक के लिए पर्याप्त नहीं थी, यह शो अमेज़न प्राइम पर भी स्ट्रीम हो रहा है। वरुण ने एमटीवी, एमटीवी इंडीज, यूटीवी बिंदास और हॉटस्टार पर भी शो की एंकरिंग की है और गूगल, मर्सिडीज, एचडीएफसी, स्टैंडर्ड चार्टर्ड, रेडियो मिर्ची और कई अन्य के लिए कॉर्पोरेट शो किए हैं।",
        ta: "ஹிட் சமூக அவதாரம் போராடும் நடிகர் விக்கி மல்ஹோத்ராவின் பின்னணியில் உள்ள நாயகன், வருண் தாகூர், லோகண்ட்வாலாவைச் சேர்ந்த அனைத்து சிசிடி-அடிக்கடி போராடும் நடிகர்களை கேலி செய்து, ஸ்னாப்சாட் மற்றும் ஃபேஸ்புக் போன்ற தளங்களை தனது அமில சுயமரியாதை நகைச்சுவையால் கைப்பற்றிய சமீபத்திய இணையப் பரபரப்பானவர். , மும்பை. 470000 சந்தாதாரர்களையும் 61 மில்லியன் பார்வைகளையும் பெற்றுள்ள பிரபல நகைச்சுவைக் குழுவான SnG காமெடியின் இணை நிறுவனர், நகைச்சுவை நடிகர் விக்கி திஸ் சைட், வருண் தட் சைடு என்ற தனது மணிநேர நகைச்சுவை சிறப்புடன் நிகழ்ச்சிகளையும் அரங்குகளையும் விற்று வருகிறார். இந்த நகைச்சுவைக்கு யதார்த்தம் போதுமானதாக இல்லை என்றால், நிகழ்ச்சி அமேசான் பிரைமிலும் ஸ்ட்ரீமிங் செய்யப்படுகிறது. வருண் எம்டிவி, எம்டிவி இண்டீஸ், யுடிவி பிந்தாஸ் மற்றும் ஹாட்ஸ்டார் ஆகியவற்றில் நிகழ்ச்சிகளை தொகுத்து வழங்கியுள்ளார், மேலும் கூகுள், மெர்சிடிஸ், ஹெச்டிஎஃப்சி, ஸ்டாண்டர்ட் சார்ட்டர்ட், ரேடியோ மிர்ச்சி மற்றும் பலவற்றிற்காக கார்ப்பரேட் நிகழ்ச்சிகளை செய்துள்ளார்.",
        te: "హిట్ సామాజిక అవతార్ స్ట్రగులింగ్ యాక్టర్ విక్కీ మల్హోత్రా వెనుక ఉన్న వ్యక్తి, వరుణ్ ఠాకూర్ తాజా ఇంటర్నెట్ సంచలనం, అతను తన ఆమ్ల ఆత్మన్యూనతా హాస్యంతో స్నాప్‌చాట్ మరియు ఫేస్‌బుక్ వంటి ప్లాట్‌ఫారమ్‌లను స్వాధీనం చేసుకున్నాడు, లోఖండ్‌వాలా నుండి CCD- తరచుగా పోరాడుతున్న నటులందరినీ ఎగతాళి చేశాడు. , ముంబై. 470000 మంది సబ్‌స్క్రైబర్‌లను మరియు 61 మిలియన్ల వీక్షణలను సంపాదించుకున్న ప్రముఖ హాస్య సమిష్టి అయిన SnG కామెడీ సహ వ్యవస్థాపకుడు, హాస్యనటుడు తన గంట సేపు కామెడీ స్పెషల్, విక్కీ దిస్ సైడ్, వరుణ్ దట్ సైడ్‌తో ప్రదర్శనలు మరియు వేదికలను విక్రయిస్తున్నాడు. ఒకవేళ ఈ కామిక్‌కి రియాలిటీ సరిపోకపోతే, షో అమెజాన్ ప్రైమ్‌లో కూడా ప్రసారం అవుతోంది. వరుణ్ MTV, MTV ఇండీస్, UTV బిందాస్ మరియు హాట్‌స్టార్‌లలో షోలను యాంకర్‌గా చేసాడు మరియు గూగుల్, మెర్సిడెస్, హెచ్‌డిఎఫ్‌సి, స్టాండర్డ్ చార్టర్డ్, రేడియో మిర్చి మరియు అనేక ఇతర వాటి కోసం కార్పొరేట్ షోలు చేశాడు.",
        ba: "হিট সোশ্যাল অবতারের পিছনের মানুষটি সংগ্রামী অভিনেতা ভিকি মালহোত্রা, বরুণ ঠাকুর হল সাম্প্রতিকতম ইন্টারনেট সেনসেশন যিনি স্ন্যাপচ্যাট এবং ফেসবুকের মতো প্ল্যাটফর্মগুলিকে তার অম্লীয় আত্ম-অপমানজনক হাস্যরসের মাধ্যমে দখল করেছেন, লোখান্ডওয়ালা ভিত্তিক সমস্ত সিসিডি-ঘনঘন সংগ্রামী অভিনেতাদের নিয়ে মজা করেছেন। , মুম্বাই। SnG Comedy-এর সহ-প্রতিষ্ঠাতা, একটি জনপ্রিয় কমেডি কালেকটিভ যা 470000 সাবস্ক্রাইবার এবং 61 মিলিয়ন ভিউ সংগ্রহ করেছে, কৌতুক অভিনেতা তার ঘন্টাব্যাপী কমেডি স্পেশাল, ভিকি দিস সাইড, বরুণ দ্যাট সাইড সহ শো এবং ভেন্যু বিক্রি করছেন। এই কমিকের জন্য বাস্তবতা যথেষ্ট না হলে, শোটি অ্যামাজন প্রাইমেও প্রবাহিত হচ্ছে। বরুণ এমটিভি, এমটিভি ইন্ডিজ, ইউটিভি বিন্দাস এবং হটস্টারে শো অ্যাঙ্কর করেছেন এবং গুগল, মার্সিডিজ, এইচডিএফসি, স্ট্যান্ডার্ড চার্টার্ড, রেডিও মির্চি এবং আরও অনেকের জন্য কর্পোরেট শো করেছেন।",
        or: "ହିଟ୍ ସୋସିଆଲ୍ ଅବତାର ସଂଘର୍ଷ କରୁଥିବା ଅଭିନେତା ବିକି ମାଲହୋତ୍ରା, ବରୁଣ ଠାକୁର ହେଉଛନ୍ତି ସର୍ବଶେଷ ଇଣ୍ଟରନେଟ୍ ସେନ୍ସେସ୍ ଯିଏ ସ୍ନାପଚାଟ ଏବଂ ଫେସବୁକ୍ ଭଳି ପ୍ଲାଟଫର୍ମକୁ ନିଜର ଅମ୍ଳୀୟ ଆତ୍ମନିର୍ଭରଶୀଳ ହାସ୍ୟରସ କରି ଲୋଖଣ୍ଡୱାଲା ଭିତ୍ତିକ ସିସିଡି ବାରମ୍ବାର ସଂଘର୍ଷ କରୁଥିବା ଅଭିନେତାମାନଙ୍କୁ ପରିହାସ କରିଛନ୍ତି | , ମୁମ୍ବାଇ | 470000 ଗ୍ରାହକ ଏବଂ 61 ମିଲିୟନ୍ ଭ୍ୟୁ ସଂଗ୍ରହ କରିଥିବା ଏକ ଲୋକପ୍ରିୟ କମେଡି ସାମୂହିକ SnG କମେଡିର ସହ-ପ୍ରତିଷ୍ଠାତା, ହାସ୍ୟ ଅଭିନେତା ନିଜର ଘଣ୍ଟା କମେଡି ସ୍ପେସିଆଲ୍ ଭିକି ଏହି ସାଇଡ୍, ଭାରୁନ୍ ସାଇଡ୍ ସହିତ ସୋ ଏବଂ ଭେନ୍ୟୁ ବିକ୍ରି କରୁଛନ୍ତି | ଯଦି ଏହି ବ୍ୟଙ୍ଗ ପାଇଁ ବାସ୍ତବତା ପର୍ଯ୍ୟାପ୍ତ ନୁହେଁ, ଶୋ ମଧ୍ୟ ଆମାଜନ ପ୍ରାଇମରେ ଷ୍ଟ୍ରିମିଂ ହେଉଛି | Varun MTV, MTV Indies, UTV Bindaas ଏବଂ HotStar ରେ ମଧ୍ୟ ଆଙ୍କର୍ କରିଛନ୍ତି ଏବଂ ଗୁଗୁଲ୍, ମର୍ସିଡିଜ୍, HDFC, ଷ୍ଟାଣ୍ଡାର୍ଡ ଚାର୍ଟାର୍ଡ, ରେଡିଓ ମିର୍ଚି ଏବଂ ଅନ୍ୟାନ୍ୟ ପାଇଁ କର୍ପୋରେଟ୍ ସୋ କରିଛନ୍ତି |",
        mr: "स्ट्रगलिंग अभिनेता विकी मल्होत्रा ​​या हिट सोशल अवतारमागील माणूस, वरुण ठाकूर हा नवीनतम इंटरनेट सेन्सेशन आहे ज्याने स्नॅपचॅट आणि फेसबुक सारख्या प्लॅटफॉर्मवर आपल्या ॲसिडिक आत्म-निंदनीय विनोदाने कब्जा केला आहे, लोखंडवालाच्या बाहेरच्या सर्व CCD-वारंवार संघर्ष करणाऱ्या अभिनेत्यांची खिल्ली उडवली आहे. , मुंबई. 470000 सदस्य आणि 61 दशलक्ष व्ह्यूज मिळालेल्या लोकप्रिय कॉमेडी कलेक्टिव्ह SnG कॉमेडीचे सह-संस्थापक, कॉमेडियन त्याच्या तासभराच्या कॉमेडी स्पेशल, विकी दिस साइड, वरुण दॅट साइडसह शो आणि ठिकाणे विकत आहेत. या कॉमिकसाठी वास्तविकता पुरेशी नसल्यास, शो Amazon Prime वर देखील प्रवाहित होत आहे. वरुणने MTV, MTV Indies, UTV Bindaas आणि HotStar वरील कार्यक्रमांचे अँकरिंग देखील केले आहे आणि Google, Mercedes, HDFC, Standard Chartered, Radio Mirchi आणि इतर अनेकांसाठी कॉर्पोरेट शो केले आहेत.",
        kn: "ಹಿಟ್ ಸಾಮಾಜಿಕ ಅವತಾರ ಹೋರಾಟದ ನಟ ವಿಕ್ಕಿ ಮಲ್ಹೋತ್ರಾ ಅವರ ಹಿಂದಿನ ವ್ಯಕ್ತಿ, ವರುಣ್ ಠಾಕೂರ್ ಅವರು ಇತ್ತೀಚಿನ ಇಂಟರ್ನೆಟ್ ಸೆನ್ಸೇಶನ್ ಆಗಿದ್ದು, ಅವರು ಸ್ನ್ಯಾಪ್‌ಚಾಟ್ ಮತ್ತು ಫೇಸ್‌ಬುಕ್‌ನಂತಹ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್‌ಗಳನ್ನು ತಮ್ಮ ಆಮ್ಲೀಯ ಸ್ವಯಂ ನಿಂದನೆಯ ಹಾಸ್ಯದೊಂದಿಗೆ ತೆಗೆದುಕೊಂಡಿದ್ದಾರೆ, ಲೋಖಂಡವಾಲಾ ಮೂಲದ ಎಲ್ಲಾ ಸಿಸಿಡಿ-ಪದೇ ಪದೇ ಹೋರಾಟದ ನಟರನ್ನು ಗೇಲಿ ಮಾಡಿದ್ದಾರೆ. , ಮುಂಬೈ 470000 ಚಂದಾದಾರರನ್ನು ಮತ್ತು 61 ಮಿಲಿಯನ್ ವೀಕ್ಷಣೆಗಳನ್ನು ಗಳಿಸಿದ ಜನಪ್ರಿಯ ಹಾಸ್ಯ ಸಮೂಹವಾದ SnG ಕಾಮಿಡಿಯ ಸಹ-ಸಂಸ್ಥಾಪಕ, ಹಾಸ್ಯನಟ ತನ್ನ ಗಂಟೆ ಅವಧಿಯ ಹಾಸ್ಯ ವಿಶೇಷವಾದ ವಿಕ್ಕಿ ದಿಸ್ ಸೈಡ್, ವರುಣ್ ದಟ್ ಸೈಡ್‌ನೊಂದಿಗೆ ಪ್ರದರ್ಶನಗಳು ಮತ್ತು ಸ್ಥಳಗಳನ್ನು ಮಾರಾಟ ಮಾಡುತ್ತಿದೆ. ಒಂದು ವೇಳೆ ಈ ಕಾಮಿಕ್‌ಗೆ ರಿಯಾಲಿಟಿ ಸಾಕಾಗದೇ ಇದ್ದರೆ, ಶೋ ಅಮೆಜಾನ್ ಪ್ರೈಮ್‌ನಲ್ಲಿ ಸ್ಟ್ರೀಮಿಂಗ್ ಆಗುತ್ತಿದೆ. ವರುಣ್ ಎಂಟಿವಿ, ಎಂಟಿವಿ ಇಂಡೀಸ್, ಯುಟಿವಿ ಬಿಂದಾಸ್ ಮತ್ತು ಹಾಟ್‌ಸ್ಟಾರ್‌ನಲ್ಲಿ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಆಂಕರ್ ಮಾಡಿದ್ದಾರೆ ಮತ್ತು ಗೂಗಲ್, ಮರ್ಸಿಡಿಸ್, ಎಚ್‌ಡಿಎಫ್‌ಸಿ, ಸ್ಟ್ಯಾಂಡರ್ಡ್ ಚಾರ್ಟರ್ಡ್, ರೇಡಿಯೊ ಮಿರ್ಚಿ ಮತ್ತು ಹಲವಾರು ಇತರ ಕಾರ್ಪೊರೇಟ್ ಶೋಗಳನ್ನು ಮಾಡಿದ್ದಾರೆ.",
        bh: "हिट सोशल अवतार स्ट्रगलिंग एक्टर विकी मल्होत्रा ​​के पीछे के आदमी वरुण ठाकुर इंटरनेट के ताजा सनसनी हउवें जे अपना अम्लीय आत्म-निंदा करे वाला हास्य से स्नैपचैट आ फेसबुक जइसन प्लेटफार्मन पर कब्जा कर लिहले बाड़न, लोकखंडवाला से बाहर बसल सगरी सीसीडी में अक्सर आवे वाला संघर्षशील कलाकारन के मजाक उड़ावत बाड़न , मुंबई में भइल. एसएनजी कॉमेडी के सह-संस्थापक, एगो लोकप्रिय कॉमेडी सामूहिक जवना के 470000 सब्सक्राइबर आ 6.1 मिलियन व्यूज मिलल बा, कॉमेडियन अपना घंटा भर के कॉमेडी स्पेशल,",
        mai: "हिट सोशल अवतार संघर्षशील अभिनेता विकी मल्होत्रा ​​के पाछु के आदमी वरुण ठाकुर इंटरनेट के नवीनतम सनसनी छै जे अपन अम्लीय आत्म-निंदा करय वाला हास्य के साथ स्नैपचैट आरू फेसबुक जैसनऽ प्लेटफॉर्म प॑ कब्जा करी लेल॑ छै, जेकरा म॑ लोकखंडवाला स॑ बाहर स्थित सब सीसीडी म॑ अक्सर आबै वाला संघर्षशील अभिनेता के मजाक उड़ाबै छै , मुंबई। 470000 सब्सक्राइबर आ 6.1 करोड़ व्यूज जमा करय वाला लोकप्रिय कॉमेडी सामूहिक एसएनजी कॉमेडी के सह-संस्थापक ई हास्य अभिनेता अपन घंटा भर के कॉमेडी स्पेशल,",
        gu: "હિટ સામાજિક અવતારની પાછળનો વ્યક્તિ સંઘર્ષશીલ અભિનેતા વિકી મલ્હોત્રા, વરુણ ઠાકુર એ નવીનતમ ઇન્ટરનેટ સેન્સેશન છે જેણે પોતાની તેજાબી સ્વ-નિંદાકારક રમૂજ સાથે સ્નેપચેટ અને ફેસબુક જેવા પ્લેટફોર્મ પર કબજો જમાવ્યો છે, લોખંડવાલા સ્થિત તમામ CCD-વારંવાર સંઘર્ષ કરતા કલાકારોની મજાક ઉડાવી છે. , મુંબઈ. SnG કોમેડીના સહ-સ્થાપક, એક લોકપ્રિય કોમેડી સામૂહિક કે જેણે 470000 સબ્સ્ક્રાઇબર્સ અને 61 મિલિયન વ્યુઝ એકઠા કર્યા છે, કોમેડિયન તેના કલાક-લાંબા કોમેડી સ્પેશિયલ, વિકી ધીસ સાઈડ, વરુણ ધેટ સાઈડ સાથે શો અને સ્થળોનું વેચાણ કરી રહ્યો છે. જો આ કોમિક માટે વાસ્તવિકતા પૂરતી ન હોય, તો આ શો એમેઝોન પ્રાઇમ પર પણ સ્ટ્રીમ થઈ રહ્યો છે. વરુણે એમટીવી, એમટીવી ઈન્ડીઝ, યુટીવી બિન્દાસ અને હોટસ્ટાર પર પણ શો એન્કર કર્યા છે, અને ગૂગલ, મર્સિડીઝ, એચડીએફસી, સ્ટાન્ડર્ડ ચાર્ટર્ડ, રેડિયો મિર્ચી અને અન્ય ઘણા લોકો માટે કોર્પોરેટ શો કર્યા છે.",
      },
      reactionCount: 1198,
      reactions: {
        neutral: 174,
        laugh: 866,
        sad: 158,
      },
    },
  },
  {
    id: "990b044f-9ead-4e4b-b9aa-a69eba6a6c81",
    ordering: 7,
    displayName: "",
    firstName: "niharikanm",
    lastName: "",
    likeCount: 0,
    playCount: 0,
    viewCount: 0,
    followers: 1635,
    description:
      'Niharika NM is an Indian digital content creator with over 6 million followers across various social media platforms. She is the first Indian creator to have a guest appearance on the global Netflix series - Big Mouth, alongside Megan Thee Stallion, Jordan Peele, and others. She is recognized for her humorous content and has worked with top global and Indian celebrities like John Legend, Priyanka Chopra, Aamir Khan, Ranbir Kapoor, Mahesh Babu, Rocking Star Yash, Shubhman Gill, and others. In 2022, Niharika won the Youth Icon - Entertainer of the Year at the World Influencers and Bloggers Awards (WIBA) at Cannes, becoming one of the few Indian creators to have achieved this. She has appeared on the Forbes 100 Digital Stars list of 2023 and was featured on Forbes Asia 30 under 30 in 2022. She was announced "Digital Creator of the Year" by Grazia Millennial Awards 2023.',
    duration: 0,
    thumbnail:
      "https://d35f5vastl4boc.cloudfront.net/profileImage/Niharika_NM.png",
    url: "https://d35f5vastl4boc.cloudfront.net/profileImage/Niharika_NM.png",
    assetId: "990b044f-9ead-4e4b-b9aa-a69eba6a6c81",
    contentType: "",
    bannerUrl:
      "https://d35f5vastl4boc.cloudfront.net/profileImage/Niharika_NM.png",
    pristine_image: "",
    profile: {
      _id: "990b044f-9ead-4e4b-b9aa-a69eba6a6c81",
      userId: "990b044f-9ead-4e4b-b9aa-a69eba6a6c81",
      fullName: "Niharika NM ",
      userName: "niharikanm",
      email: "niharikanm@hww.com",
      description:
        'Niharika NM is an Indian digital content creator with over 6 million followers across various social media platforms. She is the first Indian creator to have a guest appearance on the global Netflix series - Big Mouth, alongside Megan Thee Stallion, Jordan Peele, and others. She is recognized for her humorous content and has worked with top global and Indian celebrities like John Legend, Priyanka Chopra, Aamir Khan, Ranbir Kapoor, Mahesh Babu, Rocking Star Yash, Shubhman Gill, and others. In 2022, Niharika won the Youth Icon - Entertainer of the Year at the World Influencers and Bloggers Awards (WIBA) at Cannes, becoming one of the few Indian creators to have achieved this. She has appeared on the Forbes 100 Digital Stars list of 2023 and was featured on Forbes Asia 30 under 30 in 2022. She was announced "Digital Creator of the Year" by Grazia Millennial Awards 2023.',
      status: "ACTIVE",
      profileImageUrl:
        "https://d35f5vastl4boc.cloudfront.net/profileImage/Niharika_NM.png",
      followersCount: 1635,
      followingCount: 0,
      videoCount: 0,
      shareCount: 0,
      likeCount: 0,
      commentCount: 0,
      bookmarkCount: 0,
      backgroundImage:
        "https://d35f5vastl4boc.cloudfront.net/profileImage/Niharika_NM.png",
      localisedFullName: {
        en: "Niharika NM ",
        hi: "निहारिका एनएम",
        ta: "நிஹாரிகா என்.எம்",
        te: "నిహారిక NM",
        ba: "নীহারিকা এনএম",
        or: "ନିହାରିକା ଏନ",
        mr: "निहारिका एन.एम",
        kn: "ನಿಹಾರಿಕಾ ಎನ್ಎಂ",
        bh: "निहारिका एनएम के बा",
        mai: "निहारिका एन.एम",
        gu: "નિહારિકા એન.એમ",
      },
      localisedDescription: {
        en: 'Niharika NM is an Indian digital content creator with over 6 million followers across various social media platforms. She is the first Indian creator to have a guest appearance on the global Netflix series - Big Mouth, alongside Megan Thee Stallion, Jordan Peele, and others. She is recognized for her humorous content and has worked with top global and Indian celebrities like John Legend, Priyanka Chopra, Aamir Khan, Ranbir Kapoor, Mahesh Babu, Rocking Star Yash, Shubhman Gill, and others. In 2022, Niharika won the Youth Icon - Entertainer of the Year at the World Influencers and Bloggers Awards (WIBA) at Cannes, becoming one of the few Indian creators to have achieved this. She has appeared on the Forbes 100 Digital Stars list of 2023 and was featured on Forbes Asia 30 under 30 in 2022. She was announced "Digital Creator of the Year" by Grazia Millennial Awards 2023.',
        hi: 'निहारिका एनएम एक भारतीय डिजिटल कंटेंट क्रिएटर हैं जिनके विभिन्न सोशल मीडिया प्लेटफार्मों पर 6 मिलियन से अधिक अनुयायी हैं। वह मेगन थी स्टैलियन, जॉर्डन पील और अन्य के साथ वैश्विक नेटफ्लिक्स श्रृंखला - बिग माउथ में अतिथि भूमिका निभाने वाली पहली भारतीय क्रिएटर हैं। वह अपनी हास्य कंटेंट के लिए पहचानी जाती हैं और उन्होंने जॉन लीजेंड, प्रियंका चोपड़ा, आमिर खान, रणबीर कपूर, महेश बाबू, रॉकिंग स्टार यश, शुभमान गिल और अन्य जैसी शीर्ष वैश्विक और भारतीय हस्तियों के साथ काम किया है। 2022 में, निहारिका ने कान्स में वर्ल्ड इन्फ्लुएंसर्स एंड ब्लॉगर्स अवार्ड्स (WIBA) में यूथ आइकन - एंटरटेनर ऑफ द ईयर का पुरस्कार जीता, और यह उपलब्धि हासिल करने वाले कुछ भारतीय रचनाकारों में से एक बन गईं। वह 2023 की फोर्ब्स 100 डिजिटल स्टार्स सूची में शामिल हुई हैं और 2022 में फोर्ब्स एशिया 30 अंडर 30 में शामिल हुईं। उन्हें ग्राज़िया मिलेनियल अवार्ड्स 2023 द्वारा "डिजिटल क्रिएटर ऑफ द ईयर" से नवाज़ा गया हैं।',
        ta: 'நிஹாரிகா என்எம் பல்வேறு சமூக ஊடக தளங்களில் 6 மில்லியனுக்கும் அதிகமான பின்தொடர்பவர்களைக் கொண்ட ஒரு இந்திய டிஜிட்டல் உள்ளடக்கத்தை உருவாக்குபவர். உலகளாவிய நெட்ஃபிக்ஸ் தொடரில் விருந்தினராக தோன்றிய முதல் இந்திய படைப்பாளி இவர் - பிக் மௌத், மேகன் தி ஸ்டாலியன், ஜோர்டான் பீலே மற்றும் பிறருடன். அவர் தனது நகைச்சுவையான உள்ளடக்கத்திற்காக அங்கீகரிக்கப்பட்டவர் மற்றும் ஜான் லெஜண்ட், பிரியங்கா சோப்ரா, அமீர் கான், ரன்பீர் கபூர், மகேஷ் பாபு, ராக்கிங் ஸ்டார் யாஷ், சுப்மான் கில் மற்றும் பலர் போன்ற உலக மற்றும் இந்திய பிரபலங்களுடன் பணியாற்றியுள்ளார். 2022 ஆம் ஆண்டில், கேன்ஸில் நடந்த வேர்ல்ட் இன்ஃப்ளூயன்சர்ஸ் அண்ட் பிளாக்கர்ஸ் விருதுகளில் (WIBA) யூத் ஐகான் - ஆண்டின் சிறந்த பொழுதுபோக்கு விருதை நிஹாரிகா வென்றார், இதை சாதித்த சில இந்திய படைப்பாளிகளில் ஒருவராக ஆனார். அவர் 2023 இன் ஃபோர்ப்ஸ் 100 டிஜிட்டல் நட்சத்திரங்கள் பட்டியலில் தோன்றினார் மற்றும் 2022 இல் 30 வயதிற்குட்பட்ட ஃபோர்ப்ஸ் ஆசியா 30 இல் இடம்பெற்றார். கிராசியா மில்லினியல் விருதுகள் 2023 மூலம் அவர் "ஆண்டின் டிஜிட்டல் படைப்பாளர்" என்று அறிவிக்கப்பட்டார்.',
        te: 'నిహారిక NM వివిధ సోషల్ మీడియా ప్లాట్‌ఫారమ్‌లలో 6 మిలియన్లకు పైగా అనుచరులను కలిగి ఉన్న భారతీయ డిజిటల్ కంటెంట్ సృష్టికర్త. గ్లోబల్ నెట్‌ఫ్లిక్స్ సిరీస్ - బిగ్ మౌత్, మెగాన్ థీ స్టాలియన్, జోర్డాన్ పీలే మరియు ఇతరులతో అతిథి పాత్రలో కనిపించిన మొదటి భారతీయ సృష్టికర్త ఆమె. ఆమె హాస్యభరితమైన కంటెంట్‌కు గుర్తింపు పొందింది మరియు జాన్ లెజెండ్, ప్రియాంక చోప్రా, అమీర్ ఖాన్, రణబీర్ కపూర్, మహేష్ బాబు, రాకింగ్ స్టార్ యష్, శుభ్‌మాన్ గిల్ మరియు ఇతరుల వంటి అగ్రశ్రేణి మరియు భారతీయ ప్రముఖులతో కలిసి పనిచేసింది. 2022లో, కేన్స్‌లో జరిగిన వరల్డ్ ఇన్‌ఫ్లుయెన్సర్స్ అండ్ బ్లాగర్స్ అవార్డ్స్ (WIBA)లో యూత్ ఐకాన్ - ఎంటర్‌టైనర్ ఆఫ్ ది ఇయర్‌ని నిహారిక గెలుచుకుంది, దీనిని సాధించిన అతికొద్ది మంది భారతీయ సృష్టికర్తలలో ఒకరు. ఆమె 2023 ఫోర్బ్స్ 100 డిజిటల్ స్టార్స్ జాబితాలో కనిపించింది మరియు 2022లో ఫోర్బ్స్ ఆసియా 30 అండర్ 30లో కనిపించింది. గ్రాజియా మిలీనియల్ అవార్డ్స్ 2023 ద్వారా ఆమెను "డిజిటల్ క్రియేటర్ ఆఫ్ ది ఇయర్" ప్రకటించారు.',
        ba: 'নিহারিকা এনএম হলেন একজন ভারতীয় ডিজিটাল কন্টেন্ট স্রষ্টা যার 6 মিলিয়নেরও বেশি ফলোয়ার রয়েছে বিভিন্ন সোশ্যাল মিডিয়া প্ল্যাটফর্মে। তিনি হলেন প্রথম ভারতীয় নির্মাতা যিনি গ্লোবাল নেটফ্লিক্স সিরিজ - বিগ মাউথ, মেগান থি স্ট্যালিয়ন, জর্ডান পিল এবং অন্যান্যদের সাথে অতিথি উপস্থিতি করেছেন। তিনি তার হাস্যরসাত্মক বিষয়বস্তুর জন্য স্বীকৃত এবং জন কিংবদন্তি, প্রিয়াঙ্কা চোপড়া, আমির খান, রণবীর কাপুর, মহেশ বাবু, রকিং স্টার যশ, শুভমান গিল এবং অন্যান্যদের মতো শীর্ষ বিশ্ব ও ভারতীয় সেলিব্রিটিদের সাথে কাজ করেছেন। 2022 সালে, নীহারিকা কান-এ ওয়ার্ল্ড ইনফ্লুয়েন্সার অ্যান্ড ব্লগারস অ্যাওয়ার্ডস (WIBA) এ ইয়ুথ আইকন - এন্টারটেইনার অফ দ্য ইয়ার জিতেছে, এটি অর্জন করেছেন এমন কয়েকজন ভারতীয় নির্মাতাদের মধ্যে একজন হয়ে উঠেছেন। তিনি 2023 সালের ফোর্বস 100 ডিজিটাল তারকাদের তালিকায় উপস্থিত হয়েছেন এবং 2022 সালে ফোর্বস এশিয়া 30 অনূর্ধ্ব 30-এ স্থান পেয়েছেন৷ গ্রাজিয়া মিলেনিয়াল অ্যাওয়ার্ডস 2023 দ্বারা তিনি "বছরের ডিজিটাল ক্রিয়েটর" ঘোষণা করেছিলেন৷',
        or: "ନିହାରିକା ଏନଏମ ହେଉଛି ଏକ ଭାରତୀୟ ଡିଜିଟାଲ ବିଷୟବସ୍ତୁ ନିର୍ମାତା ଯାହାକି ବିଭିନ୍ନ ସୋସିଆଲ ମିଡିଆ ପ୍ଲାଟଫର୍ମରେ 6 ମିଲିୟନରୁ ଅଧିକ ଅନୁସରଣକାରୀ ଅଛନ୍ତି | ସେ ହେଉଛନ୍ତି ପ୍ରଥମ ଭାରତୀୟ ସୃଷ୍ଟିକର୍ତ୍ତା ଯିଏକି ସର୍ବଭାରତୀୟ ନେଟଫ୍ଲିକ୍ସ ସିରିଜ୍ - ବିଗ୍ ମାଉଥ୍, ମେଗାନ୍ ଥି ଷ୍ଟାଲିଅନ୍, ଜୋର୍ଡାନ ପିଲେ ଏବଂ ଅନ୍ୟମାନଙ୍କ ସହିତ ଅତିଥି ରୂପ ଧାରଣ କରିଥିଲେ | ସେ ନିଜର ହାସ୍ୟାସ୍ପଦ ବିଷୟବସ୍ତୁ ପାଇଁ ସ୍ୱୀକୃତିପ୍ରାପ୍ତ ଏବଂ ଜନ କିମ୍ବଦନ୍ତୀ, ପ୍ରିୟଙ୍କା ଚୋପ୍ରା, ଆମୀର ଖାନ, ରଣବୀର କପୁର, ମହେଶ ବାବୁ, ରକିଂ ଷ୍ଟାର ୟଶ, ଶୁଭମାନ ଗିଲ ଏବଂ ଅନ୍ୟମାନଙ୍କ ପରି ଶ୍ରେଷ୍ଠ ବିଶ୍ୱ ତଥା ଭାରତୀୟ ସେଲିବ୍ରିଟିଙ୍କ ସହ କାମ କରିଛନ୍ତି | 2022 ମସିହାରେ, ନିହାରିକା କାନ୍ସରେ ୱାର୍ଲ୍ଡ ଇନଫ୍ଲୁଏନ୍ସର ଏବଂ ବ୍ଲଗର୍ସ ଆୱାର୍ଡ (ଡବ୍ଲୁଇବିଏ) ରେ ୟୁଥ୍ ଆଇକନ୍ - ବର୍ଷର ମନୋରଞ୍ଜନ କରିଥିଲେ, ଏବଂ ଏହା ହାସଲ କରିଥିବା ଅଳ୍ପ କେତେକ ଭାରତୀୟ ସୃଷ୍ଟିକର୍ତ୍ତାଙ୍କ ମଧ୍ୟରୁ ଜଣେ ହୋଇଥିଲେ | ସେ 2023 ର ଫୋର୍ବସ୍ 100 ଡିଜିଟାଲ୍ ଷ୍ଟାର୍ ତାଲିକାରେ ସ୍ଥାନ ପାଇଛନ୍ତି ଏବଂ 2022 ମସିହାରେ 30 ବର୍ଷରୁ କମ୍ ଫୋର୍ବସ୍ ଏସିଆ 30 ରେ ସ୍ଥାନ ପାଇଥିଲେ।",
        mr: 'विविध सोशल मीडिया प्लॅटफॉर्मवर 6 दशलक्षाहून अधिक फॉलोअर्स असलेली निहारिका एनएम ही एक भारतीय डिजिटल सामग्री निर्माता आहे. मेगन थी स्टॅलियन, जॉर्डन पीले आणि इतरांसोबत, जागतिक Netflix मालिकेत - बिग माउथमध्ये पाहुण्यांची भूमिका करणारी ती पहिली भारतीय निर्माती आहे. ती तिच्या विनोदी सामग्रीसाठी ओळखली जाते आणि तिने जॉन लीजेंड, प्रियांका चोप्रा, आमिर खान, रणबीर कपूर, महेश बाबू, रॉकिंग स्टार यश, शुभमन गिल आणि इतरांसारख्या शीर्ष जागतिक आणि भारतीय सेलिब्रिटींसोबत काम केले आहे. 2022 मध्ये, निहारिकाने कान्स येथील वर्ल्ड इंफ्लुएंसर्स अँड ब्लॉगर्स अवॉर्ड्स (WIBA) मध्ये युथ आयकॉन - एंटरटेनर ऑफ द इयर हा पुरस्कार जिंकला आणि हे यश मिळवणाऱ्या काही भारतीय निर्मात्यांपैकी एक बनले. 2023 च्या फोर्ब्स 100 डिजिटल स्टार्सच्या यादीत ती दिसली आहे आणि 2022 मध्ये फोर्ब्स एशिया 30 अंडर 30 वर वैशिष्ट्यीकृत झाली होती. तिला ग्रॅझिया मिलेनियल अवॉर्ड्स 2023 द्वारे "डिजिटल क्रिएटर ऑफ द इयर" घोषित करण्यात आले.',
        kn: 'ನಿಹಾರಿಕಾ ಎನ್‌ಎಂ ಭಾರತೀಯ ಡಿಜಿಟಲ್ ವಿಷಯ ರಚನೆಕಾರರಾಗಿದ್ದು, ವಿವಿಧ ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್‌ಗಳಲ್ಲಿ 6 ದಶಲಕ್ಷಕ್ಕೂ ಹೆಚ್ಚು ಅನುಯಾಯಿಗಳನ್ನು ಹೊಂದಿದ್ದಾರೆ. ಜಾಗತಿಕ ನೆಟ್‌ಫ್ಲಿಕ್ಸ್ ಸರಣಿ - ಬಿಗ್ ಮೌತ್, ಮೇಗನ್ ಥೀ ಸ್ಟಾಲಿಯನ್, ಜೋರ್ಡಾನ್ ಪೀಲೆ ಮತ್ತು ಇತರರೊಂದಿಗೆ ಅತಿಥಿಯಾಗಿ ಕಾಣಿಸಿಕೊಂಡ ಮೊದಲ ಭಾರತೀಯ ಸೃಷ್ಟಿಕರ್ತ. ಅವರು ತಮ್ಮ ಹಾಸ್ಯಮಯ ವಿಷಯಕ್ಕಾಗಿ ಗುರುತಿಸಲ್ಪಟ್ಟಿದ್ದಾರೆ ಮತ್ತು ಜಾನ್ ಲೆಜೆಂಡ್, ಪ್ರಿಯಾಂಕಾ ಚೋಪ್ರಾ, ಅಮೀರ್ ಖಾನ್, ರಣಬೀರ್ ಕಪೂರ್, ಮಹೇಶ್ ಬಾಬು, ರಾಕಿಂಗ್ ಸ್ಟಾರ್ ಯಶ್, ಶುಭ್‌ಮಾನ್ ಗಿಲ್ ಮತ್ತು ಇತರರಂತಹ ಉನ್ನತ ಜಾಗತಿಕ ಮತ್ತು ಭಾರತೀಯ ಸೆಲೆಬ್ರಿಟಿಗಳೊಂದಿಗೆ ಕೆಲಸ ಮಾಡಿದ್ದಾರೆ. 2022 ರಲ್ಲಿ, ನಿಹಾರಿಕಾ ಕ್ಯಾನೆಸ್‌ನಲ್ಲಿ ನಡೆದ ವರ್ಲ್ಡ್ ಇನ್‌ಫ್ಲುಯೆನ್ಸರ್ಸ್ ಮತ್ತು ಬ್ಲಾಗರ್ಸ್ ಅವಾರ್ಡ್ಸ್ (WIBA) ನಲ್ಲಿ ಯೂತ್ ಐಕಾನ್ - ವರ್ಷದ ಮನರಂಜನೆಯನ್ನು ಗೆದ್ದರು, ಇದನ್ನು ಸಾಧಿಸಿದ ಕೆಲವೇ ಕೆಲವು ಭಾರತೀಯ ರಚನೆಕಾರರಲ್ಲಿ ಒಬ್ಬರಾದರು. ಅವರು 2023 ರ ಫೋರ್ಬ್ಸ್ 100 ಡಿಜಿಟಲ್ ಸ್ಟಾರ್ಸ್ ಪಟ್ಟಿಯಲ್ಲಿ ಕಾಣಿಸಿಕೊಂಡಿದ್ದಾರೆ ಮತ್ತು 2022 ರಲ್ಲಿ 30 ವರ್ಷದೊಳಗಿನ ಫೋರ್ಬ್ಸ್ ಏಷ್ಯಾ 30 ನಲ್ಲಿ ಕಾಣಿಸಿಕೊಂಡಿದ್ದಾರೆ. ಗ್ರಾಜಿಯಾ ಮಿಲೇನಿಯಲ್ ಅವಾರ್ಡ್ಸ್ 2023 ರ ಮೂಲಕ ಅವರು "ವರ್ಷದ ಡಿಜಿಟಲ್ ಕ್ರಿಯೇಟರ್" ಎಂದು ಘೋಷಿಸಿದರು.',
        bh: "निहारिका एनएम एगो भारतीय डिजिटल कंटेंट क्रिएटर हई जिनके बिबिध सोशल मीडिया प्लेटफार्म सभ पर 60 लाख से ढेर फॉलोअर्स बाड़ें। ऊ पहिली भारतीय रचनाकार बाड़ी जे ग्लोबल नेटफ्लिक्स सीरीज - बिग माउथ में मेगन थी स्टैलियन, जॉर्डन पील, आ अउरी लोग के साथे मेहमान के रूप में नजर आइल बाड़ी। इनके हास्य सामग्री खातिर जानल जाला आ जॉन लेजेंड, प्रियंका चोपड़ा, आमिर खान, रणबीर कपूर, महेश बाबू, रॉकिंग स्टार यश, शुभमान गिल, आ अउरी लोग नियर टॉप ग्लोबल आ भारतीय सेलिब्रिटी लोग के साथे काम कइले बाड़ी। 202 में भइल",
        mai: "निहारिका एनएम एकटा भारतीय डिजिटल कंटेंट क्रिएटर छै जेकरऽ विभिन्न सोशल मीडिया प्लेटफॉर्मऽ प॑ ६० लाख स॑ भी अधिक फॉलोअर्स छै । ओ पहिल भारतीय निर्माता छै जे वैश्विक नेटफ्लिक्स सीरीज - बिग माउथ में मेगन थी स्टैलियन, जॉर्डन पील, आ अन्य के साथ अतिथि के रूप में उपस्थिति दर्ज करौने छै । हुनका अपनऽ हास्य सामग्री लेली पहचानलऽ जाय छै आरू जॉन लेजेंड, प्रियंका चोपड़ा, आमिर खान, रणबीर कपूर, महेश बाबू, रॉकिंग स्टार यश, शुभमान गिल, आरू अन्य शीर्ष वैश्विक आरू भारतीय हस्ती सिनी के साथ काम करी चुकलऽ छै । 202 मे",
        gu: 'નિહારિકા એનએમ એક ભારતીય ડિજિટલ કન્ટેન્ટ સર્જક છે જે વિવિધ સોશિયલ મીડિયા પ્લેટફોર્મ પર 6 મિલિયનથી વધુ ફોલોઅર્સ ધરાવે છે. મેગન થી સ્ટેલિયન, જોર્ડન પીલે અને અન્ય લોકો સાથે વૈશ્વિક નેટફ્લિક્સ શ્રેણી - બિગ માઉથમાં મહેમાન ભૂમિકા ભજવનાર તે પ્રથમ ભારતીય સર્જક છે. તેણી તેના રમૂજી વિષયવસ્તુ માટે જાણીતી છે અને તેણે જ્હોન લિજેન્ડ, પ્રિયંકા ચોપરા, આમિર ખાન, રણબીર કપૂર, મહેશ બાબુ, રોકિંગ સ્ટાર યશ, શુભમન ગિલ અને અન્ય જેવી ટોચની વૈશ્વિક અને ભારતીય હસ્તીઓ સાથે કામ કર્યું છે. 2022 માં, નિહારિકાએ કેન્સ ખાતે વર્લ્ડ ઈન્ફ્લુઅન્સર્સ એન્ડ બ્લોગર્સ એવોર્ડ્સ (WIBA) ખાતે યુથ આઈકોન - એન્ટરટેઈનર ઓફ ધ યર જીત્યો, આ સિદ્ધિ મેળવનારા થોડા ભારતીય સર્જકોમાંની એક બની. તેણી 2023 ની ફોર્બ્સ 100 ડિજિટલ સ્ટાર્સની સૂચિમાં દેખાઈ હતી અને 2022 માં ફોર્બ્સ એશિયા 30 હેઠળ 30 માં દર્શાવવામાં આવી હતી. તેણીને ગ્રાઝિયા મિલેનિયલ એવોર્ડ્સ 2023 દ્વારા "ડિજિટલ સર્જક ઓફ ધ યર" જાહેર કરવામાં આવી હતી.',
      },
      reactionCount: 12891,
      reactions: {
        laugh: 8859,
        sad: 1435,
        neutral: 2597,
      },
    },
  },
  {
    id: "5eb2ff25-d548-4ffc-8e0a-ec6814c72810",
    ordering: 8,
    displayName: "",
    firstName: "Sorabh Pant",
    lastName: "",
    likeCount: 0,
    playCount: 0,
    viewCount: 0,
    followers: 1094,
    description:
      "Recently described as the second most brilliant Indian comedian Ive seen, after Russell Peters by Wayne Brady, Sorabh Pant is one of Indias leading comedians, the kind to expend the last drop of energy and Glucon-D to make you laugh. Sorabh has done over 1000 shows in 60 cities across 15 countries, as well as 300+ corporate shows.\n\nThe zany comic has opened for international biggies like Rob Schneider (You Dont Mess With The Zohan, Deuce Bigalow) and Wayne Brady (Whose Line Is It Anyway?, Wayne Brady Show), and has had TV shows on Pogo, Star World, CNBC, and ET Now. He also founded the East India Comedy, Indias busiest comedy company, which has racked up 115 million YouTube views with shows like EIC Outrage and EIC vs Bollywood.\n\nAnd if all of this wasnt enough, he has also released three novels - The Wednesday Soul, Under Delhi and Pawan.",
    duration: 0,
    thumbnail:
      "https://d35f5vastl4boc.cloudfront.net/profileImage/sorabh_pant.png",
    url: "https://d35f5vastl4boc.cloudfront.net/profileImage/sorabh_pant.png",
    assetId: "5eb2ff25-d548-4ffc-8e0a-ec6814c72810",
    contentType: "",
    bannerUrl:
      "https://d35f5vastl4boc.cloudfront.net/profileImage/sorabh_pant.png",
    pristine_image: "",
    profile: {
      _id: "5eb2ff25-d548-4ffc-8e0a-ec6814c72810",
      userId: "5eb2ff25-d548-4ffc-8e0a-ec6814c72810",
      fullName: "Sorabh Pant",
      userName: "Sorabh Pant",
      email: "sorabhpant@hww.com",
      description:
        "Recently described as the second most brilliant Indian comedian Ive seen, after Russell Peters by Wayne Brady, Sorabh Pant is one of Indias leading comedians, the kind to expend the last drop of energy and Glucon-D to make you laugh. Sorabh has done over 1000 shows in 60 cities across 15 countries, as well as 300+ corporate shows.\n\nThe zany comic has opened for international biggies like Rob Schneider (You Dont Mess With The Zohan, Deuce Bigalow) and Wayne Brady (Whose Line Is It Anyway?, Wayne Brady Show), and has had TV shows on Pogo, Star World, CNBC, and ET Now. He also founded the East India Comedy, Indias busiest comedy company, which has racked up 115 million YouTube views with shows like EIC Outrage and EIC vs Bollywood.\n\nAnd if all of this wasnt enough, he has also released three novels - The Wednesday Soul, Under Delhi and Pawan.",
      status: "ACTIVE",
      profileImageUrl:
        "https://d35f5vastl4boc.cloudfront.net/profileImage/sorabh_pant.png",
      followersCount: 1094,
      followingCount: 0,
      videoCount: 0,
      shareCount: 0,
      likeCount: 0,
      commentCount: 0,
      bookmarkCount: 0,
      backgroundImage:
        "https://d35f5vastl4boc.cloudfront.net/profileImage/sorabh_pant.png",
      localisedFullName: {
        en: "Sorabh Pant",
        hi: "सोरभ पंत",
        ta: "சோரப் பந்த்",
        te: "సోరబ్ పంత్",
        ba: "সোরভ পন্ত",
        or: "ସୋରାବ ପନ୍ତ |",
        mr: "सोरभ पंत",
        kn: "ಸೊರಭ್ ಪಂತ್",
        bh: "सोरभ पंत के ह",
        mai: "सोरभ पंत",
        gu: "સોરભ પંત",
      },
      localisedDescription: {
        en: "Recently described as the second most brilliant Indian comedian Ive seen, after Russell Peters by Wayne Brady, Sorabh Pant is one of Indias leading comedians, the kind to expend the last drop of energy and Glucon-D to make you laugh. Sorabh has done over 1000 shows in 60 cities across 15 countries, as well as 300+ corporate shows.\n\nThe zany comic has opened for international biggies like Rob Schneider (You Dont Mess With The Zohan, Deuce Bigalow) and Wayne Brady (Whose Line Is It Anyway?, Wayne Brady Show), and has had TV shows on Pogo, Star World, CNBC, and ET Now. He also founded the East India Comedy, Indias busiest comedy company, which has racked up 115 million YouTube views with shows like EIC Outrage and EIC vs Bollywood.\n\nAnd if all of this wasnt enough, he has also released three novels - The Wednesday Soul, Under Delhi and Pawan.",
        hi: "हाल ही में वेन ब्रैडी द्वारा रसेल पीटर्स के बाद दूसरे सबसे प्रतिभाशाली भारतीय हास्य अभिनेता के रूप में वर्णित, सोरभ पंत भारत के अग्रणी हास्य कलाकारों में से एक हैं, जो आपको हंसाने के लिए अपनी ऊर्जा और ग्लूकोन-डी की आखिरी बूंद भी खर्च कर देते हैं। सोरभ ने ऐसा किया है 15 देशों के 60 शहरों में 1000 से अधिक शो, साथ ही 300 से अधिक कॉर्पोरेट शो।\n\nज़ैनी कॉमिक रॉब श्नाइडर (यू डोंट मेस विद द ज़ोहान, ड्यूस बिगालो) और वेन ब्रैडी (व्होज़ लाइन इज़ इट एनीवे?, वेन ब्रैडी शो) जैसे अंतरराष्ट्रीय दिग्गजों के लिए शुरू हुई है, और पोगो, स्टार वर्ल्ड, सीएनबीसी पर टीवी शो कर चुकी है। , और ईटी नाउ। उन्होंने भारत की सबसे व्यस्त कॉमेडी कंपनी ईस्ट इंडिया कॉमेडी की भी स्थापना की, जिसने EIC आउटरेज और EIC बनाम बॉलीवुड जैसे शो के साथ 115 मिलियन YouTube व्यूज बटोरे हैं।\n\nऔर अगर यह सब पर्याप्त नहीं था, तो उन्होंने  - द वेडनसडे सोल, अंडर डेल्ही और पवन नामक तीन उपन्यास भी जारी किए हैं।",
        ta: "சமீபத்தில் நான் பார்த்த இரண்டாவது சிறந்த இந்திய நகைச்சுவை நடிகர் என்று வர்ணிக்கப்பட்டது, ரஸ்ஸல் பீட்டர்ஸுக்குப் பிறகு வெய்ன் பிராடி, சோரப் பண்ட் இந்தியாவின் முன்னணி நகைச்சுவை நடிகர்களில் ஒருவர், கடைசித் துளி ஆற்றலையும், உங்களைச் சிரிக்க வைக்கும் குளுக்கோன்-டியையும் செலவழிக்கும் வகை. சோரப் 15 நாடுகளில் 60 நகரங்களில் 1000 நிகழ்ச்சிகளையும், 300+ கார்ப்பரேட் நிகழ்ச்சிகளையும் செய்துள்ளார்.\n\nஜானி காமிக் ராப் ஷ்னைடர் (யூ டோன்ட் மெஸ் வித் தி ஜோஹன், டியூஸ் பிகாலோ) மற்றும் வெய்ன் பிராடி (யாருடைய வரி எப்படியும்?, வெய்ன் பிராடி ஷோ) போன்ற சர்வதேச பெரியவர்களுக்காக திறக்கப்பட்டுள்ளது, மேலும் போகோ, ஸ்டார் வேர்ல்ட், சிஎன்பிசி ஆகியவற்றில் டிவி நிகழ்ச்சிகளைக் கொண்டிருந்தது. , மற்றும் ET Now. இந்தியாவின் பரபரப்பான நகைச்சுவை நிறுவனமான ஈஸ்ட் இந்தியா காமெடி நிறுவனத்தையும் அவர் நிறுவினார், இது EIC அவுட்ரேஜ் மற்றும் EIC vs பாலிவுட் போன்ற நிகழ்ச்சிகளுடன் 115 மில்லியன் YouTube பார்வைகளைப் பெற்றுள்ளது.\n\nஇவை அனைத்தும் போதவில்லை என்றால், அவர் மூன்று நாவல்களையும் வெளியிட்டுள்ளார் - தி புதன் சோல், அண்டர் டெல்லி மற்றும் பவன்.",
        te: "ఇటీవల నేను చూసిన రెండవ అత్యంత తెలివైన భారతీయ హాస్యనటుడిగా వర్ణించబడింది, వేన్ బ్రాడీ రచించిన రస్సెల్ పీటర్స్ తర్వాత, సోరబ్ పంత్ భారతదేశంలోని ప్రముఖ హాస్యనటులలో ఒకరు, చివరి చుక్క శక్తిని వెచ్చించి మిమ్మల్ని నవ్వించడానికి గ్లూకాన్-డి. సొరభ్ 15 దేశాల్లోని 60 నగరాల్లో 1000 షోలు, అలాగే 300+ కార్పొరేట్ షోలు చేశారు.\n\nజానీ కామిక్ రాబ్ ష్నైడర్ (యు డోంట్ మెస్ విత్ ది జోహాన్, డ్యూస్ బిగాలో) మరియు వేన్ బ్రాడీ (ఎవరి లైన్ ఈజ్ ఇట్ ఎనీవే?, వేన్ బ్రాడీ షో) వంటి అంతర్జాతీయ ప్రముఖుల కోసం ప్రారంభించబడింది మరియు పోగో, స్టార్ వరల్డ్, సిఎన్‌బిసిలో టీవీ షోలను కలిగి ఉంది. , మరియు ET నౌ. అతను ఈస్ట్ ఇండియా కామెడీని కూడా స్థాపించాడు, ఇది భారతదేశంలో అత్యంత రద్దీగా ఉండే హాస్య సంస్థ, ఇది EIC ఔట్రేజ్ మరియు EIC vs బాలీవుడ్ వంటి షోలతో 115 మిలియన్ యూట్యూబ్ వీక్షణలను సంపాదించుకుంది.\n\nమరియు ఇవన్నీ సరిపోకపోతే, అతను మూడు నవలలను కూడా విడుదల చేశాడు - ది వెడ్నెడ సోల్, అండర్ ఢిల్లీ మరియు పవన్.",
        ba: "ওয়েন ব্র্যাডির রাসেল পিটার্সের পরে, সম্প্রতি দ্বিতীয় সবচেয়ে উজ্জ্বল ভারতীয় কৌতুক অভিনেতা হিসাবে বর্ণনা করা হয়েছে, সোরভ পান্ট হলেন ভারতের শীর্ষস্থানীয় কৌতুক অভিনেতাদের মধ্যে একজন, যে ধরনের শক্তির শেষ ড্রপ এবং গ্লুকন-ডি আপনাকে হাসাতে পারে। সোরভ 15টি দেশের 60টি শহরে 1000টির বেশি শো করেছে, সেইসাথে 300টিরও বেশি কর্পোরেট শো করেছে।\n\nজ্যানি কমিকটি রব স্নাইডার (ইউ ডোন্ট মেস উইথ দ্য জোহান, ডিউস বিগালো) এবং ওয়েন ব্র্যাডি (হোজ লাইন ইজ ইট অ্যানিওয়ে?, ওয়েন ব্র্যাডি শো) এর মতো আন্তর্জাতিক বড়দের জন্য উন্মুক্ত হয়েছে এবং পোগো, স্টার ওয়ার্ল্ড, সিএনবিসিতে টিভি শো করেছে। , এবং ET Now। তিনি ইস্ট ইন্ডিয়া কমেডিও প্রতিষ্ঠা করেন, ভারতের ব্যস্ততম কমেডি কোম্পানি, যেটি EIC আউট্রাজ এবং EIC বনাম বলিউডের মতো শো সহ 115 মিলিয়ন ইউটিউব ভিউ সংগ্রহ করেছে।\n\nএবং যদি এই সবই যথেষ্ট না হয় তবে তিনি তিনটি উপন্যাসও প্রকাশ করেছেন - দ্য ওয়েডেনডে সোল, আন্ডার দিল্লি এবং পবন।",
        or: "ୱେନ ବ୍ରାଡିଙ୍କ ଦ୍ୱାରା ରସେଲ ପିଟର୍ସଙ୍କ ପରେ ନିକଟରେ ଦେଖାଯାଇଥିବା ଦ୍ୱିତୀୟ ଉଜ୍ଜ୍ୱଳ ଭାରତୀୟ ହାସ୍ୟ ଅଭିନେତା ଆଇଭ୍ ଭାବରେ ବର୍ଣ୍ଣନା କରାଯାଇଛି, ସୋରେବ ପନ୍ତ ଇଣ୍ଡିଆର ଅଗ୍ରଣୀ ହାସ୍ୟ ଅଭିନେତାମାନଙ୍କ ମଧ୍ୟରୁ ଅନ୍ୟତମ, ଯାହା ଆପଣଙ୍କୁ ହସାଇବା ପାଇଁ ଶେଷ ଡ୍ରପ୍ ଶକ୍ତି ଏବଂ ଗ୍ଲୁକନ୍-ଡି ଖର୍ଚ୍ଚ କରିଥାଏ | ସୋରାବ 15 ଟି ଦେଶର 60 ଟି ସହରରେ 1000 ରୁ ଅଧିକ ଶୋ ’କରିବା ସହିତ 300+ କର୍ପୋରେଟ୍ ସୋ ମଧ୍ୟ କରିଛନ୍ତି।\n\nଜାନି ବ୍ୟଙ୍ଗ ରବି ସ୍ନାଇଡର୍ (ତୁମେ ଜୋହାନ୍, ଡ୍ୟୁସ୍ ବିଗାଲୋ) ଏବଂ ୱେନ ବ୍ରାଡି (ୱେନ୍ ବ୍ରାଡି ଶୋ) ଭଳି ଆନ୍ତର୍ଜାତୀୟ ବିଗ୍ ପାଇଁ ଖୋଲିଛି ଏବଂ ପୋଗୋ, ଷ୍ଟାର୍ ୱାର୍ଲ୍ଡ, CNBC ରେ ଟିଭି ଶୋ ’କରିଛି | , ଏବଂ ET ବର୍ତ୍ତମାନ | ସେ ଇଷ୍ଟ ଇଣ୍ଡିଆ କମେଡି, ଇଣ୍ଡିଆସ୍ ବ୍ୟସ୍ତବହୁଳ କମେଡି କମ୍ପାନୀ ମଧ୍ୟ ପ୍ରତିଷ୍ଠା କରିଥିଲେ, ଯାହା EIC Outrage ଏବଂ EIC ବନାମ ବଲିଉଡ ଭଳି ଶୋ ସହିତ 115 ମିଲିୟନ୍ ୟୁଟ୍ୟୁବ୍ ଭ୍ୟୁକୁ ର୍ୟାକ୍ କରିଛି |\n\nଏବଂ ଯଦି ଏସବୁ ଯଥେଷ୍ଟ ନଥିଲା, ତେବେ ସେ ତିନୋଟି ଉପନ୍ୟାସ ମଧ୍ୟ ପ୍ରକାଶ କରିଛନ୍ତି - ଦି ବୁଧବାର ପ୍ରାଣ, ଦିଲ୍ଲୀ ଏବଂ ପୱାନ୍ |",
        mr: "वेन ब्रॅडीच्या रसेल पीटर्स नंतर, मी पाहिलेला दुसरा सर्वात हुशार भारतीय विनोदी अभिनेता म्हणून अलीकडेच वर्णन केलेले, सोरभ पंत हा भारतातील आघाडीच्या विनोदी कलाकारांपैकी एक आहे, जो ऊर्जाचा शेवटचा थेंब घालवणारा आणि ग्लुकॉन-डी तुम्हाला हसवणारा आहे. सोरभने 15 देशांमधील 60 शहरांमध्ये 1000 हून अधिक शो तसेच 300+ कॉर्पोरेट शो केले आहेत.\n\nरॉब श्नाइडर (यू डोन्ट मेस विथ द झोहान, ड्यूस बिगालो) आणि वेन ब्रॅडी (व्होज लाइन इज इज इट एनीवे?, वेन ब्रॅडी शो) यांसारख्या आंतरराष्ट्रीय बड्या लोकांसाठी झॅनी कॉमिक उघडले आहे आणि पोगो, स्टार वर्ल्ड, सीएनबीसीवर त्याचे टीव्ही शो आहेत. , आणि ET Now. त्यांनी ईस्ट इंडिया कॉमेडी, भारतातील सर्वात व्यस्त कॉमेडी कंपनीची स्थापना देखील केली, ज्याने EIC आक्रोश आणि EIC vs बॉलिवुड सारख्या शोसह 115 दशलक्ष YouTube दृश्ये मिळविली आहेत.\n\nआणि हे सर्व पुरेसे नसल्यास, त्याने तीन कादंबऱ्याही प्रसिद्ध केल्या आहेत - द वेनडे सोल, अंडर दिल्ली आणि पवन.",
        kn: "ನಾನು ನೋಡಿದ ಎರಡನೇ ಅತ್ಯಂತ ಅದ್ಭುತ ಭಾರತೀಯ ಹಾಸ್ಯನಟ ಎಂದು ಇತ್ತೀಚೆಗೆ ವಿವರಿಸಲಾಗಿದೆ, ವೇಯ್ನ್ ಬ್ರಾಡಿ ಅವರಿಂದ ರಸೆಲ್ ಪೀಟರ್ಸ್ ನಂತರ, ಸೊರಭ್ ಪಂತ್ ಭಾರತದ ಪ್ರಮುಖ ಹಾಸ್ಯನಟರಲ್ಲಿ ಒಬ್ಬರು, ಕೊನೆಯ ಹನಿ ಶಕ್ತಿಯನ್ನು ವ್ಯಯಿಸುವ ಮತ್ತು ನಿಮ್ಮನ್ನು ನಗಿಸಲು ಗ್ಲುಕಾನ್-ಡಿ. ಸೊರಭ್ 15 ದೇಶಗಳಲ್ಲಿ 60 ನಗರಗಳಲ್ಲಿ 1000 ಕ್ಕೂ ಹೆಚ್ಚು ಪ್ರದರ್ಶನಗಳನ್ನು ಮಾಡಿದ್ದಾರೆ, ಜೊತೆಗೆ 300+ ಕಾರ್ಪೊರೇಟ್ ಶೋಗಳನ್ನು ಮಾಡಿದ್ದಾರೆ.\n\nರಾಬ್ ಷ್ನೇಯ್ಡರ್ (ಯು ಡೋಂಟ್ ಮೆಸ್ ವಿತ್ ದಿ ಜೊಹಾನ್, ಡ್ಯೂಸ್ ಬಿಗಾಲೊ) ಮತ್ತು ವೇಯ್ನ್ ಬ್ರಾಡಿ (ಯಾರ ಲೈನ್ ಇಸ್ ಇಟ್ ಏನ್ ವೇನ್ ಬ್ರಾಡಿ ಶೋ) ನಂತಹ ಅಂತರಾಷ್ಟ್ರೀಯ ದೊಡ್ಡವರಿಗಾಗಿ ಝನಿ ಕಾಮಿಕ್ ತೆರೆಯಲಾಗಿದೆ ಮತ್ತು ಪೋಗೊ, ಸ್ಟಾರ್ ವರ್ಲ್ಡ್, ಸಿಎನ್‌ಬಿಸಿಯಲ್ಲಿ ಟಿವಿ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಹೊಂದಿದೆ. , ಮತ್ತು ET ನೌ. ಅವರು ಈಸ್ಟ್ ಇಂಡಿಯಾ ಕಾಮಿಡಿ, ಭಾರತದ ಅತ್ಯಂತ ಜನನಿಬಿಡ ಹಾಸ್ಯ ಕಂಪನಿಯನ್ನು ಸ್ಥಾಪಿಸಿದರು, ಇದು EIC ಔಟ್ರೇಜ್ ಮತ್ತು EIC vs ಬಾಲಿವುಡ್‌ನಂತಹ ಪ್ರದರ್ಶನಗಳೊಂದಿಗೆ 115 ಮಿಲಿಯನ್ YouTube ವೀಕ್ಷಣೆಗಳನ್ನು ಗಳಿಸಿದೆ.\n\nಮತ್ತು ಇದೆಲ್ಲವೂ ಸಾಕಾಗದಿದ್ದರೆ, ಅವರು ಮೂರು ಕಾದಂಬರಿಗಳನ್ನು ಸಹ ಬಿಡುಗಡೆ ಮಾಡಿದ್ದಾರೆ - ಬುಧವಾರ ಸೋಲ್, ಅಂಡರ್ ದೆಹಲಿ ಮತ್ತು ಪವನ್.",
        bh: "हाल ही में वेन ब्रैडी के रसेल पीटर्स के बाद दूसरा सबसे शानदार भारतीय हास्य अभिनेता के रूप में बतावल गईल सोराभ पंत भारत के प्रमुख हास्य कलाकारन में से एक हउवें, ऊर्जा के आखिरी बूंद आ ग्लूकॉन-डी खर्च करे वाला तरह के हंसावे खातिर। सोरभ 15 देशन के 60 शहरन में 1000 से अधिका शो कइले बाड़न, साथही 300 गो कॉरपोरेट शो भी कइले बाड़न.\n\nई ज़ेनी कॉमिक रोब श्नाइडर (यू डोंट मेस विद द ज़ोहान, ड्यूस बिगालो) आ वेन ब्रैडी (हूज लाइन इज इट एनीवे?, वेन जइसन अंतर्राष्ट्रीय बिग्गी लोग खातिर खुलल बा",
        mai: "हाल ही म॑ वेन ब्रैडी द्वारा रसेल पीटर्स के बाद दोसरऽ सबसें शानदार भारतीय हास्य अभिनेता के रूप म॑ वर्णित करलऽ गेलऽ सोराभ पंत भारत केरऽ प्रमुख हास्य कलाकारऽ म॑ स॑ एक छै, जे तरह के ऊर्जा के आखिरी बूंद आरू ग्लूकॉन-डी खर्च करी क॑ आपने क॑ हँसाबै छै । सोराभ 15 देश के 60 शहर में 1000 स बेसी शो केने छथि, संगहि 300 कॉरपोरेट शो सेहो केने छथि।\n\nजेनी कॉमिक रोब श्नाइडर (यू डोंट मेस विद द ज़ोहान, ड्यूस बिगालो) आ वेन ब्रैडी (हूज लाइन इज इट एनीवे?, वेन सन अंतरराष्ट्रीय बिग्गी के लेल खुलल अछि",
        gu: "વેઇન બ્રેડી દ્વારા રસેલ પીટર્સ પછી, મેં જોયેલા બીજા સૌથી તેજસ્વી ભારતીય હાસ્ય કલાકાર તરીકે તાજેતરમાં વર્ણવેલ, સોરભ પંત એ ભારતના અગ્રણી હાસ્ય કલાકારોમાંના એક છે, જે તમને હસાવવા માટે ઊર્જાના છેલ્લા ટીપાં અને ગ્લુકોન-ડી ખર્ચવા માટેનો પ્રકાર છે. સોરભે 15 દેશોના 60 શહેરોમાં 1000 થી વધુ શો તેમજ 300+ કોર્પોરેટ શો કર્યા છે.\n\nરોબ સ્નેઇડર (યુ ડોન્ટ મેસ વિથ ધ ઝોહાન, ડ્યુસ બિગાલો) અને વેઇન બ્રેડી (કોની લાઇન ઇઝ ઇટ એનીવે?, વેઇન બ્રેડી શો) જેવા આંતરરાષ્ટ્રીય દિગ્ગજો માટે ઝની કોમિક ખુલ્યું છે અને પોગો, સ્ટાર વર્લ્ડ, સીએનબીસી પર ટીવી શો કર્યા છે. , અને ET Now. તેણે ઈસ્ટ ઈન્ડિયા કોમેડી, ભારતની સૌથી વ્યસ્ત કોમેડી કંપનીની પણ સ્થાપના કરી, જેણે EIC આઉટ્રેજ અને EIC vs બોલિવૂડ જેવા શો સાથે 115 મિલિયન YouTube વ્યૂઝ મેળવ્યા છે.\n\nઅને જો આ બધું પૂરતું ન હતું, તો તેણે ત્રણ નવલકથાઓ પણ બહાર પાડી છે - ધ વેનડે સોલ, અંડર દિલ્હી અને પવન.",
      },
      reactionCount: 3305,
      reactions: {
        laugh: 2359,
        neutral: 567,
        sad: 379,
      },
    },
  },
  {
    id: "1d1dc6bd-a5f7-4252-82c8-235ac2ccfccd",
    ordering: 9,
    displayName: "",
    firstName: "naveensingh",
    lastName: "",
    likeCount: 0,
    playCount: 0,
    viewCount: 0,
    followers: 1964,
    description:
      "Naveen Singh, popularly known as Bihari Ladka , is a 29-year-old comedian and digital content creator hailing from Bihar, India. He is recognized for his comedy content, which has earned him a significant following on Instagram, with over 2.2 million followers. ",
    duration: 0,
    thumbnail:
      "https://d35f5vastl4boc.cloudfront.net/profileImage/Naveen_singh.png",
    url: "https://d35f5vastl4boc.cloudfront.net/profileImage/Naveen_singh.png",
    assetId: "1d1dc6bd-a5f7-4252-82c8-235ac2ccfccd",
    contentType: "",
    bannerUrl:
      "https://d35f5vastl4boc.cloudfront.net/profileImage/Naveen_singh.png",
    pristine_image: "",
    profile: {
      _id: "1d1dc6bd-a5f7-4252-82c8-235ac2ccfccd",
      userId: "1d1dc6bd-a5f7-4252-82c8-235ac2ccfccd",
      fullName: "Naveen Singh",
      userName: "naveensingh",
      email: "naveensingh@hww.com",
      description:
        "Naveen Singh, popularly known as Bihari Ladka , is a 29-year-old comedian and digital content creator hailing from Bihar, India. He is recognized for his comedy content, which has earned him a significant following on Instagram, with over 2.2 million followers. ",
      status: "ACTIVE",
      profileImageUrl:
        "https://d35f5vastl4boc.cloudfront.net/profileImage/Naveen_singh.png",
      followersCount: 1964,
      followingCount: 0,
      videoCount: 0,
      shareCount: 0,
      likeCount: 0,
      commentCount: 0,
      bookmarkCount: 0,
      backgroundImage:
        "https://d35f5vastl4boc.cloudfront.net/profileImage/Naveen_singh.png",
      localisedFullName: {
        en: "Naveen Singh",
        hi: "नवीन सिंह",
        ta: "நவீன் சிங்",
        te: "నవీన్ సింగ్",
        ba: "নবীন সিং",
        or: "ନବୀନ ସିଂ",
        mr: "नवीन सिंग",
        kn: "ನವೀನ್ ಸಿಂಗ್",
        bh: "नवीन सिंह के ह",
        mai: "नवीन सिंह",
        gu: "નવીન સિંહ",
      },
      localisedDescription: {
        en: "Naveen Singh, popularly known as Bihari Ladka , is a 29-year-old comedian and digital content creator hailing from Bihar, India. He is recognized for his comedy content, which has earned him a significant following on Instagram, with over 2.2 million followers. ",
        hi: "बिहारी लड़का के नाम से विख्यात नवीन सिंह, भारत के बिहार के रहने वाले 29 वर्षीय हास्य अभिनेता और डिजिटल कंटेंट क्रिएटर हैं। वह अपने कॉमेडी कंटेंट के लिए पहचाने जाते हैं, जिससे उन्हें इंस्टाग्राम पर 2.2 मिलियन से अधिक फॉलोअर्स के साथ अच्छी खासी संख्या में फॉलोअर्स मिले हैं।",
        ta: "பிஹாரி லட்கா என்று பிரபலமாக அறியப்படும் நவீன் சிங், இந்தியாவின் பீகாரைச் சேர்ந்த 29 வயதான நகைச்சுவை நடிகர் மற்றும் டிஜிட்டல் உள்ளடக்கத்தை உருவாக்குபவர். அவர் தனது நகைச்சுவை உள்ளடக்கத்திற்காக அங்கீகரிக்கப்பட்டவர், இது அவருக்கு Instagram இல் குறிப்பிடத்தக்க பின்தொடர்பவர்களைப் பெற்றது, 2.2 மில்லியனுக்கும் அதிகமான பின்தொடர்பவர்களுடன்.",
        te: "బీహారీ లడ్కాగా ప్రసిద్ధి చెందిన నవీన్ సింగ్, భారతదేశంలోని బీహార్‌కు చెందిన 29 ఏళ్ల హాస్యనటుడు మరియు డిజిటల్ కంటెంట్ సృష్టికర్త. అతను తన కామెడీ కంటెంట్‌కు గుర్తింపు పొందాడు, ఇది అతనికి ఇన్‌స్టాగ్రామ్‌లో 2.2 మిలియన్లకు పైగా అనుచరులతో గణనీయమైన అనుచరులను సంపాదించింది.",
        ba: "নবীন সিং, বিহারী লাডকা নামে পরিচিত, একজন ২৯ বছর বয়সী কমেডিয়ান এবং ডিজিটাল কন্টেন্ট স্রষ্টা যিনি ভারতের বিহার থেকে এসেছেন। তিনি তার কমেডি বিষয়বস্তুর জন্য স্বীকৃত, যা তাকে 2.2 মিলিয়নেরও বেশি অনুসরণকারী সহ Instagram-এ একটি উল্লেখযোগ্য অনুসরণ করেছে।",
        or: "ବିହାରୀ ଲଡ୍କା ଭାବରେ ଜଣାଶୁଣା ନବୀନ ସିଂ ଜଣେ 29 ବର୍ଷ ବୟସ୍କା ହାସ୍ୟ ଅଭିନେତା ତଥା ଡିଜିଟାଲ୍ ବିଷୟବସ୍ତୁ ନିର୍ମାତା, ଯାହା ବିହାରର ଭାରତରୁ ଆସିଛି। ତାଙ୍କର କମେଡି ବିଷୟବସ୍ତୁ ପାଇଁ ସେ ସ୍ୱୀକୃତିପ୍ରାପ୍ତ, ଯାହା ତାଙ୍କୁ ଇନଷ୍ଟାଗ୍ରାମରେ 2.2 ନିୟୁତରୁ ଅଧିକ ଅନୁସରଣକାରୀଙ୍କ ସହ ଏକ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ଅନୁସରଣ କରିପାରିଛି |",
        mr: "नवीन सिंग, ज्यांना बिहारी लडका म्हणून ओळखले जाते, ते बिहार, भारतातील 29 वर्षीय विनोदकार आणि डिजिटल सामग्री निर्माता आहेत. तो त्याच्या विनोदी सामग्रीसाठी ओळखला जातो, ज्याने त्याला इंस्टाग्रामवर 2.2 दशलक्षाहून अधिक फॉलोअर्ससह लक्षणीय फॉलोअर्स मिळवून दिले आहेत.",
        kn: "ಬಿಹಾರಿ ಲಡ್ಕಾ ಎಂದು ಜನಪ್ರಿಯವಾಗಿ ಕರೆಯಲ್ಪಡುವ ನವೀನ್ ಸಿಂಗ್, ಭಾರತದ ಬಿಹಾರದಿಂದ ಬಂದಿರುವ 29 ವರ್ಷದ ಹಾಸ್ಯನಟ ಮತ್ತು ಡಿಜಿಟಲ್ ವಿಷಯ ರಚನೆಕಾರರಾಗಿದ್ದಾರೆ. ಅವರ ಹಾಸ್ಯ ವಿಷಯಕ್ಕಾಗಿ ಅವರು ಗುರುತಿಸಲ್ಪಟ್ಟಿದ್ದಾರೆ, ಇದು Instagram ನಲ್ಲಿ 2.2 ಮಿಲಿಯನ್‌ಗಿಂತಲೂ ಹೆಚ್ಚು ಅನುಯಾಯಿಗಳೊಂದಿಗೆ ಗಮನಾರ್ಹವಾದ ಅನುಸರಣೆಯನ್ನು ಗಳಿಸಿದೆ.",
        bh: "नवीन सिंह, जेकरा के लोकप्रिय रूप से बिहारी लडका के नाम से जानल जाला, भारत के बिहार के रहे वाला 29 साल के कॉमेडियन अवुरी डिजिटल कंटेंट क्रिएटर हवे। इनके कॉमेडी कंटेंट खातिर पहिचानल जाला, जेकरा चलते इनके इंस्टाग्राम पर काफी फॉलोअर्स मिलल बा आ इनके 22 लाख से ढेर फॉलोअर्स बाड़ें।",
        mai: "नवीन सिंह, जे लोकप्रिय रूप स बिहारी लडका क नाम स जानल जाइत छथि , भारत क बिहार स रहनिहार 29 वर्षीय हास्य अभिनेता आ डिजिटल कंटेंट क्रिएटर छथि। हुनका अपनऽ कॉमेडी कंटेंट लेली पहचानलऽ जाय छै, जेकरा स॑ हुनका इंस्टाग्राम प॑ काफी फॉलोअर्स मिललऽ छै, जेकरऽ फॉलोअर्स २२ लाख स॑ भी अधिक छै ।",
        gu: "નવીન સિંઘ, બિહારી લડકા તરીકે પ્રખ્યાત છે, તે 29 વર્ષીય કોમેડિયન અને ડિજિટલ કન્ટેન્ટ સર્જક છે જે બિહાર, ભારતના વતની છે. તે તેની કોમેડી સામગ્રી માટે ઓળખાય છે, જેણે તેને 2.2 મિલિયનથી વધુ અનુયાયીઓ સાથે, Instagram પર નોંધપાત્ર ફોલોઅર્સ મેળવ્યા છે.",
      },
      reactionCount: 794,
      reactions: {
        laugh: 565,
        neutral: 134,
        sad: 95,
      },
    },
  },
  {
    id: "3830fe73-cef6-4701-8a91-f31d49f0c9a0",
    ordering: 10,
    displayName: "",
    firstName: "niranjanmondal",
    lastName: "",
    likeCount: 0,
    playCount: 0,
    viewCount: 0,
    followers: 1102,
    description:
      "\"Niranjan Mondal, popularly known as Laughtersane, is a dynamic content creator hailing from the vibrant city of Kolkata. With an innate talent for tickling funny bones, he has carved a niche for himself in the digital entertainment sphere with his uproarious comedy sketches, impeccable character portrayals, and content that strikes a chord with audiences across the board.\n\nDrawing inspiration from everyday life, Niranjan infuses his sketches with relatable humor, making his content not just entertaining but also deeply resonant. His ability to embody various personas and bring them to life on screen has garnered him a dedicated following, who eagerly await his next comedic masterpiece. Beyond his prowess in comedy, Niranjan has also showcased his versatility by venturing into the realm of music videos in Bengal. Collaborating with local talents, he has lent his unique flair to these projects, adding a touch of humor and charm that sets them apart.\n\nBorn and raised in Kolkata, Niranjan's roots run deep in the cultural fabric of the city, and he draws inspiration from its rich tapestry of traditions, quirks, and idiosyncrasies. His comedy reflects the essence of Kolkata, capturing its essence with a blend of wit and warmth that resonates with audiences far and wide.\n\nAs Laughtersane, Niranjan has become a household name, spreading joy and laughter to all who encounter his work. With his infectious energy and boundless creativity, he continues to push the boundaries of comedy, leaving an indelible mark on the digital landscape. Whether he's donning different hats in his sketches or bringing characters to life with his comedic genius, Niranjan Mondal remains a force to be reckoned with in the world of content creation.\"\n",
    duration: 0,
    thumbnail:
      "https://d35f5vastl4boc.cloudfront.net/profileImage/Niranjan_mondal.png",
    url: "https://d35f5vastl4boc.cloudfront.net/profileImage/Niranjan_mondal.png",
    assetId: "3830fe73-cef6-4701-8a91-f31d49f0c9a0",
    contentType: "",
    bannerUrl:
      "https://d35f5vastl4boc.cloudfront.net/profileImage/Niranjan_mondal.png",
    pristine_image: "",
    profile: {
      _id: "3830fe73-cef6-4701-8a91-f31d49f0c9a0",
      userId: "3830fe73-cef6-4701-8a91-f31d49f0c9a0",
      fullName: "Niranjan Mondal",
      userName: "niranjanmondal",
      email: "niranjanmondal@hww.com",
      description:
        "\"Niranjan Mondal, popularly known as Laughtersane, is a dynamic content creator hailing from the vibrant city of Kolkata. With an innate talent for tickling funny bones, he has carved a niche for himself in the digital entertainment sphere with his uproarious comedy sketches, impeccable character portrayals, and content that strikes a chord with audiences across the board.\n\nDrawing inspiration from everyday life, Niranjan infuses his sketches with relatable humor, making his content not just entertaining but also deeply resonant. His ability to embody various personas and bring them to life on screen has garnered him a dedicated following, who eagerly await his next comedic masterpiece. Beyond his prowess in comedy, Niranjan has also showcased his versatility by venturing into the realm of music videos in Bengal. Collaborating with local talents, he has lent his unique flair to these projects, adding a touch of humor and charm that sets them apart.\n\nBorn and raised in Kolkata, Niranjan's roots run deep in the cultural fabric of the city, and he draws inspiration from its rich tapestry of traditions, quirks, and idiosyncrasies. His comedy reflects the essence of Kolkata, capturing its essence with a blend of wit and warmth that resonates with audiences far and wide.\n\nAs Laughtersane, Niranjan has become a household name, spreading joy and laughter to all who encounter his work. With his infectious energy and boundless creativity, he continues to push the boundaries of comedy, leaving an indelible mark on the digital landscape. Whether he's donning different hats in his sketches or bringing characters to life with his comedic genius, Niranjan Mondal remains a force to be reckoned with in the world of content creation.\"\n",
      status: "ACTIVE",
      profileImageUrl:
        "https://d35f5vastl4boc.cloudfront.net/profileImage/Niranjan_mondal.png",
      followersCount: 1102,
      followingCount: 0,
      videoCount: 0,
      shareCount: 0,
      likeCount: 0,
      commentCount: 0,
      bookmarkCount: 0,
      backgroundImage:
        "https://d35f5vastl4boc.cloudfront.net/profileImage/Niranjan_mondal.png",
      localisedFullName: {
        en: "Niranjan Mondal",
        hi: "निरंजन मंडल",
        ta: "நிரஞ்சன் மோண்டல்",
        te: "నిరంజన్ మోండల్",
        ba: "নিরঞ্জন মন্ডল",
        or: "ନିରଂଜନ ମୋଣ୍ଡାଲ |",
        mr: "निरंजन मंडल",
        kn: "ನಿರಂಜನ್ ಮೊಂಡಲ್",
        bh: "निरंजन मोंडल के ह",
        mai: "निरंजन मोंडल",
        gu: "નિરંજન મંડલ",
      },
      localisedDescription: {
        en: "\"Niranjan Mondal, popularly known as Laughtersane, is a dynamic content creator hailing from the vibrant city of Kolkata. With an innate talent for tickling funny bones, he has carved a niche for himself in the digital entertainment sphere with his uproarious comedy sketches, impeccable character portrayals, and content that strikes a chord with audiences across the board.\n\nDrawing inspiration from everyday life, Niranjan infuses his sketches with relatable humor, making his content not just entertaining but also deeply resonant. His ability to embody various personas and bring them to life on screen has garnered him a dedicated following, who eagerly await his next comedic masterpiece. Beyond his prowess in comedy, Niranjan has also showcased his versatility by venturing into the realm of music videos in Bengal. Collaborating with local talents, he has lent his unique flair to these projects, adding a touch of humor and charm that sets them apart.\n\nBorn and raised in Kolkata, Niranjan's roots run deep in the cultural fabric of the city, and he draws inspiration from its rich tapestry of traditions, quirks, and idiosyncrasies. His comedy reflects the essence of Kolkata, capturing its essence with a blend of wit and warmth that resonates with audiences far and wide.\n\nAs Laughtersane, Niranjan has become a household name, spreading joy and laughter to all who encounter his work. With his infectious energy and boundless creativity, he continues to push the boundaries of comedy, leaving an indelible mark on the digital landscape. Whether he's donning different hats in his sketches or bringing characters to life with his comedic genius, Niranjan Mondal remains a force to be reckoned with in the world of content creation.\"\n",
        hi: '"लाफ्टर्सेन के नाम से मशहूर निरंजन मंडल, कोलकाता के हल चल वाले जिन्दा शहर से आने वाले एक डायनामिक कंटेंट क्रिएटर हैं। हँसी से गुदगुदाने की जन्मजात प्रतिभा के साथ, उन्होंने अपने शानदार कॉमेडी स्केच, त्रुटिहीन के साथ डिजिटल मनोरंजन क्षेत्र में अपने लिए एक जगह बनाई है। चरित्र चित्रण, और कंटेंट जो बोर्ड भर के दर्शकों के साथ तालमेल बिठाती है।\n\nरोजमर्रा की जिंदगी से प्रेरणा लेते हुए, निरंजन अपने रेखाचित्रों को प्रासंगिक हास्य से भर देते हैं, जिससे उनकी कंटेंट न केवल मनोरंजक बन जाती है, बल्कि गहराई से गुंजायमान भी हो जाती है। विभिन्न व्यक्तित्वों को मूर्त रूप देने और उन्हें पर्दे पर जीवंत करने की उनकी क्षमता ने उन्हें एक समर्पित फोल्लोवेर्स दिया है, जो उनकी अगली हास्य कृति का बेसब्री से इंतजार करते हैं। कॉमेडी में अपने कौशल के अलावा, निरंजन ने बंगाल में संगीत वीडियो के क्षेत्र में भी कदम रखकर अपनी बहुमुखी प्रतिभा का प्रदर्शन किया है। स्थानीय प्रतिभाओं के साथ सहयोग करते हुए, उन्होंने इन परियोजनाओं में अपनी अनूठी प्रतिभा का इस्तेमाल किया है, हास्य और आकर्षण का एक स्पर्श जोड़ा है जो उन्हें अलग करता है।\n\nकोलकाता में जन्मे और पले-बढ़े, निरंजन की जड़ें शहर के सांस्कृतिक ताने-बाने में गहरी हैं, और वह इसकी परंपराओं, विचित्रताओं और विशिष्टताओं की समृद्ध टेपेस्ट्री से प्रेरणा लेते हैं। उनकी कॉमेडी कोलकाता के सार को दर्शाती है, बुद्धि और गर्मजोशी के मिश्रण के साथ इसके सार को पकड़ती है जो दूर-दूर के दर्शकों को पसंद आती है।\n\nलाफ्टरसेन के रूप में, निरंजन एक घरेलू नाम बन गया है, जो उसके काम का सामना करने वाले सभी लोगों में खुशी और हँसी फैला रहा है। अपनी संक्रामक ऊर्जा और असीमित रचनात्मकता के साथ, वह कॉमेडी की सीमाओं को आगे बढ़ाते हुए डिजिटल परिदृश्य पर एक अमिट छाप छोड़ रहे हैं। चाहे वह अपने रेखाचित्रों में अलग-अलग भूमिकाएँ निभा रहे हों या अपनी हास्य प्रतिभा से पात्रों को जीवंत कर रहे हों, निरंजन मंडल कंटेंट निर्माण की दुनिया में एक ताकत बने हुए हैं।"\n',
        ta: '"Laughtersane என்று பிரபலமாக அறியப்படும் நிரஞ்சன் மொண்டல், துடிப்பான நகரமான கொல்கத்தாவைச் சேர்ந்த ஒரு ஆற்றல்மிக்க உள்ளடக்கத்தை உருவாக்குபவர். வேடிக்கையான எலும்புகளைக் கூச வைக்கும் உள்ளார்ந்த திறமையுடன், அவர் தனது ஆரவாரமான நகைச்சுவை ஓவியங்கள் மூலம் டிஜிட்டல் பொழுதுபோக்குத் துறையில் தனக்கென ஒரு முக்கிய இடத்தைப் பிடித்துள்ளார். பாத்திரச் சித்தரிப்புகள், மற்றும் உள்ளடக்கம் முழுவதுமுள்ள பார்வையாளர்களை ஈர்க்கும்.\n\nஅன்றாட வாழ்வில் இருந்து உத்வேகம் கொண்டு, நிரஞ்சன் தனது ஓவியங்களை நகைச்சுவையுடன் புகுத்துகிறார். பல்வேறு நபர்களை உள்ளடக்கி, அவற்றை திரையில் உயிர்ப்பிக்கும் அவரது திறமை அவருக்கு அர்ப்பணிப்புள்ள பின்தொடர்பவர்களைக் குவித்துள்ளது, அவர் தனது அடுத்த நகைச்சுவை தலைசிறந்த படைப்பை ஆவலுடன் எதிர்பார்க்கிறார். நகைச்சுவையில் தனது திறமைக்கு அப்பால், நிரஞ்சன் வங்காளத்தில் இசை வீடியோக்களின் சாம்ராஜ்யத்தில் நுழைந்ததன் மூலம் தனது பல்துறை திறனையும் வெளிப்படுத்தியுள்ளார். உள்ளூர் திறமைகளுடன் ஒத்துழைத்து, இந்த திட்டங்களுக்கு அவர் தனது தனித்துவமான திறனைக் கொடுத்தார், நகைச்சுவை மற்றும் கவர்ச்சியின் தொடுதலைச் சேர்த்தார்.\n\nகொல்கத்தாவில் பிறந்து வளர்ந்த நிரஞ்சனின் வேர்கள் நகரத்தின் கலாச்சாரத் துணியில் ஆழமாக ஓடுகின்றன, மேலும் அவர் பாரம்பரியங்கள், வினோதங்கள் மற்றும் தனித்தன்மைகள் ஆகியவற்றின் செழுமையான திரைச்சீலையிலிருந்து உத்வேகம் பெறுகிறார். அவரது நகைச்சுவை கொல்கத்தாவின் சாரத்தை பிரதிபலிக்கிறது, அதன் சாரத்தை புத்திசாலித்தனம் மற்றும் அரவணைப்பின் கலவையுடன் படம்பிடிக்கிறது, இது வெகு தொலைவில் உள்ள பார்வையாளர்களுடன் எதிரொலிக்கிறது.\n\nநிரஞ்சன் சிரிப்பாக, தனது வேலையைச் சந்திக்கும் அனைவருக்கும் மகிழ்ச்சியையும் சிரிப்பையும் பரப்பி, வீட்டுப் பெயராகிவிட்டார். அவரது தொற்று ஆற்றல் மற்றும் எல்லையற்ற படைப்பாற்றல் மூலம், அவர் டிஜிட்டல் நிலப்பரப்பில் ஒரு அழியாத அடையாளத்தை விட்டு, நகைச்சுவையின் எல்லைகளைத் தொடர்ந்து தள்ளுகிறார். அவர் தனது ஓவியங்களில் வித்தியாசமான தொப்பிகளை அணிந்திருந்தாலும் அல்லது அவரது நகைச்சுவை மேதையால் கதாபாத்திரங்களுக்கு உயிரூட்டினாலும், உள்ளடக்கத்தை உருவாக்கும் உலகில் நிரஞ்சன் மோண்டல் கணக்கிடப்பட வேண்டிய சக்தியாகவே இருக்கிறார்."',
        te: '"లాఫర్‌సేన్‌గా ప్రసిద్ధి చెందిన నిరంజన్ మొండల్, కోల్‌కతాలోని చైతన్యవంతమైన నగరానికి చెందిన డైనమిక్ కంటెంట్ సృష్టికర్త. ఫన్నీ బోన్స్‌లో చక్కిలిగింతలు పెట్టడంలో సహజమైన ప్రతిభతో, అతను తన కోలాహలమైన కామెడీ స్కెచ్‌లతో డిజిటల్ ఎంటర్‌టైన్‌మెంట్ రంగంలో తనకంటూ ఒక సముచిత స్థానాన్ని ఏర్పరచుకున్నాడు. పాత్ర చిత్రణలు మరియు మొత్తం ప్రేక్షకులను ఆకట్టుకునే కంటెంట్.\n\nదైనందిన జీవితం నుండి ప్రేరణ పొంది, నిరంజన్ తన స్కెచ్‌లను సాపేక్షమైన హాస్యంతో నింపాడు, అతని కంటెంట్ కేవలం వినోదాత్మకంగా మాత్రమే కాకుండా లోతుగా ప్రతిధ్వనిస్తుంది. వివిధ వ్యక్తులను రూపొందించడంలో మరియు వాటిని తెరపైకి తీసుకురావడంలో అతని సామర్థ్యం అతనికి అంకితమైన అనుచరులను సంపాదించింది, అతను తన తదుపరి హాస్య కళాఖండం కోసం ఆసక్తిగా ఎదురుచూస్తున్నాడు. కామెడీలో తన నైపుణ్యానికి మించి, బెంగాల్‌లో మ్యూజిక్ వీడియోల రంగంలోకి ప్రవేశించడం ద్వారా నిరంజన్ తన బహుముఖ ప్రజ్ఞను కూడా ప్రదర్శించాడు. స్థానిక ప్రతిభావంతులతో సహకరిస్తూ, అతను ఈ ప్రాజెక్ట్‌లకు తన ప్రత్యేక నైపుణ్యాన్ని అందించాడు, హాస్యం మరియు మనోజ్ఞతను జోడించాడు.\n\nకోల్‌కతాలో పుట్టి పెరిగిన, నిరంజన్ మూలాలు నగరం యొక్క సాంస్కృతిక ఫాబ్రిక్‌లో లోతుగా ఉన్నాయి మరియు అతను సంప్రదాయాలు, చమత్కారాలు మరియు ప్రత్యేకతలతో కూడిన దాని గొప్ప వస్త్రాల నుండి ప్రేరణ పొందాడు. అతని కామెడీ కోల్‌కతా యొక్క సారాన్ని ప్రతిబింబిస్తుంది, దాని సారాంశాన్ని తెలివి మరియు వెచ్చదనం యొక్క మిశ్రమంతో సంగ్రహిస్తుంది, ఇది చాలా దూరం ప్రేక్షకులతో ప్రతిధ్వనిస్తుంది.\n\nనవ్వులాటగా, నిరంజన్ తన పనిని ఎదుర్కొనే వారందరికీ ఆనందాన్ని మరియు నవ్వును పంచుతూ ఇంటి పేరుగా మారాడు. అతని అంటు శక్తి మరియు అపరిమితమైన సృజనాత్మకతతో, అతను డిజిటల్ ల్యాండ్‌స్కేప్‌లో చెరగని ముద్రను వదిలి, కామెడీ యొక్క సరిహద్దులను ముందుకు తెస్తూనే ఉన్నాడు. అతను తన స్కెచ్‌లలో విభిన్న టోపీలు ధరించినా లేదా తన హాస్య మేధావితో పాత్రలకు జీవం పోసినా, నిరంజన్ మోండల్ కంటెంట్ సృష్టి ప్రపంచంలో లెక్కించదగిన శక్తిగా మిగిలిపోయాడు."',
        ba: '"নিরঞ্জন মন্ডল, যিনি হাস্যরসনে নামে পরিচিত, তিনি কলকাতার প্রাণবন্ত শহর থেকে একজন গতিশীল বিষয়বস্তু নির্মাতা। মজার হাড়ের সুড়সুড়ি দেওয়ার জন্য একটি সহজাত প্রতিভার সাথে, তিনি তার উত্তেজনাপূর্ণ কমেডি স্কেচের মাধ্যমে ডিজিটাল বিনোদন ক্ষেত্রে নিজের জন্য একটি বিশেষ স্থান তৈরি করেছেন, অনবদ্য চরিত্র চিত্রণ, এবং বিষয়বস্তু যা বোর্ড জুড়ে শ্রোতাদের সাথে একটি জ্যা স্ট্রাইক করে।\n\nদৈনন্দিন জীবন থেকে অনুপ্রেরণা নিয়ে, নিরঞ্জন তার স্কেচগুলিকে সম্পর্কযুক্ত হাস্যরসের সাথে যুক্ত করে, তার বিষয়বস্তুকে কেবল বিনোদনই নয়, গভীরভাবে অনুরণিত করে তোলে। বিভিন্ন ব্যক্তিত্বকে মূর্ত করার এবং পর্দায় তাদের জীবন্ত করার ক্ষমতা তাকে একটি উত্সর্গীকৃত অনুসরণ করেছে, যারা তার পরবর্তী হাস্যরসাত্মক মাস্টারপিসের জন্য অধীর আগ্রহে অপেক্ষা করছে। কমেডিতে তার দক্ষতার বাইরে, নিরঞ্জন বাংলায় মিউজিক ভিডিওর জগতে প্রবেশ করে তার বহুমুখী প্রতিভা প্রদর্শন করেছেন। স্থানীয় প্রতিভাদের সাথে সহযোগিতা করে, তিনি এই প্রকল্পগুলিতে তার অনন্য ফ্লেয়ার দিয়েছেন, হাস্যরস এবং কবজ যোগ করেছেন যা তাদের আলাদা করে।\n\nকলকাতায় জন্মগ্রহণ ও বেড়ে ওঠা, নিরঞ্জনের শিকড় শহরের সাংস্কৃতিক কাঠামোর গভীরে ছড়িয়ে রয়েছে এবং তিনি এর ঐতিহ্য, অদ্ভুততা এবং বৈচিত্র্যের সমৃদ্ধ ট্যাপেস্ট্রি থেকে অনুপ্রেরণা পান। তার কমেডি কলকাতার সারমর্মকে প্রতিফলিত করে, এর সারমর্মকে বুদ্ধিমত্তা এবং উষ্ণতার মিশ্রণে ধারণ করে যা দূর-দূরান্তের দর্শকদের সাথে অনুরণিত হয়।\n\nলাফটারসেন হিসাবে, নিরঞ্জন একটি পরিবারের নাম হয়ে উঠেছে, যারা তার কাজের মুখোমুখি হয় তাদের সবার কাছে আনন্দ এবং হাসি ছড়িয়ে দেয়। তার সংক্রামক শক্তি এবং সীমাহীন সৃজনশীলতার সাথে, তিনি কমেডির সীমানা ঠেলে চলেছেন, ডিজিটাল ল্যান্ডস্কেপে একটি অমার্জনীয় চিহ্ন রেখে চলেছেন। সে তার স্কেচে বিভিন্ন হ্যাট দান করুক বা তার কৌতুক প্রতিভা দিয়ে চরিত্রগুলিকে প্রাণবন্ত করুক না কেন, নিরঞ্জন মন্ডল বিষয়বস্তু তৈরির জগতে গণনা করা একটি শক্তি হিসাবে রয়ে গেছে।"',
        or: '"ନିରଂଜନ ମୋଣ୍ଡାଲ, ଲାଉଟର୍ସାନେ ଭାବରେ ଜଣାଶୁଣା, କୋଲକାତାର ଜୀବନ୍ତ ସହରରୁ ଆସିଥିବା ଏକ ଗତିଶୀଳ ବିଷୟବସ୍ତୁ ସୃଷ୍ଟିକର୍ତ୍ତା | ମଜାଳିଆ ହାଡକୁ ଟିକ୍ କରିବା ପାଇଁ ଏକ ଅନ୍ତର୍ନିହିତ ପ୍ରତିଭା ସହିତ ସେ ନିଜର ଚିତ୍ତାକର୍ଷକ କମେଡି ସ୍କେଚ୍ ସହିତ ଡିଜିଟାଲ୍ ମନୋରଞ୍ଜନ କ୍ଷେତ୍ରରେ ଏକ ସ୍ଥାନ ଖୋଦେଇ କରିଛନ୍ତି | ଚରିତ୍ର ଚିତ୍ରଣ, ଏବଂ ବିଷୟବସ୍ତୁ ଯାହା ବୋର୍ଡରେ ଦର୍ଶକଙ୍କ ସହିତ ଏକ ଉତ୍ସାହ ସୃଷ୍ଟି କରେ |\n\nଦ day ନନ୍ଦିନ ଜୀବନରୁ ପ୍ରେରଣା ଆଙ୍କି, ନିରଂଜନ ତାଙ୍କ ସ୍କେଚଗୁଡ଼ିକୁ ପୁନ at ସମ୍ପର୍କୀୟ ହାସ୍ୟରସ ସହିତ ସଂକ୍ରମିତ କରନ୍ତି, ଯାହା ତାଙ୍କର ବିଷୟବସ୍ତୁକୁ କେବଳ ଚିତ୍ତାକର୍ଷକ ନୁହେଁ ବରଂ ଗଭୀର ଭାବରେ ପ୍ରତିଫଳିତ କରିଥାଏ | ବିଭିନ୍ନ ବ୍ୟକ୍ତିବିଶେଷଙ୍କୁ ପ୍ରତିପାଦିତ କରିବା ଏବଂ ସେମାନଙ୍କୁ ପରଦାରେ ଜୀବନ୍ତ କରିବାର କ୍ଷମତା ତାଙ୍କୁ ଏକ ଉତ୍ସର୍ଗୀକୃତ ଅନୁସରଣ କରିପାରିଛି, ଯିଏ ଉତ୍ସାହର ସହିତ ତାଙ୍କର ପରବର୍ତ୍ତୀ ହାସ୍ୟ ଅଭିନୟକୁ ଅପେକ୍ଷା କରିଛନ୍ତି | କମେଡିରେ ନିଜର ବୀରତ୍ୱର ବାହାରେ, ନିରଂଜନ ମଧ୍ୟ ବଙ୍ଗଳାର ମ୍ୟୁଜିକ୍ ଭିଡିଓ ପରିସରକୁ ଯାଇ ନିଜର ବହୁମୁଖୀତା ପ୍ରଦର୍ଶନ କରିଛନ୍ତି। ସ୍ଥାନୀୟ ପ୍ରତିଭାମାନଙ୍କ ସହ ସହଯୋଗ କରି ସେ ଏହି ପ୍ରୋଜେକ୍ଟଗୁଡିକରେ ତାଙ୍କର ଅନନ୍ୟ la ଣ ଦେଇଛନ୍ତି, ହାସ୍ୟରସ ଏବଂ ଆକର୍ଷଣର ସ୍ପର୍ଶ ଯୋଡି ସେମାନଙ୍କୁ ପୃଥକ କରେ |\n\nକୋଲକାତାରେ ଜନ୍ମଗ୍ରହଣ କରି ନିରଂଜନଙ୍କ ମୂଳ ସହରର ସାଂସ୍କୃତିକ କପଡ଼ାରେ ଗଭୀର ଭାବରେ ଚାଲିଥାଏ, ଏବଂ ସେ ପରମ୍ପରା, କ୍ୱିକ୍ସ ଏବଂ ଇଡିଓସିନ୍କ୍ରାସୀର ସମୃଦ୍ଧ ଟେପେଷ୍ଟ୍ରିରୁ ପ୍ରେରଣା ଆଣୁଥିଲେ | ତାଙ୍କର କମେଡି କୋଲକାତାର ଆଭିମୁଖ୍ୟକୁ ପ୍ରତିଫଳିତ କରେ, ଏହାର ମହତ୍ତ୍ wit କୁ ଚତୁରତା ଏବଂ ଉଷ୍ମତାର ମିଶ୍ରଣ ସହିତ କାବ୍ୟ କଲା ଯାହା ଦୂରଦୂରାନ୍ତରେ ଦର୍ଶକଙ୍କ ସହିତ ପୁନ on ପ୍ରତିରୂପିତ |\n\nହସଖୁସି ଭାବରେ, ନିରଂଜନ ଏକ ଘରୋଇ ନାମରେ ପରିଣତ ହୋଇଛନ୍ତି, ଯେଉଁମାନେ ତାଙ୍କ କାର୍ଯ୍ୟର ସମ୍ମୁଖୀନ ହୁଅନ୍ତି ସେମାନଙ୍କ ପାଇଁ ଆନନ୍ଦ ଏବଂ ହସ ବିସ୍ତାର କରନ୍ତି | ତାଙ୍କର ସଂକ୍ରାମକ ଶକ୍ତି ଏବଂ ସୀମାହୀନ ସୃଜନଶୀଳତା ସହିତ, ସେ ଡିଜିଟାଲ୍ ଦୃଶ୍ୟପଟରେ ଏକ ଅବିସ୍ମରଣୀୟ ଚିହ୍ନ ଛାଡି କମେଡିର ସୀମାକୁ ଆଗକୁ ବ continues ାଇବାରେ ଲାଗିଛନ୍ତି | ସେ ତାଙ୍କ ସ୍କେଚରେ ଭିନ୍ନ ଟୋପି ଦାନ କରୁଛନ୍ତି କିମ୍ବା ତାଙ୍କ ବ୍ୟଙ୍ଗାତ୍ମକ ପ୍ରତିଭା ସହିତ ଚରିତ୍ରମାନଙ୍କୁ ଜୀବନ୍ତ କରୁଛନ୍ତି, ନିରଂଜନ ମୋଣ୍ଡାଲ ବିଷୟବସ୍ତୁ ସୃଷ୍ଟି ଜଗତରେ ଗଣାଯିବାକୁ ଏକ ଶକ୍ତି ହୋଇ ରହିଛନ୍ତି |',
        mr: '"निरंजन मंडल, लाफ्टर्सने म्हणून ओळखले जाते, कोलकाता या दोलायमान शहरातून आलेले डायनॅमिक कंटेंट क्रिएटर आहेत. विनोदी हाडांना गुदगुल्या करण्याच्या उपजत प्रतिभेसह, त्यांनी आपल्या धमाल विनोदी स्केचेससह डिजिटल मनोरंजन क्षेत्रात स्वतःसाठी एक स्थान कोरले आहे, निर्दोष. चारित्र्य चित्रण, आणि आशय जो संपूर्ण मंडळातील प्रेक्षकांच्या जिवावर बसतो.\n\nदैनंदिन जीवनातून प्रेरणा घेऊन, निरंजन त्याच्या स्केचेस संबंधित विनोदाने तयार करतो, ज्यामुळे त्याचा आशय केवळ मनोरंजकच नाही तर खोलवर प्रतिध्वनीही असतो. विविध व्यक्तिरेखा साकारण्याच्या आणि त्यांना पडद्यावर जिवंत करण्याच्या त्याच्या क्षमतेमुळे त्याला समर्पित अनुयायी मिळाले आहेत, जे त्याच्या पुढील विनोदी उत्कृष्ट कृतीची आतुरतेने वाट पाहत आहेत. कॉमेडीमधील त्याच्या पराक्रमाच्या पलीकडे, निरंजनने बंगालमधील संगीत व्हिडिओंच्या क्षेत्रात प्रवेश करून त्याचे अष्टपैलुत्व देखील प्रदर्शित केले आहे. स्थानिक कलागुणांना सहकार्य करून, त्याने या प्रकल्पांना आपली अनोखी क्षमता दिली आहे, त्यात विनोद आणि आकर्षणाचा स्पर्श जोडून त्यांना वेगळे केले आहे.\n\nकोलकाता येथे जन्मलेल्या आणि वाढलेल्या निरंजनची मुळे शहराच्या सांस्कृतिक जडणघडणीत खोलवर रुजलेली आहेत आणि तो तेथील परंपरा, विचित्रता आणि वैशिष्टय़पूर्ण गोष्टींपासून प्रेरणा घेतो. त्याची कॉमेडी कोलकात्याचे सार प्रतिबिंबित करते, बुद्धी आणि उबदारपणाच्या मिश्रणाने त्याचे सार कॅप्चर करते जे दूरवरच्या प्रेक्षकांना प्रतिध्वनित करते.\n\nलाफ्टर्सने म्हणून, निरंजन हे घराघरात नाव बनले आहे, जे त्याच्या कामाचा सामना करतात त्यांना आनंद आणि हशा पसरवतात. त्याच्या संक्रामक उर्जेने आणि अमर्याद सर्जनशीलतेने, तो डिजिटल लँडस्केपवर अमिट छाप सोडत विनोदाच्या सीमा ओलांडत आहे. त्याने आपल्या स्केचमध्ये वेगवेगळ्या टोप्या घातल्या आहेत किंवा त्याच्या विनोदी प्रतिभेने पात्रांना जिवंत केले आहे, निरंजन मंडल सामग्री निर्मितीच्या जगात गणले जाणारे एक सामर्थ्य आहे."',
        kn: '"Laughtersane ಎಂದು ಜನಪ್ರಿಯವಾಗಿ ಕರೆಯಲ್ಪಡುವ ನಿರಂಜನ್ ಮೊಂಡಲ್, ಕೋಲ್ಕತ್ತಾದ ರೋಮಾಂಚಕ ನಗರದಿಂದ ಬಂದಿರುವ ಡೈನಾಮಿಕ್ ಕಂಟೆಂಟ್ ಕ್ರಿಯೇಟರ್ ಆಗಿದ್ದಾರೆ. ತಮಾಷೆಯ ಎಲುಬುಗಳಿಗೆ ಕಚಗುಳಿ ಇಡುವ ಸಹಜ ಪ್ರತಿಭೆಯೊಂದಿಗೆ, ಅವರು ತಮ್ಮ ಗದ್ದಲದ ಹಾಸ್ಯ ರೇಖಾಚಿತ್ರಗಳೊಂದಿಗೆ ಡಿಜಿಟಲ್ ಮನರಂಜನಾ ಕ್ಷೇತ್ರದಲ್ಲಿ ತನಗಾಗಿ ಒಂದು ಸ್ಥಾನವನ್ನು ಕೆತ್ತಿಕೊಂಡಿದ್ದಾರೆ, ನಿಷ್ಪಾಪ. ಪಾತ್ರದ ಚಿತ್ರಣಗಳು ಮತ್ತು ಬೋರ್ಡ್‌ನಾದ್ಯಂತ ಪ್ರೇಕ್ಷಕರೊಂದಿಗೆ ಸ್ವರಮೇಳವನ್ನು ಹೊಡೆಯುವ ವಿಷಯ.\n\nದೈನಂದಿನ ಜೀವನದಿಂದ ಸ್ಫೂರ್ತಿ ಪಡೆದ ನಿರಂಜನ್ ಅವರು ತಮ್ಮ ರೇಖಾಚಿತ್ರಗಳನ್ನು ಸಾಪೇಕ್ಷ ಹಾಸ್ಯದೊಂದಿಗೆ ತುಂಬುತ್ತಾರೆ, ಅವರ ವಿಷಯವು ಕೇವಲ ಮನರಂಜನೆ ಮಾತ್ರವಲ್ಲದೆ ಆಳವಾಗಿ ಪ್ರತಿಧ್ವನಿಸುತ್ತದೆ. ವಿವಿಧ ವ್ಯಕ್ತಿಗಳನ್ನು ಸಾಕಾರಗೊಳಿಸುವ ಮತ್ತು ಅವುಗಳನ್ನು ತೆರೆಯ ಮೇಲೆ ಜೀವಂತಗೊಳಿಸುವ ಅವರ ಸಾಮರ್ಥ್ಯವು ಅವರಿಗೆ ಮೀಸಲಾದ ಅನುಯಾಯಿಗಳನ್ನು ಗಳಿಸಿದೆ, ಅವರು ತಮ್ಮ ಮುಂದಿನ ಹಾಸ್ಯಮಯ ಮೇರುಕೃತಿಗಾಗಿ ಕುತೂಹಲದಿಂದ ಕಾಯುತ್ತಿದ್ದಾರೆ. ಹಾಸ್ಯದಲ್ಲಿ ಅವರ ಪರಾಕ್ರಮವನ್ನು ಮೀರಿ, ನಿರಂಜನ್ ಅವರು ಬಂಗಾಳದಲ್ಲಿ ಸಂಗೀತ ವೀಡಿಯೊಗಳ ಕ್ಷೇತ್ರಕ್ಕೆ ಪ್ರವೇಶಿಸುವ ಮೂಲಕ ತಮ್ಮ ಬಹುಮುಖತೆಯನ್ನು ಪ್ರದರ್ಶಿಸಿದ್ದಾರೆ. ಸ್ಥಳೀಯ ಪ್ರತಿಭೆಗಳೊಂದಿಗೆ ಸಹಯೋಗದೊಂದಿಗೆ, ಅವರು ಈ ಯೋಜನೆಗಳಿಗೆ ತಮ್ಮ ಅನನ್ಯ ಸಾಮರ್ಥ್ಯವನ್ನು ನೀಡಿದ್ದಾರೆ, ಹಾಸ್ಯ ಮತ್ತು ಮೋಡಿಗಳ ಸ್ಪರ್ಶವನ್ನು ಸೇರಿಸಿದ್ದಾರೆ.\n\nಕೋಲ್ಕತ್ತಾದಲ್ಲಿ ಹುಟ್ಟಿ ಬೆಳೆದ, ನಿರಂಜನ್ ಅವರ ಬೇರುಗಳು ನಗರದ ಸಾಂಸ್ಕೃತಿಕ ಫ್ಯಾಬ್ರಿಕ್ನಲ್ಲಿ ಆಳವಾಗಿ ಸಾಗುತ್ತವೆ ಮತ್ತು ಅವರು ಸಂಪ್ರದಾಯಗಳು, ಚಮತ್ಕಾರಗಳು ಮತ್ತು ವಿಲಕ್ಷಣತೆಯ ಶ್ರೀಮಂತ ವಸ್ತ್ರದಿಂದ ಸ್ಫೂರ್ತಿ ಪಡೆಯುತ್ತಾರೆ. ಅವರ ಹಾಸ್ಯವು ಕೋಲ್ಕತ್ತಾದ ಸಾರವನ್ನು ಪ್ರತಿಬಿಂಬಿಸುತ್ತದೆ, ಅದರ ಸಾರವನ್ನು ಬುದ್ಧಿವಂತಿಕೆ ಮತ್ತು ಉಷ್ಣತೆಯ ಮಿಶ್ರಣದಿಂದ ಸೆರೆಹಿಡಿಯುತ್ತದೆ, ಅದು ದೂರದ ಮತ್ತು ವಿಶಾಲವಾದ ಪ್ರೇಕ್ಷಕರೊಂದಿಗೆ ಅನುರಣಿಸುತ್ತದೆ.\n\nನಗೆಪಾಟಲಿಗೀಡಾದ ನಿರಂಜನ್ ತನ್ನ ಕೆಲಸಗಳನ್ನು ಎದುರಿಸುವ ಎಲ್ಲರಿಗೂ ಸಂತೋಷ ಮತ್ತು ನಗುವನ್ನು ಹರಡುವ ಮನೆಮಾತಾಗಿದ್ದಾರೆ. ಅವರ ಸಾಂಕ್ರಾಮಿಕ ಶಕ್ತಿ ಮತ್ತು ಮಿತಿಯಿಲ್ಲದ ಸೃಜನಶೀಲತೆಯೊಂದಿಗೆ, ಅವರು ಹಾಸ್ಯದ ಗಡಿಗಳನ್ನು ತಳ್ಳುವುದನ್ನು ಮುಂದುವರೆಸುತ್ತಾರೆ, ಡಿಜಿಟಲ್ ಲ್ಯಾಂಡ್‌ಸ್ಕೇಪ್‌ನಲ್ಲಿ ಅಳಿಸಲಾಗದ ಗುರುತು ಬಿಡುತ್ತಾರೆ. ಅವರು ತಮ್ಮ ರೇಖಾಚಿತ್ರಗಳಲ್ಲಿ ವಿಭಿನ್ನ ಟೋಪಿಗಳನ್ನು ಧರಿಸುತ್ತಿರಲಿ ಅಥವಾ ಅವರ ಹಾಸ್ಯ ಪ್ರತಿಭೆಯಿಂದ ಪಾತ್ರಗಳಿಗೆ ಜೀವ ತುಂಬುತ್ತಿರಲಿ, ನಿರಂಜನ್ ಮೊಂಡಲ್ ಅವರು ವಿಷಯ ರಚನೆಯ ಜಗತ್ತಿನಲ್ಲಿ ಲೆಕ್ಕಿಸಬೇಕಾದ ಶಕ್ತಿಯಾಗಿ ಉಳಿದಿದ್ದಾರೆ.',
        bh: '"निरंजन मोंडल, जेकरा के लोकप्रिय रूप से लाफ्टरसेन के नाम से जानल जाला, कोलकाता के जीवंत शहर के रहे वाला एगो गतिशील सामग्री निर्माता हवे। मजेदार हड्डी के गुदगुदी करे के जन्मजात प्रतिभा के संगे उ अपना उधम मचावे वाला कॉमेडी स्केच से डिजिटल मनोरंजन क्षेत्र में अपना खाती एगो आला उकेरले बाड़े, जवन कि बेदाग बा।" चरित्र चित्रण, आ अइसन सामग्री जवन पूरा बोर्ड में दर्शकन के तार मारे.\n\nरोजमर्रा के जिनिगी से प्रेरणा लेत निरंजन अपना स्केच में रिलेटेबल हास्य के संचार करेलें, जवना से उनकर सामग्री खाली एन्ट ना हो जाला',
        mai: '"निरंजन मोंडल, जेकरा लोकप्रिय रूप स॑ लाफ्टरसेन के नाम स॑ जानलऽ जाय छै, कोलकाता केरऽ जीवंत शहर स॑ निकललऽ एगो गतिशील सामग्री निर्माता छै । मजेदार हड्डी क॑ गुदगुदी करै के जन्मजात प्रतिभा के साथ, हुनी अपनऽ उधम मचाबै वाला कॉमेडी स्केच स॑ डिजिटल मनोरंजन क्षेत्र म॑ खुद लेली एगो आला उकेरल॑ छै, जे बेदाग छै ।" चरित्र चित्रण, आ एहन सामग्री जे पूरा बोर्ड पर दर्शकक संग एकटा तार ठोकैत अछि ।\n\nरोजमर्रा के जीवन स॑ प्रेरणा लै क॑ निरंजन अपनऽ स्केच म॑ रिलेटेबल हास्य के संचार करै छै, जेकरा स॑ हुनकऽ सामग्री खाली एन्ट नै होय जाय छै',
        gu: '"નિરંજન મંડલ, જે લાફ્ટરસેન તરીકે પ્રખ્યાત છે, તે ગતિશીલ કન્ટેન્ટ સર્જક છે જે કોલકાતાના વાઇબ્રન્ટ શહેરથી છે. રમુજી હાડકાંને ગલીપચી કરવાની જન્મજાત પ્રતિભા સાથે, તેણે ડિજિટલ મનોરંજનના ક્ષેત્રમાં પોતાના માટે એક આગવું સ્થાન બનાવ્યું છે. પાત્ર ચિત્રણ, અને સામગ્રી કે જે સમગ્ર બોર્ડમાં પ્રેક્ષકો સાથે તાર પર પ્રહાર કરે છે.\n\nરોજિંદા જીવનમાંથી પ્રેરણા લઈને, નિરંજન તેના સ્કેચને સંબંધિત રમૂજથી ભરે છે, જે તેની સામગ્રીને માત્ર મનોરંજક જ નહીં પણ ઊંડો પ્રતિધ્વનિ પણ બનાવે છે. વિવિધ વ્યક્તિત્વોને મૂર્ત બનાવવાની અને તેમને સ્ક્રીન પર જીવંત કરવાની તેમની ક્ષમતાએ તેમને સમર્પિત અનુયાયીઓ પ્રાપ્ત કર્યા છે, જેઓ તેમની આગામી કોમેડિક માસ્ટરપીસની આતુરતાથી રાહ જોઈ રહ્યા છે. કોમેડીમાં તેની કૌશલ્ય ઉપરાંત, નિરંજને બંગાળમાં મ્યુઝિક વીડિયોના ક્ષેત્રમાં સાહસ કરીને તેની બહુમુખી પ્રતિભા પણ દર્શાવી છે. સ્થાનિક પ્રતિભાઓ સાથે સહયોગ કરીને, તેમણે આ પ્રોજેક્ટ્સમાં તેમની અનન્ય ફ્લેર આપી છે, જેમાં રમૂજ અને વશીકરણનો સ્પર્શ ઉમેર્યો છે જે તેમને અલગ પાડે છે.\n\nકોલકાતામાં જન્મેલા અને ઉછરેલા, નિરંજનનાં મૂળ શહેરના સાંસ્કૃતિક ફેબ્રિકમાં ઊંડે સુધી ફેલાયેલાં છે અને તે તેની પરંપરાઓ, વિચિત્રતાઓ અને રૂઢિપ્રયોગોની સમૃદ્ધ ટેપેસ્ટ્રીમાંથી પ્રેરણા મેળવે છે. તેમની કોમેડી કોલકાતાના સારને પ્રતિબિંબિત કરે છે, તેના સારને સમજદારી અને હૂંફના મિશ્રણ સાથે કેપ્ચર કરે છે જે દૂર-દૂર સુધી પ્રેક્ષકો સાથે પડઘો પાડે છે.\n\nલાફ્ટરસેન તરીકે, નિરંજન ઘરગથ્થુ નામ બની ગયું છે, જેઓ તેમના કામનો સામનો કરે છે તેમના માટે આનંદ અને હાસ્ય ફેલાવે છે. તેની ચેપી ઉર્જા અને અમર્યાદ સર્જનાત્મકતા સાથે, તે કોમેડીની સીમાઓને આગળ ધપાવવાનું ચાલુ રાખે છે, અને ડિજિટલ લેન્ડસ્કેપ પર અમીટ છાપ છોડી જાય છે. ભલે તે તેના સ્કેચમાં વિવિધ ટોપીઓ પહેરતો હોય અથવા તેની હાસ્ય પ્રતિભા વડે પાત્રોને જીવંત બનાવતો હોય, નિરંજન મંડલ સામગ્રી સર્જનની દુનિયામાં ગણનાપાત્ર છે."',
      },
      reactions: {
        sad: 55,
        neutral: 82,
        laugh: 557,
      },
      reactionCount: 694,
    },
  },
  {
    id: "7c0b5e39-b6b6-4cd5-96ae-fec57dd65e99",
    ordering: 11,
    displayName: "",
    firstName: "kapilsharma",
    lastName: "",
    likeCount: 0,
    playCount: 0,
    viewCount: 0,
    followers: 3875,
    description:
      "Kapil sharma is a well known Artist or Joke Chef in the Industry",
    duration: 0,
    thumbnail:
      "https://d35f5vastl4boc.cloudfront.net/profileImage/More Bolder_1-12.png",
    url: "https://d35f5vastl4boc.cloudfront.net/profileImage/More Bolder_1-12.png",
    assetId: "7c0b5e39-b6b6-4cd5-96ae-fec57dd65e99",
    contentType: "",
    bannerUrl:
      "https://d35f5vastl4boc.cloudfront.net/profileImage/More Bolder_1-12.png",
    pristine_image: "",
    profile: {
      _id: "7c0b5e39-b6b6-4cd5-96ae-fec57dd65e99",
      userId: "7c0b5e39-b6b6-4cd5-96ae-fec57dd65e99",
      fullName: "Kapil Sharma",
      userName: "kapilsharma",
      email: "kapilsharma@hogarth.com",
      description:
        "Kapil sharma is a well known Artist or Joke Chef in the Industry",
      status: "ACTIVE",
      profileImageUrl:
        "https://d35f5vastl4boc.cloudfront.net/profileImage/More Bolder_1-12.png",
      followersCount: 3875,
      followingCount: 0,
      videoCount: 1,
      shareCount: 0,
      likeCount: 0,
      commentCount: 0,
      bookmarkCount: 0,
      backgroundImage:
        "https://d35f5vastl4boc.cloudfront.net/profileImage/More Bolder_1-12.png",
      localisedFullName: {
        en: "Kapil Sharma",
        hi: "कपिल शर्मा",
        ta: "கபில் சர்மா",
        te: "కపిల్ శర్మ",
        ba: "কপিল শর্মা",
        or: "କପିଲ ଶର୍ମା",
        mr: "कपिल शर्मा",
        kn: "ಕಪಿಲ್ ಶರ್ಮಾ",
        bh: "कपिल शर्मा के ह",
        mai: "कपिल शर्मा",
        gu: "કપિલ શર્મા",
      },
      localisedDescription: {
        en: "Kapil sharma is a well known Artist or Joke Chef in the Industry",
        hi: "कपिल शर्मा इंडस्ट्री के जाने-माने कलाकार या जोक शेफ हैं",
        ta: "கபில் சர்மா தொழில்துறையில் நன்கு அறியப்பட்ட கலைஞர் அல்லது ஜோக் செஃப் ஆவார்",
        te: "કપિલ શર્મા ઇન્ડસ્ટ્રીમાં જાણીતા કલાકાર અથવા જોક શેફ છે",
        ba: "কপিল শর্মা ইন্ডাস্ট্রির একজন সুপরিচিত শিল্পী বা জোক শেফ",
        or: "କପିଲ ଶର୍ମା ଇଣ୍ଡଷ୍ଟ୍ରିରେ ଜଣେ ଜଣାଶୁଣା କଳାକାର କିମ୍ବା ଜୋକ୍ ରୋଷେୟା |",
        mr: "कपिल शर्मा हा इंडस्ट्रीतील एक प्रसिद्ध कलाकार किंवा जोक शेफ आहे",
        kn: "ಕಪಿಲ್ ಶರ್ಮಾ ಅವರು ಉದ್ಯಮದಲ್ಲಿ ಪ್ರಸಿದ್ಧ ಕಲಾವಿದ ಅಥವಾ ಜೋಕ್ ಚೆಫ್",
        bh: "कपिल शर्मा इंडस्ट्री में एगो जानल मानल कलाकार भा जोक शेफ हउवें",
        mai: "कपिल शर्मा इंडस्ट्री के एकटा सुप्रसिद्ध कलाकार या जोक शेफ छैथ |",
        gu: "કપિલ શર્મા ઇન્ડસ્ટ્રીમાં જાણીતા કલાકાર અથવા જોક શેફ છે",
      },
      reactionCount: 4920,
      reactions: {
        sad: 476,
        neutral: 684,
        laugh: 3760,
      },
    },
  },
  {
    id: "5bcb007f-1ae4-460a-bf8f-44af432fe2e3",
    ordering: 12,
    displayName: "",
    firstName: "Mir Afsar Ali",
    lastName: "",
    likeCount: 0,
    playCount: 0,
    viewCount: 0,
    followers: 737,
    description:
      'Mir Afsar Ali or Mir is an Indian radio jockey, television anchor, singer, comedian, actor and media personality. He was the host of Mirakkel, a Comedy show on Zee Bangla and Hi Kolkata on Radio Mirchi. He read on the show Sunday Suspense on Radio Mirchi. He is also the producer and presenter of the Bengali food vlogging channel "Foodka" since 2017.',
    duration: 0,
    thumbnail:
      "https://d35f5vastl4boc.cloudfront.net/profileImage/Mir_afsar_ali.png",
    url: "https://d35f5vastl4boc.cloudfront.net/profileImage/Mir_afsar_ali.png",
    assetId: "5bcb007f-1ae4-460a-bf8f-44af432fe2e3",
    contentType: "",
    bannerUrl:
      "https://d35f5vastl4boc.cloudfront.net/profileImage/Mir_afsar_ali.png",
    pristine_image: "",
    profile: {
      _id: "5bcb007f-1ae4-460a-bf8f-44af432fe2e3",
      userId: "5bcb007f-1ae4-460a-bf8f-44af432fe2e3",
      fullName: "Mir Afsar Ali",
      userName: "Mir Afsar Ali",
      email: "mirafsarali@hww.com",
      description:
        'Mir Afsar Ali or Mir is an Indian radio jockey, television anchor, singer, comedian, actor and media personality. He was the host of Mirakkel, a Comedy show on Zee Bangla and Hi Kolkata on Radio Mirchi. He read on the show Sunday Suspense on Radio Mirchi. He is also the producer and presenter of the Bengali food vlogging channel "Foodka" since 2017.',
      status: "ACTIVE",
      profileImageUrl:
        "https://d35f5vastl4boc.cloudfront.net/profileImage/Mir_afsar_ali.png",
      followersCount: 737,
      followingCount: 0,
      videoCount: 0,
      shareCount: 0,
      likeCount: 0,
      commentCount: 0,
      bookmarkCount: 0,
      backgroundImage:
        "https://d35f5vastl4boc.cloudfront.net/profileImage/Mir_afsar_ali.png",
      localisedFullName: {
        en: "Mir Afsar Ali",
        hi: "मीर अफ़सर अली",
        ta: "மீர் அஃப்சர் அலி",
        te: "మీర్ అఫ్సర్ అలీ",
        ba: "মীর আফসার আলী",
        or: "ମୀର ଆଫସର ଅଲି",
        mr: "मीर अफसर अली",
        kn: "ಮೀರ್ ಅಫ್ಸರ್ ಅಲಿ",
        bh: "मीर अफसर अली के ह",
        mai: "मीर अफसर अली",
        gu: "મીર અફસર અલી",
      },
      localisedDescription: {
        en: 'Mir Afsar Ali or Mir is an Indian radio jockey, television anchor, singer, comedian, actor and media personality. He was the host of Mirakkel, a Comedy show on Zee Bangla and Hi Kolkata on Radio Mirchi. He read on the show Sunday Suspense on Radio Mirchi. He is also the producer and presenter of the Bengali food vlogging channel "Foodka" since 2017.',
        hi: 'मीर अफ़सर अली या मीर एक भारतीय रेडियो जॉकी, टेलीविज़न एंकर, गायक, हास्य अभिनेता, अभिनेता और मीडिया व्यक्तित्व हैं। वह ज़ी बांग्ला पर एक कॉमेडी शो मिराक्केल और रेडियो मिर्ची पर हाय कोलकाता के मेजबान थे। उन्होंने रेडियो मिर्ची के शो संडे सस्पेंस में काम किया । वह 2017 से बंगाली फूड व्लॉगिंग चैनल "फूडका" के निर्माता और प्रस्तुतकर्ता भी हैं।',
        ta: 'மிர் அஃப்சர் அலி அல்லது மிர் ஒரு இந்திய ரேடியோ ஜாக்கி, தொலைக்காட்சி தொகுப்பாளர், பாடகர், நகைச்சுவை நடிகர், நடிகர் மற்றும் ஊடக ஆளுமை ஆவார். அவர் ஜீ பங்களாவில் நகைச்சுவை நிகழ்ச்சியான மிராக்கல் மற்றும் ரேடியோ மிர்ச்சியில் ஹாய் கொல்கத்தா ஆகியவற்றின் தொகுப்பாளராக இருந்தார். ரேடியோ மிர்ச்சியில் சண்டே சஸ்பென்ஸ் நிகழ்ச்சியில் படித்தார். அவர் 2017 ஆம் ஆண்டு முதல் பெங்காலி உணவு விலாக்கிங் சேனலான "ஃபுட்கா" தயாரிப்பாளராகவும் தொகுப்பாளராகவும் உள்ளார்.',
        te: 'మీర్ అఫ్సర్ అలీ లేదా మీర్ ఒక భారతీయ రేడియో జాకీ, టెలివిజన్ యాంకర్, గాయకుడు, హాస్యనటుడు, నటుడు మరియు మీడియా వ్యక్తి. అతను జీ బంగ్లాలో మిరాకెల్ అనే కామెడీ షో మరియు రేడియో మిర్చిలో హాయ్ కోల్‌కతాకు హోస్ట్‌గా ఉన్నాడు. రేడియో మిర్చిలో సండే సస్పెన్స్ షోలో చదివాడు. అతను 2017 నుండి బెంగాలీ ఫుడ్ వ్లాగింగ్ ఛానెల్ "ఫుడ్కా" నిర్మాత మరియు వ్యాఖ్యాతగా కూడా ఉన్నారు.',
        ba: 'মীর আফসার আলী বা মীর হলেন একজন ভারতীয় রেডিও জকি, টেলিভিশন অ্যাঙ্কর, গায়ক, কৌতুক অভিনেতা, অভিনেতা এবং মিডিয়া ব্যক্তিত্ব। তিনি জি বাংলায় একটি কমেডি শো মীরাক্কেল এবং রেডিও মির্চিতে হাই কলকাতার হোস্ট ছিলেন। রেডিও মির্চির সানডে সাসপেন্স শোতে তিনি পড়েছিলেন। তিনি 2017 সাল থেকে বাংলা ফুড ভ্লগিং চ্যানেল "ফুডকা" এর প্রযোজক এবং উপস্থাপকও।',
        or: 'ମିର ଆଫସର ଅଲି କିମ୍ବା ମୀର ଜଣେ ଭାରତୀୟ ରେଡିଓ ଜକି, ଟେଲିଭିଜନ ଆଙ୍କର୍, ଗାୟକ, ହାସ୍ୟ ଅଭିନେତା, ଅଭିନେତା ଏବଂ ମିଡିଆ ବ୍ୟକ୍ତିତ୍ୱ | ସେ ଜି ବଙ୍ଗଳା ଉପରେ ଏକ କମେଡି ସୋ ଏବଂ ରେଡିଓ ମିର୍ଚିରେ ହାଏ କୋଲକାତା ମିରାକେଲର ହୋଷ୍ଟ ଥିଲେ | ସେ ରେଡିଓ ମିର୍ଚିରେ ରବିବାର ସସପେନ୍ସ ଶୋ’ରେ ପ .ିଥିଲେ | ସେ 2017 ମସିହାରୁ ବଙ୍ଗଳା ଖାଦ୍ୟ ଭ୍ଲଗିଂ ଚ୍ୟାନେଲ "ଫୁଡ୍କା" ର ଉତ୍ପାଦକ ଏବଂ ଉପସ୍ଥାପିକା ଅଟନ୍ତି |',
        mr: 'मीर अफसर अली किंवा मीर एक भारतीय रेडिओ जॉकी, टेलिव्हिजन अँकर, गायक, विनोदकार, अभिनेता आणि मीडिया व्यक्तिमत्व आहे. ते झी बांग्ला वरील कॉमेडी शो मिराक्केल आणि रेडिओ मिर्ची वरील हाय कोलकाता चे होस्ट होते. त्यांनी रेडिओ मिर्चीवरील संडे सस्पेन्स या शोमध्ये वाचले. 2017 पासून ते बंगाली फूड व्लॉगिंग चॅनल "फूडका" चे निर्माता आणि प्रस्तुतकर्ता देखील आहेत.',
        kn: 'ಮೀರ್ ಅಫ್ಸರ್ ಅಲಿ ಅಥವಾ ಮಿರ್ ಒಬ್ಬ ಭಾರತೀಯ ರೇಡಿಯೋ ಜಾಕಿ, ದೂರದರ್ಶನ ನಿರೂಪಕ, ಗಾಯಕ, ಹಾಸ್ಯನಟ, ನಟ ಮತ್ತು ಮಾಧ್ಯಮ ವ್ಯಕ್ತಿ. ಅವರು ಝೀ ಬಾಂಗ್ಲಾದಲ್ಲಿ ಹಾಸ್ಯ ಕಾರ್ಯಕ್ರಮವಾದ ಮಿರಾಕ್ಕೆಲ್ ಮತ್ತು ರೇಡಿಯೊ ಮಿರ್ಚಿಯಲ್ಲಿ ಹಾಯ್ ಕೋಲ್ಕತ್ತಾದ ನಿರೂಪಕರಾಗಿದ್ದರು. ಅವರು ರೇಡಿಯೋ ಮಿರ್ಚಿಯಲ್ಲಿ ಭಾನುವಾರದ ಸಸ್ಪೆನ್ಸ್ ಕಾರ್ಯಕ್ರಮದಲ್ಲಿ ಓದಿದರು. ಅವರು 2017 ರಿಂದ ಬಂಗಾಳಿ ಫುಡ್ ವ್ಲೋಗಿಂಗ್ ಚಾನೆಲ್ "ಫುಡ್ಕಾ" ನ ನಿರ್ಮಾಪಕ ಮತ್ತು ನಿರೂಪಕರಾಗಿದ್ದಾರೆ.',
        bh: 'मीर अफसर अली भा मीर एगो भारतीय रेडियो जॉकी, टेलीविजन एंकर, गायक, हास्य कलाकार, अभिनेता आ मीडिया पर्सनालिटी हवें। ऊ ज़ी बांग्ला पर एगो कॉमेडी शो मिराकेल आ रेडियो मिर्ची पर हाई कोलकाता के होस्ट रहलें। ऊ रेडियो मिर्ची पर शो संडे सस्पेंस में पढ़ले. इहाँ के 2017 से बंगाली फूड व्लॉगिंग चैनल "फूडका" के निर्माता आ प्रस्तोता भी बानी।',
        mai: 'मीर अफसर अली या मीर एक भारतीय रेडियो जॉकी, टेलीविजन एंकर, गायक, हास्य कलाकार, अभिनेता आ मीडिया व्यक्तित्व छी । ओ ज़ी बांगला पर कॉमेडी शो मिराकेल आ रेडियो मिर्ची पर हाई कोलकाता के होस्ट छलाह । रेडियो मिर्ची पर शो संडे सस्पेंस मे पढ़लनि। 2017 स॑ बंगाली फूड व्लॉगिंग चैनल "फूडका" केरऽ निर्माता आरू प्रस्तोता भी छै ।',
        gu: 'મીર અફસર અલી અથવા મીર એક ભારતીય રેડિયો જોકી, ટેલિવિઝન એન્કર, ગાયક, હાસ્ય કલાકાર, અભિનેતા અને મીડિયા વ્યક્તિત્વ છે. તે ઝી બાંગ્લા પરના કોમેડી શો મીરાક્કેલ અને રેડિયો મિર્ચી પર હાય કોલકાતાના હોસ્ટ હતા. તેણે રેડિયો મિર્ચી પર શો સન્ડે સસ્પેન્સ વાંચ્યું. તે 2017 થી બંગાળી ફૂડ વ્લોગિંગ ચેનલ "ફૂડકા" ના નિર્માતા અને પ્રસ્તુતકર્તા પણ છે.',
      },
      reactionCount: 1831,
      reactions: {
        laugh: 1399,
        sad: 168,
        neutral: 264,
      },
    },
  },
  {
    id: "adfd1c3c-824f-4e47-8086-596793e24652",
    ordering: 13,
    displayName: "",
    firstName: "Danish Sait",
    lastName: "",
    likeCount: 0,
    playCount: 0,
    viewCount: 0,
    followers: 409,
    description:
      'Danish Sait worked as a radio jockey for Supari on Fever 104 FM in 2013. On the channel, he made several prank calls and enacted an array of fictional roles including Asgar, Chacko, Nagesh and Nagraj. Starting in 2014, he hosted several sports shows including Pro Kabaddi League and the Cricket World Cup in 2015 before hosting Neevu Bhale Khiladi, a reality television show on Star Suvarna. He made his film debut with the Kannada movie Humble Politician Nograj in 2018 and portrayed the titular character in the film in addition to co-writing the film with director Saad Khan. The film released to positive reviews with one critic stating that "Danish Sait never fails to draw the audience, irrespective of where and how he plans to entertain. What is appealing is that he remains true to the character of Nograj ". In 2020, he starred in the Hindi-language web series Afsos as a tourist in Mumbai. That same year, he starred in the comedy French Biriyani as an auto driver along with Sal Yusuf, whom he worked with in The Improv. In the film, he reprised the role of Asgar from his prank calls. He is set to star in 777 Charlie alongside Rakshit Shetty.',
    duration: 0,
    thumbnail:
      "https://d35f5vastl4boc.cloudfront.net/profileImage/Danish_sait.png",
    url: "https://d35f5vastl4boc.cloudfront.net/profileImage/Danish_sait.png",
    assetId: "adfd1c3c-824f-4e47-8086-596793e24652",
    contentType: "",
    bannerUrl:
      "https://d35f5vastl4boc.cloudfront.net/profileImage/Danish_sait.png",
    pristine_image: "",
    profile: {
      _id: "adfd1c3c-824f-4e47-8086-596793e24652",
      userId: "adfd1c3c-824f-4e47-8086-596793e24652",
      fullName: "Danish Sait",
      userName: "Danish Sait",
      email: "danishsait@hww.com",
      description:
        'Danish Sait worked as a radio jockey for Supari on Fever 104 FM in 2013. On the channel, he made several prank calls and enacted an array of fictional roles including Asgar, Chacko, Nagesh and Nagraj. Starting in 2014, he hosted several sports shows including Pro Kabaddi League and the Cricket World Cup in 2015 before hosting Neevu Bhale Khiladi, a reality television show on Star Suvarna. He made his film debut with the Kannada movie Humble Politician Nograj in 2018 and portrayed the titular character in the film in addition to co-writing the film with director Saad Khan. The film released to positive reviews with one critic stating that "Danish Sait never fails to draw the audience, irrespective of where and how he plans to entertain. What is appealing is that he remains true to the character of Nograj ". In 2020, he starred in the Hindi-language web series Afsos as a tourist in Mumbai. That same year, he starred in the comedy French Biriyani as an auto driver along with Sal Yusuf, whom he worked with in The Improv. In the film, he reprised the role of Asgar from his prank calls. He is set to star in 777 Charlie alongside Rakshit Shetty.',
      status: "ACTIVE",
      profileImageUrl:
        "https://d35f5vastl4boc.cloudfront.net/profileImage/Danish_sait.png",
      followersCount: 409,
      followingCount: 0,
      videoCount: 0,
      shareCount: 0,
      likeCount: 0,
      commentCount: 0,
      bookmarkCount: 0,
      backgroundImage:
        "https://d35f5vastl4boc.cloudfront.net/profileImage/Danish_sait.png",
      localisedFullName: {
        en: "Danish Sait",
        hi: "दानिश सैत",
        ta: "டேனிஷ் சைட்",
        te: "డానిష్ సైత్",
        ba: "ডেনিশ সাইত",
        or: "ଡେନିଶ୍ ସାଇଟ୍ |",
        mr: "डॅनिश सैत",
        kn: "ಡ್ಯಾನಿಶ್ ಸೇಟ್",
        bh: "डेनिश सईट के बा",
        mai: "डेनिश सैत",
        gu: "ડેનિશ સૈત",
      },
      localisedDescription: {
        en: 'Danish Sait worked as a radio jockey for Supari on Fever 104 FM in 2013. On the channel, he made several prank calls and enacted an array of fictional roles including Asgar, Chacko, Nagesh and Nagraj. Starting in 2014, he hosted several sports shows including Pro Kabaddi League and the Cricket World Cup in 2015 before hosting Neevu Bhale Khiladi, a reality television show on Star Suvarna. He made his film debut with the Kannada movie Humble Politician Nograj in 2018 and portrayed the titular character in the film in addition to co-writing the film with director Saad Khan. The film released to positive reviews with one critic stating that "Danish Sait never fails to draw the audience, irrespective of where and how he plans to entertain. What is appealing is that he remains true to the character of Nograj ". In 2020, he starred in the Hindi-language web series Afsos as a tourist in Mumbai. That same year, he starred in the comedy French Biriyani as an auto driver along with Sal Yusuf, whom he worked with in The Improv. In the film, he reprised the role of Asgar from his prank calls. He is set to star in 777 Charlie alongside Rakshit Shetty.',
        hi: "2013 में फीवर 104 एफएम पर 'सुपारी' के लिए रेडियो जॉकी के रूप में दानिश सैत ने काम किया था। चैनल पर, उन्होंने कई शरारतपूर्ण कॉल किए और असगर, चाको, नागेश और नागराज सहित कई काल्पनिक भूमिकाएँ भी निभाईं। 2014 से शुरू होकर, उन्होंने स्टार सुवर्णा पर एक रियलिटी टेलीविजन शो नीवु भाले खिलाड़ी की मेजबानी करने से पहले 2015 में प्रो कबड्डी लीग और क्रिकेट विश्व कप सहित कई खेल शो की मेजबानी की। उन्होंने 2018 में कन्नड़ फिल्म हंबल पॉलिटिशियन नोगराज से अपनी फिल्म की शुरुआत की और निर्देशक साद खान के साथ फिल्म का सह-लेखन करने के अलावा फिल्म में मुख्य किरदार निभाया। फिल्म को सकारात्मक समीक्षा के साथ रिलीज़ किया गया और एक समीक्षक ने कहा कि \"दानिश सैट दर्शकों को आकर्षित करने में कभी असफल नहीं होते, चाहे वह कहीं भी और कैसे भी मनोरंजन करने की योजना बनाते हों। आकर्षक बात यह है कि वह नोगराज के चरित्र के प्रति सच्चे हैं।\" 2020 में, उन्होंने हिंदी भाषा की वेब श्रृंखला अफसोस में मुंबई में एक पर्यटक के रूप में अभिनय किया। उसी वर्ष, उन्होंने साल यूसुफ के साथ कॉमेडी फ्रेंच बिरयानी में एक ऑटो ड्राइवर के रूप में अभिनय किया, जिनके साथ उन्होंने द इम्प्रोव में काम किया था। फिल्म में उन्होंने अपनी शरारत भरी कॉल्स से असगर की भूमिका को दोहराया। वह रक्षित शेट्टी के साथ 777 चार्ली में अभिनय करने के लिए तैयार हैं।",
        ta: 'டேனிஷ் சைட் 2013 இல் ஃபீவர் 104 எஃப்எம்மில் சுபாரிக்கு ரேடியோ ஜாக்கியாகப் பணியாற்றினார். சேனலில், அவர் பல குறும்பு அழைப்புகளைச் செய்தார் மற்றும் அஸ்கர், சாக்கோ, நாகேஷ் மற்றும் நாகராஜ் உட்பட கற்பனையான பாத்திரங்களின் வரிசையை நடித்தார். 2014 ஆம் ஆண்டு தொடங்கி, ஸ்டார் சுவர்ணாவில் ரியாலிட்டி தொலைக்காட்சி நிகழ்ச்சியான நீவு பலே கிலாடியை தொகுத்து வழங்குவதற்கு முன்பு, 2015 இல் புரோ கபடி லீக் மற்றும் கிரிக்கெட் உலகக் கோப்பை உள்ளிட்ட பல விளையாட்டு நிகழ்ச்சிகளை தொகுத்து வழங்கினார். அவர் 2018 ஆம் ஆண்டில் கன்னடத் திரைப்படமான ஹம்பிள் பொலிடிஷியன் நோக்ராஜ் மூலம் தனது திரைப்பட அறிமுகமானார் மற்றும் இயக்குனர் சாத் கானுடன் இணைந்து திரைப்படத்தை எழுதியதோடு, படத்தில் பெயரிடப்பட்ட கதாபாத்திரத்தையும் சித்தரித்தார். "டேனிஷ் சைட் எங்கு, எப்படி பொழுதுபோக்கத் திட்டமிட்டாலும் பார்வையாளர்களை ஈர்ப்பதில் தவறில்லை" என்று குறிப்பிட்டு நேர்மறையான விமர்சனங்களைப் பெற்ற திரைப்படம் வெளியானது. அவர் நோக்ராஜின் கதாபாத்திரத்திற்கு உண்மையாகவே இருக்கிறார் என்பதே ஈர்க்கும் விஷயம். 2020 ஆம் ஆண்டில், அவர் மும்பையில் ஒரு சுற்றுலாப் பயணியாக அஃப்சோஸ் என்ற ஹிந்தி மொழி வலைத் தொடரில் நடித்தார். அதே ஆண்டு, அவர் தி இம்ப்ரூவ் படத்தில் பணிபுரிந்த சால் யூசுஃப் உடன் இணைந்து ஆட்டோ டிரைவராக பிரஞ்சு பிரியாணி என்ற நகைச்சுவை படத்தில் நடித்தார். படத்தில், அவர் தனது குறும்பு அழைப்புகளிலிருந்து அஸ்கர் பாத்திரத்தை மீண்டும் செய்தார். அவர் ரக்ஷித் ஷெட்டியுடன் 777 சார்லி படத்தில் நடிக்க உள்ளார்.',
        te: 'డానిష్ సైత్ 2013లో ఫీవర్ 104 FMలో సుపారీకి రేడియో జాకీగా పనిచేశాడు. ఛానెల్‌లో, అతను అనేక చిలిపి కాల్స్ చేశాడు మరియు అస్గర్, చాకో, నాగేష్ మరియు నాగరాజుతో సహా అనేక కల్పిత పాత్రలను పోషించాడు. 2014 నుండి ప్రారంభించి, స్టార్ సువర్ణలో రియాలిటీ టెలివిజన్ షో అయిన నీవు భలే ఖిలాడిని హోస్ట్ చేయడానికి ముందు అతను 2015లో ప్రో కబడ్డీ లీగ్ మరియు క్రికెట్ ప్రపంచ కప్‌తో సహా అనేక స్పోర్ట్స్ షోలను హోస్ట్ చేశాడు. అతను 2018లో కన్నడ చిత్రం హంబుల్ పొలిటీషియన్ నోగ్‌రాజ్‌తో తన చలనచిత్ర రంగ ప్రవేశం చేసాడు మరియు దర్శకుడు సాద్ ఖాన్‌తో కలిసి ఈ చిత్రానికి సహ-రచయితగా పని చేయడంతో పాటు చిత్రంలో టైటిల్ పాత్రను పోషించాడు. ఈ చిత్రం సానుకూల సమీక్షలతో విడుదలైంది, "డానిష్ సైత్ ఎక్కడ మరియు ఎలా వినోదాన్ని అందించాలనే దానితో సంబంధం లేకుండా ప్రేక్షకులను ఆకర్షించడంలో ఎప్పుడూ విఫలం కాలేడు. ఆకర్షణీయమైన విషయం ఏమిటంటే అతను నోగరాజ్ పాత్రకు కట్టుబడి ఉన్నాడు ". 2020లో, అతను ముంబైలో పర్యాటకుడిగా హిందీ-భాషా వెబ్ సిరీస్ అఫ్సోస్‌లో నటించాడు. అదే సంవత్సరం, అతను ది ఇంప్రూవ్‌లో పనిచేసిన సాల్ యూసుఫ్‌తో కలిసి ఆటో డ్రైవర్‌గా ఫ్రెంచ్ బిరియాని అనే హాస్య చిత్రంలో నటించాడు. ఈ చిత్రంలో, అతను తన ప్రాంక్ కాల్స్ నుండి అస్గర్ పాత్రను తిరిగి పోషించాడు. అతను రక్షిత్ శెట్టితో కలిసి 777 చార్లీలో నటించబోతున్నాడు.',
        ba: 'ড্যানিশ সাইত 2013 সালে ফিভার 104 এফএম-এ সুপারির জন্য রেডিও জকি হিসাবে কাজ করেছিলেন। চ্যানেলে, তিনি বেশ কয়েকটি প্র্যাঙ্ক কল করেছিলেন এবং আসগর, চাকো, নাগেশ এবং নাগরাজ সহ কাল্পনিক ভূমিকাগুলির একটি অ্যারে তৈরি করেছিলেন। 2014 সালে শুরু করে, তিনি স্টার সুবর্ণের একটি রিয়েলিটি টেলিভিশন শো নিভু ভালে খিলাড়ি হোস্ট করার আগে প্রো কাবাডি লীগ এবং 2015 সালের ক্রিকেট বিশ্বকাপ সহ বেশ কয়েকটি স্পোর্টস শো হোস্ট করেন। তিনি 2018 সালে কন্নড় চলচ্চিত্র নম্র রাজনীতিবিদ নোগরাজের মাধ্যমে তার চলচ্চিত্রে আত্মপ্রকাশ করেন এবং পরিচালক সাদ খানের সাথে চলচ্চিত্রটি সহ-লেখার পাশাপাশি চলচ্চিত্রটিতে শীর্ষক চরিত্রটি চিত্রিত করেন। ফিল্মটি ইতিবাচক রিভিউতে মুক্তি পেয়েছে একজন সমালোচকের সাথে যে "ড্যানিশ সাইত কখনই দর্শকদের টানতে ব্যর্থ হয় না, সে যেখানেই এবং কিভাবে বিনোদনের পরিকল্পনা করুক না কেন। যা আকর্ষণীয় তা হল তিনি নোগরাজের চরিত্রের প্রতি সত্য থাকেন"। 2020 সালে, তিনি মুম্বাইতে একজন পর্যটক হিসাবে হিন্দি ভাষার ওয়েব সিরিজ আফসোসে অভিনয় করেছিলেন। একই বছর, তিনি সাল ইউসুফের সাথে একজন অটো চালক হিসেবে কমেডি ফ্রেঞ্চ বিরিয়ানিতে অভিনয় করেন, যার সাথে তিনি দ্য ইমপ্রুভে কাজ করেছিলেন। ছবিতে, তিনি তার প্র্যাঙ্ক কল থেকে আসগরের ভূমিকার পুনরাবৃত্তি করেছিলেন। তিনি রক্ষিত শেঠির সাথে 777 চার্লিতে অভিনয় করতে চলেছেন।',
        or: '2013 ରେ ଜ୍ୱର 104 FM ରେ ସୁପାରୀଙ୍କ ପାଇଁ ରେଡିଓ ଜକି ଭାବରେ ଡେନିଶ୍ ସାଇଟ୍ କାର୍ଯ୍ୟ କରିଥିଲେ। 2014 ରୁ ଆରମ୍ଭ କରି ସେ ଷ୍ଟାର ସୁଭର୍ନାରେ ଏକ ରିୟଲିଟି ଟେଲିଭିଜନ ଶୋ ’ନେଭୁ ଭାଲେ ଖିଲାଡି’ ଆୟୋଜନ କରିବା ପୂର୍ବରୁ ପ୍ରୋ କବାଡି ଲିଗ୍ ଏବଂ 2015 ରେ କ୍ରିକେଟ୍ ବିଶ୍ୱକପ୍ ସହିତ ଅନେକ କ୍ରୀଡା ଶୋ ’ଆୟୋଜନ କରିଥିଲେ | ସେ 2018 ରେ କନ୍ନଡ ଚଳଚ୍ଚିତ୍ର ନମ୍ର ରାଜନେତା ନୋଗ୍ରାଜଙ୍କ ସହ ତାଙ୍କର ଡେବ୍ୟୁ କରିଥିଲେ ଏବଂ ନିର୍ଦ୍ଦେଶକ ସାଦ ଖାନଙ୍କ ସହ ଏହି ଫିଲ୍ମର ସହ-ଲେଖିବା ବ୍ୟତୀତ ଫିଲ୍ମରେ ଟାଇଟୁଲାର ଚରିତ୍ରରେ ଅଭିନୟ କରିଥିଲେ। ଏହି ଚଳଚ୍ଚିତ୍ରଟି ଜଣେ ସମାଲୋଚକଙ୍କ ସହ ସକାରାତ୍ମକ ସମୀକ୍ଷାରେ ପ୍ରକାଶ ପାଇଥିଲା ଯେ "କେଉଁଠାରେ ଏବଂ କିପରି ମନୋରଞ୍ଜନ କରିବାକୁ ଯୋଜନା କରୁଛନ୍ତି, ନିର୍ବିଶେଷରେ ଦର୍ଶକଙ୍କୁ ଆକର୍ଷିତ କରିବାରେ ବିଫଳ ହୁଏ ନାହିଁ। 2020 ରେ, ସେ ମୁମ୍ବାଇରେ ପର୍ଯ୍ୟଟକ ଭାବରେ ହିନ୍ଦୀ ଭାଷା ୱେବ୍ ସିରିଜ୍ ଆଫସୋସରେ ଅଭିନୟ କରିଥିଲେ | ସେହିବର୍ଷ ସେ ସାଲ ୟୁସୁଫଙ୍କ ସହ କମେଡି ଫ୍ରେଞ୍ଚ ବିରିୟାନିରେ ଅଟୋ ଡ୍ରାଇଭର ଭାବରେ ଅଭିନୟ କରିଥିଲେ, ଯାହାଙ୍କ ସହ ସେ ଦି ଇମପ୍ରୋଭରେ କାମ କରିଥିଲେ। ଏହି ଚଳଚ୍ଚିତ୍ରରେ ସେ ଆସର୍ଗଙ୍କ ଭୂମିକାରେ ଅଭିନୟ କରିଥିଲେ। ସେ ରାକ୍ଷୀ ଶେଟ୍ଟୀଙ୍କ ସହିତ 777 ଚାର୍ଲିରେ ଅଭିନୟ କରିବାକୁ ଯାଉଛନ୍ତି।',
        mr: "दानिश सैतने 2013 मध्ये Fever 104 FM वर सुपारीसाठी रेडिओ जॉकी म्हणून काम केले. चॅनलवर, त्याने अनेक खोड्या कॉल केले आणि असगर, चाको, नागेश आणि नागराज यासह अनेक काल्पनिक भूमिका साकारल्या. 2014 पासून, स्टार सुवर्णा वरील रिॲलिटी टेलिव्हिजन शो नीवू भले खिलाडी होस्ट करण्यापूर्वी त्याने प्रो कबड्डी लीग आणि 2015 मध्ये क्रिकेट विश्वचषक यासह अनेक क्रीडा शो होस्ट केले. त्याने 2018 मध्ये कन्नड चित्रपट 'विनम्र राजकारणी नोगराज' द्वारे पदार्पण केले आणि दिग्दर्शक साद खान सोबत चित्रपटाचे सह-लेखन करण्याव्यतिरिक्त चित्रपटातील शीर्षक व्यक्तिरेखा साकारली. या चित्रपटाला एका समीक्षकाने सकारात्मक प्रतिसाद दिला आहे की \"दानिश सैत कधीही प्रेक्षक आकर्षित करण्यात अपयशी ठरत नाही, मग त्याने कुठे आणि कसे मनोरंजन करण्याची योजना आखली आहे. आकर्षक गोष्ट म्हणजे तो नोगराजच्या पात्राशी खरा राहिला आहे.\" 2020 मध्ये, त्याने मुंबईतील पर्यटक म्हणून Afsos या हिंदी भाषेतील वेब सीरिजमध्ये काम केले. त्याच वर्षी, त्याने द इम्प्रूव्हमध्ये काम केलेल्या साल युसुफसोबत ऑटो ड्रायव्हर म्हणून कॉमेडी फ्रेंच बिरियानीमध्ये काम केले. चित्रपटात, त्याने त्याच्या खोड्या कॉल्समधून असगरच्या भूमिकेची पुनरावृत्ती केली. तो रक्षित शेट्टीसोबत ७७७ चार्लीमध्ये काम करणार आहे.",
        kn: 'ಡ್ಯಾನಿಶ್ ಸೇಟ್ ಅವರು 2013 ರಲ್ಲಿ ಫೀವರ್ 104 FM ನಲ್ಲಿ ಸುಪಾರಿಗಾಗಿ ರೇಡಿಯೋ ಜಾಕಿಯಾಗಿ ಕೆಲಸ ಮಾಡಿದರು. ಚಾನಲ್‌ನಲ್ಲಿ, ಅವರು ಹಲವಾರು ತಮಾಷೆ ಕರೆಗಳನ್ನು ಮಾಡಿದರು ಮತ್ತು ಅಸ್ಗರ್, ಚಾಕೊ, ನಾಗೇಶ್ ಮತ್ತು ನಾಗರಾಜ್ ಸೇರಿದಂತೆ ಹಲವಾರು ಕಾಲ್ಪನಿಕ ಪಾತ್ರಗಳನ್ನು ನಿರ್ವಹಿಸಿದರು. 2014 ರಿಂದ ಪ್ರಾರಂಭಿಸಿ, ಅವರು ಸ್ಟಾರ್ ಸುವರ್ಣದಲ್ಲಿ ರಿಯಾಲಿಟಿ ಟೆಲಿವಿಷನ್ ಶೋವಾದ ನೀನು ಭಲೇ ಕಿಲಾಡಿಯನ್ನು ಹೋಸ್ಟ್ ಮಾಡುವ ಮೊದಲು ಪ್ರೊ ಕಬಡ್ಡಿ ಲೀಗ್ ಮತ್ತು 2015 ರಲ್ಲಿ ಕ್ರಿಕೆಟ್ ವಿಶ್ವಕಪ್ ಸೇರಿದಂತೆ ಹಲವಾರು ಕ್ರೀಡಾ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಆಯೋಜಿಸಿದ್ದರು. ಅವರು 2018 ರಲ್ಲಿ ಕನ್ನಡ ಚಲನಚಿತ್ರ ಹಂಬಲ್ ಪೊಲಿಟಿಷಿಯನ್ ನೋಗರಾಜ್ ಅವರ ಚಲನಚಿತ್ರದೊಂದಿಗೆ ಚೊಚ್ಚಲ ಪ್ರವೇಶ ಮಾಡಿದರು ಮತ್ತು ನಿರ್ದೇಶಕ ಸಾದ್ ಖಾನ್ ಅವರೊಂದಿಗೆ ಸಹ-ಬರಹಗಾರರೊಂದಿಗೆ ಚಿತ್ರದಲ್ಲಿ ನಾಮಸೂಚಕ ಪಾತ್ರವನ್ನು ಚಿತ್ರಿಸಿದ್ದಾರೆ. "ಡ್ಯಾನಿಶ್ ಸೇಟ್ ಅವರು ಎಲ್ಲಿ ಮತ್ತು ಹೇಗೆ ಮನರಂಜಿಸಲು ಯೋಜಿಸಿದರೂ ಪ್ರೇಕ್ಷಕರನ್ನು ಸೆಳೆಯುವಲ್ಲಿ ಎಂದಿಗೂ ವಿಫಲರಾಗುವುದಿಲ್ಲ ಎಂದು ಹೇಳುವ ಮೂಲಕ ಚಲನಚಿತ್ರವು ಸಕಾರಾತ್ಮಕ ವಿಮರ್ಶೆಗಳಿಗೆ ಬಿಡುಗಡೆಯಾಯಿತು. ಅವರು ನೋಗರಾಜ್ ಪಾತ್ರಕ್ಕೆ ನಿಜವಾಗಿದ್ದಾರೆ ಎಂಬುದು ಆಕರ್ಷಕವಾಗಿದೆ. 2020 ರಲ್ಲಿ, ಅವರು ಮುಂಬೈನಲ್ಲಿ ಪ್ರವಾಸಿಯಾಗಿ ಹಿಂದಿ ಭಾಷೆಯ ವೆಬ್ ಸರಣಿ ಅಫ್ಸೋಸ್‌ನಲ್ಲಿ ನಟಿಸಿದರು. ಅದೇ ವರ್ಷ, ಅವರು ದಿ ಇಂಪ್ರೂವ್‌ನಲ್ಲಿ ಕೆಲಸ ಮಾಡಿದ ಸಾಲ್ ಯೂಸುಫ್ ಜೊತೆಗೆ ಆಟೋ ಡ್ರೈವರ್ ಆಗಿ ಹಾಸ್ಯ ಫ್ರೆಂಚ್ ಬಿರಿಯಾನಿಯಲ್ಲಿ ನಟಿಸಿದರು. ಚಿತ್ರದಲ್ಲಿ, ಅವರು ತಮ್ಮ ತಮಾಷೆ ಕರೆಗಳಿಂದ ಅಸ್ಗರ್ ಪಾತ್ರವನ್ನು ಪುನರಾವರ್ತಿಸಿದರು. ಅವರು ರಕ್ಷಿತ್ ಶೆಟ್ಟಿ ಜೊತೆಗೆ 777 ಚಾರ್ಲಿಯಲ್ಲಿ ನಟಿಸಲು ಸಿದ್ಧರಾಗಿದ್ದಾರೆ.',
        bh: "दानिश सैत 2013 में फीवर 104 एफएम पर सुपारी खातिर रेडियो जॉकी के काम कइलें।चैनल पर ऊ कई गो प्रैंक कॉल कइलें आ असगर, चक्को, नागेश आ नागराज समेत काल्पनिक भूमिका के सरणी के अभिनय कइलें। 2014 से शुरू हो के ऊ प्रो कबड्डी लीग आ 2015 में क्रिकेट वर्ल्ड कप समेत कई गो स्पोर्ट्स शो के होस्टिंग कइलें आ एकरे बाद स्टार सुवर्ण पर रियलिटी टेलीविजन शो नीवु भाले खिलाडी के होस्टिंग कइलें। ऊ 2018 में कन्नड़ फिलिम हम्बल पॉलिटिशियन नोगराज से आपन फिल्मी शुरुआत कइलें आ टाइटिल चा के किरदार निभवले रहलें",
        mai: "दानिश सैत न॑ २०१३ म॑ फीवर १०४ एफएम प॑ सुपारी लेली रेडियो जॉकी के रूप म॑ काम करलकै ।चैनल प॑ हुनी कईएक प्रैंक कॉल करलकै आरू असगर, चक्को, नागेश आरू नागराज सहित काल्पनिक भूमिका के सरणी के अभिनय करलकै । २०१४ स॑ शुरू होय क॑ २०१५ म॑ प्रो कबड्डी लीग आरू क्रिकेट विश्व कप सहित कईएक खेल शो के होस्टिंग करलकै आरू ओकरा बाद स्टार सुवर्ण प॑ रियलिटी टेलीविजन शो नीवु भाले खिलाडी के होस्टिंग करलकै । ओ २०१८ मे कन्नड़ सिनेमा हम्बल पॉलिटिशियन नोगराज सँ अपन फिल्मी शुरुआत केलक आ टाइटिल चा के किरदार निभेने छल",
        gu: 'ડેનિશ સૈતે 2013 માં ફીવર 104 એફએમ પર સુપારી માટે રેડિયો જોકી તરીકે કામ કર્યું હતું. ચેનલ પર, તેણે ઘણા પ્રૅન્ક કૉલ્સ કર્યા હતા અને અસગર, ચાકો, નાગેશ અને નાગરાજ સહિતની કાલ્પનિક ભૂમિકાઓ ભજવી હતી. 2014 માં શરૂ કરીને, તેણે સ્ટાર સુવર્ણા પર એક રિયાલિટી ટેલિવિઝન શો નીવુ ભલે ખિલાડી હોસ્ટ કરતા પહેલા પ્રો કબડ્ડી લીગ અને 2015 માં ક્રિકેટ વર્લ્ડ કપ સહિતના ઘણા સ્પોર્ટ્સ શોનું આયોજન કર્યું હતું. તેણે 2018 માં કન્નડ ફિલ્મ નમ્ર રાજકારણી નોગરાજ સાથે તેની ફિલ્મની શરૂઆત કરી હતી અને દિગ્દર્શક સાદ ખાન સાથે ફિલ્મના સહ-લેખન ઉપરાંત ફિલ્મમાં ટાઇટલ પાત્રનું ચિત્રણ કર્યું હતું. એક વિવેચકે કહ્યું કે "ડેનિશ સૈત પ્રેક્ષકોને આકર્ષવામાં ક્યારેય નિષ્ફળ જતા નથી, પછી ભલે તે ક્યાં અને કેવી રીતે મનોરંજન કરવાની યોજના ધરાવે છે. આકર્ષક બાબત એ છે કે તે નોગરાજના પાત્ર પ્રત્યે સાચો રહે છે." 2020 માં, તેણે મુંબઈમાં પ્રવાસી તરીકે હિન્દી-ભાષાની વેબ સિરીઝ અફસોસમાં અભિનય કર્યો. તે જ વર્ષે, તેણે કોમેડી ફ્રેન્ચ બિરીયાનીમાં સાલ યુસુફ સાથે ઓટો ડ્રાઈવર તરીકે અભિનય કર્યો, જેની સાથે તેણે ધ ઈમ્પ્રુવમાં કામ કર્યું. આ ફિલ્મમાં, તેણે અસગરની ભૂમિકાને તેના ટીખળ કૉલ્સથી રિપ્રાઇઝ કરી. તે રક્ષિત શેટ્ટી સાથે 777 ચાર્લીમાં કામ કરવા માટે તૈયાર છે.',
      },
      reactionCount: 13269,
      reactions: {
        laugh: 9097,
        sad: 1528,
        neutral: 2644,
      },
    },
  },
  {
    id: "ad0ccfad-de92-4ecd-8435-99b7ab894752",
    ordering: 14,
    displayName: "",
    firstName: "Urooj Ashfaq",
    lastName: "",
    likeCount: 0,
    playCount: 0,
    viewCount: 0,
    followers: 524,
    description:
      "Fresh from the triumph of winning Best Newcomer at the Edinburgh Comedy Awards in 2023, Urooj is one of India’s most exciting comics.\n\nHailing from Mumbai, Urooj Ashfaq not only has a degree in psychology but also personal experience of her own therapy journey. Urooj has appeared on India’s Queens of Comedy and just finished her first stand-up tour of the UK. Super skilled at crowd work, Urooj’s audiences are guaranteed a fun time as she charmingly entertains with tales of her parents' divorce, cultural differences and the humour she easily finds in the daily intricacies of life.",
    duration: 0,
    thumbnail:
      "https://d35f5vastl4boc.cloudfront.net/profileImage/Urooj_ashfaq.png",
    url: "https://d35f5vastl4boc.cloudfront.net/profileImage/Urooj_ashfaq.png",
    assetId: "ad0ccfad-de92-4ecd-8435-99b7ab894752",
    contentType: "",
    bannerUrl:
      "https://d35f5vastl4boc.cloudfront.net/profileImage/Urooj_ashfaq.png",
    pristine_image: "",
    profile: {
      _id: "ad0ccfad-de92-4ecd-8435-99b7ab894752",
      userId: "ad0ccfad-de92-4ecd-8435-99b7ab894752",
      fullName: "Urooj Ashfaq",
      userName: "Urooj Ashfaq",
      email: "uroojashfaq@wpp.com",
      description:
        "Fresh from the triumph of winning Best Newcomer at the Edinburgh Comedy Awards in 2023, Urooj is one of India’s most exciting comics.\n\nHailing from Mumbai, Urooj Ashfaq not only has a degree in psychology but also personal experience of her own therapy journey. Urooj has appeared on India’s Queens of Comedy and just finished her first stand-up tour of the UK. Super skilled at crowd work, Urooj’s audiences are guaranteed a fun time as she charmingly entertains with tales of her parents' divorce, cultural differences and the humour she easily finds in the daily intricacies of life.",
      status: "ACTIVE",
      profileImageUrl:
        "https://d35f5vastl4boc.cloudfront.net/profileImage/Urooj_ashfaq.png",
      followersCount: 524,
      followingCount: 0,
      videoCount: 0,
      shareCount: 0,
      likeCount: 0,
      commentCount: 0,
      bookmarkCount: 0,
      backgroundImage:
        "https://d35f5vastl4boc.cloudfront.net/profileImage/Urooj_ashfaq.png",
      localisedFullName: {
        en: "Urooj Ashfaq",
        hi: "",
        ta: "",
        te: "",
        ba: "",
        or: "",
        mr: "",
        kn: "",
        bh: "",
        mai: "",
        gu: "",
      },
      localisedDescription: {
        en: "Fresh from the triumph of winning Best Newcomer at the Edinburgh Comedy Awards in 2023, Urooj is one of India’s most exciting comics.\n\nHailing from Mumbai, Urooj Ashfaq not only has a degree in psychology but also personal experience of her own therapy journey. Urooj has appeared on India’s Queens of Comedy and just finished her first stand-up tour of the UK. Super skilled at crowd work, Urooj’s audiences are guaranteed a fun time as she charmingly entertains with tales of her parents' divorce, cultural differences and the humour she easily finds in the daily intricacies of life.",
        hi: "उरूज, 2023 में एडिनबर्ग कॉमेडी अवार्ड्स में सर्वश्रेष्ठ नवागंतुक जीतने की जीत से ताज़ा,  भारत की सबसे रोमांचक कॉमिक स्टार में से एक है।\n\nमुंबई की रहने वाली उरूज अशफाक के पास न केवल मनोविज्ञान में डिग्री है, बल्कि उनकी अपनी थेरेपी यात्रा का व्यक्तिगत अनुभव भी है। उरूज इंडियाज़ क्वींस ऑफ़ कॉमेडी में नज़र आ चुकी हैं और उन्होंने हाल ही में यूके का अपना पहला स्टैंड-अप दौरा पूरा किया है। भीड़ में काम करने में सुपर कुशल, उरूज के दर्शकों को एक मजेदार समय की गारंटी दी जाती है क्योंकि वह अपने माता-पिता के तलाक, सांस्कृतिक अंतर और जीवन की दैनिक पेचीदगियों में आसानी से मिलने वाले हास्य की कहानियों के साथ आकर्षक रूप से मनोरंजन करती है।",
        ta: "",
        te: "",
        ba: "",
        or: "",
        mr: "",
        kn: "",
        bh: "",
        mai: "",
        gu: "",
      },
      reactionCount: 14002,
      reactions: {
        laugh: 9440,
        neutral: 2891,
        sad: 1671,
      },
    },
  },
];
