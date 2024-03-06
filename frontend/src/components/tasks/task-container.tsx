'use client';
import { FC, ReactNode, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import TaskItem from './task-item';

interface TaskContainerProps {
	data: {
		id: string;
		content: string;
		cards: { id: string; content: string }[];
	};
	index: number;
}

const TaskContainer: FC<TaskContainerProps> = ({ data, index }) => {
	return (
		<Draggable
			draggableId={data.id}
			index={index}
		>
			{provided => (
				<div
					{...provided.draggableProps}
					ref={provided.innerRef}
					className='flex m-3 w-72 h-full border border-zinc-700 rounded'
				>
					<div
						{...provided.dragHandleProps}
						className='flex flex-col p-3 w-full h-full'
					>
						<div>{data.content}</div>
						<Droppable
							droppableId={data.id}
							type='card'
						>
							{provided => (
								<div
									ref={provided.innerRef}
									{...provided.droppableProps}
									className='mx-1 px-1 py-0.5 flex flex-col gap-y-2 h-full bg-gray-400'
								>
									{data.cards.map((card, index) => (
										<TaskItem
											index={index}
											key={card.id}
											data={card}
										/>
									))}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</div>
				</div>
			)}
		</Draggable>
	);
};

export default TaskContainer;
