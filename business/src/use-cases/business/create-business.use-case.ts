import { AnErrorOccurredError } from "@express-assist/connectify";
import Business from "../../entities/business.entity";
import { IBusiness } from "../../interfaces/entity.interface";
import { IBusinessEntityConstructor } from "@express-assist/connectify/dist/interfaces/entity.interface";
import { IDatabaseRepository } from "../../interfaces/repository.interface";

export default function buildCreateBusinessUseCase({
    databaseRepository,BusinessEntity
  }: {
    databaseRepository: IDatabaseRepository,BusinessEntity:IBusinessEntityConstructor;
  }) {
    return async ({
      name,
      logo,
      owner_id,
      email,
      phone,
      description,
    }: IBusiness) => {
      const business = new BusinessEntity({
        name,
        logo,
        owner_id,
        email,
        phone,
        description,
      });
      business.validate();

      const createdBusiness = await databaseRepository.createBusiness(business.get());
      if (!createdBusiness) throw new AnErrorOccurredError();

      return createdBusiness;
    };
  }