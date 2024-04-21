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
				console.log(user);
				if (user.error) {
					// No user found, so this is their first attempt to login
					// meaning this is also the place you could do registration
					throw new Error('User not found.');
				}
				//console.log(user);
				// return user object with the their profile data
				return user;
			}
		})
	],
	callbacks: {
		jwt({ token, user }) {
			if (user) {
				// User is available during sign-in
				token.id = user.id;
			}
			return token;
		},
		session({ session, token }) {
			console.log(token.id);
			//session.user.id = token.id;
			return session;
		}
	}
});
