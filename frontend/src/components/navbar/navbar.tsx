import { COLORS } from '@/constants/colors.constants';
import { LayoutDashboard } from 'lucide-react';
import { FC } from 'react';

import Link from 'next/link';

import { getSessionData } from '@/lib/session';
import SignOut from '../signout/signout';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface NavbarProps {}

const Navbar: FC<NavbarProps> = async ({}) => {
	const session = await getSessionData();

	return (
		<div className='flex p-3 w-full justify-between items-center h-14 z-50 bg-neutral-900 border border-b-zinc-700 shadow-sm'>
			<div className='flex'>
				<LayoutDashboard
					color={COLORS.primary}
					size={26}
				/>
				<span className='px-1 text-lg'>TaskFlow</span>
			</div>

			{!session && (
				<Link
					className='p-3 rounded hover:bg-emerald-600 hover:text-white hover:shadow transition '
					href={`/signin`}
				>
					login
				</Link>
			)}

			<DropdownMenu>
				<DropdownMenuTrigger>
					<Avatar>
						<AvatarImage src='https://github.com/shadcn.png' />
						<AvatarFallback>{session?.username}</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>
						<Link href='/user'>Profile</Link>
					</DropdownMenuItem>

					<DropdownMenuSeparator />

					<DropdownMenuItem className='hover:bg-red-600'>
						<SignOut />
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default Navbar;
