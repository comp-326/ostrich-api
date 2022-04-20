import mongoose from 'mongoose';
import { DB_URL } from '@root/config';

type Props = {
	DB_URL: string;
};
const connection = async function connectDB({ DB_URL }: Props) {
	try {
		await mongoose.connect(DB_URL, {}, () => {
			console.log('Connected to DB');
		});
	} catch (error) {
		console.log(`Cold not connect to db: Reason----${error.message}`);
	}
};

export default connection({ DB_URL });
