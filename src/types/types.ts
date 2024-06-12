
export interface User {
  id: string;
  nome: string;
  email: string;
  cargo: string;
  ativo: string;
  senha: string;
}

export interface AllUsers {
  id: string;
  nome: string;
  email: string;
  cargo: string;
  ativo: string;
}
export interface UserUpdate {
  id: string;
  nome: string;
  email: string;
  cargo: string;
  ativo: string;
  senhaAtual: string;
  novaSenha: string;
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
  id?: string;
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
  ativo: string;
  interessado?: Interessado[]
  pessoJurisd?: PessoaJurisd[]
  processo?: Processo[]
}
export interface UpdatePessoaFisica {
  id?: string;
  ativo?: string;
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
export interface Procurador {
  id?: string;
  nome: string;
  ativo?: string;
}
export interface Relator {
  id?: string;
  nome: string;
  cargo: string;
  ativo?: string;
}

export interface NatAchado {
  id: string;
  descricao: string;
}

export interface DivAchado {
  id: string;
  descricao: string;
  area: string;
}
export interface AreaAchado {
  id: string;
  descricao: string;
  natureza: string | null;
}

export interface Achado {
  id: string;
  titulo: string;
  texto: string;
  criterio: string;
  ativo: string;
  divisao: string;
}

export interface Jurisd {
  id?: string;
  nome: string;
  sigla: string;
  cnpj: string;
  ug: string;
  cep: string;
  logradouro: string;
  complemento: string;
  numero: string;
  cidade: string;
  telefone1: string;
  telefone2: string;
  email: string;
  site: string;
  cargoGestor: string;
  normaCriacao: string;
  dataCriacao: string;
  normaExtincao: string;
  dataExtincao: string;
  poder: string;
  ativo?: string;
  uf: string;
}

export interface Jurisd_Jurisd {
  principal: string;
  subordinado: string;
}
export interface Processo {
  id: string;
  numero: string;
  ano: string;
  natureza: string;
  exercicio: string;
  objeto: string;
  arquivamento: string;
  jurisd: string;
  relator: string;
  procurador: string;
  advogado: string;
  apensado: string;
  interessado: string;
}

export interface Apenso {
  id: string
  principal: string;
  apensado: string;
}

export interface Interessado {
  id: string;
  interesse: string;
  processo: string;
  pessoa: string;
}
export interface InteressadoUpdate {
  id: string;
  interesse: string;
}
//esse type é para o formulário de criação de pessoaJurisd obs: datas aqui são string, pra retorno vai ter que ser date
export interface PessoaJurisd {
  id: string;
  cargo: string;
  mandato: string;
  normaNomeacao: string;
  dataNomeacao: string;
  normaExoneracao: string;
  dataExoneracao: string;
  gestor: string;
  jurisd: string;
  pessoa: string | undefined
}

export type ColumnConfig = {
  id: string;
  label: string;
  minWidth: number;
};

export type ListData = {
  id:string;
  label:string,
  value:string;
}


