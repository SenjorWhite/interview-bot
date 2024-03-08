import React, { useEffect, useState } from 'react';

interface MessageBoxProps {
	align: 'left' | 'right';
}

const MessageBox: React.FC<MessageBoxProps> = ({ align }) => {
	const basicStyle = { alignSelf: 'flex-end' };

	const leftStyle = { marginLeft: 'auto' };
	const rightStyle = { marginRight: 'auto' };

	const style = align === 'left' ? { ...basicStyle, ...leftStyle } : { ...basicStyle, ...rightStyle };
	return <div style={style}>MessageBox</div>;
};

export default MessageBox;
