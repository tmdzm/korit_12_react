import { useState } from 'react'
import './App.css'
import HelloComponent from './HelloComponent'

function App2() {
  const [ age, setAge] = useState(0);

  // initialValue와 다른 매개변수를 넣어서 호출
  setAge('ten'); //
  return (
    <>
      <HelloComponent name='김영'/>
    </>
  )
}

export default App
