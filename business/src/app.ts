import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import { ErrorHandlingMiddleware, loadEnv, logger } from "@express-assist/connectify";
import { businessRoutes } from "./routers/index.js";
import { metricMiddleware } from "./config/metrics.js";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const app = express();

const { CORS_ORIGINS } = loadEnv([
    "PORT",
    "SERVER_NAME",
    "CORS_ORIGINS",
    "NODE_ENV",
    "ACCESS_TOKEN_SECRET",
    "BUCKET_NAME",
    "BUCKET_REGION",
    "AWS_SECRET_KEY",
    "AWS_ACCESS_KEY",
]);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cors({
        origin: CORS_ORIGINS,
        credentials: true,
    })
);

const stream = {
    write: (message: string) => logger.http(message.trim()),
};
app.use(morgan("dev", { stream }));

app.use(metricMiddleware());

app.use("/api/business", businessRoutes);

app.use(ErrorHandlingMiddleware);

export default app;