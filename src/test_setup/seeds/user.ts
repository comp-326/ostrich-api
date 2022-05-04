import { IUser } from '@ostrich-app/features/Auth/interfaces';

const users: IUser[] = [
	{
		activationToken: { used: true, value: '' },
		dateOfBirth: new Date().toUTCString(),
		email: 'user1@gmail.com',
		firstName: 'testUser1',
		isActive: true,
		lastName: 'TesLastname',
		passToken: { used: true, value: '' },
		password: '123456',
		profilePic: { public_id: '', url: '' }
	}
];

export default users;
