'use server';

import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { CustomJwtPayload } from '@/app/types';

export async function getSessionData() {
	try {
		const encryptedSessionData = cookies().get('Authentication')?.value;
		if (!encryptedSessionData) return null;

		const decodedData = jwtDecode<CustomJwtPayload>(encryptedSessionData);
		return decodedData;
	} catch (error) {
		console.error('Failed to decode JWT:', error);
		return null;
	}
}
