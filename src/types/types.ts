export interface User {
  nome: string;
  email: string;
  cargo: string;
  ativo: string;
  senha: string;
}
export interface UserLogin {
  email: string;
  password: string;
}

export interface AuthData {
  token: string;
  email: string;
}

export interface PessoaFisica {
  nome: string;
  cpf: string;
  rg: string;
  profissao: string;
  genero: string;
  cep: string;
  logradouro: string;
  complemento: string;
  numero: string;
  cidade: string;
  uf: string;
  telefone1: string;
  telefone2: string;
  ramal: string;
  email: string;
}
