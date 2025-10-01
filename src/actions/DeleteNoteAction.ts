"use server"

import db from "@/db"
import { note } from "@/db/schema"
import { eq } from "drizzle-orm"

const DeleteNotesAction = async (id:string) => {
    try {
        await db.delete(note).where(eq(note.id , id));
        return {
            message:"Note deleted successfully",
            success:true
        }
    } catch (err) {
        console.log(err)
               return {
            message:"An error occured",
            success:false
        }
    }
}
export default DeleteNotesAction