import { clerkClient } from "@clerk/nextjs"



export const getUserInfo = async (userId:string)=>{

    const user = await clerkClient.users.getUser(userId)

    const { id, imageUrl, firstName, lastName }  = user

    return {
        id, imageUrl, firstName, lastName
    }
}