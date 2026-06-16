import { useState, useEffect } from 'react'
import './App.css'
import NoteCard from './components/NoteCard'
import type { Note } from './components/NoteCard'
import { fetchNotes, createNote, updateNote, deleteNote } from './lib/api'

function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [inputValue, setInputValue] = useState('')
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [editValue, setEditValue] = useState('')

  // 1. Initial Load from Worker API
  useEffect(() => {
    loadNotes()

    // 2. Polling for cross-tab sync
    const POLL_INTERVAL = 5000
    const intervalId = setInterval(() => {
      loadNotes()
    }, POLL_INTERVAL)

    return () => clearInterval(intervalId)
  }, [])

  const loadNotes = async () => {
    try {
      const data = await fetchNotes()
      setNotes(data)
    } catch (err) {
      console.error('Error fetching notes:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddNote = async () => {
    if (!inputValue.trim()) return

    try {
      await createNote(inputValue.trim())
      setInputValue('')
      loadNotes()
    } catch (err) {
      console.error('Error adding note:', err)
      alert('添加笔记失败，请检查网络连接。')
    }
  }

  const handleDeleteNote = async (id: string) => {
    try {
      await deleteNote(id)
      loadNotes()
    } catch (err) {
      console.error('Error deleting note:', err)
      alert('删除失败')
    }
  }

  const handleOpenEdit = (note: Note) => {
    setEditingNote(note)
    setEditValue(note.content)
  }

  const handleSaveEdit = async () => {
    if (!editingNote) return

    try {
      await updateNote(editingNote.id, editValue.trim())
      setEditingNote(null)
      loadNotes()
    } catch (err) {
      console.error('Error updating note:', err)
      alert('保存失败')
    }
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
            disabled={loading}
          />
          <button 
            className="submit-btn" 
            onClick={handleAddNote}
            disabled={loading}
          >
            提交
          </button>
        </div>
      </header>

      <main className="notes-grid">
        {loading ? (
          <div style={{ textAlign: 'center', gridColumn: '1 / -1', marginTop: '40px', color: '#86868b' }}>
            加载中...
          </div>
        ) : notes.length === 0 ? (
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
