import { IRequest, ResponseCreator, validateBody } from "@express-assist/connectify";
import { IBusinessUseCase } from "../../interfaces/use-case.interface.js";
import { KafkaProducerService } from "../../services/kafka-producer.service.js";
import { KafkaEvents } from "../../shared/kafka-events.interface.js";




export default function buildEditBusinessController({
    businessUseCases,
    kafkaProducer
  }: {
    businessUseCases: IBusinessUseCase;
    kafkaProducer: KafkaProducerService;
  }) {
    return async (req: IRequest) => {
      const businessId = req.params.businessId;
      const businessBody = req.body;
      validateBody(businessBody, ["name", "logo", "email", "phone", "description"]);
  
      const updated = await businessUseCases.editBusiness({ businessId, ...businessBody });
  
      if (updated) {
        await kafkaProducer.publish(KafkaEvents.BUSINESS_UPDATED, {
          businessId,
          ...businessBody,
          timestamp: new Date().toISOString()
        });
      }
  
      const response = new ResponseCreator();
  
      if (!updated) {
        return response.setStatusCode(404).setMessage("Business not found");
      }
  
      return response.setMessage("Business updated").setStatusCode(200);
    };
  }