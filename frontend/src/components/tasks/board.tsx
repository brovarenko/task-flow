'use client';
import TaskItem from './task-item';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { FC, useState } from 'react';
import TaskContainer from './task-container';

interface BoardProps {}

const Board: FC<BoardProps> = ({}) => {
	// const [data, setData] = useState([
	// 	{ id: '1', content: 'todo' },
	// 	{ id: '2', content: 'progress' },
	// 	{ id: '3', content: 'done' }
	// ]);
	const [tasks, setTasks] = useState([
		{ id: 'task-1', content: 'Task 1' },
		{ id: 'task-2', content: 'Task 2' }
	]);

	const onDragEnd = (result: any) => {
		const { destination, source, type } = result;
		if (!destination) {
			return;
		}
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		// Создаем копию массива задач
		const newTasks = [...tasks];

		// Удаляем задачу из исходной колонки
		const [removed] = newTasks.splice(source.index, 1);

		// Вставляем задачу в новую колонку
		newTasks.splice(destination.index, 0, removed);

		// Обновляем состояние
		setTasks(newTasks);
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className='flex'>
				<Droppable
					droppableId='column-1'
					direction='vertical'
				>
					{(provided, snapshot) => (
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}
							className='flex flex-col m-3 w-72 border border-zinc-700 rounded'
						>
							<div className='flex p-3'>Column 1</div>
							{tasks.map((task, index) => (
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

				<Droppable
					droppableId='column-2'
					direction='vertical'
				>
					{(provided, snapshot) => (
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}
							className='flex flex-col m-3 w-72 border border-zinc-700 rounded'
						>
							<div className='flex p-3'>Column 2</div>
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</div>
		</DragDropContext>
	);
};

export default Board;
