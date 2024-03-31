import { COLORS } from '@/constants/colors.constants';
import { LayoutDashboard } from 'lucide-react';
import { FC } from 'react';
import LoginButton from '../login-btn/login-btn';

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
	return (
		<div className='flex alig p-3 items-center h-14 z-50 bg-neutral-900 border border-b-zinc-700 shadow-sm'>
			<LayoutDashboard
				color={COLORS.primary}
				size={26}
			/>
			<span className='px-1 text-lg'>TaskFlow</span>
			<LoginButton />
		</div>
	);
};

export default Navbar;
