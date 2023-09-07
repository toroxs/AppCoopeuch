import { useState } from 'react'
import './App.css'
import { ListaTareas } from './components/Lista_Tareas'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ListaTareas/>    
    </>
      
  )
}

export default App
