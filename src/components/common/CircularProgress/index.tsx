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

export function CircularProgress({
  value,
  children,
  size = 100,
  thickness = 6,
  color = '#D9D9D9',    // background track color (gray)
  bgColor = '#11A64B'   // progress color (green)
}: CircularProgressProps) {
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(100, value)); // Clamp between 0 and 100
  const offset = circumference * (1 - progress / 100);

  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ position: 'absolute', top: 0, left: 0 }}>
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={thickness}
          fill="none"
        />
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={bgColor}
          strokeWidth={thickness}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s' }}
          transform={`rotate(90 ${size / 2} ${size / 2})`} // <-- THIS IS THE KEY CHANGE
        />
      </svg>
      {/* Center content */}
      <div
        className="flex items-center justify-center rounded-full"
        style={{
          width: size - thickness * 2,
          height: size - thickness * 2,
          // No background color for the center, keep it transparent
          zIndex: 1,
        }}
      >
        {children}
      </div>
      {/* Percentage badge */}
      <Badge className="bg-[#FFE200] hover:bg-[#FFE200] shadow-none absolute bottom-[-18px] px-[5px] py-[3px] md:py-[4.5px] md:px-[8px] rounded-[100px] border-[3px] border-white">
        <AktivGroteskText className="text-black" text={`${progress} %`} fontSize="text-[10px] md:text-[16px]" fontWeight="font-[700]"/>
      </Badge>
    </div>
  )
}