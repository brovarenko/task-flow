'use server';

import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';

export async function getSessionData() {
	const encryptedSessionData = cookies().get('Authentication')?.value;
	return encryptedSessionData ? jwtDecode(encryptedSessionData) : null;
}
