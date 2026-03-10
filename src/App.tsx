import { useState, useEffect } from 'react'
import './App.css'
import NoteCard from './components/NoteCard'
import type { Note } from './components/NoteCard'

function App() {
  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      const saved = localStorage.getItem('notes')
      if (saved) {
        return JSON.parse(saved)
      }
    } catch (error) {
      console.error('Error parsing notes from localStorage:', error)
    }
    return [
      { id: '1', content: '这是一条示例笔记。长按可以编辑内容，点击右上角 × 可以删除。' },
      { id: '2', content: '欢迎使用极简笔记应用！每行最多显示 4 张卡片。' },
      { id: '3', content: '如果内容太长，卡片会自动出现滚动条。' },
    ]
  })
  
  const [inputValue, setInputValue] = useState('')
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [editValue, setEditValue] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem('notes', JSON.stringify(notes))
    } catch (error) {
      console.error('Error saving notes to localStorage:', error)
    }
  }, [notes])

  const handleAddNote = () => {
    if (!inputValue.trim()) return
    const newNote: Note = {
      id: Date.now().toString(),
      content: inputValue,
    }
    setNotes([newNote, ...notes])
    setInputValue('')
  }

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  const handleOpenEdit = (note: Note) => {
    setEditingNote(note)
    setEditValue(note.content)
  }

  const handleSaveEdit = () => {
    if (!editingNote) return
    setNotes(notes.map(note => 
      note.id === editingNote.id ? { ...note, content: editValue } : note
    ))
    setEditingNote(null)
  }

  return (
    <div className="app-container">
      <header className="header-section">
        <h1 style={{ marginBottom: '24px', color: '#1d1d1f' }}>极简笔记</h1>
        <div className="input-group">
          <input 
            type="text" 
            placeholder="输入笔记内容并回车..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddNote()}
          />
          <button className="submit-btn" onClick={handleAddNote}>提交</button>
        </div>
      </header>

      <main className="notes-grid">
        {notes.length === 0 ? (
          <div style={{ textAlign: 'center', gridColumn: '1 / -1', marginTop: '40px', color: '#86868b' }}>
            没有笔记，快去添加一条吧！
          </div>
        ) : (
          notes.map(note => (
            <NoteCard 
              key={note.id} 
              note={note} 
              onDelete={handleDeleteNote}
              onLongPress={handleOpenEdit}
            />
          ))
        )}
      </main>

      {/* Edit Modal */}
      {editingNote && (
        <div className="modal-overlay" onClick={() => setEditingNote(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>编辑笔记</h3>
            <textarea 
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              autoFocus
            />
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setEditingNote(null)}>取消</button>
              <button className="save-btn" onClick={handleSaveEdit}>保存</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
