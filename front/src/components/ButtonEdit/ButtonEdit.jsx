import PropTypes from 'prop-types'; 
import styles from '../ButtonEdit/ButtonEdit.module.scss'

function ButtonEdit ({ onClick }) {
    return (
        <button
            onClick={onClick} 
            className={styles['btn__edit']}>
        Edit Name
        </button>        
    )
}

ButtonEdit.propTypes = {
    // onClick doit être une fonction
    onClick: PropTypes.func.isRequired,  
}
export default ButtonEdit