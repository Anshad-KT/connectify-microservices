import { Kafka, Producer } from 'kafkajs';

export class KafkaProducerService {
  private producer: Producer;

  constructor() {
    const kafka = new Kafka({
      clientId: 'auth-service',
      brokers: [process.env.KAFKA_BROKER_URL || 'localhost:9092']
    });

    this.producer = kafka.producer();
  }

  async connect() {
    await this.producer.connect();
  }

  async disconnect() {
    await this.producer.disconnect();
  }

  async publish(topic: string, message: any) {
    await this.producer.send({
      topic,
      messages: [
        { 
          value: JSON.stringify(message)
        }
      ]
    });
  }
} 