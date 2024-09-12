import PropTypes from 'prop-types'
import { useState } from 'react' 
import styles from '../EditUserInfo/EditUserInfo.module.scss'

function EditUserInfo ({ user, onSubmit, onCancel}) {
    const [userName, setUserName] = useState(user.userName || '')

    const handleChange = (e) => {
        setUserName(e.target.value);
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Envoyer les données mises à jour au composant parent via onSubmit
        onSubmit({ ...user, userName });
      };

    return (
        <div  className={styles['edit__container']}>
            <h2>Edit user info</h2>
            <form className="user-edit-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="userName">User Name:</label>
                    <input
                    type="text"
                    id="userName"
                    name="userName"
                    value={userName}
                    onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={user.firstName}
                    readOnly
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={user.lastName}
                    readOnly
                    />
                </div>

                <div className="form-buttons">
                    <button type="submit" className="btn-submit">
                        Save Changes
                    </button>
                    <button type="button" className="btn-cancel" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </form>

        </div>
    )
}

EditUserInfo.propTypes = {
    user: PropTypes.string.isRequired,
    onSubmit: PropTypes.string.isRequired,
    onCancel: PropTypes.string.isRequired,
}
export default EditUserInfo