"use client";
import Header from "@/components/common/Header/Header";
import MobileTempNavBar from "@/components/common/MobileTempNavBar";
import ScreenWrapper from "@/components/common/ScreenWrapper";
import React from "react";

const termsContent = [
  {
    id: 1,
    content: (
      <>
        You Agree to These Terms by Using this Site. Your access to, and use of,
        the website{" "}
        <a
          className="text-[#1985d3] cursor-pointer hover:underline"
          href="https://sprite-joke-in-a-bottle.coke2home.com/"
          target="_blank"
        >
          https://sprite-joke-in-a-bottle.coke2home.com/
        </a>{" "}
        (&apos;Site&apos;) is subject to the following Terms of Use and all
        applicable laws and regulations. The most current version of the Terms
        of Use may be accessed by clicking on the &apos;Terms & Conditions&apos;
        hypertext link located at the bottom of the Site. By accessing and using
        the Site, you accept, without limitation or qualification, these Terms
        of Use, and acknowledge that any other agreements between you and The
        Coca Cola Company which shall include its direct or indirect
        subsidiaries and affiliated entities, including but not limited to
        Coca-Cola India Private Limited, (collectively referred hereon forward
        as &quot;TCCC&quot;) are superseded with respect to this subject matter.
        If you do not agree and accept, without limitation or qualification,
        these Terms of Use, please exit the Site.
      </>
    ),
  },
  {
    id: 2,
    content: (
      <>
        <strong>Ownership of Content:</strong> The Site and all of its contents
        including, but not limited to, all text, logos, videos and images
        (&quot;Content&quot;) are owned and copyrighted by The Coca-Cola Company
        or others with all rights reserved unless otherwise noted. This Site
        features logos, brand identities and other trademarks and service marks
        (collectively, the &quot;Marks&quot;) that are the registered and/or
        unregistered trademark of The Coca-Cola Company and/or its subsidiaries.
        Nothing contained on this Site should be construed as granting, by
        implication, estoppel, or otherwise, any license or right to use any
        Mark displayed on this Site without written permission of TCCC or any
        such third party that may own a Mark displayed on the Site. Your use of
        any Content, except as provided in these Terms of Use, without the
        written permission of the Content owner is strictly prohibited. You are
        also advised that The Coca-Cola Company will aggressively enforce
        its/their intellectual property rights to the fullest extent of the law,
        including the seeking of criminal prosecution.
      </>
    ),
  },
  {
    id: 3,
    content: (
      <>
        <strong>Use of the Site and Age Limit.</strong> The Site is intended for
        audiences of the age 18 and above only.
      </>
    ),
  },
  {
    id: 4,
    content: (
      <>
        <strong>Your Use of the Site:</strong> TCCC grants you permission to use
        the Site as follows:
        <ol className="list-[lower-alpha] pl-5 mt-2 space-y-2">
          <li>
            you may download Content, but only for non-commercial, personal use
            and provided that you also retain all copyright and other
            proprietary notices contained on the Content;
          </li>
          <li>
            you may not distribute, modify, copy (except as set forth above),
            transmit, display, reuse, reproduce, publish, license, create
            derivative works from, transfer, sell or otherwise use Content
            without TCCC&apos;s written permission;
          </li>
          <li>
            you are prohibited from using the Site to post or transmit any
            infringing, threatening, false, misleading, abusive, harassing,
            libelous, defamatory, vulgar, obscene, scandalous, inflammatory,
            pornographic, or profane material or any material that could
            constitute or encourage conduct that would be considered a criminal
            offense, give rise to civil liability, or otherwise violate any law.
            You may further not use the Site for any purpose that is unlawful or
            prohibited by these Terms of Use or any applicable laws. TCCC will
            fully cooperate with any law enforcement authorities or any court
            order requesting or directing TCCC to disclose the identity of
            anyone posting or transmitting any such information or materials, or
            any other information or materials; and
          </li>
          <li>
            you are prohibited from using the Site to advertise or perform any
            commercial solicitation. TCCC may periodically revise the Content
            and reserves the right to make such changes without any obligation
            to notify you.
          </li>
          <li>
            You are expressly prohibited from incorporating any of the material
            from this website in any other work, publication, or website of your
            own or belonging to another. You must not use any images or
            information or content on our website for commercial purposes
            without obtaining a license to do so from us or our licensors. Any
            unauthorised use of the images, information and content may violate
            copyright laws, other intellectual property laws, applicable privacy
            laws as well as communications regulations and statutes. We do not
            give any commitment that your use of materials displayed on our
            website will not infringe rights of third parties.
          </li>
          <li>
            Unauthorised use of the website or any content on the website
            (including without limitation any software made available through
            the website) may in certain jurisdictions result in monetary damages
            and other civil and criminal penalties including, without
            limitation, for copyright infringement.
          </li>
        </ol>
        <div className="mt-4">
          You may only use our website for lawful purposes. You must not:
          <ol className="list-[lower-alpha] pl-5 mt-2 space-y-1">
            <li>
              introduce viruses, trojans, worms, logic bombs, spyware or other
              computer code, file or program that is harmful or invasive or is
              intended to damage or hijack the operation of, or monitor the use
              of, any hardware, software or equipment.
            </li>
            <li>
              attempt to gain unauthorised access to our website, the server on
              which our website is stored, or any server, computer or database
              connected to our website.
            </li>
            <li>
              restrict or inhibit any person from using our website (including
              by hacking or defacing any portion of our website).
            </li>
            <li>
              modify, adapt, translate, reverse engineer, decompile or
              disassemble any portion of our website.
            </li>
            <li>
              remove any copyright, trademark or other proprietary rights notice
              from our website or from materials originating from our website.
            </li>
            <li>
              frame or mirror any part of our website without our express prior
              written consent.
            </li>
            <li>
              create a database by systematically downloading and storing all or
              any content accessible on our website.
            </li>
            <li>
              use any robot, spider, website search/retrieval application or
              other manual or automatic device to retrieve, index,
              &quot;scrape&quot;, &quot;data mine&quot; or in any way reproduce
              or circumvent the navigational structure or presentation of our
              website, without our express prior written consent.
            </li>
            <li>
              publish any unsolicited or unauthorised advertising, promotional
              materials, &quot;junk mail&quot;, &quot;spam&quot;, &quot;chain
              letters&quot;, &quot;pyramid scheme&quot; or investment
              opportunity, or any other form of solicitation.
            </li>
            <li>
              publish any material non-public information about a person or a
              company without the proper authorisation to do so.
            </li>
            <li>
              use our website for any illegal or unlawful purpose or activity.
            </li>
          </ol>
        </div>
      </>
    ),
  },
  {
    id: 5,
    content: (
      <>
        <strong>User-Generated Content.</strong> We may include features on our
        website that allow you to share your content with us and other users of
        our website. By sharing content through the website, your content may
        become publicly accessible. To the extent permitted by law, you hereby
        grant TCCC and its affiliated entities a worldwide, non-exclusive,
        transferable, royalty-free, perpetual, irrevocable right and licence,
        without compensation to you:
        <ol className="list-[lower-alpha] pl-5 mt-2 space-y-2">
          <li>
            to use, reproduce, distribute, adapt (including without limitation
            edit, modify, translate and reformat), derive, transmit, display and
            perform (publicly or otherwise) such content in any media now known
            or hereafter developed, for Coca-Cola India Private Limited and/or
            affiliated entities&apos; business purposes; and
          </li>
          <li>
            to sublicense the foregoing rights, through multiple tiers, to the
            maximum extent permitted by applicable law.
          </li>
        </ol>
        <div className="mt-4">
          The foregoing licences shall survive any termination of your use of
          our website, as further described below.
        </div>
        <div className="mt-4">
          For all the content you share through our website, you represent and
          warrant that you have all necessary rights for you to grant these
          licenses, and that such content complies with all applicable laws,
          rules and regulations and does not infringe or otherwise violate the
          copyright, trademark, trade secret, privacy or other intellectual
          property or other rights of any third party and is furthermore free
          from viruses and other malware.
        </div>
        <div className="mt-4">
          You further, to the extent permissible by law, irrevocably waive any
          &quot;moral rights&quot; or other rights with respect to attribution
          of authorship or integrity of materials regarding each item of user
          content that you submit.
        </div>
        <div className="mt-4">
          We do not solicit or encourage submissions of content containing ideas
          or suggestions relating to our website, our business or our affiliated
          entities&apos; businesses.
        </div>
      </>
    ),
  },
  {
    id: 6,
    content: (
      <>
        <strong>Privacy.</strong> Any personal data (for example, your name,
        address, telephone number or e-mail address) you transmit to the Site by
        electronic mail or otherwise will be used by Coca-Cola India Private
        Limited in accordance with the Site&apos;s Privacy Policy available at{" "}
        <a
          className="text-[#1985d3] cursor-pointer hover:underline"
          href="https://www.coca-cola.com/in/en"
          target="_blank"
        >
          https://www.coca-cola.com/in/en
        </a>
        . Any other communication or material you transmit to the Site, such as
        questions, comments, suggestions or the like, will be treated as
        non-confidential and non-proprietary.
      </>
    ),
  },
  {
    id: 7,
    content: (
      <>
        <strong>Disclaimer of Warranties.</strong> All Content is subject to
        change and is provided to you &quot;as is&quot; without any warranty of
        any kind, either expressed or implied, including, but not limited to,
        the implied warranties of merchantability, fitness for a particular
        purpose, or non-infringement. TCCC neither warrants nor represents that
        your use of any Content will not infringe the rights of any third
        parties nor that the Content will be accurate, complete, or up to date.
        We use all reasonable efforts to include accurate and up to date
        information in the Site. However, TCCC makes no warranties or
        representations as to the accuracy, correctness or reliability of the
        information contained in the Site. Accordingly, TCCC assumes no
        liability or responsibility for any omissions or errors (including,
        without limitation, typographical errors, and technical errors) in the
        Content of the Site. Information in the Site is subject to change
        without notice.
        <div className="mt-4">
          Additionally, with reference to any discussions, chats, postings,
          transmissions, bulletin boards, and the like that may be on the Site,
          TCCC assumes no responsibility or liability arising from any
          infringing, threatening, false, misleading, abusive, harassing,
          libelous, defamatory, vulgar, obscene, scandalous, inflammatory,
          pornographic, or profane material or any material that could
          constitute or encourage conduct that would be considered a criminal
          offense, give rise to civil liability, or otherwise violate any law,
          contained in any such locations on the Site.
        </div>
      </>
    ),
  },
  {
    id: 8,
    content: (
      <>
        <strong>Exclusion of Liability</strong> Your use of the site is at your
        own risk. Neither TCCC, nor any of its subsidiaries, affiliates,
        officers or directors, nor any of its agents or any other party involved
        in creating, producing, or delivering the site, are liable for any
        direct, indirect, punitive, incidental, special, consequential or other
        damages arising out of or in any way connected with the use of this site
        or content whether based on contract, tort, strict liability or
        otherwise, for, without limitation damages for lost profits, loss of
        goodwill, loss of data, work stoppage, accuracy of results, computer
        failure or malfunction, even if advised of the possibility of any such
        damages.
      </>
    ),
  },
  {
    id: 9,
    content: (
      <>
        <strong>Indemnification:</strong> You agree to defend, indemnify and
        hold TCCC harmless from and against any and all claims, damages, costs
        and expenses, including advocate&apos;s fees, arising from and related
        to your use of the Site
      </>
    ),
  },
  {
    id: 10,
    content: (
      <>
        <strong>Links to Third Party Sites:</strong> The Site may contain links
        to sites owned or operated by parties other than TCCC. Such links are
        provided for your convenience only. TCCC does not control, and is not
        responsible for, the content or privacy policies on, or the security of,
        such sites. Without limiting the foregoing, TCCC specifically disclaims
        any responsibility if such sites:
        <ol className="list-[lower-alpha] pl-5 mt-2 space-y-1">
          <li>infringe any third party&apos;s intellectual property rights;</li>
          <li>are inaccurate, incomplete or misleading;</li>
          <li>are not merchantable or fit for a particular purpose;</li>
          <li>do not provide adequate security;</li>
          <li>contain viruses or other items of a destructive nature; or</li>
          <li>are libelous or defamatory.</li>
        </ol>
        <div className="mt-4">
          Neither does TCCC endorse the content, or any products or services
          available, on such sites. If you establish a link to such sites or the
          Site, you do so at your own risk and without the permission of TCCC.
        </div>
      </>
    ),
  },
  {
    id: 11,
    content: (
      <>
        <strong>Revisions and Suspension of Terms:</strong> TCCC may at any
        time, and without notice, revise these Terms of Use by updating this
        posting. You are bound by any such revisions and should therefore
        periodically visit this page to review the current Terms of Use. Without
        prejudice to the Effective Duration of the Site, We do not guarantee
        that our website, or any content on it, will always be accessible or be
        uninterrupted. We may suspend or withdraw or restrict the availability
        of all or any part of our website for business and operational reasons.
        We will endeavor to give you reasonable notice of any suspension or
        withdrawal. We accept no liability or responsibility for any access
        issues you may experience.
      </>
    ),
  },
  {
    id: 12,
    content: (
      <>
        <strong>Law and Jurisdiction:</strong> These Terms of Use and your use
        of the Site are governed by the laws of India, without regard to its
        choice of law provisions. The courts of competent jurisdiction located
        in Gurgaon will have exclusive jurisdiction over any and all disputes
        arising out of, relating to or concerning these Terms of Use and/or the
        Site or in which these Terms of Use and/or the Site are a material fact.
      </>
    ),
  },
  {
    id: 13,
    content: (
      <>
        <strong>Account Registration:</strong> To use certain portions of the
        Sites, you may be required to create an account (&quot;Account&quot;)
        and create a password. To create an Account, you must have a unique,
        valid email address or mobile number, as may be applicable. Accounts
        cannot be shared. Your username and password are for your personal use
        only and should be kept confidential. Each individual can have only one
        (1) Account. If you attempt to exceed this limit in any way, we reserve
        the right, in our sole discretion, to lock, disable, block or delete
        your Account(s).
      </>
    ),
  },
  {
    id: 14,
    content: (
      <>
        Any sweepstakes, contests, challenges, activities, surveys, or similar
        promotions made available through the Sites may be governed by specific
        rules that are separate from these Terms. By participating in any such
        sweepstakes, contest, challenge, activity, survey, or promotion, you
        will become subject to those rules, which may vary from the terms and
        conditions set forth herein. We urge you to read the applicable rules,
        which are linked from the particular activity, and to review our Privacy
        Policy which, in addition to these Terms, governs any information you
        submit in connection with such activities. If you engage in any
        fraudulent or unsportsmanlike activity or act contrary to the applicable
        rules, these Terms or any laws, your participation and Account
        privileges may be suspended or terminated, resulting in the loss of
        offers, prizes or other items.
        <div className="mt-4">
          The &quot;Sprite&reg; Joke-in-a-Bottle&quot; website is an ongoing
          platform for consumer engagement. Upon registering on the Website,
          individuals may participate in various activities and accumulate Comic
          Coins (as defined herein). These Comic Coins can be utilized in
          upcoming promotions on the Website, subject to the terms and
          conditions specific to each promotion. Participants must adhere to the
          terms and conditions applicable to each individual promotion, in
          addition to these Terms of Use, which may be updated from time to time
        </div>
        <div className="mt-4">
          The Comic Coins associated with Sprite&reg; Joke-in-a-Bottle
          (&quot;Comic Coins&quot;) collected are not digital currency and only
          strictly for promotional engagement on this Campaign Website and hold
          no monetary value. Comic coins are not transferrable outside this
          Campaign Website or to any third party within the Campaign Website.
          They are not a currency and cannot be exchanged for cash or any form
          of legal tender. The use of these Comic Coins is limited to the
          activities and rewards within the confines of this promotion and are
          intended to enhance your experience while engaging with our
          promotional content.
        </div>
      </>
    ),
  },
  {
    id: 15,
    content: (
      <>
        <strong>Information or Complaints.</strong> If you have a question or
        complaint regarding the Site, please send an e-mail to{" "}
        <a
          className="text-[#1985d3] cursor-pointer hover:underline"
          href="mailto:indiahelpline@coca-cola.com"
        >
          indiahelpline@coca-cola.com
        </a>{" "}
        You may also contact us by calling us at 1800-208-2653.
        <div className="mt-4">
          Copyright &copy; 2025 The Coca-Cola Company. All rights reserved.
        </div>
      </>
    ),
  },
];

