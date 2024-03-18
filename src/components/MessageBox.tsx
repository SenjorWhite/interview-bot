import { Avatar, Paper } from '@mui/material';
import React, { useState, useEffect } from 'react';

interface MessageBoxProps {
	align: 'left' | 'right';
	text: string;
	isStatic?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ align, text, isStatic }) => {
	const basicStyle = { alignSelf: 'flex-end' };

	const leftStyle = { margin: '2px auto 2px 2px', padding: '5px 10% 5px 5px' };
	const rightStyle = { margin: '2px 2px 2px auto', padding: '5px 5px 5px 10%' };

	const style = align === 'left' ? { ...basicStyle, ...leftStyle } : { ...basicStyle, ...rightStyle };
	const spAvatar = (
		<div style={{ alignSelf: 'flex-start', paddingTop: '3px', paddingRight: '5px' }}>
			<Avatar sx={{ width: 26, height: 26, fontSize: 17, background: 'linear-gradient(135deg, navy, skyblue)' }}>
				SP
			</Avatar>
		</div>
	);

	const [displayedText, setDisplayedText] = useState('');

	useEffect(() => {
		if (isStatic || align === 'right') {
			setDisplayedText(text);
		} else {
			const lines = text.split(' ');
			let displayedTextSoFar = '';

			const displayTextSegment = () => {
				if (lines.length > 0) {
					const nextLine = lines.shift();
					displayedTextSoFar += nextLine + ' ';
					setDisplayedText(displayedTextSoFar);

					setTimeout(displayTextSegment, 50);
				}
			};

			displayTextSegment();
		}
	}, [text, isStatic, align]);

	return (
		<div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', ...style }}>
			{align === 'left' && spAvatar}
			<Paper style={{ ...basicStyle, padding: '5px', backgroundColor: align === 'left' ? '#f0fdff' : '#fffff5' }}>
				<div>{displayedText}</div>
			</Paper>
		</div>
	);
};

export default MessageBox;
