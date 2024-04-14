import { useEffect, useReducer, useState } from 'react';
import './App.css';
import { ThemeContext } from './context/theme/theme';
import Home from './pages/home/home';
import Switch from "react-switch";
import { FaSun, FaMoon } from 'react-icons/fa';
// import { Notes } from './components/note/data';
import { StateContext, StateType } from './context/state/state';
import { ADD_NOTE, DELETE_NOTE, INIT_NOTES, SET_EDIT_MODE, SET_NOTE_FOR_EDIT, UPDATE_NOTE } from './actions';
import { fetchNotes } from './services/notes-service';
import DetailedNote from './pages/detailed-note/detailed-note';

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Home></Home>
    ),
  },
  {
    path: ":id",
    element: <DetailedNote></DetailedNote>,
  },
]);

function App() {
  const [theme, setTheme] = useState('light');
  const [checked, setChecked] = useState(false);
  const [state, dispatch] = useReducer((state:StateType, action:{type:string, payload: any})=>{
    switch(action.type){
      case SET_EDIT_MODE:
        return {...state, editMode:action.payload}
      case SET_NOTE_FOR_EDIT:
        return {...state, noteToEdit:action.payload}
      case ADD_NOTE:
        return {...state, notes:[action.payload, ...state.notes]}
      case UPDATE_NOTE:
        const indexUpdated = state.notes.findIndex(note=>note.id===action.payload.id);
        let editedNotesUpdated = [...state.notes];
        editedNotesUpdated.splice(indexUpdated,1,action.payload);
        editedNotesUpdated.unshift(action.payload);
        return {...state, notes: editedNotesUpdated};
      case DELETE_NOTE:
        const index = state.notes.findIndex(note=>note.id===action.payload);
        let editedNotes = [...state.notes];
        editedNotes.splice(index,1);
        return {...state, notes:editedNotes};
      case INIT_NOTES:
        return {...state, notes:action.payload}
      default:
        return state;
    }
  }, {notes:[], editMode: false, noteToEdit: null});

  useEffect(()=>{
    async function initializeNotes(){
      const notes = await fetchNotes();
      dispatch({type: INIT_NOTES, payload: notes});
    }
    initializeNotes();
  }, []);

  const changeHandler = (check:boolean)=>{
    setChecked(!checked);
    if(check){
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }
  return (
    <StateContext.Provider value={{state, dispatch}}>
      <ThemeContext.Provider value={theme}>
        <div className={`App ${theme}`}>
        <Switch onChange={changeHandler} 
        checked={checked} 
        className='react-switch' 
        checkedIcon={<FaSun size={23} color='orange' style={{paddingTop: '2px'}}></FaSun>} 
        uncheckedIcon={<FaMoon size={23} color='white' style={{paddingTop: '2px'}}></FaMoon>}
        onColor='#ddd' 
        offColor='#333' 
        onHandleColor='#333' 
        offHandleColor='#ddd'
        />
        <RouterProvider router={router} />
        </div>
      </ThemeContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
