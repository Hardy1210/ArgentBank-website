import styles from '../Card/card.module.scss'

function Card () {

    const content = {
        subtitle: ['No fees.', 'No minimum deposit.', 'High interest rates.'],
        text: 'Open a savings account with Argent Bank today!'
    }


    return (
        <section className={styles['card__container']}>
            <h2 className={styles['sr-only']}>Promoted Content</h2>
            {content.subtitle.map((item, index) => (
                <p key={index} className={styles['subtitle']}>{item}</p>
            ))}
            <p className={styles['text']}>{content.text}</p>
        </section>
    ) 
}

export default Card