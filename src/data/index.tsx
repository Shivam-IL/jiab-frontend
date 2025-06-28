// Export all mapping functions and their types
export * from './home-page'
export * from './nav-bar'
export * from './scroll-and-lol'
export * from './pj-challenge'
export * from './joke-box'
export * from './hall-of-lame'
export * from './refer-a-friend'
export * from './contest'
export * from './web-footer'
export * from './comic'
export * from './nav-footer'
export * from './have-an-invite-code'
export * from './my-profile'
export * from './logout-button'
export * from './faq'
export * from './contact-us'
export * from './plus-add-inside-profile'
export * from './break_the_ice'
export * from './vote_is_in'
export * from './serial_chiller'
export * from './privacy'
export * from './login'
export * from './leaderboard'
export * from './edit-profile'
export * from './invite_code'
export * from './same-refer'
export * from './joke_box_filter'
export * from './joke_is_in_popup'
export * from './unique_code'
export * from './that_was_quick'
export * from './sorry_unique_code'
export * from './cheat_code_invite'
export * from './send_again'
export * from  './validation-text'
export * from './joke_report_popup'
export * from './thand_rakh_popup'

// Import all the mapping functions
import {
  mapHomePageData,
  defaultHomePageData,
  type HomePageData
} from './home-page'
import { mapNavBarData, defaultNavBarData, type NavBarData } from './nav-bar'
import {
  mapScrollAndLolData,
  defaultScrollAndLolData,
  type ScrollAndLolData
} from './scroll-and-lol'
import {
  mapPjChallengeData,
  defaultPjChallengeData,
  type PjChallengeData
} from './pj-challenge'
import {
  mapJokeBoxData,
  defaultJokeBoxData,
  type JokeBoxData
} from './joke-box'
import {
  mapHallOfLameData,
  defaultHallOfLameData,
  type HallOfLameData
} from './hall-of-lame'
import {
  mapReferAFriendData,
  defaultReferAFriendData,
  type ReferAFriendData
} from './refer-a-friend'
import { mapContestData, defaultContestData, type ContestData } from './contest'
import {
  mapWebFooterData,
  defaultWebFooterData,
  type WebFooterData
} from './web-footer'
import { mapComicData, defaultComicData, type ComicData } from './comic'
import {
  mapNavFooterData,
  defaultNavFooterData,
  type NavFooterData
} from './nav-footer'
import {
  mapHaveAnInviteCodeData,
  defaultHaveAnInviteCodeData,
  type HaveAnInviteCodeData
} from './have-an-invite-code'
import {
  mapMyProfileData,
  defaultMyProfileData,
  type MyProfileData
} from './my-profile'
import {
  mapLogoutButtonData,
  defaultLogoutButtonData,
  type LogoutButtonData
} from './logout-button'
import { mapFaqData, defaultFaqData, type FaqData } from './faq'
import {
  mapContactUsData,
  defaultContactUsData,
  type ContactUsData
} from './contact-us'
import {
  mapPlusAddInsideProfileData,
  defaultPlusAddInsideProfileData,
  type PlusAddInsideProfileData
} from './plus-add-inside-profile'
import {
  BreakTheIceData,
  defaultBreakTheIceData,
  mapBreakTheIceData
} from './break_the_ice'
import {
  mapPrivacyPolicyData,
  defaultPrivacyPolicyData,
  type PrivacyPolicyData
} from './privacy'

