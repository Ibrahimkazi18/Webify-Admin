"use client"

import Image from "next/image"

interface GalleryContentImageProps {
    url : string
}

const GalleryContentImage = ({url} : GalleryContentImageProps) => {
  return (
    <div className="w-full h-full aspect-square sm:rounded-lg overflow-hidden relative">
        <Image 
            src={url}
            alt={url}
            className="object-contain w-full h-full"
            fill
        />
    </div>
  )
}

export default GalleryContentImage