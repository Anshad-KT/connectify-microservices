import { Kafka, Producer } from 'kafkajs';
import { logger } from '@express-assist/connectify';

export class KafkaProducerService {
  private producer: Producer;

  constructor() {
    const kafka = new Kafka({
      clientId: 'business-service',
      brokers: ['localhost:9092'] // Configure based on your Kafka setup
    });

    this.producer = kafka.producer();
  }

  async connect() {
    try {
      await this.producer.connect();
      logger.info('Kafka Producer Connected');
    } catch (error) {
      logger.error('Failed to connect to Kafka:', error);
    }
  }

  async publish(topic: string, message: any) {
    try {
      await this.producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }]
      });
    } catch (error) {
      logger.error(`Failed to publish message to ${topic}:`, error);
      throw error;
    }
  }

  async disconnect() {
    await this.producer.disconnect();
  }
} 