export interface DUV {
  id: string;
  numero: string;
  data_viagem: string;
  porto_origem?: string;
  porto_destino?: string;
  status?: 'ativo' | 'concluido' | 'cancelado';
  navio_id?: string;
  navio?: {
    id: string;
    nome: string;
    bandeira: string;
    imagem: string;
  };
  navio_nome?: string;
  created_at?: string;
  updated_at?: string;
  total_pessoas?: number;
  lista_pessoas?: string[];
}

export interface Navio {
  id: string;
  nome: string;
  tipo?: string;
  bandeira: string;
  ano_construcao?: number;
  comprimento?: number;
  largura?: number;
  tonelagem?: number;
  capacidade_passageiros?: number;
  imagem: string;
  created_at?: string;
  updated_at?: string;
  total_viagens?: number;
  ultima_viagem?: string;
}

export interface Pessoa {
  id: string;
  nome: string;
  cpf?: string;
  rg?: string;
  data_nascimento?: string;
  nacionalidade: string;
  tipo: 'passageiro' | 'tripulante';
  sid?: string;
  foto: string;
  created_at?: string;
  updated_at?: string;
  total_viagens?: number;
  ultima_viagem?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
