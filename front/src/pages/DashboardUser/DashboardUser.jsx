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
import AccountBank from '../../components/AcountBank/AccountBank';
//importation des informations bancaires
import bankAccountsData from '../../utils/bankAccountsData'


function DashboardUser() {
  const [userProfile, setUserProfile] = useState(null); // Stocker le profil utilisateur
  const [error, setError] = useState(null) // Stocker les erreurs potentielles
  //eta pour controle l'affichage du formulaire d'edition
  const [isEditingUser, setIsEditingUser] = useState(false)
  // Utiliser les donees des comptes importés STATIQUES juste pour exemple
  const accounts = bankAccountsData.accounts;
  const navigate = useNavigate();

  //extraction de donnees de l'utilisateur
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile(); // Appel de la fonction pour récupérer le profil
        setUserProfile(profile);  // Stocker le profil utilisateur dans l'état
        
        // Enregistrer le prénom dans localStorage ou sessionStorage
        localStorage.setItem('userName', profile.userName);  // ou sessionStorage.setItem('userName', profile.userName);
        sessionStorage.setItem('userName', profile.userName)
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

  //metre a jour l'userName 
  const handleSubmitEdit = async (updateUserData) => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(updateUserData)
      })
      if(!response.ok) {
        throw Error('Failed to update user profile')
      }

      const updateProfile = await response.json()
      setUserProfile(updateProfile)
      setIsEditingUser(false)

      localStorage.setItem('userName', updateProfile.userName)
      sessionStorage.setItem('userName', updateProfile.userName)


    } catch (error) {
      console.error('Error updaiting user profile', error)
    }

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
      <Header logoSrc={Logo} logoAlt={"logo argent bank"} userName={userProfile.userName} />
      <main className={styles['main']}>
        <div className={styles['account__container']}>

        {!isEditingUser && (
          <section className={styles['user']}>
            <div className={styles['user__info']}>
              <h1>Welcome back</h1>
              <p>{userProfile.userName} !</p>
            </div>
            <ButtonEdit onClick={handleEditClick} />
          </section>
        )}
        
        {isEditingUser && (
          <EditUserInfo
            user={userProfile}
            onSubmit={handleSubmitEdit}
            onCancel={handleCancelEdit}
          />
        )}

          <section className={styles['account__details']}>
          {accounts.map((account, index) => (
            <AccountBank
              key={index}
              accountType={`${account.type} (${account.accountNumber})`}
              accountBalance={`$${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
              balanceType={account.availableBalance ? 'Available Balance' : 'Current Balance'}
            />
          ))} 
          </section>
        </div>
      </main> 
      <Footer />
      

    </>
  );
}

export default DashboardUser;
{/*sisteme europeen
  accountBalance={`$${account.balance.toFixed(2)}`}
   sisteme americain
   accountBalance={`$${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}*/}