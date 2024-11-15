import { loadEnv } from "@express-assist/connectify";
import app from "../app.js";
import "../repository/sql/connect.js";
import swaggerDocs from "./swagger.js";
import { metrics } from "./metrics.js";

const { PORT } = loadEnv(["PORT"]);
swaggerDocs(app, Number(PORT));
metrics(app, Number(PORT));
