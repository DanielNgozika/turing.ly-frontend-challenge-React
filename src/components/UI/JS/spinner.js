import React from 'react';

import styles from '../CSS/spinner.module.css';

const spinner = () => {
    return (
        <div className={styles.lds_ripple}>
            <div></div>
            <div></div>
        </div>
    )
}

export default spinner;