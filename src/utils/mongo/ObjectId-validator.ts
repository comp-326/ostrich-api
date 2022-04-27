import { Types } from 'mongoose';
export default function validateMongodbId(ObjectId: string) {
	if (Types.ObjectId.isValid(ObjectId)) {
		return String(new Types.ObjectId(ObjectId)) === ObjectId ? true : false;
	}
	return false;
}
