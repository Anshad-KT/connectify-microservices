import { KafkaConsumer } from './kafka-consumer.js';
import { topics } from '../../config/kafka.config.js';
import { IProjectUseCase } from '../../interfaces/usecase.interface.js';

export class ProjectServiceListener {
  private consumer: KafkaConsumer;
  
  constructor(private projectUseCases: IProjectUseCase) {
    this.consumer = new KafkaConsumer('project-service-group');
  }

  async start() {
    await this.consumer.connect();
    await this.consumer.subscribe([
      topics.USER_DELETED,
      topics.BUSINESS_DELETED,
    ]);

    await this.consumer.listen(async (topic, message) => {
      switch (topic) {
        case topics.USER_DELETED:
          await this.handleUserDeleted(message);
          break;
        case topics.BUSINESS_DELETED:
          await this.handleBusinessDeleted(message);
          break;
      }
    });
  }

  private async handleUserDeleted(message: { userId: string }) {
    // Handle removing user from projects
    // await this.projectUseCases.removeUserFromAllProjects(message.userId);
  }

  private async handleBusinessDeleted(message: { businessId: string }) {
    // Handle business deletion
    // await this.projectUseCases.deleteProjectsByBusinessId(message.businessId);
  }
} 