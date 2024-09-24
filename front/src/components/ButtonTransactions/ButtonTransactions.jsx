import PropTypes from 'prop-types'
import styles from '../ButtonTransactions/ButtonTransactions.module.scss'

function ButtonTransactions ({ transactions }) {
    return (
            <button className={styles['button']}>{transactions}</button>
    )
}

ButtonTransactions.propTypes = {
    transactions: PropTypes.string.isRequired,
}
export default ButtonTransactions