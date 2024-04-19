import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			credentials: {
				email: {},
				password: {}
			},
			authorize: async credentials => {
				let user = null;

				// logic to salt and hash password
				const pwHash = saltAndHashPassword(credentials.password);

				// logic to verify if user exists
				user = await getUserFromDb(credentials.email, pwHash);

				if (!user) {
					// No user found, so this is their first attempt to login
					// meaning this is also the place you could do registration
					throw new Error('User not found.');
				}

				// return user object with the their profile data
				return user;
			}
		}),
		GitHub
	],
	callbacks: {
		jwt({ token, user }) {
			if (user) {
				// User is available during sign-in
				console.log(`user: ${user}`);
				console.log(`token: ${token.name}`);
				token.id = user.id;
			}
			return token;
		},
		session({ session, token }) {
			//session.user.id = token.id;
			console.log(`session:`);
			console.log(session);
			console.log(`session_token:`);
			console.log(token);

			//console.log(new Date().getTime() - token.?exp);

			return session;
		}
	}
});
