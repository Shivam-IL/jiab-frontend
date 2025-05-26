import { Badge } from "@/components/ui/badge"
import AktivGroteskText from "../AktivGroteskText"

interface CircularProgressProps {
  value: number // 0 to 100
  children?: React.ReactNode
  size?: number
  thickness?: number
  color?: string
  bgColor?: string
}

export function CircularProgress ({
  value,
  children,
  size = 100,
  thickness = 6,
  color = '#11A64B',
  bgColor = '#D9D9D9'
}: CircularProgressProps) {
  const angle = (value / 100) * 360
  const radius = size / 2

  const toRadians = (deg: number) => ((deg - 90) * Math.PI) / 180

  const getPoint = (angleDeg: number) => {
    const rad = toRadians(angleDeg)
    const x = radius + (radius - thickness / 2) * Math.cos(rad)
    const y = radius + (radius - thickness / 2) * Math.sin(rad)
    return { x, y }
  }

  const start = getPoint(0)
  const end = getPoint(angle)

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div
        className='relative rounded-full transition-all duration-300'
        style={{
          width: size,
          height: size,
          background: `conic-gradient(${color} ${angle}deg, ${bgColor} ${angle}deg)`
        }}
      >
        {/* Inner Circle (cutout) */}
        <div
          className='absolute inset-0 m-auto rounded-full bg-white flex items-center justify-center'
          style={{
            width: size - thickness * 2,
            height: size - thickness * 2
          }}
        >
          {children}
        </div>

        {/* Start Cap */}
        {value > 0 && (
          <div
            className='absolute rounded-full'
            style={{
              width: thickness,
              height: thickness,
              backgroundColor: color,
              top: start.y - thickness / 2,
              left: start.x - thickness / 2
            }}
          />
        )}

        {/* End Cap */}
        {value > 0 && (
          <div
            className='absolute rounded-full'
            style={{
              width: thickness,
              height: thickness,
              backgroundColor: color,
              top: end.y - thickness / 2,
              left: end.x - thickness / 2
            }}
          />
        )}
      </div>
      <Badge className="bg-[#FFE200] hover:bg-[#FFE200] shadow-none absolute bottom-[-18px] px-[5px] py-[3px] md:py-[4.5px] md:px-[8px] rounded-[100px] border-[3px] border-white">
        <AktivGroteskText className="text-black" text={`${value}%`} fontSize="text-[10px] md:text-[16px]" fontWeight="font-[700]"/>
      </Badge>
    </div>
  )
}
