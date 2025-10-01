"use server"

import db from "@/db";
import { Note, note } from "@/db/schema";

const FetchNotesAction = async () :Promise<{
    message:string;
    success:boolean;
    notes?:Note[]
}>=> {
    try {
        const notes = await db.select().from(note)
        return {
            success:true,
            message:"",
            notes:notes
        }        
    } catch (err) {
        console.log(err);
        return {
            message:"An error occured",
            success:false
        }
    }
}

export default FetchNotesAction