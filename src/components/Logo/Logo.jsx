import styles from './Logo.module.css';
import { memo } from 'react';

function Logo({image}) {
	console.log('batonchik');
	return <img src={image} alt='Logo' className={styles.logo}/>;
}

export default memo(Logo);