import React from 'react';
import { Grid } from '@mui/material';
import ChatBox from './components/ChatBox';
import RagBox from './components/RagBox';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';

function App() {
	return (
		<Provider store={store}>
			<div className="App">
				<Grid container spacing={2} justifyContent="center">
					<Grid item xs={5}>
						<ChatBox />
					</Grid>
					<Grid item xs={5}>
						<RagBox />
					</Grid>
				</Grid>
			</div>
		</Provider>
	);
}

export default App;
