
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

export interface dataRelation {
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
  processos: ApensoProcesso[];
  pessoaJurisds: PessoaJurisd[];
}
export interface Procurador {
  id?: string;
  nome: string;
  ativo?: string;
  processos?:ProcessoUpdate;
}
export interface Relator {
  id?: string;
  nome: string;
  cargo: string;
  ativo?: string;
}
export interface NatAchado {
  id: String;
  descricao: string;
}

export interface NatRelation {
  id:string;
  descricao:string;
  areas:{id:string, descricao:string, divisoes:[]}[];
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

export interface AchadoUp {
  id: string;
  titulo: string;
  texto: string;
  criterio: string;
  ativo: string;
}

export interface DivAreaAchadoUp {
  id: string;
  descricao: string;
  achados: AchadoUp[];
}

export interface AreaAchadoUp {
  id: string;
  descricao: string;
  divisoes: DivAreaAchadoUp[];
}

export interface NatAchadoUp {
  id: string;
  descricao: string;
  areas: AreaAchadoUp[];
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
  jurisdPrincipal?:string | {message:string}
}

export interface jurisdRelation extends Jurisd{
  processos:Processo[];
  pessoaJurisds:PessoaJurisd[];
  jurisdJurisds:{id:string, subordinado:Jurisd}[];
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
export interface ProcessoUpdate extends Processo {
  id: string;
  numero: string;
  ano: string;
  natureza: string;
  exercicio: string;
  objeto: string;
  arquivamento: string;
}
export interface Apenso {
  id: string
  principal: string;
  apensado: string;
}
export interface ApensoProcesso {
  id: string;
  numero: string;
  ano: string;
  natureza: string;
  exercicio: string;
  objeto: string;
  arquivamento: string;
}
export interface ApensoProcessoPai {
  id: string;
  apensado: ApensoProcesso;
}
export interface Interessado {
  id: string;
  interesse: string;
  processo: string;
  pessoa: string;
}
export interface InteressadoPessoa {
  id: string;
  interesse: string;
  pessoa: PessoaFisica;
}
export interface PessoaJurisd {
  id: string;
  cargo: string;
  mandato: string;
  normaNomeacao: string;
  dataNomeacao: string;
  normaExoneracao: string;
  dataExoneracao: string;
  gestor: string;
  jurisd?: string;
  pessoa?: string | undefined
}

export interface ColumnConfig  {
  id: string;
  label: string;
  minWidth: number;
};

export interface ListData  {
  id: string;
  type: 'processo' | 'pessoajurisd' | 'procurador' | 'relator';
  value1: string,
  value2: string;
  value3: string;
  value4: string;
  value5: string;
  value6: string;
}

export interface ProcessoDetails  {
  id?: string;
  numero: string;
  ano: string;
  natureza: string;
  exercicio: string;
  objeto: string;
  arquivamento: string;
  advogado: PessoaFisica;
  jurisd: Jurisd;
  relator: Relator;
  procurador: Procurador;
  processoPrincipal?: string | { message: string };
  apensados: ApensoProcessoPai[];
  interessados: InteressadoPessoa[];
}



