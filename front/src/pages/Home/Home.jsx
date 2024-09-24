import Header from '../../components/Header/Header'
import Logo from '../../assets/images/argentBankLogo-1.webp'
import Banner from '../../components/Banner/Banner'

import BannerImg from '../../assets/images/bank-tree-1.webp'
import mediumBanner from '../../assets/images/bank-tree-1390.webp'
import smallBanner from '../../assets/images/bank-tree-1150.webp'
import smallBannerS from '../../assets/images/bank-tree-840.webp'
import smallBannerSs from '../../assets/images/bank-tree-300.webp'

import FeatureCard from '../../components/FeatureCard/FeatureCard'
import featuresData from '../../data/featuresData'
import Footer from '../../components/Footer/Footer'
//Redux
import { useSelector } from 'react-redux'

import styles from '../Home/home.module.scss'

function Home () {
    //Redux
    //const dispatch = useDispatch()
    //redux pour l'extration du profil  ou userName de m'utilisateur
    const userName = useSelector((state) => state.user.userName)
    console.log('username desde redux:', userName)
   
    return (
        <>
            <Header logoSrc={Logo} logoAlt={"logo argent bank"}/>
            <main>
                <div className={styles['banner__container']}>
                    <Banner banner={BannerImg} smallSs={smallBannerSs} smallS={smallBannerS} small={smallBanner} medium={mediumBanner} bannerAlt={'Un pot de plante avec des monnaies.'} className={styles['banner']}/>
                </div>
                <section className={styles['features']}>
                    <h2 className={styles['sr-only']}>Features</h2>
                     <div className={styles['features__container']}>
                        {featuresData.map((feature) => (
                            <FeatureCard 
                            key={feature.id}
                            className={styles['features__item']}
                            data={feature}
                            />
                        ))}
                     </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Home