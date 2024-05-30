'use client';
import { CheckSquare, Home, LayoutDashboard } from 'lucide-react';
import { FC } from 'react';
import { Button } from '../ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface SideBarProps {}

const SideBar: FC<SideBarProps> = ({}) => {
	const router = useRouter();
	const pathname = usePathname();

	const routes = [
		{
			label: 'Home',
			icon: <Home />,
			href: `/home`
		},
		{
			label: 'Tasks',
			icon: <CheckSquare />,
			href: `/board`
		}
	];

	const onClick = (href: string) => {
		router.push(href);
	};

	return (
		<aside className='flex flex-col top-14 absolute max-w-64 w-full  border-r bg-neutral-900'>
			{routes.map(route => (
				<Button
					key={route.href}
					size='sm'
					onClick={() => onClick(route.href)}
					className={cn(
						'mx-2 font-normal justify-start pl-8 mb-1',
						pathname === route.href && 'bg-zinc-700'
					)}
					variant='ghost'
				>
					<span className='px-2'>{route.icon}</span>
					{route.label}
				</Button>
			))}
		</aside>
	);
};

export default SideBar;
