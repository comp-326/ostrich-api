/* eslint-disable @typescript-eslint/no-explicit-any */
import createUser from '@ostrich-domains/users/entities';

test('Create a user entity', () => {
	const userData: any = { email: 'jane', password: 'password' };
	expect(async () => {
		await (await createUser(userData)).getEmail();
	}).toThrow();
});

test('Create a user entity', () => {
	const userData: any = { email: 'jane@gmail.com', password: 'password' };
	expect(async () => {
		(await createUser(userData)).getEmail();
	}).toThrow();
});

test('Create a user entity', () => {
	const userData: any = {
		email: 'jane@gmail.com',
		password: 'password',
		activationToken: { used: false, value: '' },
		passToken: { used: false, value: '' },
		dateOfBirth: '',
		firstName: 'Jane',
		lastName: 'Doe'
	};
	expect(async () => {
		(await createUser(userData)).getEmail();
	}).toThrow();
});
