// import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

type AppProps = {
  messages: string[]
}

// function SuperButton({ title, color }: { title: string, color: string }) {
//   const [count, setCount] = useState(0)
//   return (
//     <button
//       onClick={() => setCount(prev => prev + 1)}
//       style={{ backgroundColor: color, padding: '10px 20px', border: 'none', borderRadius: '5px', color: '#fff', fontSize: '1.2rem', width: '200px', margin: '10px' }}
//     >
//       {title} : {count}
//     </button>
//   )
// }

function App({ messages }: AppProps) {
  // const buttonConfigs = [
  //   { id: 'super', title: '超级按钮', color: 'purple' },
  //   { id: 'another-1', title: '另一个按钮', color: 'green' },
  //   { id: 'another-2', title: '另一个按钮', color: 'green' },
  // ]

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
        <h2>从 main.tsx 传入的数据：</h2>
        {messages.map((item, index) => (
          <p key={`${item}-${index}`}>{item}</p>
        ))}
      </div>



    </div>
  )
}

export default App
