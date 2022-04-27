import { DB_URL } from '@ostrich-config';
import UserModel from '@ostrich-models/Users/UserModel';
import mongoose from 'mongoose';
import users from '../seeds/user';

beforeAll(async () => {
	await mongoose.connect(DB_URL);
	users.forEach(async user => {
		const newUser = new UserModel({ ...user });
		await newUser.hashPassword(user.password);
		await user.save();
	});
});

afterAll(async () => {
	await UserModel.deleteMany({});
});
