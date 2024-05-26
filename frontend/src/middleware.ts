import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	let token = request.cookies.get('Authentication')?.value;
	if (!token && !request.nextUrl.pathname.startsWith('/signin')) {
		return Response.redirect(new URL('/signin', request.url));
	}
	console.log(token);

	const response = NextResponse.next();
	// response.cookies.set('vercel', 'fast');
	// response.cookies.set({
	// 	name: 'vercel',
	// 	value: 'fast',
	// 	path: '/'
	// });
	// cookie = response.cookies.get('vercel');
	// console.log(response.cookies.getAll()); // => { name: 'vercel', value: 'fast', Path: '/' }
	//The outgoing response will have a `Set-Cookie:vercel=fast;path=/` header.
	return response;
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico).*)'
	]
};
