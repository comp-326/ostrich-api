/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@ostrich-app/db/mongodb';

const WorkspaceSchema: mongoose.Schema<any> = new mongoose.Schema({
	name: String
});

const WorkspaceModel: mongoose.Model<any> = mongoose.model(
	'Workspace',
	WorkspaceSchema
);

export default WorkspaceModel;