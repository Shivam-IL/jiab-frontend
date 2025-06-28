import React, { useEffect, useRef, useState } from 'react'
import AktivGroteskText from '../AktivGroteskText'
import { ICONS_NAMES, SAVE } from '@/constants'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import GreenCTA from '@/components/GreenCTA'
import SvgIcons from '../SvgIcons'
import {
  useGetUserProfileDetails,
  useGetUserQuestions,
  useSubmitUserQuestions
} from '@/api/hooks/ProfileHooks'
import { updateBalance } from '@/store/profile/profile.slice'
import useAppDispatch from '@/hooks/useDispatch'
import useAppSelector from '@/hooks/useSelector'
import { useSendCDPEvent } from '@/api/hooks/CDPHooks'
import {
  CDPEventPayloadBuilder,
  QuestionCDPPayload
} from '@/api/utils/cdpEvents'
import { ILanguage } from '@/store/reference'
import { useCMSData } from '@/data'

interface IOption {
  id: number
  display_order: number
  option_text: string
}

interface IQuestion {
  id: number
  question_text: string
  language_id: string
  isAnswered: boolean
  options: IOption[]
  ques_point: number
  selected_option?: number
}

// Utility function to map and transform API question response
const mapQuestionResponse = (
  questions: IQuestion[],
  languageId: string
): IQuestion[] => {
  return questions.map((item: IQuestion) => {
    // Sort options based on display_order
    const sortedOptions =
      item?.options?.sort((a, b) => a.display_order - b.display_order) || []

    return {
      ...item,
      options: sortedOptions,
      language_id: languageId,
      // Preserve selected_option if it exists, otherwise set as undefined
      selected_option: item.selected_option || undefined
    }
  })
}

// Utility function to check submission status
const checkSubmissionStatus = (questions: IQuestion[]) => {
  let isSubmitted = false
  let isSaved = false

  questions.forEach((question: IQuestion, index: number) => {
    if (question?.selected_option && index === 0) {
      isSaved = true
    }
    if (question?.selected_option && index === questions.length - 1) {
      isSubmitted = true
    }
  })

  return { isSubmitted, isSaved }
}

