//import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { auth } from '@/auth';
import { Backend_URL } from '@/lib/constants';
//import { getServerSession } from 'next-auth';

type Props = {
	params: {
		id: string;
	};
};

const ProfilePage = async (props: Props) => {
	const session = await auth();
	// const session = await getServerSession(authOptions);
	// const response = await fetch(Backend_URL + `/user/${props.params.id}`, {
	// 	method: 'GET',
	// 	headers: {
	// 		authorization: `Bearer ${session?.backendTokens.accessToken}`,
	// 		'Content-Type': 'application/json'
	// 	}
	// });

	//const user = await response.json();

	return (
		<div className='m-2 border rounded shadow overflow-hidden'>
			<div className='p-2 bg-gradient-to-b from-white to-slate-200 text-slate-600 text-center'>
				User Profile
			</div>

			<div className='grid grid-cols-2  p-2 gap-2'>
				<p className='p-2 text-slate-400'>Name:</p>
				<p className='p-2 text-slate-950'>{session?.user.name}</p>
				<p className='p-2 text-slate-400'>Email:</p>
				<p className='p-2 text-slate-950'>{session?.user.email}</p>
			</div>
		</div>
	);
};

export default ProfilePage;
