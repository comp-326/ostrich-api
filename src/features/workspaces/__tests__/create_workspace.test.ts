import { DB_URL } from '@ostrich-app-config';
import { generateGravatarUrl } from '@ostrich-app/common/gravatar';
import mediaModel from '../../media/models';
import mongoose from '@ostrich-app-db/mongodb';
import userModel from '../../users/models';
import userRoleModel from '../../userRoles/models';
import workspaceModel from '../models';

describe('create workspace', () => {
	beforeAll(async () => {
		await mongoose.connect(DB_URL, {});
	});
	afterAll(async () => {
		await mongoose.connection.dropDatabase();
		await mongoose.disconnect();
	});
	it('Should not create a workspace', async () => {
		try {
			const workspace = await workspaceModel.create({
				name: 'test',
			});
			expect(workspace).toThrow();
		} catch (error) {
			expect(error.message).toBe(
				'Workspace validation failed: type: Path `type` is required., owner: Path `owner` is required., logo: Path `logo` is required.',
			);
		}
	});
	it('Should create a workspace', async () => {
		await userRoleModel.InsertRoles();
		const role = await userRoleModel.getDefaultRole();
		const media = await mediaModel.create({
			type: 'profile',
			url: generateGravatarUrl('test1234@gmail.com'),
			uploadId: 'test1234',
			size: 200,
			mediaType: 'image',
		});
		const user = await userModel.create({
			email: 'test@gmail.com',
			password: 'test12345678',
			firstName: 'test',
			lastName: 'test',
			role,
			profilePicture: media._id,
		});

		const workspace = await workspaceModel.create({
			name: 'test',
			type: 'personal',
			owner: user._id,
			logo: media._id,
		});
		expect(workspace).toBeDefined();
		expect(workspace.name).toBe('test');
		expect(workspace.type).toBe('personal');
		expect(workspace.owner).toBe(user._id);
		expect(workspace.logo).toBe(media._id);
	});
});