const HelpUsToKnowYourBetter = ({
  prevButtonText,
  nextButtonText,
  id
}: {
  prevButtonText: string
  nextButtonText: string
  id: string
}) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Get mapped CMS data using our data layer
  const cmsData = useCMSData(mounted)

  const { user } = useAppSelector(state => state.profile)
  const [selectedQuestion, setSelectedQuestion] = useState<IQuestion | null>(
    null
  )
  const [submittedCheck, setSubmittedCheck] = useState<boolean>(false)
  const [allQuestions, setAllQuestions] = useState<IQuestion[]>([])
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(0)
  const [questionIdSubmitted, setQuestionIdSubmitted] = useState<number | null>(
    null
  )
  const [savedCheck, setSavedCheck] = useState<boolean>(false)

  const { selectedLanguage } = useAppSelector(state => state.language)
  const { languages } = useAppSelector(state => state.reference)
  const [selectedLanguageId, setSelectedLanguageId] = useState<string>('')
  const mountRef = useRef(false)

  const { data: userProfileQuestions } = useGetUserQuestions({
    language_id: selectedLanguageId
  })
  const { mutate: submitUserQuestions, data: submitQuestionResponse } =
    useSubmitUserQuestions()
  const { mutate: sendCDPEvent } = useSendCDPEvent()

  const dispatch = useAppDispatch()
  const { data: userProfileData } = useGetUserProfileDetails({
    questionIdSubmitted
  })
  const [questionSubmitted, setQuestionSubmitted] = useState<boolean>(false)

  useEffect(() => {
    if (selectedLanguage) {
      const languageId =
        languages?.find(
          (language: ILanguage) => language.language_key === selectedLanguage
        )?.id ?? '1'
      const newLanguageId = languageId?.toString() ?? '1'

      if (newLanguageId !== selectedLanguageId) {
        setSelectedLanguageId(newLanguageId)
        setAllQuestions([])
        setSelectedQuestion(null)
        setCurrentQuestionNumber(0)
        setSubmittedCheck(false)
        setSavedCheck(false)
        setQuestionIdSubmitted(null)
        setQuestionSubmitted(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLanguage, languages])

  // Re-map API response when userProfileQuestions data changes
  useEffect(() => {
    if (userProfileQuestions?.ok && selectedLanguageId && !questionSubmitted) {
      // Transform and map the API response using utility function
      const modifiedData = mapQuestionResponse(
        userProfileQuestions.data,
        selectedLanguageId
      )

      console.log('modifiedData', modifiedData)
      console.log('first', modifiedData?.[0])

      setAllQuestions(modifiedData)

      console.log('userProfileQuestions', modifiedData)
      console.log('modifiedData', modifiedData?.[0])
      // Set the first question as selected if available
      if (modifiedData.length > 0) {
        setSelectedQuestion(modifiedData[0])
        setCurrentQuestionNumber(1)
      }

      // Check submission and save status using utility function
      const { isSubmitted, isSaved } = checkSubmissionStatus(modifiedData)

      setSubmittedCheck(isSubmitted)
      setSavedCheck(isSaved)
      mountRef.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfileQuestions, selectedLanguageId])

  useEffect(() => {
    if (currentQuestionNumber === allQuestions?.length) {
      const question = allQuestions?.[currentQuestionNumber - 1]
      if (question?.selected_option) {
        setSubmittedCheck(true)
      } else {
        setSubmittedCheck(false)
      }
    } else {
      const question = allQuestions?.[currentQuestionNumber - 1]
      if (question?.selected_option) {
        setSavedCheck(true)
      } else {
        setSavedCheck(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionNumber])

  useEffect(() => {
    if (userProfileData?.ok) {
      const { data } = userProfileData?.data ?? {}
      dispatch(updateBalance({ current_balance: data?.current_balance }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfileData])

  const trigerQuestionCDPEvent = (optionId: number) => {
    if (user?.id && user?.phone_number && optionId) {
      const payload: QuestionCDPPayload =
        CDPEventPayloadBuilder.buildQuestionPayload(
          optionId,
          user?.phone_number,
          user?.id
        )
      sendCDPEvent(payload)
    }
  }

  useEffect(() => {
    if (submitQuestionResponse?.ok) {
      if (selectedQuestion?.selected_option) {
        trigerQuestionCDPEvent(selectedQuestion?.selected_option)
      }
      setAllQuestions(prev => {
        const newQuestions = [...prev]
        newQuestions[currentQuestionNumber - 1].selected_option =
          selectedQuestion?.selected_option
        return newQuestions
      })
      if (currentQuestionNumber === allQuestions?.length) {
        setSubmittedCheck(true)
      } else {
        setSavedCheck(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitQuestionResponse])

  return (
    <div
      className='bg-white w-full rounded-[5px] md:rounded-[20px] py-[16px] md:py-[44px] px-[14px] md:px-[33px] flex flex-col gap-[8px] md:gap-[20px]'
      id={id}
    >
      <AktivGroteskText
        text={cmsData?.myProfile?.helpUsKnowMore}
        fontSize='text-[16px] md:text-[28px]'
        fontWeight='font-[700]'
      />
      <div>
        {selectedQuestion && (
          <div className='w-full' key={selectedQuestion.id}>
            <div className='w-full flex'>
              <div className='min-w-[90%]'>
                <AktivGroteskText
                  text={selectedQuestion.question_text}
                  fontSize='text-[12px] md:text-[24px]'
                  fontWeight='font-[700]'
                />
              </div>
              <div className='w-[10%] flex justify-end'>
                <AktivGroteskText
                  fontSize='text-[10px] md:text-[20px]'
                  fontWeight='font-[700]'
                  text={currentQuestionNumber?.toString()}
                />
                <AktivGroteskText
                  fontSize='text-[10px] md:text-[20px]'
                  fontWeight='font-[700]'
                  text={`/${allQuestions?.length}`}
                />
              </div>
            </div>
            <div className='pt-[24px] md:pt-[20px] pb-[34px] md:pb-[32px]'>
              <RadioGroup
                value={selectedQuestion?.selected_option?.toString()}
                onValueChange={value => {
                  setSavedCheck(false)
                  setSubmittedCheck(false)
                  setSelectedQuestion({
                    ...selectedQuestion,
                    selected_option: parseInt(value)
                  })
                  setQuestionSubmitted(true)
                }}
                className='flex flex-col gap-[16px] md:gap-[20px]'
              >
                {selectedQuestion?.options?.map((item: IOption) => (
                  <div key={item.id} className='flex items-center space-x-2'>
                    <RadioGroupItem
                      className='w-[12px] h-[12px] md:w-[16px] md:h-[16px]'
                      value={item.id.toString()}
                      id={item.id.toString()}
                    />
                    <label htmlFor={item.id.toString()}>
                      <AktivGroteskText
                        text={item.option_text}
                        fontSize='text-[12px] md:text-[20px]'
                        fontWeight='font-[400]'
                      />
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className='w-full flex justify-center md:justify-between flex-col md:flex-row items-center gap-[8px]'>
              <GreenCTA
                disabled={submittedCheck || savedCheck}
                className=''
                paddingClass='py-[10px] px-[61.5px] md:px-[60px] md:py-[20px]'
                text={
                  currentQuestionNumber === allQuestions?.length
                    ? submittedCheck
                      ? 'Submitted'
                      : 'Save & Submit'
                    : savedCheck
                    ? 'Saved'
                    : SAVE
                }
                fontSize='text-[14px] md:text-[20px]'
                fontWeight='font-[700] md:font-[600]'
                onClick={() => {
                  if (!selectedQuestion?.selected_option) {
                    return
                  }
                  setQuestionIdSubmitted(selectedQuestion.id)
                  submitUserQuestions({
                    questions: [
                      {
                        question_id: selectedQuestion.id,
                        answer_id: selectedQuestion.selected_option
                      }
                    ]
                  })
                }}
              />
              <div className='relative flex gap-[12px] md:gap-[16px]'>
                <button
                  onClick={() => {
                    if (currentQuestionNumber > 1) {
                      const newQuestionNumber = currentQuestionNumber - 1
                      setCurrentQuestionNumber(newQuestionNumber)
                      setSelectedQuestion(allQuestions[newQuestionNumber - 1])
                    }
                  }}
                  className={`hover:bg-[#E0E0E0] transition-all duration-300 rounded-[100px] md:border-none border-[1px] md:p-0 border-[rgba(0,0,0,0.5)] text-[10px] font-[700] py-[6px] px-[36px] ${
                    currentQuestionNumber > 1 &&
                    currentQuestionNumber !== allQuestions?.length
                      ? 'border-black text-black'
                      : 'border-[rgba(0,0,0,0.2)] text-[rgba(0,0,0,0.2)]'
                  }`}
                >
                  <AktivGroteskText
                    className={`${
                      currentQuestionNumber === 1
                        ? 'text-[rgba(0,0,0,0.2)]'
                        : 'text-black'
                    } md:hidden`}
                    text={prevButtonText}
                    fontSize='text-[14px]'
                    fontWeight='font-[700]'
                  />
                  <SvgIcons
                    name={ICONS_NAMES.RIGHT_ARROW}
                    className={`md:w-[33px] md:h-[33px] hidden md:block rotate-180 ${
                      currentQuestionNumber === 1
                        ? 'fill-[rgba(0,0,0,0.3)]'
                        : 'fill-[#000000]'
                    }`}
                  />
                </button>
                <button
                  onClick={() => {
                    if (currentQuestionNumber < allQuestions?.length) {
                      setCurrentQuestionNumber(prev => prev + 1)
                      setSelectedQuestion(allQuestions[currentQuestionNumber])
                    }
                  }}
                  className={` hover:bg-[#E0E0E0]  ${
                    currentQuestionNumber !== allQuestions?.length
                      ? 'border-black text-black'
                      : 'border-[rgba(0,0,0,0.2)] text-[rgba(0,0,0,0.2)]'
                  }  transition-all duration-300 rounded-[100px] border-[1px] md:border-none md:p-0 text-[10px] font-[700] py-[6px] px-[36px]`}
                >
                  <AktivGroteskText
                    className={`${
                      currentQuestionNumber === allQuestions?.length
                        ? 'text-[rgba(0,0,0,0.2)]'
                        : 'text-black'
                    } md:hidden`}
                    text={nextButtonText}
                    fontSize='text-[14px]'
                    fontWeight='font-[700]'
                  />
                  <SvgIcons
                    name={ICONS_NAMES.RIGHT_ARROW}
                    className={`md:w-[33px] md:h-[33px] hidden md:block ${
                      currentQuestionNumber === allQuestions?.length
                        ? 'fill-[rgba(0,0,0,0.3)]'
                        : 'fill-[#000000]'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HelpUsToKnowYourBetter
