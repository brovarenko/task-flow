import { FC } from 'react';
import TaskItem from '@/components/tasks/task-item';
import { useDroppable } from '@dnd-kit/core';
import TaskContainer from '@/components/tasks/task-container';
import Board from '@/components/tasks/board';
import { auth } from '@/auth';

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
	const session = await auth();
	if (!session) return <div>Not authenticated</div>;
	return (
		<div className='flex m-3'>
			<Board />
		</div>
	);
};

export default page;
