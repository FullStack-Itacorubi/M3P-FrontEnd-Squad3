interface IUser {
  fullName: string;
  genre: string;
  cpf: string;
  phone: string;
  email: string;
  type: string;
}

export interface IUserForm extends IUser {
  password: string;
}

export interface IUserResponse extends IUser {
  id: number;
}

export interface IUserResetPassword {
  id: IUserResponse[ "id" ];
  email: IUser[ "email" ];
  password: IUserForm[ "password" ];
}
