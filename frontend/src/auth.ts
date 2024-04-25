import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { Backend_URL } from './lib/constants';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		GitHub,
		Credentials({
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			credentials: {
				email: {},
				password: {}
			},
			authorize: async credentials => {
				let user = null;
				const { email, password } = credentials;
				const res = await fetch(Backend_URL + '/auth/login', {
					method: 'POST',
					body: JSON.stringify({
						email,
						password
					}),
					headers: {
						'Content-Type': 'application/json'
					}
				});

				user = await res.json();

				if (user.error) {
					return null;
				}

				return user;
			}
		})
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				return { ...token, ...user };
			}
			return token;
		},
		async session({ session, token }) {
			session.backendTokens = token.backendTokens;
			if (token) {
				session.user.id = token.id;
			}

			console.log(session);
			return session;
		}
	}
});
