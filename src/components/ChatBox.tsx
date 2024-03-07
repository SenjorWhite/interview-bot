import React from 'react';
import { IconButton, Paper, InputBase, Divider } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatBox: React.FC = () => {
	return (
		<Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
			<InputBase
				sx={{ ml: 1, flex: 1 }}
				placeholder="Inquiry Message"
				inputProps={{ 'aria-label': 'search google maps' }}
			/>
			<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
			<IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
				<SendIcon />
			</IconButton>
		</Paper>
	);
};

export default ChatBox;
