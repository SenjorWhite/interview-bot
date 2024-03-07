import React from 'react';
import { Grid, Paper } from '@mui/material';
import ChatBox from './components/ChatBox';
import './App.css';

function App() {
	return (
		<div className="App">
			<Grid container spacing={2} justifyContent="center">
				<Grid item xs={5}>
					<Paper>
						<ChatBox />
					</Paper>
				</Grid>
				<Grid item xs={5}>
					<Paper>Search Results</Paper>
				</Grid>
			</Grid>
		</div>
	);
}

export default App;
