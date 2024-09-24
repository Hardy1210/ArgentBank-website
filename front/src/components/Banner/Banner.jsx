import PropTypes from 'prop-types';
import Card from '../Card/Card';
import styles from '../Banner/banner.module.scss';

function Banner({
  className,
  banner,
  small,
  smallS,
  smallSs,
  medium,
  bannerAlt = 'Default banner description',
}) {
  return (
    <div className={className}>
      <picture>
        {/* Utilisation du format WebP uniquement */}
        <source 
          srcSet={`
            ${smallSs} 300w, 
            ${smallS} 840w, 
            ${small} 1150w,
            ${medium} 1390w,
            ${banner} 1650w
          `} 
          sizes="(min-width: 1700px) 1600px, 
                 (max-width: 1400px) 1390px, 
                 (max-width: 1150px) 1150px, 
                 (max-width: 840px) 840px,   
                 (max-width: 300px) 300px,   
                 calc(94.2vw + 17px)"
          type="image/webp"
        />

        {/* Image de secours en cas d'erreur avec le srcSet */}
        <img 
          className={styles['img']}
          alt={bannerAlt}
          src={banner} /* Image de secours */
          loading="eager" 
        />
      </picture>
      <Card />
    </div>
  );
}

// Définir les types des props pour une vérification de types plus stricte
Banner.propTypes = {
  className: PropTypes.string.isRequired,
  banner: PropTypes.string.isRequired,
  small: PropTypes.string.isRequired,
  smallS: PropTypes.string.isRequired,
  smallSs: PropTypes.string.isRequired,
  medium: PropTypes.string.isRequired,
  bannerAlt: PropTypes.string,
};

export default Banner;
