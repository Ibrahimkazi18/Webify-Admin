"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GalleryContentImage from "./gallery-content-image";
import GalleryTab from "./gallery-tab";

interface GalleryProps {
    images : {
        url : string
    }[];
    className ?: string
}

const Gallery = ({images, className} : GalleryProps) => {
  return (
    <div className={className}>
        <Tabs defaultValue={images[0].url} className="w-full">
            {images.map(tab => (
                <TabsContent value={tab.url.toString()} key={tab.url}>
                    <GalleryContentImage url={tab.url} />
                </TabsContent>
            ))}

            <TabsList className="bg-transparent w-full">
                {images.map(tab => (
                    <TabsTrigger key={tab.url} value={tab.url.toString()}>
                        <GalleryTab url={tab.url}/>
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    </div>

  )
}

export default Gallery