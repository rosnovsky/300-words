import { Note } from '@/types';

export type AppState = {
  notes: Note[];
  reloadNotes: boolean;
  editingNote: Note | null;
  isEditing: boolean;
  initialLoad: boolean;
};

export type Action =
  | { type: 'SET_NOTES'; payload: Note[] }
  | { type: 'TOGGLE_RELOAD_NOTES', payload: boolean }
  | { type: 'SET_EDITING_NOTE'; payload: Note | null }
  | { type: 'SET_IS_EDITING'; payload: boolean }
  | { type: 'SET_INITIAL_LOAD'; payload: boolean }
  | { type: 'HANDLE_UPDATE'; payload: { editingNote: Note | null, initialLoad: boolean, isEditing: boolean } };

export const initialState: AppState = {
  notes: [],
  reloadNotes: false,
  editingNote: null,
  isEditing: false,
  initialLoad: true,
};

export const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_NOTES':
      return { ...state, notes: action.payload };
    case 'TOGGLE_RELOAD_NOTES':
      return { ...state, reloadNotes: action.payload };
    case 'SET_EDITING_NOTE':
      return { ...state, editingNote: action.payload };
    case 'SET_IS_EDITING':
      return { ...state, isEditing: action.payload };
    case 'SET_INITIAL_LOAD':
      return { ...state, initialLoad: action.payload };
    case 'HANDLE_UPDATE':
      return {
        ...state,
        editingNote: action.payload.editingNote,
        initialLoad: action.payload.initialLoad,
        isEditing: action.payload.isEditing,
      };
    default:
      return state;
  }
};

