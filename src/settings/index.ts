import logger from "morgan"
import express from "express"
import cors from "cors"

import { AppPropType } from "./../types/app.d"
import routes from "./../routes"
import db from "./../db"
import { BASE_DIR, DATABASE_URL } from "./../config"
import errors from "./../errors"
import path from "path"

export default ({ app }: AppPropType) => {
	app.use(express.json({ limit: "100mb" }))
	app.use(express.urlencoded({ extended: true }))
	app.use(cors({ origin: "*" }))
	app.use(logger("combined"))
	app.use(express.static(path.join(BASE_DIR, "/public")))
	//Db
	db({ DATABASE_URL })
	//Routes
	routes({ app })
	app.use(errors)
}
