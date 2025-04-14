import React from 'react';
const NoData = ({ message = 'No data available' }) => {
	return (
		<tr>
			<td colSpan='100%' className='text-base text-center py-12 text-gray-500'>
				{message}
			</td>
		</tr>
	);
};

export default NoData;
