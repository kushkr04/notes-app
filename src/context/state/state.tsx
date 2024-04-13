import { createContext } from "react";
import { NoteType } from "../../components/note/note-type";

export type StateType = {
    notes:NoteType[], 
    editMode: boolean, 
    noteToEdit: NoteType | null
  }

export type ActionType = {
    type: string,
    payload: any
}

export const StateContext = createContext<{
    state: StateType, 
    dispatch:(action:ActionType)=>void
}>({} as {state: StateType, dispatch:(action:ActionType)=>void});