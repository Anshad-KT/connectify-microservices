import { Kafka, Producer } from 'kafkajs';
import { logger } from '@express-assist/connectify';

export class KafkaProducerService {
  private producer: Producer;
  private connected = false;
  private readonly maxRetries = 10;
  private readonly retryDelayMs = 2000;

  constructor() {
    const kafka = new Kafka({
      clientId: 'business-service',
      brokers: [process.env.KAFKA_BROKER_URL || 'localhost:9092']
    });

    this.producer = kafka.producer();
  }

  async connect() {
    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        await this.producer.connect();
        this.connected = true;
        logger.info(`Kafka connected (attempt ${attempt})`);
        return;
      } catch (err: any) {
        this.connected = false;
        logger.error(`Kafka connect failed (attempt ${attempt}/${this.maxRetries}): ${err?.message || err}`);
        if (attempt === this.maxRetries) throw err;
        await new Promise((res) => setTimeout(res, this.retryDelayMs));
      }
    }
  }

  async disconnect() {
    try {
      await this.producer.disconnect();
    } finally {
      this.connected = false;
    }
  }

  async publish(topic: string, message: any) {
    if (!this.connected) {
      // Lazy reconnect attempt
      try {
        await this.connect();
      } catch (err: any) {
        logger.error(`Kafka publish skipped, not connected: ${err?.message || err}`);
        return; // Do not block request on Kafka failure
      }
    }

    try {
      await this.producer.send({
        topic,
        messages: [
          {
            value: JSON.stringify(message)
          }
        ]
      });
    } catch (err: any) {
      logger.error(`Kafka publish failed for topic ${topic}: ${err?.message || err}`);
      // swallow to avoid impacting request flow
    }
  }
}