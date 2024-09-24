import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

//Redux
//avec useSelector on va acceder a l'etat global et amener la partie qui nous interesse
import { useSelector, useDispatch } from 'react-redux';
import { setUserProfile, updateUserName } from '../../redux/userSlice'

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
  
  //eta pour controle l'affichage du formulaire d'edition
  const [isEditingUser, setIsEditingUser] = useState(false)
  const [ isLoading, setIsLoading ] = useState()
  // Utiliser les donees des comptes importés STATIQUES juste pour exemple
  const accounts = bankAccountsData.accounts;
  const navigate = useNavigate();

  //redux
  const dispatch = useDispatch()
   // Utiliser Redux pour récupérer le profil utilisateur
  const userProfile = useSelector((state) => state.user)
  //recuperation de token
  
  //extraction de donnees de l'utilisateur
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const storedToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
        //console.log(storedToken)
        if (storedToken) {
          // Appel à l'API avec le token
          const profile = await getUserProfile(storedToken) 
          const { userName, firstName, lastName } = profile
          //actualise le profil en Redux
          dispatch(setUserProfile({userName, firstName, lastName}))

          setIsLoading(false)
        } else {
          
          navigate('/sign-in'); // Rediriger si l'utilisateur n'est pas connecté
        }
      } catch (error) {
        console.error('Error fetching user profile:', error)
        setIsLoading(false)
      }
    };

    // Si userProfile est vide, on appelle l'API
    if (!userProfile.userName) {
      fetchUserProfile()
    } else {
      //si on a deja l'userName on la page ne charge pas
      setIsLoading(false)
    }
  }, [dispatch, navigate, userProfile.userName]);

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
      const storedToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
      //envpoi de la requette pour metre a jour le donnees
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type' : 'application/json',
          'Authorization': `Bearer ${storedToken}`, 
        },
        body: JSON.stringify(updateUserData)
      })
      if(!response.ok) {
        throw Error('Failed to update user profile')
      }

      const updatedProfile = await response.json()
      // Mettre à jour dans Redux
      dispatch(updateUserName(updatedProfile.userName))
      //fermer le mode edition
      setIsEditingUser(false);
    } catch (error) {
      console.error('Error updating user profile', error);
    }
  };

  // Condicional para mostrar el estado de carga
  //attention cest la condiction logic de EditUserInfo 
  //qui va a empeche la recharge de la page apres le changemen de m'userName 
  if (isLoading) {
    return <p>Loading user data, please wait...</p>; // Mensaje de carga
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
        
        {isEditingUser && userProfile.userName && (
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