import { IUser } from "./user.interface";

export interface ILogin {
  email: IUser[ "email" ];
  password: IUser[ "password" ];
  isLogged: boolean;
}
