import PropTypes from 'prop-types'
import { useState } from 'react' 

//Redux
import { useSelector, useDispatch } from 'react-redux';
 // Importer l'action pour mettre à jour le userName
import { updateUserName } from '../../redux/userSlice'

import styles from '../EditUserInfo/EditUserInfo.module.scss'

function EditUserInfo ({ onSubmit, onCancel}) {
    // Utiliser Redux pour accéder à l'utilisateur actuel
    const user = useSelector((state) => state.user)
    const [userName, setUserName] = useState(user.userName || '');
  
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setUserName(e.target.value);
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Envoyer les données mises à jour au composant parent via onSubmit
        onSubmit({ ...user, userName });
        // Envoyer l'action Redux pour mettre à jour le userName
        dispatch(updateUserName(userName));
      };

    return (
        <div  className={styles['edit__container']}>
            <h2>Edit user info</h2>
            <form className={styles['user-edit-form']} onSubmit={handleSubmit}>
                <div className={styles['form-group']}>
                    <label htmlFor="userName">User Name:</label>
                    <input
                    type="text"
                    id="userName"
                    name="userName"
                    value={userName}
                    onChange={handleChange}
                    />
                </div>

                <div className={styles['form-group']}>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                    className={styles['no-authorised']}
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={user.firstName}
                    readOnly
                    />
                </div>

                <div className={styles['form-group']}>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                    className={styles['no-authorised']}
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={user.lastName}
                    readOnly
                    />
                </div>

                <div className={styles['form-buttons']}>
                    <button type="submit" className={styles['btn-submit']}>
                        Save
                    </button>
                    <button type="button" className={styles['btn-cancel']} onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </form>

        </div>
    )
}

EditUserInfo.propTypes = {
    // "user" est un objet avec des clés spécifiques
    user: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired,
      }).isRequired,  
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
}
export default EditUserInfo