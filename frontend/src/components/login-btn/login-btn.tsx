import { signIn } from '@/auth';
import React from 'react';

const LoginButton = () => {
	return (
		<div className='flex gap-4 ml-auto items-center'>
			<form
				className='flex gap-4 ml-auto bg-orange-600 text-green-200 p-2 rounded'
				action={async () => {
					'use server';
					await signIn();
				}}
			>
				<button type='submit'>Sign in</button>
			</form>
		</div>
	);
};

export default LoginButton;
