import PropTypes from 'prop-types'; 
import styles from '../Header/header.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

import { NavLink } from 'react-router-dom';



function Header({ logoSrc, logoAlt } ) {
    return (
        <header>
            <nav className={styles['main__nav']}>
                <NavLink to="/" className={styles['main__nav--logo']}>
                    <img className={styles['main__nav--img']} src={logoSrc} alt={logoAlt} />
                    <h1 className={styles['sr__only']}>Argent Bank</h1>
                </NavLink>
                
                <div>
                    <NavLink 
                        to="/sign-in" 
                        className={({ isActive }) => 
                        isActive 
                            ? `${styles['main__nav--item']} ${styles['active']}`
                            : styles['main__nav--item']
                        }
                    >
                        <FontAwesomeIcon className={styles['icon']} icon={faCircleUser}/>
                        Sign In
                    </NavLink>
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