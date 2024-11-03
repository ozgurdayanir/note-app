import { useState } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]); // Notları tutmak için
  const [noteText, setNoteText] = useState(''); // Yeni notun içeriği
  const [noteColor, setNoteColor] = useState(''); // Seçilen not rengi
  const [searchTerm, setSearchTerm] = useState(''); // Arama terimi

  const handleAddNote = () => {
    if (noteText && noteColor) {
      setNotes([...notes, { text: noteText, color: noteColor }]);
      setNoteText(''); // Alanı temizle
      setNoteColor('');
    } else if (!noteText) {
      alert('Please enter a note');
    } else if (!noteColor) {
      alert('Please select a color');
    }
  };

  const handleDeleteNote = (indexToRemove) => {
    setNotes(notes.filter((_, index) => index !== indexToRemove));
  };

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='container'>
      <h1>Note App</h1>
      <div className='search'>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="App">
        <div className="note-field">
          <textarea
            type="text"
            placeholder="Enter your note here and select a color"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          />
          <div className="btn-group">
            <div className="note-colors">
              {[ 'lightgreen', 'orange', 'steelblue', 'lightpink', 'lightblue'].map((color) => (
                <div
                  key={color}
                  style={{ backgroundColor: color.toLowerCase() }}
                  onClick={() => setNoteColor(color.toLowerCase())}
                  className={noteColor === color.toLowerCase() ? 'selected' : ''}
                >
                </div>
              ))}
            </div>
            <button id="add-btn" onClick={handleAddNote}>Add</button>
          </div>
        </div>
      </div>
      <div className="notes">
          {filteredNotes.map((note, index) => (
            <div
              key={index}
              className="note"
              style={{ backgroundColor: note.color }}
            >
              <p>{note.text}</p>
              <span className="delete-btn" onClick={() => handleDeleteNote(index)}>×</span>
            </div>
          ))}
        </div>
    </div>
  );
}

export default App;
