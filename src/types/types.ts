export interface User{
    nome:string;
    email:string;
    cargo:string;
    ativo:string;
    senha:string;
  }
export interface UserLogin{
  email:string;
  password:string;
}

export interface AuthData{
  token:string;
  email:string;
}
