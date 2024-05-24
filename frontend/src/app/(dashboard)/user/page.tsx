'use client';
import React, { useState, useEffect } from 'react';

interface Props {}

interface UserProfile {
	id: number;
	email: string;
	name: string;
}

const ProfilePage: React.FC<Props> = () => {
	const [data, setData] = useState<UserProfile | null>(null);
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('http://localhost:8000/user/', {
					method: 'GET',
					credentials: 'include'
				});

				if (!response.ok) {
					throw new Error('Network response was not ok');
				}

				const data: UserProfile = await response.json();
				console.log('Data received:', data);
				setData(data);
				setLoading(false);
			} catch (error) {
				if (error instanceof Error) {
					console.error(
						'There has been a problem with your fetch operation:',
						error
					);
					setError(error.message);
				} else {
					setError('An unknown error occurred');
				}
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;
	if (!data) return <p>No profile data</p>;

	return (
		<div className='m-2 border rounded shadow overflow-hidden'>
			<div className='p-2 bg-gradient-to-b from-white to-slate-200 text-slate-600 text-center'>
				User Profile
			</div>
			<div className='grid grid-cols-2 p-2 gap-2'>
				<p className='p-2 text-slate-400'>ID:</p>
				<p className='p-2 text-slate-950'>{data.id}</p>
				<p className='p-2 text-slate-400'>Name:</p>
				<p className='p-2 text-slate-950'>{data.name}</p>
				<p className='p-2 text-slate-400'>Email:</p>
				<p className='p-2 text-slate-950'>{data.email}</p>
			</div>
		</div>
	);
};

export default ProfilePage;
