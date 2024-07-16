import { Website } from "@/types-db";
const URL = `${process.env.NEXT_PUBLIC_API_URL}/websites`


const getWebsites = async (category : string, websites : Website[]) => {

    const formattedproducts = websites.filter(item => item.category === category)

    return formattedproducts
};

export default getWebsites