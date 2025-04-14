import React from 'react';

const Info = ({ children, label }) => {
	return (
		<div className='flex flex-col gap-2'>
			{label && <p className='text-grey100 text-sm'>{label}</p>}
			<p className='text-sm font-medium'>{children}</p>
		</div>
	);
};

export default Info;
