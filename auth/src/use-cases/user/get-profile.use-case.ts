import { NotFoundError } from "@express-assist/connectify";
import { IDatabaseRepository } from "../../interfaces/repository.interface.js";

export default function buildGetProfileUseCase({
    databaseRepository
}: {
    databaseRepository:IDatabaseRepository
}) {
    return async({username}:{username:string}) =>{
        const user = await databaseRepository.findByUsername(username)
        if(!user){
            throw new NotFoundError("User not found")
        }
        const detailsToShow = {
            email: user.email,
            username: user.username,
            avatar: user.avatar,
            name: user.name,
        };
        return detailsToShow
    }
}