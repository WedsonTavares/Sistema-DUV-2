const BaseModel = require('./BaseModel');

/**
 * Model para entidade Navio
 * Gerencia informações das embarcações
 */
class NavioModel extends BaseModel {
  constructor(db) {
    super(db);
    this.tableName = 'navios';
  }

  /**
   * Busca navios com estatísticas de uso
   * @returns {Promise<Array>}
   */
  async findAllWithStats() {
    const sql = `
      SELECT 
        n.*,
        COUNT(d.id) as total_viagens,
        MAX(d.data_viagem) as ultima_viagem
      FROM navios n
      LEFT JOIN duvs d ON n.id = d.navio_id
      GROUP BY n.id
      ORDER BY n.nome
    `;

    return this.executeQuery(sql);
  }

  /**
   * Busca navio por ID com estatísticas
   * @param {string} id - ID do navio
   * @returns {Promise<Object|null>}
   */
  async findByIdWithStats(id) {
    const sql = `
      SELECT 
        n.*,
        COUNT(d.id) as total_viagens,
        MAX(d.data_viagem) as ultima_viagem
      FROM navios n
      LEFT JOIN duvs d ON n.id = d.navio_id
      WHERE n.id = ?
      GROUP BY n.id
    `;

    return this.executeQuery(sql, [id], 'get');
  }

  /**
   * Busca todas as DUVs de um navio
   * @param {string} navioId - ID do navio
   * @returns {Promise<Array>}
   */
  async findDuvsByNavioId(navioId) {
    const sql = `
      SELECT * FROM duvs 
      WHERE navio_id = ? 
      ORDER BY data_viagem DESC
    `;

    return this.executeQuery(sql, [navioId]);
  }

  /**
   * Verifica se um navio pode ser deletado
   * @param {string} id - ID do navio
   * @returns {Promise<boolean>}
   */
  async canDelete(id) {
    const sql = `SELECT COUNT(*) as count FROM duvs WHERE navio_id = ?`;
    const result = await this.executeQuery(sql, [id], 'get');
    return result.count === 0;
  }

  /**
   * Valida dados de um navio
   * @param {Object} data - Dados para validação
   * @returns {Object} Resultado da validação
   */
  validateNavioData(data) {
    const errors = [];

    if (!data.nome || typeof data.nome !== 'string' || data.nome.trim().length === 0) {
      errors.push('Nome do navio é obrigatório');
    }

    if (!data.bandeira || typeof data.bandeira !== 'string' || data.bandeira.trim().length === 0) {
      errors.push('Bandeira do navio é obrigatória');
    }

    if (data.imagem && typeof data.imagem !== 'string') {
      errors.push('URL da imagem deve ser uma string');
    }

    // Validação básica de URL se imagem foi fornecida
    if (data.imagem && data.imagem.trim().length > 0) {
      try {
        new URL(data.imagem);
      } catch {
        errors.push('URL da imagem deve ser válida');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

module.exports = NavioModel;
