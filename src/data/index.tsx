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

import { TCMSResponse } from '@/api/types/CMSTypes'
import useAppSelector from '@/hooks/useSelector'
import { useMemo } from 'react'
import {
  defaultDidThatMakeYouLaughData,
  DidThatMakeYouLaughData,
  mapDidThatMakeYouLaughData
} from './did_that_make_you_laugh'
import { defaultVoteIsInData, mapVoteIsInData, type VoteIsInData } from './vote_is_in'
import {
  defaultSerialChillerData,
  mapSerialChillerData,
  type SerialChillerData
} from './serial_chiller'
import { defaultMadeYouLolPopupData, MadeYouLolPopupData, mapMadeYouLolPopupData } from './made_you_lol'
import { defaultTryingToPrankUsPopupData, mapTryingToPrankUsPopupData, TryingToPrankUsPopupData } from './trying_to_prank_us'
import { AhemAhemPopupData, defaultAhemAhemPopupData, mapAhemAhemPopupData } from './ahem_ahem_popup'
import { defaultEasyPeasyPopupData, EasyPeasyPopupData, mapEasyPeasyPopupData } from './easy_peasy'

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
        easyPeasy: defaultEasyPeasyPopupData
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
      easyPeasy: mapEasyPeasyPopupData(homePageContent)
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
    easyPeasy: mapEasyPeasyPopupData(cmsData)
  }
}
