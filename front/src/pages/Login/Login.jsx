import Logo from '../../assets/images/argentBankLogo-1.webp'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginRequest } from '../../utils/apiLogin'  // Importation du fichier de requête
import { saveToken } from '../../utils/sessionManager';  // Importation de sessionManager.js
//redux
import { useDispatch } from 'react-redux';
import { setUserProfile } from '../../redux/userSlice'

import styles from '../Login/login.module.scss'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //rememberMe qui travai en lien avce sessionManager.js
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null)

  //redux
  const dispatch = useDispatch()
  //react router
  const navigate = useNavigate();
  
  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();  // Empêche le rechargement de la page

    try {
      const { token } = await loginRequest(email, password)
      console.log('Login Response:', { token });
      
      // Utiliser sessionManager pour enregistrer le token
      saveToken(token, rememberMe);
       
      // Ici vous pouvez récupérer le profil utilisateur après la connexion
      // Puis utiliser dispatch pour mettre à jour le store Redux avec les infos utilisateur
      dispatch(setUserProfile({
        userName: '',
        firstName: '',
        lastName: '',
      }));
    
      // Rediriger vers le tableau de bord après la connexion
      navigate('/dashboard-user')

      
    } catch (error) {
      console.error('Error during login:', error);
      setError(error.message);
    }
    
  }

  return (
    <>
      <Header logoSrc={Logo} logoAlt={"logo argent bank"} />
      <main className={`${styles.main} ${styles['bg-dark']}`}>
        <section className={styles['sign-in-content']}>
          <FontAwesomeIcon className={styles['icon']} icon={faCircleUser} />
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles['input__wrapper']}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles['input__wrapper']}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className={styles['input__remember']}>
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>

            <button type="submit" className={styles['sign-in-button']}>Sign In</button>

            {error && <p className={styles.error}>{error}</p>}
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Login;