import { TCMSResponse } from '@/api/types/CMSTypes'
import useAppSelector from '@/hooks/useSelector'
import { useMemo } from 'react'
import {
  defaultDidThatMakeYouLaughData,
  DidThatMakeYouLaughData,
  mapDidThatMakeYouLaughData
} from './did_that_make_you_laugh'
import {
  defaultVoteIsInData,
  mapVoteIsInData,
  type VoteIsInData
} from './vote_is_in'
import {
  defaultSerialChillerData,
  mapSerialChillerData,
  type SerialChillerData
} from './serial_chiller'
import {
  defaultMadeYouLolPopupData,
  MadeYouLolPopupData,
  mapMadeYouLolPopupData
} from './made_you_lol'
import {
  defaultTryingToPrankUsPopupData,
  mapTryingToPrankUsPopupData,
  TryingToPrankUsPopupData
} from './trying_to_prank_us'
import {
  AhemAhemPopupData,
  defaultAhemAhemPopupData,
  mapAhemAhemPopupData
} from './ahem_ahem_popup'
import {
  defaultEasyPeasyPopupData,
  EasyPeasyPopupData,
  mapEasyPeasyPopupData
} from './easy_peasy'
import { defaultLoginData, mapLoginData, type LoginData } from './login'
import { defaultOtpData, mapOtpData, type OtpData } from './otp'
import { defaultSignupData, mapSignupData, type SignupData } from './signup'
import {
  defaultLeaderboardData,
  LeaderboardData,
  mapLeaderboardData
} from './leaderboard'
import {
  EditProfileData,
  defaultEditProfileData,
  mapEditProfileData
} from './edit-profile'
import {
  defaultInviteCodeData,
  mapInviteCodeData,
  type InviteCodeData
} from './invite_code'
import {
  defaultSameReferPopupData,
  mapSameReferPopupData,
  SameReferPopupData
} from './same-refer'
import {
  defaultJokeBoxFilterData,
  IJokeBoxFilter,
  mapJokeBoxFilter
} from './joke_box_filter'
import {
  defaultJokeIsIn,
  IJokeIsInPopup,
  mapJokesIsInPopup
} from './joke_is_in_popup'
import {
  defaultUniqueCodeData,
  IUniqueCodeData,
  mapUniqueCodeData
} from './unique_code'
import {
  defaultThatWasQuickData,
  IThatWasQuickData,
  mapThatWasQuickData
} from './that_was_quick'
import {
  defaultSorryUniqueCodeData,
  ISorryUniqueCodeData,
  mapSorryUniqueCodeData
} from './sorry_unique_code'
import {
  defaultCheatCodeInviteData,
  ICheatCodeInviteData,
  mapCheatCodeInviteData
} from './cheat_code_invite'
import {
  defaultSendAgainPopupData,
  SendAgainPopupData,
  mapSendAgainPopupData
} from './send_again'
import {
  defaultValidationData,
  ValidationData,
  mapValidationData
} from './validation-text'
import {
  defaultReportPopupData,
  IReportPopupData,
  mapReportPopupData
} from './joke_report_popup'
import {
  defaultThandRakhPopupData,
  IThandRakhPopupData,
  mapThandRakhPopupData
} from './thand_rakh_popup'

// Combined interface for all CMS data
export interface AllCMSData {
  homePage: HomePageData
  navBar: NavBarData
  scrollAndLol: ScrollAndLolData
  pjChallenge: PjChallengeData
  jokeBox: JokeBoxData
  hallOfLame: HallOfLameData
  referAFriend: ReferAFriendData
  contest: ContestData
  webFooter: WebFooterData
  comic: ComicData
  navFooter: NavFooterData
  haveAnInviteCode: HaveAnInviteCodeData
  myProfile: MyProfileData
  logoutButton: LogoutButtonData
  faq: FaqData
  contactUs: ContactUsData
  plusAddInsideProfile: PlusAddInsideProfileData
  breakTheIce: BreakTheIceData
  didThatMakeYouLaugh: DidThatMakeYouLaughData
  voteIsIn: VoteIsInData
  serialChiller: SerialChillerData
  madeYouLoL: MadeYouLolPopupData
  tryingToPrankUs: TryingToPrankUsPopupData
  ahemAhem: AhemAhemPopupData
  easyPeasy: EasyPeasyPopupData
  privacyPolicy: PrivacyPolicyData
  login: LoginData
  otp: OtpData
  signup: SignupData
  leaderboard: LeaderboardData
  editProfile: EditProfileData
  inviteCode: InviteCodeData
  sameRefer: SameReferPopupData
  jokeBoxFilter: IJokeBoxFilter
  jokeIsIn: IJokeIsInPopup
  uniqueCode: IUniqueCodeData
  thatWasQuick: IThatWasQuickData
  sorryUniqueCode: ISorryUniqueCodeData
  cheatCodeInvite: ICheatCodeInviteData
  sendAgain: SendAgainPopupData
  validation: ValidationData
  reportPopup: IReportPopupData
  thandRakh: IThandRakhPopupData
}

