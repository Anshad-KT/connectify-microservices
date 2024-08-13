import { AnErrorOccurredError, BusinessNotFoundError } from "@express-assist/connectify";
import { IDatabaseRepository } from "../../interfaces/repository.interface";
import { IBusinessEntityConstructor } from "@express-assist/connectify/dist/interfaces/entity.interface";

export default function buildEditBusinessUseCase({
    databaseRepository,BusinessEntity
  }: {
    databaseRepository: IDatabaseRepository;BusinessEntity:IBusinessEntityConstructor;
  }) {
    return async ({
      businessId,
      name,
      logo,
      email,
      phone,
      description,
    }: {
      businessId: string;
      name: string;
      logo: string;
      email: string;
      phone: string;
      description: string;
    }) => {
      const businessRow = await databaseRepository.getBusiness(businessId);

      if (!businessRow) throw new BusinessNotFoundError();
      businessRow.name = name;
      businessRow.logo = logo;
      businessRow.email = email;
      businessRow.phone = phone;
      businessRow.description = description;
      const business = new BusinessEntity(businessRow);
      business.validate();
      

      const updatedBusiness = await databaseRepository.editBusiness(businessId,business.get());
      if (!updatedBusiness) throw new AnErrorOccurredError();
      return updatedBusiness;
    };
  }