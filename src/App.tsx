import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function SuperButton({ title, color }: { title: string, color: string }) {
  const [count, setCount] = useState(0)
  return (
    <button
      onClick={() => setCount(count + 1)}
      style={{ backgroundColor: color, padding: '10px 20px', border: 'none', borderRadius: '5px', color: '#fff', fontSize: '1.2rem' }}>
      {title} : {count}
    </button>
  )
}

function App() {
  const buttonConfigs = [
    { id: 'super', title: '超级按钮', color: 'purple' },
    { id: 'another-1', title: '另一个按钮', color: 'green' },
    { id: 'another-2', title: '另一个按钮', color: 'green' },
  ]

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 style={{ color: 'orange', fontSize: '3rem' }}>
        你好，这是我的第一个 React 项目！
      </h1>
      <img
        src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200"
        alt="React Logo"
        style={{ borderRadius: '50%', marginBottom: '20px', border: '4px solid #61dafb' }}
      />
      <div className="button-group">
        {buttonConfigs.map((button) => (
          <SuperButton key={button.id} title={button.title} color={button.color} />
        ))}
        <p>
          如果数字超过10， 我就很厉害！
        </p>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        <h1>这是一个测试组件</h1>
      </div>
    </div>
  )
}

export default App
