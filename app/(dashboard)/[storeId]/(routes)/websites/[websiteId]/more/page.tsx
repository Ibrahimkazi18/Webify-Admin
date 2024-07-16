
import Box from "@/components/box"
import Container from "@/components/container"
import { db } from "@/lib/firebase"
import { Website } from "@/types-db"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { ChevronRight, Home } from "lucide-react"
import Link from "next/link"
import Gallery from "./components/gallery/gallery"
import Info from "./components/info"
import { formatter } from "@/lib/utils"
import { format } from "date-fns"


interface MorePageProps {
  params : {
      websiteId : string
      storeId : string
  }
}

const MorePage = async ({params} : MorePageProps) => {

  //all websites
  const websitesData = (
    await getDocs(
      collection(doc(db, "stores", params.storeId), "websites")
    )
  ).docs.map(doc => doc.data()) as Website[]

  //one selected website
  const websiteRef = (await getDoc(
    doc(db, "stores", params.storeId, "websites", params.websiteId)
  )).data() as Website

  //category wise suggested websites
  // const suggestedWebsites = await getWebsites(websiteRef.category, websitesData) as Website[]

  const formattedWebsites = 
    {
      id : websiteRef.id,
      name : websiteRef.name,
      price : formatter.format(websiteRef.price),
      url : websiteRef.url,
      owner : websiteRef.owner,
      ownerId : websiteRef.ownerId,
      category : websiteRef.category,
      images : websiteRef.images,
      isFeatured : websiteRef.isFeatured,
      createdAt : websiteRef.createdAt ? format(websiteRef.createdAt.toDate(), "MMMM do, yyyy") : ""
    }
  

  return (
    <Container className="rounded-lg my-4 px-4">
            <Box className="text-sm items-center mt-12">
                <Link href={`/${params.storeId}`} className="flex items-center gap-2">
                    <Home className="w-4 h-4"/>
                    Main Page
                </Link>

                <ChevronRight className="w-5 h-5 text-muted-foreground"/>
                <Link href={`/${params.storeId}/websites`} className="flex items-center gap-2">
                    Websites
                </Link>
                <ChevronRight className="w-5 h-5 text-muted-foreground"/>
                <Link href={`/${params.storeId}/websites/${websiteRef.id}`} className="flex items-center gap-2">
                    {websiteRef.name}
                </Link>
            </Box>

            <div className="px-4 py-10 sm:px-6 lg:px-8 space-y-10">
                <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                    <Gallery images={websiteRef.images}/>

                    <div className="mt-20 px-4 sm:px-0">
                        <Info website={formattedWebsites}/>
                    </div>
                </div>
            </div>
    </Container>
  )
}

export default MorePage