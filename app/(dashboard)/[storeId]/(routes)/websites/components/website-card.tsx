"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { WebsiteCardProps } from "./client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useParams } from "next/navigation"

interface WebsiteCardPageProps {
    data : WebsiteCardProps
}



const WebsiteCard = ({data} : WebsiteCardPageProps) => {

  const params = useParams()

  return (
    <Card className="w-full min-h-[440px] rounded-md shadow-lg flex flex-col items-center justify-center relative py-6 pt-24 md:pt-28">
        <div className="absolute -top-14 overflow-hidden md:w-80 md:h-80  bg-hero flex items-center justify-center p-1 md:p-2">
            <div className="w-full h-full rounded-full relative">
                <Image 
                    className="w-full h-full object-contain"
                    fill
                    alt={data.name}
                    src={data.images[0].url}
                />
            </div>
        </div>

        <Link href={`/menu/${data.id}`} className="w-full px-2 mt-4 text-center">
            <CardTitle className="truncate text-neutral-700 w-full">
                {data.name}
            </CardTitle>
        </Link>


        <CardDescription className="text-center px-2 mt-2 pt-4">
            Owner : {data.owner || "No Description"}
        </CardDescription>

        <CardDescription className="text-center px-2 ">
            Email : {data.ownerId || "No Description"}
        </CardDescription>

        <div className="w-full flex items-center px-2 mt-4 gap-3">
            <Button className=" rounded-full font-bold text-lg text-muted-foreground" variant={"outline"}>
                ₹{data.price}
            </Button>

            <Link href={`/menu/${data.id}`} className="w-full">
                <Button className="bg-hero w-full rounded-full">
                    Buy Now
                </Button>
            </Link>
        </div>

        {/* add to cart */}

        {/* <Button onClick={() => addToCart(data)} className="absolute top-0 right-0 rounded-tl-none rounded-tr-lg rounded-bl-lg rounded-br-none p-2 px-3 mr-1">
            <ShoppingCart className="w-4 h-4"/>
        </Button>

        {/* add to wishlist */}
        {/* <Button onClick={() => {}} className="absolute top-0 left-0 hover:bg-transparent" variant={"ghost"}>
            <IsLikedIcon className={`w-5 h-5 ${isLiked ? "text-red-500" : "text-black"}`}/>
        </Button> */} 
    </Card>
  )
}

export default WebsiteCard