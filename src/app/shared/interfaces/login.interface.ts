import { IUserForm, IUserResponse } from "./user.interface";

export interface ILoginForm {
  email: IUserForm[ "email" ];
  password: IUserForm[ "password" ];
  // isLogged: boolean;
}

export interface ILoginResponse {
  id: IUserResponse["id"];
  fullName: IUserResponse[ "fullName" ];
  email: IUserResponse[ "email" ];
  type: IUserResponse[ "type" ];
}
