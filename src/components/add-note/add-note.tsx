import { useEffect, useState, useContext } from 'react'
import './add-note.css'
import {NoteType, Level} from '../note/note-type'
import {v4 as uuid4} from 'uuid'
import Card from '../card/card';
import { ThemeContext } from '../../context/theme/theme';

type AddNoteProps = {
    addNote: (note: NoteType) => void;
    editMode: Boolean;
    noteToEdit: NoteType | null;
    updateNote: (updatedNote: NoteType) => void
}

function AddNote(props: AddNoteProps){

    const [text, setText] = useState("");
    const [level, setLevel] = useState<Level>('low');
    const theme = useContext(ThemeContext);
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setText(e.target.value);
    }
    const handleClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        if (props.editMode){
            props.noteToEdit && props.updateNote({
                text,
                level,
                id: props.noteToEdit.id
            });
        } else {
            props.addNote({
                text,
                level,
                id: uuid4()
            });
        }
        setText('');
        setLevel('low');

    }

    const handleSelect = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        setLevel(e.target.value as Level)
    }

    const setNoteContent = (note: NoteType)=>{
        setText(note.text);
        setLevel(note.level)
    }

    useEffect(()=>{
        if (props.noteToEdit && props.editMode){
            setNoteContent(props.noteToEdit);
        }
    }, [props.noteToEdit, props.editMode])
    

    return (
        <Card bgColor={theme==='dark'?'#333':'#ddd'}>
            <form className='add-note'>
                <input type="text" onChange={handleChange} value={text}/>
                <select onChange={handleSelect} value={level}>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
                <button onClick={handleClick}>{props.editMode?'edit':'add'}</button>
            </form>
        </Card>
    )
}

export default AddNote;