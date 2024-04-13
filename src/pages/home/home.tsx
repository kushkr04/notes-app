import './home.css';
import Note from '../../components/note/note'
import AddNote from '../../components/add-note/add-note';
import { useContext } from 'react';
import { Level } from '../../components/note/note-type';
import { ThemeContext } from '../../context/theme/theme';
import { StateContext } from '../../context/state/state';

function Home() {
  const theme = useContext(ThemeContext);
  const {state} = useContext(StateContext);

  return (
    <div className={`home ${theme}`}>
      <h2>Notes App [{state.notes.length}]</h2>
      <AddNote></AddNote>
      <div>
        {
          state.notes.map(note => <Note 
            key={note.id}
            note={note}
            ></Note>)
        }
      </div>
    </div>
  );
}

export default Home;
