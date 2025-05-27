import ArtistCard from '@/components/ArtistCard'
import { ARTIST_DATA } from '@/constants'
import { formatNumberToK } from '@/utils'
import React from 'react'

const ArtistComponent = () => {
  return (
    <div className='grid grid-cols-3 md:grid-cols-4 gap-y-[15px] gap-x-[10px] md:gap-4'>
      {ARTIST_DATA.map((item: any, index) => (
        <ArtistCard
          key={item.id}
          artistId={item.id}
          image={item?.profile?.backgroundImage}
          name={item?.profile.fullName}
          followers={formatNumberToK(item.followers)}
        />
      ))}
    </div>
  )
}

export default ArtistComponent
