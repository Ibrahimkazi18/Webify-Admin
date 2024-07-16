"use client"

import Image from "next/image"

interface GalleryTabProps {
    url : string
}

const GalleryTab = ({url} : GalleryTabProps) => {
  return (
    <div className="w-24 h-24 rounded-md overflow-hidden relative">
        <Image 
            src={url}
            alt={url}
            className="object-contain w-full h-full"
            fill
        />
    </div>
  )
}

export default GalleryTab