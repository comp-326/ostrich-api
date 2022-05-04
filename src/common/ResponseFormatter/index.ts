/* eslint-disable @typescript-eslint/no-explicit-any */
class ResponseFormatter{
	SucessWithData = (data: {
		status: string;
		msg: string;
		data: any;
		statusCode: number;
	}) => {
		return {
			...data
		};
	};
}

export default new ResponseFormatter();