import app from "./app.js";
import { loadEnv, logger } from "@express-assist/connectify";
import "./config/index.js";
import { KafkaProducerService } from "./services/kafka-producer.service.js";

const { PORT, SERVER_NAME } = loadEnv(["PORT", "SERVER_NAME"]);
const kafkaProducer = new KafkaProducerService();
await kafkaProducer.connect();

app.listen(PORT, () => {
    if (!PORT) {
        logger.info(`PORT NOT FOUND ON ${SERVER_NAME.toUpperCase()}`);
        return;
    }
    logger.info(`Server started \t: http://localhost:${PORT}`);
});
