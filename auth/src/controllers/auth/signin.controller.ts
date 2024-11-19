import { IRequest, ResponseCreator, validateBody } from "@express-assist/connectify";
import { IAuthUseCase } from "../../interfaces/use-case.interface.js";
import { TOKEN_COOKIE_NAME } from "../../lib/constants.js";
import { KafkaEvents } from "../../interfaces/kafka-events.interface.js";
import { KafkaProducerService } from "../../services/kafka-producer.service.js";

type InputData = {
    email: string;
    password: string;
};

export default function buildSignInController({
    authUseCases,
    kafkaProducer
}:{
    authUseCases: IAuthUseCase,
    kafkaProducer: KafkaProducerService
}){
    return async(req:IRequest) => {
        const inputData:InputData = req.body
        validateBody(inputData, ["email", "password"]);
        const { user, token } = await authUseCases.signIn({
            email: inputData.email,
            password: inputData.password,
        });

        // Publish Kafka event
        await kafkaProducer.publish(KafkaEvents.USER_SIGNED_IN, {
            userId: user.id,
            timestamp: new Date().toISOString()
        });

        const expirationDate = new Date();
        expirationDate.setMonth(expirationDate.getMonth() + 1);

        // Convert the expiration date to UTC string format
        const expires = expirationDate.toUTCString();

        const response = new ResponseCreator();
        return response
            .setData(user)
            .setHeaders({
                "Set-Cookie": `${TOKEN_COOKIE_NAME}=${token}; Path=/; Expires=${expires}`,
            })
            .setStatusCode(200)
            .setMessage("Login successful");
    }
}