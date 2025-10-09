"use server"

import { cookies } from "next/headers"

const LogoutAction = async () :Promise<{
    message:string,
    success:boolean
}>=> {
    const clientCookies = await cookies();
    clientCookies.delete("notes-user-token");
    return {
        message:"Logged out successfully",
        success:true
    }
}
export default LogoutAction;