'use client';
import { CheckSquare, Home, LayoutDashboard } from 'lucide-react';
import { FC } from 'react';
import { Button } from '../ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { Card, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Backend_URL } from '@/lib/constants';

interface BoardListProps {}

interface BoardData {
	id: string;
	title: string;
	lists: List[];
}

interface List {
	id: string;
	title: string;
	tasks: Task[];
}
interface Task {
	id: string;
	title: string;
	content: string;
}
const BoardList: FC<BoardListProps> = ({}) => {
	const { data, error, isLoading } = useSWR<BoardData[], Error>(
		`${Backend_URL}/board`,
		fetcher
	);
	if (isLoading) return <div>Loading...</div>;
	return (
		<div className='flex '>
			{data?.map((board, index) => (
				<Card key={index}>
					<CardHeader>
						<CardTitle>{board.title}</CardTitle>
					</CardHeader>
				</Card>
			))}
			<Card>
				<CardHeader>
					<CardTitle>Create board</CardTitle>
				</CardHeader>
				<CardFooter className='flex justify-between'>
					<Button>create</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default BoardList;
