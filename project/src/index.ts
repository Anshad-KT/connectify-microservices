import app from "./app.js";
import { loadEnv, logger } from "@express-assist/connectify";
import "./config/index.js";
import { ProjectServiceListener } from './events/listeners/project-service-listener.js';
import { projectUseCases } from "./use-cases/index.js";

const { PORT, SERVER_NAME } = loadEnv(["PORT", "SERVER_NAME"]);

async function startApp() {
    // Initialize Kafka listeners
    const projectListener = new ProjectServiceListener(projectUseCases);
    await projectListener.start();

    app.listen(PORT, () => {
        if (!PORT) {
            logger.info(`PORT NOT FOUND ON ${SERVER_NAME.toUpperCase()}`);
            return;
        }
        logger.info(`Server started \t: http://localhost:${PORT}`);
    });
}

startApp().catch(console.error);
