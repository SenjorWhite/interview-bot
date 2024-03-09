import { Avatar, Paper } from '@mui/material';
import { Container, bgcolor, margin } from '@mui/system';
import React, { useEffect, useState } from 'react';

interface MessageBoxProps {
	align: 'left' | 'right';
	text: string;
}

const MessageBox: React.FC<MessageBoxProps> = ({ align, text }) => {
	const basicStyle = { alignSelf: 'flex-end', margin: '10px', padding: '5px' };

	const leftStyle = { marginRight: 'auto', paddingRight: '10%' };
	const rightStyle = { marginLeft: 'auto', paddingLeft: '10%' };

	const style = align === 'left' ? { ...basicStyle, ...leftStyle } : { ...basicStyle, ...rightStyle };
	const spAvatar = (
		<Avatar sx={{ width: 26, height: 26, fontSize: 17, background: 'linear-gradient(135deg, navy, skyblue)' }}>
			SP
		</Avatar>
	);

	return (
		<div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', ...style }}>
			{align === 'left' && spAvatar}
			<Paper style={{ ...basicStyle, backgroundColor: align === 'left' ? '#f0fdff' : '#fffff5' }}>
				<div>{text}</div>
			</Paper>
		</div>
	);
};

export default MessageBox;
