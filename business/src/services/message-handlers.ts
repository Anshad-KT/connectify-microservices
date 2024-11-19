import { KafkaEvents } from '../shared/kafka-events.interface';
import { databaseRepository } from '../repository/sql';
import { logger } from '@express-assist/connectify';

export const messageHandlers = {
  [KafkaEvents.USER_CREATED]: async (message: any) => {
    logger.info('Processing user.created event:', message);
    // Handle user creation event if needed
  },

  [KafkaEvents.USER_UPDATED]: async (message: any) => {
    logger.info('Processing user.updated event:', message);
    // Update local user data if needed
  },

  [KafkaEvents.USER_DELETED]: async (message: any) => {
    logger.info('Processing user.deleted event:', message);
    // Handle user deletion, maybe cleanup related business data
    try {
      // Example: Delete associated businesses
      await databaseRepository.deleteBusiness(message.userId);
    } catch (error) {
      logger.error('Error handling user.deleted event:', error);
    }
  }
}; 