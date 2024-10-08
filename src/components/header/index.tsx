import { useNavigate } from 'react-router-dom'
import Button from '../button/Button'
import styles from './header.module.css'
export function Header() {
    const navegar = useNavigate()

    function sair() {
        console.log('sair')
        localStorage.clear()
        navegar('/')
    }

    return (
        <header>
            <nav className={styles.barra_de_pesquisa}>
                <h1>Logo</h1>
                <div className={styles.area_btn}>
                    <Button width='15rem' height='3rem' label='Configurações' />
                    <Button onClick={sair} width='10rem' height='3rem' label='Sair' />
                </div>
            </nav>
        </header>
    )
}