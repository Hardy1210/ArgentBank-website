import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserProfile } from '../../redux/userSlice';
import { loginRequest } from '../../utils/apiLogin';
import { saveToken } from '../../utils/sessionManager';
import styles from '../Login/login.module.scss';
import Logo from '../../assets/images/argentBankLogo-1.webp';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '', general: '' });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateFields = () => {
    let newErrors = { email: '', password: '', general: '' };

    // Si tous les champs sont vides, afficher uniquement le message général
    if (!email && !password) {
      newErrors.general = "Veuillez remplir tous les champs";
    } else {
      // Vérifications individuelles seulement si tous les champs ne sont pas vides
      if (!email) newErrors.email = "L'email est vide. Veuillez entrer un email.";
      if (!password) newErrors.password = "Le mot de passe est vide. Veuillez entrer un mot de passe.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ email: '', password: '', general: '' });

    const validationErrors = validateFields();
    if (validationErrors.general || validationErrors.email || validationErrors.password) {
      setErrors(validationErrors);
      return;
    }

    try {
      const { token } = await loginRequest(email, password);
      saveToken(token, rememberMe);

      dispatch(setUserProfile({
        userName: '',
        firstName: '',
        lastName: '',
      }));

      navigate('/dashboard-user');
    } catch (error) {
      setErrors((prev) => ({ ...prev, general: error.message }));
    }
  };

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
                onChange={(e) => {
                  setEmail(e.target.value);
                  // Effacer l'erreur email lorsque l'utilisateur commence à saisir
                  if (errors.email) {
                    setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
                  }
                  // Si l'erreur générale était due à des champs vides, elle doit aussi être effacée si les deux champs sont remplis
                  if (errors.general && e.target.value && password) {
                    setErrors((prevErrors) => ({ ...prevErrors, general: '' }));
                  }
                }}
              />
              {errors.email && !errors.general && <p className={styles['error']}>{errors.email}</p>}
            </div>

            <div className={styles['input__wrapper']}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  // Effacer l'erreur email lorsque l'utilisateur commence à saisir
                  if (errors.password) {
                    setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
                  }
                  // Si l'erreur générale était due à des champs vides, elle doit aussi être effacée si les deux champs sont remplis
                  if (errors.general && e.target.value && email) {
                    setErrors((prevErrors) => ({ ...prevErrors, general: '' }));
                  }
                }}
              />
              {errors.password && !errors.general && <p className={styles['error']}>{errors.password}</p>}
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
            {errors.general && <p className={styles['error']}>{errors.general}</p>}
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Login;
