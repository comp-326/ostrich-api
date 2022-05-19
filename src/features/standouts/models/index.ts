/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@ostrich-app-db/mongodb';

const standoutSchema: mongoose.Schema<any> = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
});

const standoutModel = mongoose.model('Standouts', standoutSchema);

export default standoutModel;