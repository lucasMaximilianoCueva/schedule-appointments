import React from 'react'
import styles from "./styles.module.scss";

const Nav = () => {
  return (
    <header className={styles.header}>
        <nav className={styles.navContainer}>
            <h1>
                Schedule a Dance with Death
            </h1>
        </nav>
    </header>
  )
}

export default Nav