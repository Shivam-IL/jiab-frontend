import React, { useEffect, useState } from 'react'
import AktivGroteskText from '../AktivGroteskText'
import {
  HELP_US_TO_KNOW_YOUR_BETTER,
  ICONS_NAMES,
  NEXT,
  PREV,
  PROFILE_QUESTIONS,
  SAVE
} from '@/constants'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import GreenCTA from '@/components/GreenCTA'
import SvgIcons from '../SvgIcons'

const HelpUsToKnowYourBetter = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<any | null>(null)
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(0)

  useEffect(() => {
    setSelectedQuestion(PROFILE_QUESTIONS[0])
    setCurrentQuestionNumber(1)
  }, [])

  return (
    <div className='bg-white w-full rounded-[5px] py-[16px] md:py-[44px] px-[14px] md:px-[33px] flex flex-col gap-[8px] md:gap-[20px]'>
      <AktivGroteskText
        text={HELP_US_TO_KNOW_YOUR_BETTER}
        fontSize='text-[16px] md:text-[28px]'
        fontWeight='font-[700]'
      />
      <div>
        {selectedQuestion && (
          <div className='w-full' key={selectedQuestion.questionId}>
            <div className='w-full flex'>
              <div className='min-w-[90%]'>
                <AktivGroteskText
                  text={selectedQuestion.questionText}
                  fontSize='text-[12px] md:text-[24px]'
                  fontWeight='font-[700]'
                />
              </div>
              <div className='w-[10%] flex justify-end'>
                <AktivGroteskText
                  className='text-[rgba(0,0,0,0.5)]'
                  fontSize='text-[10px] md:text-[20px]'
                  fontWeight='font-[700]'
                  text={currentQuestionNumber?.toString()}
                />
                <AktivGroteskText
                  fontSize='text-[10px] md:text-[20px]'
                  fontWeight='font-[700]'
                  text={`/${PROFILE_QUESTIONS?.length}`}
                />
              </div>
            </div>
            <div className='pt-[24px] md:pt-[20px] pb-[34px] md:pb-[32px]'>
              <RadioGroup className='flex flex-col gap-[16px] md:gap-[20px]'>
                {selectedQuestion?.options?.map((item: any) => (
                  <div
                    key={item.optionId}
                    className='flex items-center space-x-2'
                  >
                    <RadioGroupItem
                      className='w-[12px] h-[12px] md:w-[16px] md:h-[16px]'
                      value={item?.optionText}
                      id={item?.optionId}
                    />
                    <label htmlFor={item?.optionId}>
                      <AktivGroteskText
                        text={item?.optionText}
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
                className=''
                paddingClass='py-[10px] px-[93px] md:px-[60px] md:py-[20px]'
                text={SAVE}
                fontSize='text-[16px] md:text-[20px]'
                fontWeight='font-[700] md:font-[600]'
                onClick={() => {}}
              />
              <div className='relative flex gap-[12px] md:gap-[16px]'>
                <button
                  onClick={() => {
                    if (currentQuestionNumber > 1) {
                      const newQuestionNumber = currentQuestionNumber - 1
                      setCurrentQuestionNumber(newQuestionNumber)
                      setSelectedQuestion(
                        PROFILE_QUESTIONS[newQuestionNumber - 1]
                      )
                    }
                  }}
                  className='text-[rgba(0,0,0,0.5)] hover:bg-[#E0E0E0] transition-all duration-300 rounded-[100px] md:border-none border-[1px] md:p-0 border-[rgba(0,0,0,0.5)] text-[10px] font-[700] py-[6px] px-[36px]'
                >
                  <AktivGroteskText
                    className='text-[rgba(0,0,0,0.5)] md:hidden'
                    text={PREV}
                    fontSize='text-[14px]'
                    fontWeight='font-[700]'
                  />
                  <SvgIcons
                    name={ICONS_NAMES.RIGHT_ARROW}
                    className='md:w-[40px] md:h-[40px] hidden md:block rotate-180 fill-[rgba(0,0,0,0.3)]'
                  />
                </button>
                <button
                  onClick={() => {
                    if (currentQuestionNumber < PROFILE_QUESTIONS?.length) {
                      setCurrentQuestionNumber(prev => prev + 1)
                      setSelectedQuestion(
                        PROFILE_QUESTIONS[currentQuestionNumber]
                      )
                    }
                  }}
                  className='text-[rgba(0,0,0,0.5)] hover:bg-[#E0E0E0] transition-all duration-300 rounded-[100px] border-[1px] md:border-none md:p-0 border-[#000000] text-[10px] font-[700] py-[6px] px-[36px]'
                >
                  <AktivGroteskText
                    className='text-[#000000] md:hidden'
                    text={NEXT}
                    fontSize='text-[14px]'
                    fontWeight='font-[700]'
                  />
                  <SvgIcons
                    name={ICONS_NAMES.RIGHT_ARROW}
                    className='md:w-[40px] md:h-[40px] hidden md:block'
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
