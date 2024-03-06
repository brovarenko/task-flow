'use client';

import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { FC, useState } from 'react';
import TaskContainer from './task-container';

interface BoardProps {}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
}

const Board: FC<BoardProps> = ({}) => {
	const [data, setData] = useState([
		{
			id: '1',
			content: 'todo',
			cards: [
				{ id: '11', content: '1' },
				{ id: '22', content: '2' },
				{ id: '33', content: '3' }
			]
		},
		{ id: '2', content: 'progress', cards: [{ id: '44', content: '4' }] },
		{ id: '3', content: 'done', cards: [{ id: '55', content: '5' }] }
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

		if (type === 'list') {
			const items = reorder(data, source.index, destination.index).map(
				(item, index) => ({ ...item, order: index })
			);

			setData(items);
		}

		if (type === 'card') {
			let newData = [...data];

			const sourceList = newData.find(list => list.id === source.droppableId);
			const destList = newData.find(
				list => list.id === destination.droppableId
			);

			if (!sourceList || !destList) {
				return;
			}

			if (!sourceList.cards) {
				sourceList.cards = [];
			}

			if (!destList.cards) {
				destList.cards = [];
			}

			if (source.droppableId === destination.droppableId) {
				const reorderedCards = reorder(
					sourceList.cards,
					source.index,
					destination.index
				);

				sourceList.cards = reorderedCards;

				setData(newData);
			} else {
				const [movedCard] = sourceList.cards.splice(source.index, 1);

				destList.cards.splice(destination.index, 0, movedCard);

				setData(newData);
			}
		}
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable
				droppableId='lists'
				type='list'
				direction='horizontal'
			>
				{provided => (
					<div
						{...provided.droppableProps}
						ref={provided.innerRef}
						className='flex m-3 border border-zinc-700 rounded'
					>
						{data.map((list, index) => (
							<TaskContainer
								key={list.id}
								index={index}
								data={list}
							/>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default Board;
