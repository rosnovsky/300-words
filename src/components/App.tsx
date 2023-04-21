import React from 'react';
import NoteList from './NoteList';
import '../styles.css';
import { Note } from '../types';

const sampleNotes: Note[] = [
  { id: '1', content: 'This is the first note.' },
  { id: '2', content: 'This is the second note.' },
  { id: '3', content: 'This is the third note.' },
];

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>Note-taking App</h1>
      <NoteList notes={sampleNotes} />
    </div>
  );
};

export default App;

