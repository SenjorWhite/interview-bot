import { Paper, Tooltip } from '@mui/material';
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
			const origin = docs[0]?.score;

			const tooltipContent = (context: string) => (
				<div>
					<p>Knowledge Base Context:</p>
					<p>{context}</p>
				</div>
			);

			return docs.slice().map(
				(
					doc: {
						title: string;
						question: string;
						score: number;
						articleContext: string;
						selected?: boolean;
					},
					index: number,
				) => {
					return (
						<Tooltip title={tooltipContent(doc.articleContext)} placement="right">
							<Paper
								style={{
									margin: '5px',
									backgroundColor: doc.selected ? '#fffbf5' : '#ededed',
									border: '2px solid transparent',
									transition: 'border 0.3s',
								}}
								onMouseEnter={(event) => {
									const target = event.currentTarget as HTMLDivElement;
									target.style.border = '2px solid #a3c0ff';
								}}
								onMouseLeave={(event) => {
									const target = event.currentTarget as HTMLDivElement;
									target.style.border = '2px solid transparent';
								}}
							>
								<div
									style={{
										padding: '5px',
										color: '#b0b0b0',
										fontSize: '14px',
										fontWeight: 'bold',
									}}
								>
									{doc.title}
								</div>
								<div
									style={{
										padding: '3px 0 5px 15px',
										fontSize: '13px',
										color: doc.selected ? 'green' : '#ff583b',
									}}
								>
									{(doc.score * 100).toFixed(2)}% {doc.selected ? '(Selected)' : '(Unselected)'}
								</div>
							</Paper>
						</Tooltip>
					);
				},
			);
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
		</Paper>
	);
};

export default RagBox;
