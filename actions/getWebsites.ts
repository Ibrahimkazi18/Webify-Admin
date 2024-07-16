import { Website } from "@/types-db";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/websites`


const filterProducts = async (website : Website[]) => {

    const formattedproducts = website.filter((item) => item.isFeatured )

    return formattedproducts
};

export default filterProducts