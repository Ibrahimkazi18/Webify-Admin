import { Website } from "@/types-db";
import qs from "query-string"

const URL = `${process.env.NEXT_PUBLIC_API_URL}/websites`

interface Query {
    isFeatured?: boolean;
    category?: string;
}

const getAllWebsites = async (query : Query) : Promise<Website[]> => {

    const url = qs.stringifyUrl({
        url : URL,
        query : {
            isFeatured : query.isFeatured,
            category : query.category,
        }
    })

    const res = await fetch(url)

    return res.json()
};

export default getAllWebsites