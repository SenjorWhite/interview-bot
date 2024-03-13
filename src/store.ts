import { configureStore } from '@reduxjs/toolkit';
import ragReducer from './reducers/ragReducer';

const store = configureStore({
	reducer: {
		rag: ragReducer,
	},
});

export default store;
