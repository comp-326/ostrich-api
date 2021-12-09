import express, { Application } from "express";
import swaggerUI from "swagger-ui-express";
import { VERSION } from "./../config";
import docs from "../api-docs/swagger.json";
import morgan from "morgan";
import homeRouter from "./../apps/home";
import authRouter from "./../apps/auth";
import helmet from "helmet";

const swaggerOptions = {
  explorer: true,
  customSiteTitle: "Ostrich ventures",
};

export default ({ app }: { app: Application }) => {
  // Db
  require("./../db/index");
  // Middlewares
  app.use(morgan("combined"));
  app.use(express.json({ limit: "100mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet())

  // Routes
  authRouter({ app });
  homeRouter({ app });
  app.use(
    `/${VERSION}/docs`,
    swaggerUI.serve,
    swaggerUI.setup(docs, swaggerOptions)
  );
  return app;
};
