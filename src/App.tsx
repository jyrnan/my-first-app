import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NewsItemList from './components/news_item_list.tsx'
import type { NewsItem } from './components/news_item_list.tsx'

type Messages = NewsItem[]

function App() {
  const [messages, setMessages] = useState<Messages>([
    { id: '1', title: '第一条新闻', content: '这是第一条内容' },
    { id: '2', title: '第二条新闻', content: '这是第二条内容' },
    { id: '3', title: '第三条新闻', content: '这是第三条内容' },
  ])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>

      <div style={{ display: 'flex', gap: '20px' }}>
        <img src={reactLogo} className="logo react" alt="React logo" />
        <img src={viteLogo} className="logo vite" alt="Vite logo" />
      </div>

      <div>
        <h2>App 中 useState 管理的数据：</h2>
        <NewsItemList items={messages} />
        <button
          onClick={() =>
            setMessages((prev) => [
              ...prev,
              {
                id: String(prev.length + 1),
                title: `新增新闻 ${prev.length + 1}`,
                content: `这是新增的内容 ${prev.length + 1}`,
              },
            ])
          }
          style={{ marginTop: '12px' }}
        >
          添加一条消息
        </button>
      </div>



    </div>
  )
}

export default App
