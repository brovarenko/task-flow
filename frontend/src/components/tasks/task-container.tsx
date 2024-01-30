'use client';
import { FC, ReactNode, useState } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import TaskItem from './task-item';

interface TaskContainerProps {
	list: { id: string; content: string };
	index: number;
}

const TaskContainer: FC<TaskContainerProps> = ({ list, index }) => {
	const [data, setData] = useState([
		{ id: '1', content: '1' },
		{ id: '2', content: '2' },
		{ id: '3', content: '3' }
	]);

	return (
		<Droppable
			droppableId={list.id}
			type='card'
		>
			{provided => (
				<div
					{...provided.droppableProps}
					ref={provided.innerRef}
					className='flex flex-col m-3 w-72 h-full border border-zinc-700 rounded'
				>
					<div className='flex p-3'>{list.content}</div>

					{data.map((task, index) => (
						<TaskItem
							index={index}
							key={task.id}
							data={task}
						/>
					))}
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	);
};

export default TaskContainer;
