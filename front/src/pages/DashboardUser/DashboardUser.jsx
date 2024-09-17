import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

//Redux
//avec useSelector on va acceder a l'etat global et amener la partie qui nous interesse
import { useSelector, useDispatch } from 'react-redux';
import { setUserProfile, updateUserName } from '../../redux/userSlice';
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
  //cet ligne de code n'est pas necessaire avec Redux
  //const [userProfile, setUserProfile] = useState(null); // Stocker le profil utilisateur
 
  //eta pour controle l'affichage du formulaire d'edition
  const [isEditingUser, setIsEditingUser] = useState(false)
  // Utiliser les donees des comptes importés STATIQUES juste pour exemple
  const accounts = bankAccountsData.accounts;
  const navigate = useNavigate();

  //redux
  const dispatch = useDispatch()
   // Utiliser Redux pour récupérer le profil utilisateur
  const userProfile = useSelector((state) => state.user)

  //extraction de donnees de l'utilisateur
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const storedToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

        if (storedToken) {
          const profile = await getUserProfile(storedToken); // Appel à l'API avec le token
          dispatch(setUserProfile(profile)); // Mettre à jour le profil utilisateur dans Redux
        } else {
          navigate('/login'); // Rediriger si l'utilisateur n'est pas connecté
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    // Si userProfile est vide, on appelle l'API
    if (!userProfile || !userProfile.userName) {
      fetchUserProfile();
    }
  }, [dispatch, navigate, userProfile]);

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

      const updatedProfile = await response.json();
      dispatch(updateUserName(updatedProfile.userName)); // Mettre à jour dans Redux
      setIsEditingUser(false);
    } catch (error) {
      console.error('Error updating user profile', error);
    }
  };

  if (!userProfile || !userProfile.userName) {
    return <p>Loading...</p>;
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