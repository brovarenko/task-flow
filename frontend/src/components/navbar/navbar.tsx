import { COLORS } from '@/constants/colors.constants';
import { LayoutDashboard } from 'lucide-react';
import { FC } from 'react';
import LoginButton from '../login-btn/login-btn';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

interface NavbarProps {}

const Navbar: FC<NavbarProps> = async ({}) => {
	const session = await getServerSession(authOptions);
	return (
		<div className='flex alig p-3 items-center h-14 z-50 bg-neutral-900 border border-b-zinc-700 shadow-sm'>
			<LayoutDashboard
				color={COLORS.primary}
				size={26}
			/>
			<span className='px-1 text-lg'>TaskFlow</span>
			<LoginButton />
			<Link
				className='p-3 rounded hover:bg-emerald-600 hover:text-white hover:shadow transition '
				href={`/user/${session?.user.id}`}
			>
				User Profile
			</Link>
		</div>
	);
};

export default Navbar;
