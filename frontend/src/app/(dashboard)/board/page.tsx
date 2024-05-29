import { FC } from 'react';

import Board from '@/components/tasks/board';

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
	return (
		<div className='flex w-full'>
			<Board />
		</div>
	);
};

export default page;
