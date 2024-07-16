import { User } from "@/types-db";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/users`


const getUser = async () : Promise<User[]> => {

    const res = await fetch(URL)

    return res.json()
};

export default getUser