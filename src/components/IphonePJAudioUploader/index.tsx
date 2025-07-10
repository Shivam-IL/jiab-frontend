import React, { useRef, useState } from 'react'
import AudioRecorder from '../AudioRecorder'
import { IJokeData } from '@/types'
import SvgIcons from '../common/SvgIcons'
import { ICONS_NAMES } from '@/constants'
import AktivGroteskText from '../common/AktivGroteskText'
import { useCMSData } from '@/data'

const IphonePJAudioUploader = ({
  jokeData,
  handleChange,
  setJokeData
}: {
  jokeData: IJokeData
  setJokeData: React.Dispatch<React.SetStateAction<IJokeData>>
  handleChange: (
    key: string,
    value: string | boolean | FileList | null | number
  ) => void
}) => {
  const [audioSelectionType, setAudioSelectionType] = useState<
    'upload' | 'record'
  >('upload')
  const fileRef = useRef<HTMLInputElement>(null)
  const { pjChallenge } = useCMSData()
  return (
    <div>
      <div className='flex justify-between gap-2'>
        <button
          className={`w-1/2 bg-white rounded-[6px] py-[12px] font-[600] text-[16px] ${
            audioSelectionType === 'upload'
              ? 'border-[1px] border-[#009639]'
              : ''
          }`}
          onClick={() => {
            setAudioSelectionType('upload')
          }}
        >
          Upload Your Audio
        </button>
        <button
          className={`w-1/2 bg-white rounded-[6px] py-[12px] font-[600] text-[16px] ${
            audioSelectionType === 'record'
              ? 'border-[1px] border-[#009639]'
              : ''
          }`}
          onClick={() => {
            setAudioSelectionType('record')
          
          }}
        >
          Record Your Audio
        </button>
      </div>
      {audioSelectionType === 'upload' && (
        <div className='w-full md:mt-[24px] mt-[8px] relative min-h-[110px] md:min-h-[195px] flex flex-col justify-center items-center bg-[#9BD4B1] border-[1px] border-[#11A64B] rounded-[10px] cursor-pointer'>
          {jokeData.file && (
            <div
              className='w-full relative flex justify-end cursor-pointer mt-[12px] md:pt-0 px-[16px] z-10'
              onClick={() => {
                handleChange('file', null)
                if (fileRef.current) {
                  fileRef.current.value = ''
                }
              }}
            >
              <SvgIcons
                name={ICONS_NAMES.CROSS2}
                className='w-[12px] h-[12px]  text-black fill-black stroke-black'
              />
            </div>
          )}
          <div
            onClick={() => {
              if (!jokeData.file) {
                fileRef.current?.click()
              }
            }}
            className='flex flex-col w-full justify-center items-center gap-[8px] md:gap-[16px]'
          >
            <SvgIcons
              className='w-[40px] h-[40px] md:w-[69px] md:h-[69px]'
              name={
                jokeData.file ? ICONS_NAMES.SUCCESS : ICONS_NAMES.UPLOAD_FILE
              }
            />
            <div className='flex relative flex-col max-w-[80%] min-w-[80%] justify-center items-center'>
              {!jokeData.file && (
                <>
                  <AktivGroteskText
                    text={pjChallenge.audioClickableHeading}
                    fontSize='text-[14px] md:text-[20px]'
                    fontWeight='font-[700]'
                  />
                  <AktivGroteskText
                    text={pjChallenge.audioClickableSubheading}
                    fontSize='text-[10px] md:text-[16px]'
                    fontWeight='font-[400]'
                  />
                </>
              )}
              {jokeData.file && jokeData.file?.length > 0 && (
                <>
                  <AktivGroteskText
                    text={'File Name'}
                    fontSize='text-[14px] md:text-[20px]'
                    fontWeight='font-[700]'
                  />
                  <p className='text-center w-full relative text-[12px] mb-2 md:text-[16px] line-clamp-1 truncate font-[700] text-[rgba(0,0,0,0.3)]'>
                    {jokeData.file?.[0]?.name ?? ''}
                  </p>
                </>
              )}
            </div>
          </div>
          <input
            type='file'
            ref={fileRef}
            hidden
            accept={jokeData.acceptedFormats}
            onChange={e => {
              handleChange('file', e.target.files)
            }}
          />
        </div>
      )}
      {audioSelectionType === 'record' && (
        <AudioRecorder
          jokeData={jokeData}
          setJokeData={setJokeData}
          handleChange={handleChange}
        />
      )}
    </div>
  )
}

export default IphonePJAudioUploader
