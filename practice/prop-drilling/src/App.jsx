import { useState } from 'react'

import Parent from './components/Parent.jsx';

function App() {
  const [theme] = useState("light");


  return (
    <>
     <Parent value={{theme:theme}}/>
    </>
  )
}

export default App
