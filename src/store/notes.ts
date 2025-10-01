import { Note } from "@/db/schema"
import {create} from "zustand"

interface NotesState {
    notes:Note[];
    addNote:(note:Note) => void
    setNotes:(list:Note[]) => void;
    deleteNote:(id:string) => void;
    editNote:(note:Note) => void;
}

export const useNotes = create<NotesState>()((set) => (
    {
        notes:[],
        setNotes:(list) => set(() => ({
            notes:list
        })),
        addNote:(note) => set((state) => ({
            notes:[...state.notes, note]
        })),
        deleteNote:(id) => set((state) => (
            {
                notes:state.notes.filter((note) => note.id !== id)
            }
        )),
        editNote:(note) => set((state) => ({
            notes:state.notes.map((n) => {
                if(n.id === note.id){
                    return note
                }
                return n
            })
        })) 
    }
))