// Hook to get all mapped CMS data
export const useCMSData = (mounted: boolean = true): AllCMSData => {
  const { homePageContent } = useAppSelector(state => state.cms)

  return useMemo(() => {
    if (!mounted) {
      // Return default data for SSR/hydration
      return {
        homePage: defaultHomePageData,
        navBar: defaultNavBarData,
        scrollAndLol: defaultScrollAndLolData,
        pjChallenge: defaultPjChallengeData,
        jokeBox: defaultJokeBoxData,
        hallOfLame: defaultHallOfLameData,
        referAFriend: defaultReferAFriendData,
        contest: defaultContestData,
        webFooter: defaultWebFooterData,
        comic: defaultComicData,
        navFooter: defaultNavFooterData,
        haveAnInviteCode: defaultHaveAnInviteCodeData,
        myProfile: defaultMyProfileData,
        logoutButton: defaultLogoutButtonData,
        faq: defaultFaqData,
        contactUs: defaultContactUsData,
        plusAddInsideProfile: defaultPlusAddInsideProfileData,
        breakTheIce: defaultBreakTheIceData,
        didThatMakeYouLaugh: defaultDidThatMakeYouLaughData,
        voteIsIn: defaultVoteIsInData,
        serialChiller: defaultSerialChillerData,
        madeYouLoL: defaultMadeYouLolPopupData,
        tryingToPrankUs: defaultTryingToPrankUsPopupData,
        ahemAhem: defaultAhemAhemPopupData,
        easyPeasy: defaultEasyPeasyPopupData,
        privacyPolicy: defaultPrivacyPolicyData,
        login: defaultLoginData,
        otp: defaultOtpData,
        signup: defaultSignupData,
        leaderboard: defaultLeaderboardData,
        editProfile: defaultEditProfileData,
        inviteCode: defaultInviteCodeData,
        sameRefer: defaultSameReferPopupData,
        jokeBoxFilter: defaultJokeBoxFilterData,
        jokeIsIn: defaultJokeIsIn,
        uniqueCode: defaultUniqueCodeData,
        thatWasQuick: defaultThatWasQuickData,
        sorryUniqueCode: defaultSorryUniqueCodeData,
        cheatCodeInvite: defaultCheatCodeInviteData,
        sendAgain: defaultSendAgainPopupData,
        validation: defaultValidationData,
        reportPopup: defaultReportPopupData,
        thandRakh: defaultThandRakhPopupData
      }
    }

    // Return mapped data from CMS
    return {
      homePage: mapHomePageData(homePageContent),
      navBar: mapNavBarData(homePageContent),
      scrollAndLol: mapScrollAndLolData(homePageContent),
      pjChallenge: mapPjChallengeData(homePageContent),
      jokeBox: mapJokeBoxData(homePageContent),
      hallOfLame: mapHallOfLameData(homePageContent),
      referAFriend: mapReferAFriendData(homePageContent),
      contest: mapContestData(homePageContent),
      webFooter: mapWebFooterData(homePageContent),
      comic: mapComicData(homePageContent),
      navFooter: mapNavFooterData(homePageContent),
      haveAnInviteCode: mapHaveAnInviteCodeData(homePageContent),
      myProfile: mapMyProfileData(homePageContent),
      logoutButton: mapLogoutButtonData(homePageContent),
      faq: mapFaqData(homePageContent),
      contactUs: mapContactUsData(homePageContent),
      plusAddInsideProfile: mapPlusAddInsideProfileData(homePageContent),
      breakTheIce: mapBreakTheIceData(homePageContent),
      didThatMakeYouLaugh: mapDidThatMakeYouLaughData(homePageContent),
      voteIsIn: mapVoteIsInData(homePageContent),
      serialChiller: mapSerialChillerData(homePageContent),
      madeYouLoL: mapMadeYouLolPopupData(homePageContent),
      tryingToPrankUs: mapTryingToPrankUsPopupData(homePageContent),
      ahemAhem: mapAhemAhemPopupData(homePageContent),
      easyPeasy: mapEasyPeasyPopupData(homePageContent),
      privacyPolicy: mapPrivacyPolicyData(homePageContent),
      login: mapLoginData(homePageContent),
      otp: mapOtpData(homePageContent),
      signup: mapSignupData(homePageContent),
      leaderboard: mapLeaderboardData(homePageContent),
      editProfile: mapEditProfileData(homePageContent),
      inviteCode: mapInviteCodeData(homePageContent),
      sameRefer: mapSameReferPopupData(homePageContent),
      jokeBoxFilter: mapJokeBoxFilter(homePageContent),
      jokeIsIn: mapJokesIsInPopup(homePageContent),
      uniqueCode: mapUniqueCodeData(homePageContent),
      thatWasQuick: mapThatWasQuickData(homePageContent),
      sorryUniqueCode: mapSorryUniqueCodeData(homePageContent),
      cheatCodeInvite: mapCheatCodeInviteData(homePageContent),
      sendAgain: mapSendAgainPopupData(homePageContent),
      validation: mapValidationData(homePageContent),
      reportPopup: mapReportPopupData(homePageContent),
      thandRakh: mapThandRakhPopupData(homePageContent)
    }
  }, [homePageContent, mounted])
}

