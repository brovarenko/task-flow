import NextAuth from 'next-auth';

// declare module 'next-auth' {
// 	interface Session {
// 		user: {
// 			id: number;
// 			email: string;
// 			name: string;
// 		};
// 		backendTokens: {
// 			accessToken: string;
// 			refreshToken: string;
// 			expiresIn: number;
// 		};
// 	}
// }

import { JWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
	interface JWT {
		user: {
			id: number;
			email: string;
			name: string;
		};

		backendTokens: {
			accessToken: string;
			refreshToken: string;
			expiresIn: number;
		};
	}
}

declare module 'next-auth' {
	/**
	 * The shape of the user object returned in the OAuth providers' `profile` callback,
	 * or the second parameter of the `session` callback, when using a database.
	 */
	interface User {
		id: number;
		email: string;
		name: string;
		backendTokens: {
			accessToken: string;
			refreshToken: string;
			expiresIn: number;
		};
	}
	interface Session {
		user: {
			id: number;
			email: string;
			name: string;
		};
		backendTokens: {
			accessToken: string;
			refreshToken: string;
			expiresIn: number;
		};
	}
	/**
	 * The shape of the account object returned in the OAuth providers' `account` callback,
	 * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
	 */
}
