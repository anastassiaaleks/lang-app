import React from 'react'
import Nav from '../Nav/Nav'
import {ReactComponent as Logo} from './../../assets/img/Icon.svg'
import * as styles from './Header.module.css'
const Header =()=>{
    return (
        <header className={styles.header}>
            {/* <img src={Logo} alt=''/> */}
            <Logo />
            <Nav />
        </header>
    )
}

export default Header