'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Backend_URL } from '@/lib/constants';

const formSchema = z.object({
	name: z.string().min(2, {
		message: 'Username must be at least 2 characters.'
	}),
	email: z.string().email({
		message: 'Invalid email format.'
	}),
	password: z.string().min(8, {
		message: 'Password must be at least 8 characters.'
	})
});

const SignupPage = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			email: '',
			password: ''
		}
	});

	async function onSubmit(data: z.infer<typeof formSchema>) {
		const res = await fetch(Backend_URL + '/auth/register', {
			method: 'POST',
			body: JSON.stringify({
				name: data.name,
				email: data.email,
				password: data.password
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (!res.ok) {
			alert(res.statusText);
			return;
		}
		const response = await res.json();
		alert('User Registered!');
		console.log({ response });
	}
	return (
		<div className='flex flex-col items-center justify-center h-full m-3'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8'
				>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										placeholder='Name'
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder='Email'
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										placeholder='Password'
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit'>Submit</Button>
				</form>
			</Form>
		</div>
	);
};

export default SignupPage;
