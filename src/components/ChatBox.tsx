import React, { useEffect, useState } from 'react';
import { IconButton, Paper, InputBase, Divider, Input } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Container } from '@mui/system';
import MessageBox from './MessageBox';

const ChatBox: React.FC = () => {
	const [inputValue, setInputValue] = useState('');
	const [messages, setMassages] = useState<string[]>([]);

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
			setMassages([...messages, inputValue.trim()]);
		}
		setInputValue('');
	};

	return (
		<Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: '12px' }}>
			<Paper
				sx={{
					width: '35vw',
					height: '80vh',
					display: 'flex',
					// alignItems: 'center',
					flexDirection: 'column-reverse',
					// justifyContent: 'space-between',
					position: 'relative',
				}}
			>
				<MessageBox align="left" />
				<MessageBox align="right" />
			</Paper>
			<Paper sx={{ width: '35vw', display: 'flex', alignItems: 'center' }}>
				<Input
					value={inputValue}
					onKeyDown={handleKeyPress}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value)}
					sx={{ ml: 1, flex: 1 }}
					placeholder="Inquiry Message"
					inputProps={{ 'aria-label': 'inquiry message' }}
				/>
				<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
				<IconButton onClick={handleSubmit} color="primary" sx={{ p: '10px' }}>
					<SendIcon />
				</IconButton>
			</Paper>
		</Container>
	);
};

export default ChatBox;
