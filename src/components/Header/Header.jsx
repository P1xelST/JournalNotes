import { useCallback, useState } from 'react';
import Button from '../Button/Button';
import SelectUser from '../SelectUser/SelectUser';
// import styles from './Header.module.css';
import Logo from '../Logo/Logo';

const logos = ['/Personal_Journal.svg', '/vite.svg', '/hub.jpg'];

function Header() {
	const [logoIndex, setLogoIndex] = useState(0);
	console.log('hello');

	const toggleLogo = useCallback(() => {
		setLogoIndex((state) => {
			if(state === logos.length - 1) {
				return state = 0;
			}
			return Number(++state);
		});
	}, []);
	return (
		<>
			<Logo image={logos[logoIndex]}/>
			<SelectUser />
			<Button onClick={toggleLogo} text='Сменить лого'/>
		</>
	);
}

export default Header;