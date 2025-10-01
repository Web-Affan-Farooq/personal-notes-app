"use server"
import {type Note, note} from "@/db/schema"
import db from "@/db";

const AddNoteAction = async (body:{title:string; description:string}) :Promise<
{
    message:string;
    success:boolean;
    note?:Note
}
> => {
    try {
        const [newNote] = await db.insert(note).values(body).returning()       
        return {
            message:"Note added successfully",
            success:true,
            note:newNote
        }
    } catch (err) {
        console.log(err);
        return {
            message:"An error occured",
            success:false
        }
    }
};

export default AddNoteAction;