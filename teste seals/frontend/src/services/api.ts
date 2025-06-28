import { DUV, Navio, Pessoa, ApiResponse } from '../types';

const API_BASE_URL = 'http://localhost:3001';

class APIClient {
  private async fetch<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Erro na requisição para ${endpoint}:`, error);
      throw error;
    }
  }

  // DUV APIs
  async getDUVs(): Promise<DUV[]> {
    const result = await this.fetch<DUV[]>('/api/duvs');
    return result.data || [];
  }

  async getDUVById(id: string): Promise<DUV | null> {
    const result = await this.fetch<DUV>(`/api/duvs/${id}`);
    return result.data || null;
  }

  // Navio APIs
  async getNavios(): Promise<Navio[]> {
    const result = await this.fetch<Navio[]>('/api/navios');
    return result.data || [];
  }

  async getNavioById(id: string): Promise<Navio | null> {
    const result = await this.fetch<Navio>(`/api/navios/${id}`);
    return result.data || null;
  }

  // Pessoa APIs
  async getPessoas(): Promise<Pessoa[]> {
    const result = await this.fetch<Pessoa[]>('/api/pessoas');
    return result.data || [];
  }

  async getPessoaById(id: string): Promise<Pessoa | null> {
    const result = await this.fetch<Pessoa>(`/api/pessoas/${id}`);
    return result.data || null;
  }
}

export const apiClient = new APIClient();

// Exports específicos para backward compatibility
export const duvAPI = {
  getAll: () => apiClient.getDUVs(),
  getById: (id: string) => apiClient.getDUVById(id)
};

export const navioAPI = {
  getAll: () => apiClient.getNavios(),
  getById: (id: string) => apiClient.getNavioById(id)
};

export const pessoaAPI = {
  getAll: () => apiClient.getPessoas(),
  getById: (id: string) => apiClient.getPessoaById(id)
};
