import React from 'react';
import ChatBox from './components/ChatBox';
import RagBox from './components/RagBox';
import Announcement from './components/Announcement';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';

function App() {
	return (
		<Provider store={store}>
			<div className="App">
				<Announcement />
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<div>
						<RagBox />
					</div>
					<div>
						<ChatBox />
					</div>
				</div>
			</div>
		</Provider>
	);
}

export default App;