// Individual mapping functions for specific pages
export const mapAllCMSData = (
  cmsData: TCMSResponse['data'] | null
): AllCMSData => {
  return {
    homePage: mapHomePageData(cmsData),
    navBar: mapNavBarData(cmsData),
    scrollAndLol: mapScrollAndLolData(cmsData),
    pjChallenge: mapPjChallengeData(cmsData),
    jokeBox: mapJokeBoxData(cmsData),
    hallOfLame: mapHallOfLameData(cmsData),
    referAFriend: mapReferAFriendData(cmsData),
    contest: mapContestData(cmsData),
    webFooter: mapWebFooterData(cmsData),
    comic: mapComicData(cmsData),
    navFooter: mapNavFooterData(cmsData),
    haveAnInviteCode: mapHaveAnInviteCodeData(cmsData),
    myProfile: mapMyProfileData(cmsData),
    logoutButton: mapLogoutButtonData(cmsData),
    faq: mapFaqData(cmsData),
    contactUs: mapContactUsData(cmsData),
    plusAddInsideProfile: mapPlusAddInsideProfileData(cmsData),
    breakTheIce: mapBreakTheIceData(cmsData),
    didThatMakeYouLaugh: mapDidThatMakeYouLaughData(cmsData),
    voteIsIn: mapVoteIsInData(cmsData),
    serialChiller: mapSerialChillerData(cmsData),
    madeYouLoL: mapMadeYouLolPopupData(cmsData),
    tryingToPrankUs: mapTryingToPrankUsPopupData(cmsData),
    ahemAhem: mapAhemAhemPopupData(cmsData),
    easyPeasy: mapEasyPeasyPopupData(cmsData),
    privacyPolicy: mapPrivacyPolicyData(cmsData),
    login: mapLoginData(cmsData),
    otp: mapOtpData(cmsData),
    signup: mapSignupData(cmsData),
    leaderboard: mapLeaderboardData(cmsData),
    editProfile: mapEditProfileData(cmsData),
    inviteCode: mapInviteCodeData(cmsData),
    sameRefer: mapSameReferPopupData(cmsData),
    jokeBoxFilter: mapJokeBoxFilter(cmsData),
    jokeIsIn: mapJokesIsInPopup(cmsData),
    uniqueCode: mapUniqueCodeData(cmsData),
    thatWasQuick: mapThatWasQuickData(cmsData),
    sorryUniqueCode: mapSorryUniqueCodeData(cmsData),
    cheatCodeInvite: mapCheatCodeInviteData(cmsData),
    sendAgain: mapSendAgainPopupData(cmsData),
    validation: mapValidationData(cmsData),
    reportPopup: mapReportPopupData(cmsData),
    thandRakh: mapThandRakhPopupData(cmsData)
  }
}
