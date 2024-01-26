import { useContext } from 'react';
import { UserContext } from '../../context/user.context';

function SelectUser() {
	const {userId, setUserId} = useContext(UserContext);

	const changeUser = (event) => {
		setUserId(Number(event.target.value));
	};


	return (
		<>
			<select name="user" id="user" value={userId} onChange={changeUser}>
				<option value='1'>Kira</option>
				<option value='2'>Vary</option>
				<option value='3'>Beka</option>
				<option value='4'>Rasul</option>
				<option value='5'>Deep</option>
				<option value='6'>Alexander</option>
				<option value='7'>Ilia</option>
				<option value='10'>Parsefal-me?</option>
			</select>
		</>
	);
}

export default SelectUser;