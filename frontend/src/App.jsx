import { useState } from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import TrangChu from '../routes/client';
import Admin from '../routes/admin';
import QTV from '../routes/qtv';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TrangChu />
      <Admin />
      <QTV />
    </>
  )
}

export default App
