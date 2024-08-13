import { IRequest, ResponseCreator } from "@express-assist/connectify";

export type IAuthController = {
    signIn: (req: IRequest) => Promise<ResponseCreator>;
    signUp: (req: IRequest) => Promise<ResponseCreator>;
    resendCode: (req:IRequest) => Promise<ResponseCreator>
    // currentUser: (req: IRequest) => Promise<ResponseCreator>;
};

export type IUserController = {
    // resendCode: (req: IRequest) => Promise<ResponseCreator>;
    updateProfile:(req: IRequest) => Promise<ResponseCreator>
    
     getProfile: (req: IRequest) => Promise<ResponseCreator>;
     changePassword: (req: IRequest) => Promise<ResponseCreator>;
}