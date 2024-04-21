import { COLORS } from '@/constants/colors.constants';
import { LayoutDashboard } from 'lucide-react';
import { FC } from 'react';
import LoginButton from '../login-btn/login-btn';
import Link from 'next/link';
import { SignOut } from '../signout-button/signout-button';
import { auth } from '@/auth';

interface NavbarProps {}

const Navbar: FC<NavbarProps> = async ({}) => {
	const session = await auth();

	return (
		<div className='flex  p-3 items-center h-14 z-50 bg-neutral-900 border border-b-zinc-700 shadow-sm'>
			<LayoutDashboard
				color={COLORS.primary}
				size={26}
			/>
			<span className='px-1 text-lg'>TaskFlow</span>

			{!session && <LoginButton />}
			{session && <SignOut />}

			<Link
				className='p-3 rounded hover:bg-emerald-600 hover:text-white hover:shadow transition '
				href={`/user/${session?.user?.id}`}
			>
				User Profile
			</Link>
			<div className='m-2'>{session?.user?.name}</div>
		</div>
	);
};

export default Navbar;
