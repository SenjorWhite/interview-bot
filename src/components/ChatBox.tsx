import React, { useEffect, useState } from 'react';
import { IconButton, Paper, Divider, Input, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Container } from '@mui/system';
import MessageBox from './MessageBox';

const INPUT_MAX_LENGTH = 150;
const INTERVIEW_API_HOST = process.env.REACT_APP_INTERVIEW_API_HOST;

interface Message {
	context: string;
	score?: number;
	title?: string;
	role: string;
}

const ChatBox: React.FC = () => {
	const [inputValue, setInputValue] = useState('');
	const [messages, setMassages] = useState<Message[]>([
		{
			role: 'SP',
			context:
				"Hello, I'm Senjor Pai. It's a pleasure to meet you. If you have any questions regarding my resume, personality, achievements, work experience, or education, feel free to ask.",
		},
	]);

	useEffect(() => {
		console.log(messages);
	}, [messages]);

	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			handleSubmit();
		}
	};

	const handleSubmit = () => {
		if (inputValue.trim() !== '') {
			setMassages([...messages, { context: inputValue.trim(), role: 'interviewer' }]);
		}
		setInputValue('');
		getInterviewResponse(inputValue.trim());
	};

	const getInterviewResponse = async (question: string) => {
		try {
			const response = await fetch(`${INTERVIEW_API_HOST}?question=${encodeURIComponent(question)}`);
			console.log(encodeURIComponent(question));
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();
			const newMessage: Message = {
				context: data.context,
				score: data.score,
				title: data.title,
				role: 'SP',
			};
			setMassages((prevMessages) => [...prevMessages, newMessage]);
		} catch (error) {
			console.error('There was a problem fetching the data:', error);
		}
	};

	const renderMessageBoxes = () => {
		return messages
			.slice()
			.reverse()
			.map((message, index) => (
				<MessageBox key={index} align={message.role === 'SP' ? 'left' : 'right'} text={message.context} />
			));
	};

	return (
		<Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: '12px' }}>
			<Paper
				sx={{
					width: '35vw',
					height: '80vh',
					display: 'flex',
					flexDirection: 'column-reverse',
					position: 'relative',
					overflowX: 'auto',
					bgcolor: '#fcfcfc',
				}}
			>
				{renderMessageBoxes()}
			</Paper>
			<Paper sx={{ width: '35vw', display: 'flex', alignItems: 'center' }}>
				<Input
					value={inputValue}
					onKeyDown={handleKeyPress}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value)}
					sx={{ ml: 1, flex: 1 }}
					placeholder="Input Message..."
					inputProps={{ 'aria-label': 'inquiry message', maxLength: INPUT_MAX_LENGTH }}
				/>
				<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
				<Typography variant="caption">
					{inputValue.length}/{INPUT_MAX_LENGTH}
				</Typography>
				<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
				<IconButton onClick={handleSubmit} color="primary" sx={{ p: '10px' }}>
					<SendIcon />
				</IconButton>
			</Paper>
		</Container>
	);
};

export default ChatBox;
