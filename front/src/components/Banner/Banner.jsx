import PropTypes from 'prop-types'
import Card from '../Card/Card'
//import styles from '../Banner/banner.module.scss'

function Banner ({  className }) {
    return (
        <div className={className}>
            <Card />
            
        </div>
    )
}

Banner.propTypes ={
    
    className: PropTypes.string.isRequired,
}

export default Banner