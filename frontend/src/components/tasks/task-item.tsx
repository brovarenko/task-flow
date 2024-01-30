'use client';
import { FC } from 'react';
import { Checkbox } from '../ui/checkbox';
import { DragDropContext, Draggable } from '@hello-pangea/dnd';

interface TaskItemProps {
	data: { id: string; content: string };
	index: number;
}

const TaskItem: FC<TaskItemProps> = ({ data, index }) => {
	return (
		<Draggable
			draggableId={data.id}
			index={index}
		>
			{provided => (
				<div
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					className='flex items-start p-2 m-2 h-32 content-center border border-zinc-700 rounded bg-zinc-800'
				>
					<div className='p-2'>
						<Checkbox id='terms' />
					</div>

					<div className='p-2'>{data.content}</div>
				</div>
			)}
		</Draggable>
	);
};

export default TaskItem;
