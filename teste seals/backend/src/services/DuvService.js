/**
 * Classe de serviço para operações relacionadas a DUVs
 * 
 * Implementa a lógica de negócio específica para Documentos Únicos Virtuais,
 * incluindo validações, formatações e regras de negócio complexas.
 * 
 * @class DuvService
 * @author Seals Solutions
 * @version 1.0.0
 */
class DuvService {
  
  /**
   * Valida os dados de um DUV antes de criar/atualizar
   * 
   * Realiza validações essenciais dos campos obrigatórios e formatos
   * de dados para garantir integridade da informação.
   * 
   * @param {Object} data - Dados do DUV para validação
   * @param {string} data.numero - Número único do DUV
   * @param {string} data.data_viagem - Data da viagem no formato ISO
   * @param {string} data.navio_id - Identificador único do navio
   * @returns {Object} Resultado da validação com status e erros
   */
  validateDuvData(data) {
    const errors = [];
    
    // Validação do número do DUV
    if (!data.numero || data.numero.trim() === '') {
      errors.push('Número do DUV é obrigatório');
    } else if (data.numero.length < 3) {
      errors.push('Número do DUV deve ter pelo menos 3 caracteres');
    }
    
    // Validação da data da viagem
    if (!data.data_viagem) {
      errors.push('Data da viagem é obrigatória');
    } else {
      const date = new Date(data.data_viagem);
      if (isNaN(date.getTime())) {
        errors.push('Data da viagem deve ser uma data válida');
      } else if (date < new Date()) {
        // Permitir apenas datas futuras para novas viagens
        // Esta regra pode ser ajustada conforme necessário
        console.warn('Data da viagem é no passado:', data.data_viagem);
      }
    }
    
    // Validação do ID do navio
    if (!data.navio_id || data.navio_id.trim() === '') {
      errors.push('ID do navio é obrigatório');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  /**
   * Formata os dados do DUV para exibição
   * 
   * Converte dados brutos do banco para formato adequado
   * para apresentação na interface do usuário.
   * 
   * @param {Object} duv - Dados brutos do DUV
   * @returns {Object} DUV formatado para exibição
   */
  formatDuvForDisplay(duv) {
    return {
      ...duv,
      data_viagem: new Date(duv.data_viagem).toLocaleDateString('pt-BR'),
      created_at: duv.created_at ? new Date(duv.created_at).toLocaleString('pt-BR') : null,
      updated_at: duv.updated_at ? new Date(duv.updated_at).toLocaleString('pt-BR') : null
    };
  }
  
  /**
   * Calcula estatísticas de uma DUV
   * 
   * @param {Object} duv - Dados da DUV com pessoas relacionadas
   * @returns {Object} Estatísticas calculadas
   */
  calculateDuvStats(duv) {
    const pessoas = duv.pessoas || [];
    const tripulantes = pessoas.filter(p => p.tipo === 'tripulante');
    const passageiros = pessoas.filter(p => p.tipo === 'passageiro');
    
    return {
      total_pessoas: pessoas.length,
      total_tripulantes: tripulantes.length,
      total_passageiros: passageiros.length,
      possui_sid: tripulantes.filter(t => t.sid).length
    };
  }
  
  /**
   * Determina o status de uma DUV baseado na data da viagem
   * 
   * @param {string} dataViagem - Data da viagem
   * @returns {string} Status da DUV (ativo, concluido, cancelado)
   */
  determineDuvStatus(dataViagem) {
    const hoje = new Date();
    const viagem = new Date(dataViagem);
    
    if (viagem > hoje) {
      return 'ativo';
    } else {
      return 'concluido';
    }
  }
}

module.exports = DuvService;
