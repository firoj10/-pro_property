import React from 'react';

const ContentBox = ({ children, className }) => {
	return (
		<div className={`${className} p-4 rounded-27 bg-white min-h-1/2`}>
			{children}
		</div>
	);
};

export default ContentBox;
