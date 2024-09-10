import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home'
import Login from './pages/Login/Login';
//import Login from './pages/Login/Login'

function App() {

  return (
    <>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sign-in' element={<Login />} />
        </Routes>
    </>
  )
}

export default App
{/*<Route path='/sign-in' element={<Login />} /> */}