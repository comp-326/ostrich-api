import { Router } from "express";
import { VERSION } from "./../../../config";
import homeController from "../controllers/home.controller";


export default ({ app }: { app: Router }) => {
    const router: Router = Router()
    // Route paths
    router.get("/", homeController)

    //Configure to the main application
    app.use(`/${VERSION}/`, router)
    return app
}