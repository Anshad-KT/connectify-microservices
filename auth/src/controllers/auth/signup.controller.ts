import { IRequest, ResponseCreator, validateBody } from "@express-assist/connectify"
import { IUser } from "../../interfaces/entity.interface.js"
import { IAuthUseCase } from "../../interfaces/use-case.interface.js"
import { KafkaEvents } from "../../interfaces/kafka-events.interface.js"
import { KafkaProducerService } from "../../services/kafka-producer.service.js"

export default function buildSignUpController({
    authUseCases,
    kafkaProducer
}: {
    authUseCases: IAuthUseCase,
    kafkaProducer: KafkaProducerService
}) {
    return async(req:IRequest) => {
        const userData:IUser = req.body
        validateBody(userData,["email","username","password","name"])

        const user = await authUseCases.signUp({
            username: userData.username,
            email: userData.email,
            password: userData.password,
            name: userData.name,
            avatar: userData.avatar
        });

        // Publish Kafka event
        await kafkaProducer.publish(KafkaEvents.USER_SIGNED_UP, {
            userId: user.id,
            email: user.email,
            username: user.username,
            timestamp: new Date().toISOString()
        });

        const response = new ResponseCreator();
        return response
            .setStatusCode(201)
            .setMessage("Please check your mail for verification code");
    }
}