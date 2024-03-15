import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const Announcement = () => {
	const [open, setOpen] = useState(true);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Dialog open={open} onClose={() => {}}>
			<DialogTitle style={{ textAlign: 'center', color: 'gray', fontWeight: 'bold' }}>
				Discover Senjor Pai's Technology Showcase
			</DialogTitle>
			<DialogContent style={{ textAlign: 'justify', textIndent: '2em' }}>
				<p>
					Hi, welcome to Senjor Pai's Interactive Portfolio. Here, I mainly showcase several key technologies,
					including: React + TS + Netlify frontend, Express.js backend, MongoDB, RAG (Retrieval-Augmented
					Generation), Vector Search / Semantic Search with Embedding Algorithm, and OpenAI API (GPT-3.5).
				</p>
				<p>
					This webpage is currently just an initial prototype version. I will continue to update and improve
					it, as well as add new features. The knowledge base for RAG is still being expanded, so the amount
					of information contained may not be sufficient to handle all questions.
				</p>
				<p>
					Its primary purpose is to demonstrate how RAG technology answers fact-based questions in a
					contextually relevant manner and overcomes the illusion problem of generic responses from LLM.
					Please approach these questions with an open mind. Thank you!
				</p>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default Announcement;
