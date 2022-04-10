import { Response } from "express"
import winston from "winston"
import IRequest from "../common/interfaces/request"
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
	ignoreRoute: function (req:IRequest, res:Response) {
		return false
	},
}
