import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [GitHub],
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
