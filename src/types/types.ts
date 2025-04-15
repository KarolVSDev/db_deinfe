
export interface User {
  id: string;
  nome: string;
  email: string;
  cargo: string;
  ativo: string;
  senha?: string;
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
}
export interface UserLogin {
  email: string;
  password: string;
}
export interface AuthData {
  token: string;
  email: string;
}

//Data Table
export interface TopicoAchado {
  id: string;
  tema: string;
  situacao: boolean;
}

export interface Achado {
  id?: string;
  achado: string;
  data: Date;
  gravidade: string;
  valorFinanceiro?:number;
  criterioMunicipal?: string;
  criterioEstadual?: string;
  criterioGeral?: string;
  situacaoAchado: boolean;
  analise: string;
  tema_id: string;
}

export interface FormBeneficioType {
  id: string;
  beneficio: string;
  situacaoBeneficio: boolean;
  achados: Achado[];
}
export interface AchadoComTopico {
  achado: Achado;
  tema: TopicoAchado;
}
export interface ColumnConfig {
  id: string;
  label: string;
  minWidth: number;
};

export interface Coleta {
  id:string;
  quantitativo:number;
  unidade:string;
  valorFinanceiro:number;
  sitaucaoSanado:boolean;
  coletadorId:string;
  temaId:string;
  achadoId:string;
  processoId:string;
}

export interface Processo {
  id: string;
  numero: string;
  exercicio: string;
  julgado: string;
  unidadeGestora: string;
  diretoria: string;
}

export interface Diretoria {
  id:string;
  label:string;
}







