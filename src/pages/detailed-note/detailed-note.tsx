import './detailed-note.css';
import Note from '../../components/note/note'
import { useContext } from 'react';
import { ThemeContext } from '../../context/theme/theme';
import { StateContext } from '../../context/state/state';
import { Link, useParams } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

function DetailedNote() {
  const theme = useContext(ThemeContext);
  const {state} = useContext(StateContext);
  const {id} = useParams();
  const note = state.notes.find(n=>n.id===id);

  return (
    <div className={`detailed-note ${theme}`}>
      <h2>Notes App [{state.notes.length}]</h2>
      <Link to="/">
      <FaHome 
      style={{textDecoration: 'none', 
      color: `${theme==='dark'?'white':'black'}`,
      float: 'left',
      marginTop: '-5'
      }}></FaHome>
      </Link>
      <div>{note && <Note 
            key={note.id}
            note={note}
            isDetailed={true}
            ></Note>}
      </div>
    </div>
  );
}

export default DetailedNote;
