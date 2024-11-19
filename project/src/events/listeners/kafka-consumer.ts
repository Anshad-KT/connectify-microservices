import { kafka } from '../../config/kafka.config';
import { ConsumerConfig } from 'kafkajs';

export class KafkaConsumer {
  private consumer;
  
  constructor(groupId: string) {
    this.consumer = kafka.consumer({ groupId });
  }

  async connect() {
    await this.consumer.connect();
  }

  async subscribe(topics: string[]) {
    await Promise.all(
      topics.map(topic => this.consumer.subscribe({ topic }))
    );
  }

  async listen(messageHandler: (topic: string, message: any) => Promise<void>) {
    await this.consumer.run({
      eachMessage: async ({ topic, message }) => {
        try {
          const parsedMessage = JSON.parse(message.value?.toString() || '');
          await messageHandler(topic, parsedMessage);
        } catch (error) {
          console.error('Error processing message:', error);
        }
      },
    });
  }
} 