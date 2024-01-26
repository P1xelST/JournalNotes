import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useContext, useEffect, /*useState*/ 
	useReducer,
	useRef} from 'react';
import cn from 'classnames';
import { INITIAL_STATE, formReducer } from './journalForm.state';
import Input from '../Input/Input';
import { UserContext } from '../../context/user.context';

function JournalForm({onSubmit, data, onDelete}) {
	const [formState, dispathForm] = useReducer(formReducer, INITIAL_STATE);
	const {isValid, isFormReadyToSubmit, values} = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const postRef = useRef();
	const {userId} = useContext(UserContext);



	const focusError = (isValid) => {
		switch(true) {
		case !isValid.title:
			titleRef.current.focus();
			break;
		case !isValid.date:
			dateRef.current.focus();
			break;
		case !isValid.post:
			postRef.current.focus();
			break;
		}
	};

	useEffect(() => {
		if(!data) {
			dispathForm({type: 'CLEAR'});
			dispathForm({type: 'SET_VALUE', payload: {userId}});
		}
		dispathForm({type: 'SET_VALUE', payload: {...data}});
	}, [data, userId]);

	useEffect(() => {
		let timerId;
		if(!isValid.date || !isValid.post || !isValid.title) {
			focusError(isValid);
			timerId = setTimeout(() => {
				console.log('Cleare state');
				dispathForm({type: 'RESET_VALIDITY'});
			}, 2000);
		}
		return () => {
			clearTimeout(timerId);
		};
	}, [isValid]);

	useEffect(() => {
		if(isFormReadyToSubmit) {
			onSubmit(values);
			dispathForm({type: 'CLEAR'});
			dispathForm({type: 'SET_VALUE', payload: {userId}});
		}
	}, [isFormReadyToSubmit,values, onSubmit, userId]);

	const addNoteItem = (evt) => {
		evt.preventDefault();
		dispathForm({type: 'SUBMIT'});
	};

	useEffect(() => {
		dispathForm({type: 'SET_VALUE', payload: {userId}});
	}, [userId]);

	const onChange = (e) =>{
		dispathForm({type: 'SET_VALUE', payload: {[e.target.name]: e.target.value}});
	};

	const deleteJournalItem = () => {
		onDelete(data.id);
		dispathForm({type: 'CLEAR'});
		dispathForm({type: 'SET_VALUE', payload: {userId}});
	};

	return (
		<form className={styles['journal-form']} onSubmit={addNoteItem}>
			<div className={styles['form-row']}>
				<Input type="text" ref={titleRef} onChange={onChange} isValid={isValid.title} value={values.title} name='title' appearence='title'/>
				{data?.id &&<button className={styles['delete']} type='button' onClick={() => deleteJournalItem()}>
					<img src="/Frame4.svg" alt="delete" />
				</button>}
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="date" className={styles['form-label']}>
					<img src="/Frame1.svg" alt="tabel" />
					<span>Дата</span>
				</label>
				<Input id="date" value={values.date} ref={dateRef} onChange={onChange} isValid={isValid.date} type='date' name='date'/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-label']}>
					<img src="/Frame2.svg" alt="folder" />
					<span>Метки</span>
				</label>
				<Input id="tag" type='text' value={values.tag} onChange={onChange} name='tag' appearence/>
			</div>
				
			<textarea name='post' ref={postRef} value={values.post} onChange={onChange}  id='' cols={30} rows={10} className={cn(styles['input'], {
				[styles['invalid']]: !isValid.post
			})}></textarea>
			<Button text="Сохранить" onClick={() => {console.log('kira');}}/>
		</form>
	);
}

export default JournalForm;