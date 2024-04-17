import { signIn } from '@/auth';
import Link from 'next/link';
import React from 'react';

const LoginButton = () => {
	// const { data: session } = useSession();
	// console.log({ session });

	// if (session && session.user)
	// 	return (
	// 		<div className='flex gap-4 ml-auto'>
	// 			<p className='text-sky-600'>{session.user.name}</p>
	// 			<Link
	// 				href={'/api/auth/signout'}
	// 				className='flex gap-4 ml-auto text-red-600'
	// 			>
	// 				Sign Out
	// 			</Link>
	// 		</div>
	// 	);

	// return (
	// 	<div className='flex gap-4 ml-auto items-center'>
	// 		<Link
	// 			href={'/api/auth/signin'}
	// 			className='flex gap-4 ml-auto text-orange-600'
	// 		>
	// 			Sign In
	// 		</Link>
	// 		<Link
	// 			href={'/signup'}
	// 			className='flex gap-4 ml-auto bg-orange-600 text-green-200 p-2 rounded'
	// 		>
	// 			Sign Up
	// 		</Link>
	// 	</div>
	// );
	return (
		<form
			className='flex gap-4 ml-auto items-center'
			action={async () => {
				'use server';
				await signIn('github');
			}}
		>
			<button type='submit'>Signin with GitHub</button>
		</form>
	);
};

export default LoginButton;
