import { IRequest, ResponseCreator, validateBody } from "@express-assist/connectify";
import { IBusinessUseCase } from "../../interfaces/use-case.interface.js";
import { KafkaProducerService } from "../../services/kafka-producer.service.js";
import { KafkaEvents } from "../../shared/kafka-events.interface.js";

export default function buildCreateBusinessController({
  businessUseCases,
  kafkaProducer
}: {
  businessUseCases: IBusinessUseCase;
  kafkaProducer: KafkaProducerService;
}) {
  return async (req: IRequest) => {
    const businessBody = req.body;
    validateBody(businessBody, ["name", "logo", "owner_id", "email", "phone", "description"]);

    const createdBusiness = await businessUseCases.createBusiness(businessBody);

    // Publish Kafka event
    await kafkaProducer.publish(KafkaEvents.BUSINESS_CREATED, {
      businessId: createdBusiness.id,
      ownerId: createdBusiness.owner_id,
      timestamp: new Date().toISOString()
    });

    const response = new ResponseCreator();

    return response.setData(createdBusiness).setStatusCode(201);
  };
}