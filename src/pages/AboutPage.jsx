import '../index.css'
import style from '../css/modules/ToDo.module.css'
import about from '../css/modules/AboutPage.module.css'
const AboutPage = () => {

    return (
        <>

            <div className='todo'>
                <p className={style.title}>Страница о нас</p>
                <div className={about.textblock}>
                    <p className={about.text}>Разработчик:
                        <span>neolight</span>
                    </p>
                    <p className={about.text}>
                        Дата: <span>10.05.2026</span>
                    </p>
                </div>
                <p>Copyright ©</p>

            </div>
        </>

    )
}

export default AboutPage