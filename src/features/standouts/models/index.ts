/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@ostrich-app/db/mongodb';

const StandoutSchema: mongoose.Schema<any> = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
});

const StandoutModel = mongoose.model('Standout', StandoutSchema);

export default StandoutModel;