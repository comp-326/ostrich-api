import compression from "compression"
import v1 from "@root/api/v1"
import shouldCompress from "@root/utils/compression"
import express, { Application } from "express"
import morgan from "morgan"
import helmet from "helmet"
import expressWinston from "express-winston"
import { HTTPerrorLogOptions, HTTPLogOptions } from "@root/utils/logger"

export default function ({ app }: { app: Application }) {
	app.use(express.json({ limit: "30mb" }))
	app.use(express.urlencoded({ extended: true }))
	app.use(morgan("dev"))
	app.use(compression({ filter: shouldCompress }))
	app.use(helmet())
	app.use(expressWinston.logger(HTTPLogOptions))
	app.use(expressWinston.errorLogger(HTTPerrorLogOptions))

	app.use("/api/v1", v1())
	return app
}
