import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Pour rediriger si nécessaire
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer'
import EditUserInfo from '../../components/EditUserInfo/EditUserInfo';
import ButtonEdit from '../../components/ButtonEdit/ButtonEdit'
//import AccountCard from '../../components/AcountCard/AccountCard';
//importation des donees depui apiUser
import { getUserProfile } from '../../utils/apiUser';
import Logo from '../../assets/images/argentBankLogo-1.webp';
import styles from '../DashboardUser/dashboardUser.module.scss'


function DashboardUser() {
  const [userProfile, setUserProfile] = useState(null); // Stocker le profil utilisateur
  const [error, setError] = useState(null) // Stocker les erreurs potentielles
  //eta pour controle l'affichage du formulaire d'edition
  const [isEditingUser, setIsEditingUser] = useState(false)
  const navigate = useNavigate();

  //extraction de donnees de l'utilisateur
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile(); // Appel de la fonction pour récupérer le profil
        setUserProfile(profile);  // Stocker le profil utilisateur dans l'état
        
        // Enregistrer le prénom dans localStorage ou sessionStorage
        localStorage.setItem('firstName', profile.firstName);  // ou sessionStorage.setItem('firstName', profile.firstName);
        sessionStorage.setItem('firstName', profile.firstName)
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError(error.message); // Enregistrer l'erreur
        navigate('/login');  // Rediriger vers la page de connexion si pas de token
      }
    };

    fetchUserProfile(); // Appeler la fonction au chargement du composant
  }, [navigate]);

  //fonction pour gerer le clic du buitton
  const handleEditClick = () => {
    //affiche le formulaire
    setIsEditingUser(true)
  }

  //fonction pour anulee l'edition
  const handleCancelEdit = () => {
    //masque le formulaire
    setIsEditingUser(false)
  }

  const handleSubmitEdit = (updateUserData) => {
    // Mettre à jour les informations de l'utilisateur ici (par ex: appel API pour mettre à jour)
    console.log('Updated user data:', updateUserData);
    //masquer le formulaire d'edition apres la submition
    setIsEditingUser(false)
  }

  if (error) {
    return <p>{error}</p>;  // Afficher l'erreur si elle existe
  }

  if (!userProfile) {
    return <p>Loading...</p>;  // Afficher un message de chargement en attendant les données
  }



  return (
    <>
      <Header logoSrc={Logo} logoAlt={"logo argent bank"} firstName={userProfile.firstName} />
      <main>
        <div className={styles['account__container']}>
          <section className={styles['user']}>
            <div className={styles['user__info']}>
              <h1>Welcome back</h1>
              <p>{userProfile.firstName} !</p>
            </div>
            {!isEditingUser && <ButtonEdit onClick={handleEditClick} />}
            {isEditingUser && (
              <EditUserInfo 
              user={userProfile}
              onSubmit={handleSubmitEdit}
              onCancel={handleCancelEdit}
              />
            )}
            
          </section>
          <section className={styles['account__details']}>

          </section>
          
        </div>
        
        <Footer />
      </main>

    </>
  );
}

export default DashboardUser;
