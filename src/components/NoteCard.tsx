import React, { useState, useRef } from 'react';

export type Note = {
  id: string;
  content: string;
};

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
  onLongPress: (note: Note) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete, onLongPress }) => {
  const [timer, setTimer] = useState<any>(null);
  const isLongPress = useRef(false);

  const handleStart = () => {
    isLongPress.current = false;
    const t = setTimeout(() => {
      isLongPress.current = true;
      onLongPress(note);
    }, 500); // 500ms for long press
    setTimer(t);
  };

  const handleEnd = () => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
  };

  return (
    <div 
      className="note-card"
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
    >
      <button 
        className="delete-btn" 
        onClick={(e) => {
          e.stopPropagation();
          onDelete(note.id);
        }}
        title="删除"
      >
        ×
      </button>
      <div className="note-content">
        {note.content}
      </div>
    </div>
  );
};

export default NoteCard;
