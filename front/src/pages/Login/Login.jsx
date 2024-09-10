
import Logo from '../../assets/images/argentBankLogo-1.webp'
import Header from '../../components/Header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import styles from '../Login/login.module.scss'

function Login () {

     // Déclaration des états pour les champs de formulaire
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Remember me:', rememberMe);
    // Ici, tu peux ajouter la logique pour traiter le formulaire, comme une requête API
  };
    return (
        <>
            <Header logoSrc={Logo} logoAlt={"logo argent bank"}/>
            <main className={`${styles.main} ${styles['bg-dark']}`}>
                <section className={styles['sign-in-content']}>
                    <FontAwesomeIcon className={styles['icon']} icon={faCircleUser} />
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <div className={styles['input__wrapper']}>
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} // Mets à jour l'état
                            />
                        </div>

                        <div className={styles['input__wrapper']}>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} // Mets à jour l'état
                            />
                        </div>

                        <div className={styles['input__remember']}>
                            <input
                                type="checkbox"
                                id="remember-me"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)} // Mets à jour l'état
                            />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>

                        <button type="submit" className={styles['sign-in-button']}>Sign In</button>
                    </form>
                </section>
            </main>

        </>
        

    )
}

export default Login