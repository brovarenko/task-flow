'use server';

import { redirect } from 'next/navigation';

import { z } from 'zod';
import { jwtDecode } from 'jwt-decode';
import { Backend_URL } from '@/lib/constants';
import { cookies } from 'next/headers';

const formSchema = z.object({
	email: z.string().email({
		message: 'Invalid email format.'
	}),
	password: z.string().min(8, {
		message: 'Password must be at least 8 characters.'
	})
});

export default async function login(data: z.infer<typeof formSchema>) {
	const res = await fetch(Backend_URL + '/auth/login', {
		method: 'POST',
		body: JSON.stringify({
			email: data.email,
			password: data.password
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (!res.ok) {
		//alert(res.statusText);
		return;
	}
	const response = await res.json();
	//alert('User logged!');

	setAuthCookie(res);
	redirect(`/user/`);
}

const setAuthCookie = (response: Response) => {
	const setCookieHeader = response.headers.get('Set-Cookie');

	if (setCookieHeader) {
		const token = setCookieHeader.split(';')[0].split('=')[1];

		cookies().set({
			name: 'Authentication',
			value: token,
			secure: false,
			httpOnly: true,
			expires: new Date(jwtDecode(token).exp! * 1000)
		});
	}
};
