import './JournalList.css';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import { useContext, useMemo } from 'react';
import { UserContext } from '../../context/user.context';

function JournalList({data, setItem}) {
	const {userId} = useContext(UserContext);
	const sortItems = (a,b) => {
		if (a.date > b.date) {
			return 1;
		} else {
			return -1;
		}
	};
	const filteredItems = useMemo(() => data.filter(el=>el.userId === userId).sort(sortItems), [data, userId]);

	if (data.length === 0) {
		return <p>Записей пока что нема</p>;
	}
	
	return <>{data.length === 0 ? <p>Записей нет, добавьте первую</p> : filteredItems.map(elem => (
		<CardButton key={elem.id} onClick={() => setItem(elem)}>
			<JournalItem 
				title={elem.title}
				post={elem.post}
				date={elem.date}
			/>
		</CardButton>
	))}</>;
}

export default JournalList;