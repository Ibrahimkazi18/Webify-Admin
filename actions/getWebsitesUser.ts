import { Website } from "@/types-db";
const URL = `${process.env.NEXT_PUBLIC_API_URL}/websites`


const getWebsitesUser = async (email : string, websites : Website[]) => {

    const formattedWebsites = websites.filter(item => item.ownerId === email)

    return formattedWebsites
};

export default getWebsitesUser