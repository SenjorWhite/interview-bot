import { Paper } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const RagBox: React.FC = () => {
	const rag = useSelector((state: any) => state.rag);

	useEffect(() => {
		console.log('Rag has updated: ', rag);
	});

	const renderDocTitles = (rag: any) => {
		const docs = rag.rag?.docs;
		if (docs) {
			return docs.slice().map((docs: { title: string; score: number }, index: number) => (
				<Paper style={{ margin: '5px', backgroundColor: '#fffbf5' }}>
					<div style={{ padding: '5px', color: '#b0b0b0', fontSize: '14px', fontWeight: 'bold' }}>
						{docs.title}
					</div>
					<div style={{ padding: '3px 0 5px 15px', fontSize: '13px', color: '#ff583b' }}>
						{' '}
						{(docs.score * 100).toFixed(2)}%
					</div>
				</Paper>
			));
		}
	};

	return (
		<Paper
			sx={{
				width: '30vw',
				height: '86vh',
				display: 'flex',
				flexDirection: 'column',
				position: 'relative',
				overflowX: 'auto',
				bgcolor: '#fcfcfc',
				m: '12px',
			}}
		>
			<Paper
				style={{
					padding: '8px',
					fontSize: '20px',
					fontWeight: 'bold',
					color: 'gray',
					backgroundColor: '#e6ffe6',
				}}
			>
				RAG: Vector Search Results
			</Paper>
			{renderDocTitles(rag)}
			{/* {JSON.stringify(rag.rag.docs && rag.rag.docs[0])}; */}
		</Paper>
	);
};

export default RagBox;
