import './App.css';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import { useLocaleStorage } from './hooks/useLocaleStorage.hook';
import { UserContextProvider } from './context/user.context';
import { useState } from 'react';

function mapItem(data) {
	if(!data) {
		return [];
	} 
	return data.map(i => ({
		...i
	}));
}

function App() {
	// return React.createElement('div', {}, 'Project');
	const date = new Intl.DateTimeFormat('ru-RU').format(new Date);
	const [data, setData] = useLocaleStorage('data');
	const [selectedItem, setSelectedItem] = useState(null);

	const addItem = item => {
		if(!item.id) {
			setData([...mapItem(data), {
				...item,
				id: data.length > 0 ? Math.max(...data.map(i => i.id)) + 1 : 1
			}]);
		} else {
			setData([...mapItem(data).map(i => {
				if (i.id === item.id) {
					return {
						...item
					};
				}
				return i;
			})]);
		}
	};

	const deleteItem = (id) => {
		setData([...data.filter(i => i.id !== id)]);
	};

	return (
		<UserContextProvider>
			<div className='app'>
				<LeftPanel>
					<Header/>
					<JournalAddButton clearForm={() => setSelectedItem(null)}/>
					<JournalList data={mapItem(data)} date={date} setItem={setSelectedItem}/>
				</LeftPanel>
				<Body>
					<JournalForm onSubmit={addItem} onDelete={deleteItem} data={selectedItem}/>
				</Body>
			</div>
		</UserContextProvider>
	);
}

export default App;
