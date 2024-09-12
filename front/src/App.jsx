import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import DashboardUser from './pages/DashBoardUser/DashBoardUser'

function App() {

  return (
    <>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sign-in' element={<Login />} />
          <Route path="/dashboard-user" element={<DashboardUser />} />
        </Routes>
    </>
  )
}

export default App
{/*<Route path='/sign-in' element={<Login />} /> */}