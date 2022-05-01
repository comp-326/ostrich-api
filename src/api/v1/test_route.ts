import { IRequest, IResponse, INext } from '@ostrich-common/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function (_req: IRequest, res: IResponse, _next: INext) {
	const html =
		'<p style=\'text-align:center;font-family:Helvetica,Arial,sans-serif; padding:40px;\'>Application test is working</p>';
	return res.status(200).send(html);
}
