import { JwtPayload } from 'jwt-decode';

export interface CustomJwtPayload extends JwtPayload {
	username: string;
	email: string;
	id: string;
}
