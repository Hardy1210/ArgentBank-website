import PropTypes from 'prop-types'
//import ButtonTransactions from '../ButtonTransactions/ButtonTransactions'
import styles from './accountBank.module.scss'
import ButtonTransactions from '../ButtonTransactions/ButtonTransactions'

function AccountBank ({ accountType, accountBalance, balanceType }) {
    return (
        <div className={styles['account__container']}>
            <div className={styles['account__details']}>
                <h3>{accountType}</h3>
                <span className={styles['balance']}>{accountBalance}</span>
                <p>{balanceType}</p>
            </div>
            <div className={styles['account__actions']}>
                <ButtonTransactions transactions={'View transactions'} />

            </div>
        </div>
    )
}

AccountBank.propTypes = {
    accountType: PropTypes.string.isRequired,
    accountBalance: PropTypes.string.isRequired,
    balanceType: PropTypes.string.isRequired,
}
export default AccountBank