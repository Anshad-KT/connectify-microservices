import { kafka } from '../config/kafka.config';

export class KafkaProducer {
  private static producer = kafka.producer();
  private static isConnected = false;

  static async connect() {
    if (!this.isConnected) {
      await this.producer.connect();
      this.isConnected = true;
    }
  }

  static async emit(topic: string, message: any) {
    await this.connect();
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  }
} 