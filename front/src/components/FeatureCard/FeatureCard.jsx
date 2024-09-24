import PropTypes from 'prop-types';
import styles from '../FeatureCard/FeatureCard.module.scss'

function FeatureCard ({ data, className }) {
    return (
        <div className={`${styles['feature__item']} ${className}`}>
            <img src={data.icon} alt={data.alt} className={styles['feature__item--icon']}/>
            <h3 className={styles['feature__item--title']}>{data.title}</h3>
            <p className={styles['feature__item--description']}>{data.description}</p>
        </div>
    )
}

FeatureCard.propTypes = {
    data: PropTypes.shape({
        icon: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }).isRequired,
    className: PropTypes.string
}
export default FeatureCard 