const spriteRefreshRingsTerms = [
  {
    id: 1,
    content: (
      <>
        The <strong>Sprite&reg; Refresh Rings</strong> campaign{" "}
        <strong>(&quot;Campaign&quot;)</strong> is organized by Coca-Cola India
        Private Limited(&quot;CCIPL&quot;) wherein individuals upon purchasing a
        250ml, 600ml, or 750ml PET bottle of Sprite&reg; and sharing an image of
        the Sprite&reg; bottle by scanning the QR code available at select
        outlets will receive one (1) Phone Pe voucher worth Rs.10/-once per
        mobile number in accordance with the terms and conditions mentioned
        herein.
      </>
    ),
  },
  {
    id: 2,
    content: (
      <>
        The Campaign is valid only for individuals over 18 years of age,
        residing in{" "}
        <strong>
          Andhra Pradesh, Telangana, Uttar Pradesh, Maharashtra, West Bengal and
          Bihar
        </strong>{" "}
        only.
      </>
    ),
  },
  {
    id: 3,
    content: (
      <>
        The Campaign is valid from 7th March 2025 to 31st Dec 2025
        (&quot;Campaign Period&quot;). Any entries received outside this period
        shall not be eligible for the Voucher(s) and shall not be carried
        forward to any other promotional scheme ahead.
      </>
    ),
  },
  {
    id: 4,
    content: (
      <>
        All individuals shall get one (1) Phone Pe voucher worth Rs.10/-
        (&quot;Voucher&quot;) once per mobile number on sharing an image of one
        (1) 250ml or 600ml or 750ml PET bottle of Sprite&reg; to confirm the
        purchase and subsequently receive Joke-In-A-Bottle content (&quot;JIAB
        Content&quot;) six (6) times per mobile number subject to clause 6
        below.
      </>
    ),
  },
  {
    id: 5,
    content: (
      <>
        A Participant may scan and share images multiple times, but is eligible
        to get the Voucher only once per mobile number during the Campaign
        Period and receive the JIAB Content six (6) times per mobile number
        during the Campaign Period.
      </>
    ),
  },
  {
    id: 6,
    content: (
      <>
        To avail the Campaign benefits, the individual must:
        <ol className="list-[lower-alpha] pl-5 mt-2 space-y-2">
          <li>
            Scan the QR code available at the select outlet to visit Sprite&reg;
            official WhatsApp channel.
          </li>
          <li>
            By registering, consent to the Terms & Conditions and the handling
            of personal information as per the Privacy Policy posted on the
            Sprite&reg; official WhatsApp channel.
          </li>
          <li>
            After registration, share a photo of the Sprite&reg; bottle
            purchased on Sprite&reg; official WhatsApp channel. The collected
            photos shall not be utilized for commercial or any other purposes.
          </li>
          <li>The PhonePe Voucher is valid only till 31st December 2025.</li>
        </ol>
      </>
    ),
  },
  {
    id: 7,
    content: (
      <>
        There shall be up to hundred (100) entries that receive a PhonePe
        Voucher per day per QR code, during the Campaign Period. The number of
        PhonePe vouchers given may be lesser depending on the number of entries
        received in accordance with Clause 6 above.
        <div className="mt-4">
          <strong>Campaign Mechanism and Selection Criteria:</strong>
          <ol className="list-[upper-alpha] pl-5 mt-2 space-y-2">
            <li>
              Entries that fulfil all the guidelines mentioned herein shall be
              considered as valid and eligible to get the Voucher.
            </li>
            <li>
              CCIPL shall not be liable for any delay or non-receipt of Voucher
              by the Winner due to any act of third-party partners.
            </li>
            <li>
              Participants must redeem their Voucher(s) within 31st December
              2025 to prevent forfeiture.
            </li>
            <li>
              Any forfeiture exercised will be binding and final on the
              participants.
            </li>
          </ol>
        </div>
      </>
    ),
  },
  {
    id: 8,
    content: (
      <>
        It is expressly clarified that any Entry which falls under any of the
        following criteria will not be considered a Valid Entry under these
        Terms and Conditions and will be immediately disqualified from being
        eligible for the Voucher:
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>
            Images or posts that is not in accordance with the social media
            Platform (and/or CCIPL) Guidelines or applicable law;
          </li>
          <li>
            Images or posts containing objectionable or obscene content (such as
            pornography, nude pictures, objectionable gestures, etc.);
          </li>
          <li>
            Images or posts containing offensive or inflammatory content such as
            swear words or content that explicitly or implicitly demonstrate
            discrimination based on colour, community, caste, creed, nationality
            etc.;
          </li>
          <li>
            Images or posts that contain any content that maligns The Coca-Cola
            Company, CCIPL or any of the beverages of the brands owned by The
            Coca-Cola Company;
          </li>
          <li>
            Images or posts that contain images or references to competitors of
            CCIPL in the background;
          </li>
          <li>
            Images or posts that contain politically themed images such as
            photographs of political leaders, party signs, symbols or logos;
          </li>
          <li>
            Any comment or image/video that contains content which violates
            copyright laws or the intellectual property rights of a third party.
          </li>
          <li>
            Any picture that doesn&apos;t show Sprite&reg; bottle clearly.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 9,
    content: (
      <>
        CCIPL reserves the right to amend, modify or cancel the Campaign without
        any prior notice. It is Participant&apos;s sole responsibility to review
        these Terms & Conditions periodically for updates or changes.
      </>
    ),
  },
  {
    id: 10,
    content: (
      <>
        CCIPL assumes no liability or responsibility for:
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>
            Any errors, omissions or inaccuracies of content or Entry/ies or
            Participant&apos;s personal details.
          </li>
          <li>
            Personal injury or property damage of any nature resulting from
            Participant&apos;s access to, Participant&apos;s exposure to or
            Participant&apos;s participation in the Campaign.
          </li>
          <li>
            Technical failure or any other causes beyond the control of CCIPL.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 11,
    content: (
      <>
        At CCIPL&apos;s request, individuals with valid entries as per these
        terms agree to participate in all promotional activity (such as
        publicity and photography) surrounding receiving the Voucher, free of
        charge, and they consent to CCIPL using their name, likeness, image
        and/or voice (including photograph, film and/or recording of the same),
        along with the use of their submissions in whichever form, in
        promotional material or in any media, without remuneration for the
        purpose of promoting this Campaign and promoting any products
        manufactured, distributed, marketed and/or supplied under the trademarks
        owned by The Coca-Cola Company.
      </>
    ),
  },
  {
    id: 12,
    content: <>No cash payment will be made in lieu of the Voucher.</>,
  },
  {
    id: 13,
    content: (
      <>
        The Voucher is personal to the mobile number of each individual and is
        not transferable and cannot be sold under any circumstances.
      </>
    ),
  },
  {
    id: 14,
    content: (
      <>
        CCIPL shall not be responsible for any loss, injury or any other
        liability arising out of the Campaign or due to participation by any
        person in the Campaign.
      </>
    ),
  },
  {
    id: 15,
    content: (
      <>
        CCIPL shall not be liable for any loss or damage due to the Act of God,
        Governmental actions, epidemic, pandemic, other force majeure
        circumstances and shall not be liable to pay any amount as compensation
        or otherwise for any such loss with respect to the Voucher.
      </>
    ),
  },
  {
    id: 16,
    content: (
      <>
        Content of Entries and all related rights shall remain the exclusive
        property of CCIPL.
      </>
    ),
  },
  {
    id: 17,
    content: (
      <>
        No portion of the Vouchers offered under the Campaign is redeemable for
        cash. The Vouchers are also not refundable or transferable.
      </>
    ),
  },
  {
    id: 18,
    content: (
      <>
        No Voucher will be awarded if the information presented by the
        individual at the time of entering the Campaign, or at any subsequent
        stage is factually incorrect.
      </>
    ),
  },
  {
    id: 19,
    content: (
      <>
        If an individual is dissatisfied with the Campaign or the Campaign
        Terms, his/her sole and exclusive remedy is to not participate in the
        Campaign.
      </>
    ),
  },
  {
    id: 20,
    content: (
      <>
        Successfully entering the Campaign and receiving the Voucher is subject
        to all requirements set forth herein.
      </>
    ),
  },
  {
    id: 21,
    content: (
      <>
        The Campaign shall be governed and construed in accordance with Indian
        laws. All disputes relating to this Campaign shall be subject to the
        exclusive jurisdiction of Courts at Gurgaon only.
      </>
    ),
  },
  {
    id: 22,
    content: <>CCIPL&apos;s decision shall be final in all respects.</>,
  },
];

const page: React.FC = () => {
  return (
    <>
      <MobileTempNavBar title="Terms and Conditions" />
      <ScreenWrapper className="px-4 md:mt-0 mt-[-30px]">
        <Header
          title="Terms and Conditions"
          className="md:block hidden mt-[100px]"
        />

        <div className="mb-10">
          <div className="mt-[2.4rem]">
            <h2 className="md:text-xl text-xs font-bold mb-4 underline">
              JIAB Terms and Conditions
              <br />
              <a href="#sprite-refresh-rings" className="cursor-pointer">
                Refresh Rings Terms and Conditions
              </a>
            </h2>
          </div>
          {/* General Terms Content */}
          <div className="mt-[2.4rem]">
            <ol className="list-decimal pl-5 md:text-xl text-xs marker:font-bold marker:text-black space-y-4">
              {termsContent.map((term) => (
                <li key={term.id}>{term.content}</li>
              ))}
            </ol>
          </div>

          {/* Sprite Refresh Rings Terms */}
          <div className="mt-8" id="sprite-refresh-rings">
            <h2 className="md:text-xl text-xs font-bold mb-4 underline text-center">
              SPRITE&reg; Refresh Rings <br />
              Terms and Conditions
            </h2>
            <p className="md:text-xl text-xs mb-4">
              By participating in this campaign, each Participant is indicating
              his/her agreement to be bound by the following Terms and
              Conditions:
            </p>
            <ol className="list-decimal pl-5 md:text-xl text-xs marker:font-bold marker:text-black space-y-4">
              {spriteRefreshRingsTerms.map((term) => (
                <li key={term.id}>{term.content}</li>
              ))}
            </ol>
          </div>
        </div>
      </ScreenWrapper>
    </>
  );
};

export default page;
