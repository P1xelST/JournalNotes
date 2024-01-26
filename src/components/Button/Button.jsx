import './Button.css';

function Button({text, onClick}) {
	// let text = 'save';
	// const [text, setText] = useState('save'); // для изменения состояния
	
	// const clicked = () => {
	// 	setText(t => ' Some text'); // предыдущиее значение t 
	// 	console.log('Hello world');

	// };
	return <button className='button accent' onClick={onClick}>{text}</button>;
}

export default Button;