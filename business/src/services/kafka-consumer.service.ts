import { Kafka, Consumer } from 'kafkajs';
import { logger } from '@express-assist/connectify';
import { KafkaEvents } from '../shared/kafka-events.interface';

export class KafkaConsumerService {
  private consumer: Consumer;

  constructor() {
    const kafka = new Kafka({
      clientId: 'business-service',
      brokers: ['localhost:9092']
    });

    this.consumer = kafka.consumer({ groupId: 'business-group' });
  }

  async connect() {
    try {
      await this.consumer.connect();
      logger.info('Kafka Consumer Connected');
      
      // Subscribe to relevant topics
      await this.consumer.subscribe({ 
        topics: [
          KafkaEvents.USER_CREATED,
          KafkaEvents.USER_UPDATED,
          KafkaEvents.USER_DELETED
        ] 
      });
    } catch (error) {
      logger.error('Failed to connect Kafka consumer:', error);
    }
  }

  async startListening(messageHandlers: Record<string, (message: any) => Promise<void>>) {
    await this.consumer.run({
      eachMessage: async ({ topic, message }) => {
        try {
          const handler = messageHandlers[topic];
          if (handler && message.value) {
            const data = JSON.parse(message.value.toString());
            await handler(data);
          }
        } catch (error) {
          logger.error(`Error processing message from ${topic}:`, error);
        }
      }
    });
  }

  async disconnect() {
    await this.consumer.disconnect();
  }
} 