import './App.css'
import TopButtons from './components/TopButtons.jsx'
import Inputs from './components/Inputs.jsx'
import TimeAndLocation from './components/TimeAndLocation.jsx'

function App() {
  
  return (
    <>
  <div className='mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400'>
    <TopButtons />
    <Inputs />
    
    <TimeAndLocation />
  </div>
    </>
  )
}

export default App
