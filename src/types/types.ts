
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
  criterioMunicipal?: string;
  criterioEstadual?: string;
  criterioGeral?: string;
  situacaoAchado: boolean;
  analise: string;
  tema_id: string;
}


export interface Beneficio {
  id?: string;
  beneficio: string;
  situacaoBeneficio: boolean;
}

export interface BeneficioUpdate {
  id?: string;
  beneficio: string;
  situacaoBeneficio: boolean;
  achados: Achado[];
}

export interface AchadoBeneficio {
  id?: string;
  achado_id: string;
  beneficio_id: string;
}

export interface BeneficioComAchado {
  beneficio?: string;
  beneficios?: Beneficio[];
  situacaoBeneficio?: boolean;
  id: string;
  achado: string;
  data: Date;
  gravidade: string;
  criterioMunicipal?: string;
  criterioEstadual?: string;
  criterioGeral?: string;
  situacaoAchado: boolean;
  analise: string;
  tema_id: string;
  tema: TopicoAchado;
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
  beneficios: Beneficio[];
}
export interface ColumnConfig {
  id: string;
  label: string;
  minWidth: number;
};

export interface Coleta {
  id: string;
  topico: TopicoAchado;
  responsavel: string;
  coletador: string;
  achado: Achado;
  valorFinanceiroAchado: number;
  quantidadeAchado: string;
  unidades: string;
  situacaoAchado: string;
  beneficio: Beneficio[];
  valorBeneficio: string;
}

export interface Processo {
  processoNRO: string;
  tipoProcesso: string;
  exercicio: string;
  analiseDefesa: string;
  julgado: string;
  achado: Achado;
  meritoContas: string;
  observacoes: string;
}






