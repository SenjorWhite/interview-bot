import { createReducer } from '@reduxjs/toolkit';
import { updateRag } from '../actions/ragActions';

const initialState = {
	rag: '',
};

const ragReducer = createReducer(initialState, (builder) => {
	builder.addCase(updateRag, (state, action) => {
		state.rag = action.payload;
	});
});

export default ragReducer;
