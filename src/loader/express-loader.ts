import { Application } from "express"
import swaggerUI from "swagger-ui-express"
import { VERSION } from "./../config"
import docs from "../api-docs/swagger.json"
import morgan from "morgan"
import  homeRouter from "./../apps/home"
import authRouter from "./../apps/auth"


const swaggerOptions = {
    explorer: true, customSiteTitle: "Ostrich ventures"
}

export default ({ app }: { app: Application }) => {
    // Middlewares
    app.use(morgan("combined"))

    // Routes
    authRouter({app})
    homeRouter({ app })
    app.use(`/${VERSION}/docs`,
        swaggerUI.serve,
        swaggerUI.setup(
            docs,
            swaggerOptions
        ))
    return app
}