import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import DashboardUser from './pages/DashBoardUser/DashBoardUser'
//recuperer le profile de l'utilisateurdepuis l'API
import { getUserProfile } from './utils/apiUser'
import { loadToken } from './utils/sessionManager'
//Redux
import { useDispatch } from 'react-redux';
import { setUserProfile } from './redux/userSlice';
import { useEffect } from 'react'

//on a centralise lobtention du profil utilisateur pour 
//que redux gere de maniere optimal leta fgeneral de l'app
function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    const token = loadToken()
    if (token) {
      // Aquí haces una solicitud para recuperar el perfil del usuario con el token
      getUserProfile(token).then(user => {
        if (user) {
          dispatch(setUserProfile({
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
          }));
        }
      }).catch(error => {
        console.error('Error fetching user profile:', error)
      });
    }
  }, [dispatch])

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