import PropTypes from 'prop-types';
import {useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from '../Header/header.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
//import { getUserProfile } from '../../utils/apiUser';

//Redux
import { useDispatch, useSelector } from 'react-redux'
import { logout, setUserProfile } from '../../redux/userSlice';// Importer l'action logout depuis userSlice

import { NavLink } from 'react-router-dom';
//import { fetchUserProfile } from '../../utils/apiUser'
//import { useEffect } from 'react';



function Header({ logoSrc, logoAlt } ) {
    {/*A RETENIR pour verifier le comportement de commen les identifients de l'utilisateur sois dans localStorage
        ou soi dans sessionStorage sont ENREGISTREES  il faut avant ACCEDER ou  SE CONECTEr dans la page Login
        une foisCONECTEE pour povoir acceder a un console.log() correcte por la VERIFICATION de si les id de l'utilisateur
        sont enregistre et TOU DEPENT AUSSI SI l'UTILISATEUR A   COCHEE LE CHECKBOX DE "REMEBER ME"
        c'est la SEULE maniere de verifier si la SESSION del'utilisateur a etai ENREGISTRE 
        les composant qui son compris dans cete tache sont: DashboardUser, Header, Login(connectionet enregistrement de l'utilisateur)
        et la logique pour extreer les done depuis l'API qui son dans deux fichier: apiLogin et apiUser*/}
    
    {/* sessionStorage et localStorage sert a pouvoir extreer les donne de l'utilisateur
        une fois que l'utilisateur est conectee on enregistre le token depui apiLogin ou DashboardUser " a verifier"*/}    
    //console.log('First name:', firstName);
    //console.log('First name from localStorage:', localStorage.getItem('firstName'));
    //console.log('First name from sessionStorage:', sessionStorage.getItem('firstName'));
    //react router
    const navigate = useNavigate()
    
    //Redux
    const userName = useSelector((state) => state.user.userName) 
    //console.log('userName in Header:', userName);
    const dispatch = useDispatch()

    useEffect(() => {
        //recuperer l'username
        const storedUseName = localStorage.getItem('userName') || sessionStorage.getItem('userName')
        if (storedUseName && !userName) {
            dispatch(setUserProfile({
                userName: storedUseName,
                //firstName: '', // Ignorer firstName
                //lastName: ''   // Ignorer lastName
            }))
        }
    }, [dispatch, userName])
    
    //recuperation de userName et firstName depui localStorage

    //const userName = localStorage.getItem('userName') || sessionStorage.getItem('userName')
    
    //const firstName = localStorage.getItem('firstName') || sessionStorage.getItem('firstName')
    //console.log('First name from storage:', firstName);
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('firstName'); // Supprimer également firstName
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('userName');
        sessionStorage.removeItem('firstName');
       
        navigate('/login')

        // Déclencher l'action logout pour réinitialiser l'état utilisateur dans Redux
        dispatch(logout())

       
      }

    return (
        <header>
            <nav className={styles['main__nav']}>
                <NavLink to="/" className={styles['main__nav--logo']}>
                <img className={styles['main__nav--img']} src={logoSrc} alt={logoAlt} />
                <h1 className={styles['sr__only']}>Argent Bank</h1>
                </NavLink>

                <div>
                    {userName ? (
                        <div className={styles['user__menu']}>
                            <NavLink
                                className={styles['hover']} 
                                to="/dashboard-user">
                                <FontAwesomeIcon className={styles['icon']} icon={faCircleUser} />
                                <span>{userName ? userName : 'Loading...'}</span>
                            </NavLink>
                            
                            <NavLink
                                to="/sign-in" 
                                className={styles['hover']} onClick={handleLogout}>
                                <FontAwesomeIcon className={styles['icon-out']} icon={faSignOutAlt} />
                                <span>Sign Out</span> 
                            </NavLink>
                        </div>
                    ) : (
                        <NavLink
                        to="/sign-in"
                        className={({ isActive }) =>
                            isActive
                            ? `${styles['main__nav--item']} ${styles['active']}`
                            : styles['main__nav--item']
                        }
                        >
                        <FontAwesomeIcon className={styles['icon']} icon={faCircleUser} />
                        Sign In
                        </NavLink>
                    )}
                </div>
            </nav>
        </header>
    )
}

Header.propTypes ={
    logoSrc: PropTypes.string.isRequired,
    logoAlt: PropTypes.string.isRequired,
    
}

export default Header