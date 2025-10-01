"use server"

import db from "@/db";
import { type Note , note} from "@/db/schema"
import { eq } from "drizzle-orm";

const EditNotesAction = async (n:Note):Promise<{
    message:string;
    success:boolean;
    note?:Note
}> => {
    try {
        const [updateNote]= await db.update(note).set(n).where(eq(note.id,n.id)).returning();
        return {
            message:"Note edit successfully",
            success:true,
            note:updateNote
        }
    } catch (err) {
        console.log(err)
        return {
            message:"An error occured",
            success:false
        }
        
    }
}
export default EditNotesAction