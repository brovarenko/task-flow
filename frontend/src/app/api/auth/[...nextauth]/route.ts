import { Backend_URL } from '@/lib/constants';
import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

async function refreshToken(token: JWT): Promise<JWT> {
	const res = await fetch(Backend_URL + '/auth/refresh', {
		method: 'POST',
		headers: {
			authorization: `Refresh ${token.backendTokens.refreshToken}`
		}
	});
	console.log('refreshed');

	const response = await res.json();

	return {
		...token,
		backendTokens: response
	};
}

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: {
					label: 'Username',
					type: 'text',
					placeholder: 'jsmith'
				},
				password: { label: 'Password', type: 'password' }
			},
			async authorize(credentials, req) {
				if (!credentials?.username || !credentials?.password) return null;
				const { username, password } = credentials;
				const res = await fetch(Backend_URL + '/auth/login', {
					method: 'POST',
					body: JSON.stringify({
						username,
						password
					}),
					headers: {
						'Content-Type': 'application/json'
					}
				});

				const user = await res.json();

				if (res.ok && user) {
					console.log(user);
					return user;
				}
				// Return null if user data could not be retrieved
				return null;
			}
		})
	],

	callbacks: {
		async redirect({ url, baseUrl }) {
			return `${baseUrl}/board`;
		},
		async jwt({ token, user }) {
			if (user) return { ...token, ...user };
			console.log(token);
			console.log(user);
			if (new Date().getTime() < token.backendTokens.expiresIn) return token;

			return await refreshToken(token);
		},

		async session({ token, session }) {
			console.log(`session`);
			session.user = token.user;
			session.backendTokens = token.backendTokens;

			return session;
		}
	}
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
