import { DB_URL } from '@base/src/config';
import UserModel from '@base/src/models/Users/UserModel';
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
