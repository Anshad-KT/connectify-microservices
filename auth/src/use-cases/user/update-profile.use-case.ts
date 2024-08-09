import { AnErrorOccurredError, IFile, NotFoundError } from "@express-assist/connectify";
import { IDatabaseRepository } from "../../interfaces/repository.interface.js"
import { IUploadImage } from "../../interfaces/lib.interface.js";

export default function buildUpdateProfileUseCase({
    databaseRepository,imageUpload
}: {
    databaseRepository: IDatabaseRepository
    imageUpload: IUploadImage;
}) {
    return async ({
        email,
        imageInput,
        name,
    }: {
        email: string;
        name: string;
        imageInput: Express.Multer.File & IFile;
    }) => {
        const user = await databaseRepository.findByEmail(email)
        if (!user) throw new NotFoundError("User not found")

        let avatar = user.avatar;

        if (!_.isNil(imageInput)) {
            avatar = await imageUpload({
                mimetype: imageInput.mimetype,
                imageBuffer: imageInput.buffer,
            });
        }

        const updatedUser = await databaseRepository.editUser({
            id: user.id,
            userData:{name,email,avatar}
        });

        if (!updatedUser) throw new AnErrorOccurredError();

        //emit event

        return updatedUser

    }
}