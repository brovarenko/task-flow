import Link from 'next/link';
import { FC } from 'react';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
	return (
		<div>
			<h1>Home page</h1>
			<Link
				className='p-3 rounded  hover:text-white hover:shadow transition '
				href={`/signin`}
			>
				login
			</Link>
		</div>
	);
};

export default page;
