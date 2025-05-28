import { aktivGrotesk } from '@/app/layout'
import { ILabeledInput } from '@/interfaces'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TooltipArrow
} from '@/components/ui/tooltip'
import SvgIcons from '../common/SvgIcons'
import { ICONS_NAMES } from '@/constants'
import AktivGroteskText from '../common/AktivGroteskText'

const LabeledInput: React.FC<ILabeledInput> = ({
  children,
  label,
  width,
  labelFontSize = 'text-[14px] md:text-[24px]',
  labelFontWeight = 'font-[700]',
  labelClassName = 'text-black md:text-center flex items-center gap-[4px]',
  tooltip = false,
  tooltipText = ''
}) => {
  return (
    <div
      className={`flex flex-col gap-[8px] md:gap-[16px] ${
        width ? width : 'md:w-[483px]'
      }`}
    >
      <label
        className={`${aktivGrotesk.className} ${labelClassName} ${labelFontSize} ${labelFontWeight}`}
      >
        {label}
        {tooltip && (
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <button
                  type='button'
                  className='cursor-pointer w-[10px] h-[10px] hover:opacity-80'
                >
                  <SvgIcons
                    className='cursor-pointer w-[10px] h-[10px] hover:opacity-80'
                    name={ICONS_NAMES.INFO}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent
                side='bottom'
                sideOffset={5}
                className='bg-white max-w-[207px] text-black text-sm p-1 rounded shadow-md border-[#00953B] border-[1px]'
              >
                <TooltipArrow className='fill-white stroke-2 stroke-[#00953B]' />
                <AktivGroteskText
                  text={tooltipText}
                  fontSize='text-[8px]'
                  fontWeight='font-[400]'
                  className='leading-tight'
                />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </label>
      {children}
    </div>
  )
}

export default LabeledInput
