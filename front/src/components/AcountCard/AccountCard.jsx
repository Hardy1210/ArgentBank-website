import styles from '../AcountCard/accountCard.module.scss'

function AccountCard () {
    return (
        <div className={styles['account']}>
            <div className={styles['account__details']}>
                <h3>Argent Bank Checking</h3>
                <span>$2,082.79</span>
                <p>Available Balance</p>
            </div>
            <div className={styles['account__actions']}>
                <button className={styles['btn-view-transactions']} >

                </button>

            </div>
        </div>
    )
}

export default AccountCard