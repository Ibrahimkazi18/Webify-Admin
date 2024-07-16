import { Website } from "@/types-db";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/websites`


const getWebsite = async (id : string) : Promise<Website> => {

    const res = await fetch(`${URL}/${id}`)

    return res.json()
};

export default getWebsite