import { FC } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { fetcher } from '@/lib/fetcher';
import useSWR from 'swr';
import BoardList from '@/components/board/board-list';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
	return (
		<div className='flex flex-col w-full justify-center'>
			<h1>My boards</h1>
			<BoardList />
		</div>
	);
};

export default page;
