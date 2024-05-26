import { COLORS } from '@/constants/colors.constants';
import { LayoutDashboard } from 'lucide-react';
import { FC, useEffect } from 'react';

import Link from 'next/link';

import { getSessionData } from '@/lib/session';
import SignOut from '../signout/signout';

interface NavbarProps {}

const Navbar: FC<NavbarProps> = async ({}) => {
	const session = await getSessionData();
	console.log(session);
	return (
		<div className='flex  p-3 items-center h-14 z-50 bg-neutral-900 border border-b-zinc-700 shadow-sm'>
			<LayoutDashboard
				color={COLORS.primary}
				size={26}
			/>
			<span className='px-1 text-lg'>TaskFlow</span>

			{!session && (
				<Link
					className='p-3 rounded hover:bg-emerald-600 hover:text-white hover:shadow transition '
					href={`/signin`}
				>
					login
				</Link>
			)}
			{session && <SignOut />}

			<Link
				className='p-3 rounded hover:bg-emerald-600 hover:text-white hover:shadow transition '
				href={`/user/`}
			>
				User Profile
			</Link>
			<div className='m-2'>{session?.username}</div>
		</div>
	);
};

export default Navbar;
