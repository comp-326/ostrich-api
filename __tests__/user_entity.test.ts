/* eslint-disable @typescript-eslint/no-explicit-any */
import createUser from '@domains/Users/entities';

test('Create a user entity', () => {
	const userData: any = { email: 'jane', password: 'password' };
	expect(() => {
		createUser(userData).getEmail();
	}).toThrow();
});

test('Create a user entity', () => {
	const userData: any = { email: 'jane@gmail.com', password: 'password' };
	expect(() => {
		createUser(userData).getEmail();
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
	expect(() => {
		createUser(userData).getEmail();
	}).toThrow();
});
