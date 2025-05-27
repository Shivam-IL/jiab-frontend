import { IExploreMoreArtistCard } from '@/interfaces'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import AktivGroteskText from '../common/AktivGroteskText'
import { formatNumberToK } from '@/utils'

const ExploreMoreArtistCard: React.FC<IExploreMoreArtistCard> = ({
  image,
  name,
  followers,
  id
}) => {
  const router = useRouter()
  return (
    <div onClick={()=>{router.push(`./${id}`)}} className='relative flex-grow flex flex-col gap-[9px] md:gap-[12px]'>
      <div className='relative w-[110px] h-[110px] md:w-[128px] md:h-[128px]  bg-[#11A64B] rounded-[50%] flex items-end justify-center border-[5px] overflow-hidden border-white'>
        <img src={image} alt={name} className='w-[90px] h-[90px] md:w-[100px] md:h-[100px] object-cover' />
      </div>
      <div className='flex flex-col justify-center text-center gap-[6px] md:gap-[4px]'>
        <AktivGroteskText
          text={name}
          fontSize='text-[10px] md:text-[16px]'
          fontWeight='font-[700]'
        />
        <AktivGroteskText
          text={`${formatNumberToK(followers)} Followers`}
          fontSize='text-[8px] md:text-[14px]'
          fontWeight='font-[400]'
        />
      </div>
    </div>
  )
}

export default ExploreMoreArtistCard
