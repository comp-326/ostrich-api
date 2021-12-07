import { Application } from "express"
import swaggerUI from "swagger-ui-express"
import { VERSION } from "./../config"
import docs from "../api-docs/swagger.json"
import morgan from "morgan"
import { homeRoute } from "./../apps/home"


const swaggerOptions = {
    explorer: true, customSiteTitle: "Ostrich ventures"
}

export default ({ app }: { app: Application }) => {
    // require("./../db")
    app.use(morgan("combined"))
    homeRoute.default({ app })
    app.use(`/${VERSION}/docs`,
        swaggerUI.serve,
        swaggerUI.setup(
            docs,
            swaggerOptions
        ))
    return app
}