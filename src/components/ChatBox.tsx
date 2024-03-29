import React, { useEffect, useState } from 'react';
import { IconButton, Paper, Divider, Input, Typography, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Container } from '@mui/system';
import MessageBox from './MessageBox';
import { updateRag } from '../actions/ragActions';
import { useDispatch } from 'react-redux';

const INPUT_MAX_LENGTH = 150;
const INTERVIEW_API_HOST = process.env.REACT_APP_INTERVIEW_API_HOST;

interface Message {
	context: string;
	score?: number;
	title?: string;
	isStatic?: boolean;
	role: string;
}

const ChatBox: React.FC = () => {
	const [inputValue, setInputValue] = useState('');
	const [loading, setLoading] = useState(false);
	const [messages, setMassages] = useState<Message[]>([
		{
			role: 'SP',
			isStatic: true,
			context:
				"Hello, I'm Senjor Pai. It's a pleasure to meet you. If you have any questions regarding my resume, personality, achievements, work experience, or education, feel free to ask.",
		},
		{
			role: 'SP',
			isStatic: true,
			context:
				"And Due to budget constraints, the conversations here are limited to single turns only. It's not possible to respond based on previous conversation records. Everything is solely based on responses generated from the knowledge base queried each time.",
		},
		{
			role: 'SP',
			isStatic: true,
			context: 'You can start interacting with me anytime now.',
		},
	]);

	const dispatch = useDispatch();

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
			setInputValue('');
			setLoading(true);
			getInterviewResponse(inputValue.trim());
		}
	};

	const getInterviewResponse = async (question: string) => {
		try {
			const response = await fetch(`${INTERVIEW_API_HOST}?question=${encodeURIComponent(question)}`);
			console.log(encodeURIComponent(question));
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();
			dispatch(updateRag(data));
			const newMessage: Message = {
				context: data.context,
				score: data.score,
				title: data.title,
				role: 'SP',
			};
			setMassages((prevMessages) => [...prevMessages, newMessage]);
		} catch (error) {
			console.error('There was a problem fetching the data:', error);
		} finally {
			setLoading(false);
		}
	};

	const renderMessageBoxes = () => {
		return messages
			.slice()
			.reverse()
			.map((message, index) => {
				const isStatic = index === 0 ? false : true;
				return (
					<MessageBox
						key={index}
						align={message.role === 'SP' ? 'left' : 'right'}
						isStatic={isStatic}
						text={message.context}
					/>
				);
			});
	};

	return (
		<Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: '12px' }}>
			<Paper
				sx={{
					width: '50vw',
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
			<Paper sx={{ width: '50vw', display: 'flex', alignItems: 'center' }}>
				<Input
					value={inputValue}
					disabled={loading}
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
				<IconButton onClick={handleSubmit} disabled={loading} color="primary" sx={{ p: '10px' }}>
					{loading ? <CircularProgress size={24} /> : <SendIcon />}
				</IconButton>
			</Paper>
		</Container>
	);
};

export default ChatBox;
