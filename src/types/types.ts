
import ShowBeneficios from "../components/Buttons/DeleteButton";
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

//Data Table
export interface TopicoAchado {
  id: string;
  topico: string;
  situacao:boolean;
}

export interface Achado {
  id: string;
  achado:string;
  situacaoAchado:boolean;
  analise:string;
  topico_id:string;
}

export interface Beneficio {
  id: string;
  beneficio:string;
  situacaoBeneficio:boolean;
}

export interface AchadoBeneficio {
  id:string;
  achado_id:string;
  beneficio_id:string;
}

// export interface Achado2 {
//   id: string;
//   titulo: string;
//   texto: string;
//   criterio: string;
//   ativo: string;
//   divisao: { id: string, descricao: string };
// }

// export interface AchadoUp {
//   id: string;
//   titulo: string;
//   texto: string;
//   criterio: string;
//   ativo: string;
//   divisao?: {
//     id: string, descricao: string,
//     area: {
//       id: string, descricao: string,
//       natureza: { id: string, descricao: string }
//     }
//   }
// }

// export interface DivAchadoUp {
//   id: string;
//   descricao: string;
//   area: AreaAchado2;
//   achados: AchadoUp[];
// }

// export interface AreaAchadoUp {
//   id: string;
//   descricao: string;
//   natureza: TopicoAchado;
//   divisoes: DivAchadoUp[];
// }

export interface NatRelation {
  id: string;
  descricao: string;
  areas: { id: string, descricao: string, divisoes: [] }[];
}
export interface DivAchado {
  id: string;
  descricao: string;
  area?: string;
}
export interface DivAchado2 {
  id: string;
  descricao: string;
  area: { id: string, descricao: string };
}
export interface AreaAchado {
  id: string;
  descricao: string;
  natureza?: string;
}
export interface AreaAchado2 {
  id: string;
  descricao: string;
  natureza: { id: string, descricao: string };
}


export interface ColumnConfig {
  id: string;
  label: string;
  minWidth: number;
};




