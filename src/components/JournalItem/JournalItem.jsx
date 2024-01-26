
import './JournalItem.css';

function JournalItem({title,post,date}) {
	return (
		<>
			<h2 className='journal-item__header'>{title}</h2>
			<h2 className='journal-item__body'>
				<div className='journal-item__date'>{date}</div>
				<div className='journal-item__text'>{post}</div>
			</h2>
		</>
	);
}

export default JournalItem;