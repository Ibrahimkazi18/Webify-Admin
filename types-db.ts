import { Timestamp } from "firebase/firestore";

export interface Store { 
    id : string,
    name : string,
    userId : string,
    createdAt?: Timestamp,
    updatedAt?: Timestamp,
}

export interface User { 
    id : string,
    name : string,
    email : string,
    websiteCount : number,
    websites : Website[],
    request : boolean,
    member : boolean, 
    membership ?: Membership
    createdAt?: Timestamp,
    updatedAt?: Timestamp,
}

export interface Requests { 
    id : string,
    type : string,
    name : string,
    email : string,
    member : boolean,
    status : string, 
    copId ?: string,
    createdAt?: Timestamp,
    updatedAt?: Timestamp,
}

export interface Website { 
    id : string,
    name : string,
    url : string,
    ownerId : string, 
    owner : string,
    price : number,
    images : {url : string}[], 
    isFeatured : boolean,
    category : string;
    createdAt?: Timestamp,
    updatedAt?: Timestamp,
}

export interface Membership {
    id : string,
    userId : string,
    status ?: 'Active' | 'Passed-Due',
    plan : string,
    totalAmount : number,
    duration : number,
    startDate?: Timestamp,
    endDate?: Timestamp,  
}

export interface SubscriptionPlan {
    id : string,
    name : string,
    price : number,
    description : string,
    createdAt?: Timestamp,
    updatedAt?: Timestamp,
}

export interface MembershipFormInput {
    plan : string,
    duration : number,
    createdAt?: Timestamp,
    updatedAt?: Timestamp,
}

export interface MembershipRequest {
    id : string,
    userId : string,
    plan : string,
    totalAmount : number,
    duration : number,
    createdAt?: Timestamp,
}

// <div className="w-full flex items-center px-2 mt-4 gap-3">
//             <Button className=" rounded-full font-bold text-lg text-muted-foreground" variant={"ghost"}>
//                 {data.price}
//             </Button>

//             <Link href={`/${params.storeId}/websites/${data.id}`} className="w-full">
//                 <Button className="bg-hero w-full rounded-full" variant={"outline"}>
//                     More
//                 </Button>
//             </Link>
//         </div>