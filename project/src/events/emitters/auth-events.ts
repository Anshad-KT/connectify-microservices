import { KafkaProducer } from '../../utils/kafka-producer.js';
import { topics } from '../../config/kafka.config.js';

export const authEvents = {
  emitUserCreated: async (userData: any) => {
    await KafkaProducer.emit(topics.USER_CREATED, userData);
  },
  
  emitUserUpdated: async (userData: any) => {
    await KafkaProducer.emit(topics.USER_UPDATED, userData);
  },
  
  emitUserDeleted: async (userId: string) => {
    await KafkaProducer.emit(topics.USER_DELETED, { userId });
  },
}; 