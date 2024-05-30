export const fetcher = (...args) =>
	fetch(...args, {
		method: 'GET',
		credentials: 'include'
	}).then(res => res.json());
