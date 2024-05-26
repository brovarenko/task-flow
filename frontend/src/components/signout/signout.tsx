'use client';

import { useRouter } from 'next/navigation';
import { deleteCookies } from '@/app/actions/delete-cookies';

const SignOut = () => {
	const router = useRouter();

	const handleSignOut = async () => {
		await deleteCookies();
		router.push('/');
	};

	return (
		<button
			onClick={handleSignOut}
			className=' '
		>
			Sign Out
		</button>
	);
};

export default SignOut;
