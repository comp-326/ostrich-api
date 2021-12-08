import { Router } from "express";
import { VERSION } from "./../../../config";
import homeController from "../controllers/home.controller";


const homeRouter= ({ app }: { app: Router }) => {
    const router: Router = Router()
    // Route paths
    router.get("/", homeController)

    //Configure to the main application
    app.use(`/${VERSION}/`, router)
    return app
}
export default homeRouter