/* eslint-disable @typescript-eslint/no-unused-vars */
import { IResponse,IRequest } from "@root/common/types"
import winston from "winston"
/**
 * ----------------------------  LOG HTTP ERROR REQUESTS OPTIONS -------------------------
 */
export const HTTPerrorLogOptions = {
	transports: [new winston.transports.Console()],
    
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.json(),
	),

}
/**
 * ---------------------------- LOG HTTP REQUESTS -----------------------------------
 */
export const HTTPLogOptions = {
	transports: [new winston.transports.Console()],
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.json(),
	),
	meta: true,
	msg: "HTTP {{req.method}} {{req.url}}",
	expressFormat: true,
	colorize: false,
	// eslint-disable-next-line no-unused-vars
	ignoreRoute: function (_req: IRequest, _res: IResponse) {
		return false
	},
}
