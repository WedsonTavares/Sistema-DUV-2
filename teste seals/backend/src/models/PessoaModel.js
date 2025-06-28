const BaseModel = require('./BaseModel');

/**
 * Model para entidade Pessoa
 * Gerencia passageiros e tripulantes
 */
class PessoaModel extends BaseModel {
  constructor(db) {
    super(db);
    this.tableName = 'pessoas';
  }

  /**
   * Busca pessoas por tipo (passageiro/tripulante)
   * @param {string} tipo - Tipo da pessoa ('passageiro' ou 'tripulante')
   * @returns {Promise<Array>}
   */
  async findByTipo(tipo) {
    const sql = `SELECT * FROM ${this.tableName} WHERE tipo = ? ORDER BY nome`;
    return this.executeQuery(sql, [tipo]);
  }

  /**
   * Busca pessoas com estatísticas de viagens
   * @returns {Promise<Array>}
   */
  async findAllWithStats() {
    const sql = `
      SELECT 
        p.*,
        COUNT(dp.duv_id) as total_viagens,
        MAX(dp.embarque_timestamp) as ultima_viagem
      FROM pessoas p
      LEFT JOIN duv_pessoas dp ON p.id = dp.pessoa_id
      GROUP BY p.id
      ORDER BY p.nome
    `;

    return this.executeQuery(sql);
  }

  /**
   * Busca pessoa por ID com estatísticas
   * @param {string} id - ID da pessoa
   * @returns {Promise<Object|null>}
   */
  async findByIdWithStats(id) {
    const sql = `
      SELECT 
        p.*,
        COUNT(dp.duv_id) as total_viagens,
        MAX(dp.embarque_timestamp) as ultima_viagem
      FROM pessoas p
      LEFT JOIN duv_pessoas dp ON p.id = dp.pessoa_id
      WHERE p.id = ?
      GROUP BY p.id
    `;

    return this.executeQuery(sql, [id], 'get');
  }

  /**
   * Busca todas as DUVs de uma pessoa
   * @param {string} pessoaId - ID da pessoa
   * @returns {Promise<Array>}
   */
  async findDuvsByPessoaId(pessoaId) {
    const sql = `
      SELECT 
        d.*,
        n.nome as navio_nome,
        n.bandeira as navio_bandeira,
        n.imagem as navio_imagem,
        dp.embarque_timestamp
      FROM duvs d
      JOIN duv_pessoas dp ON d.id = dp.duv_id
      JOIN navios n ON d.navio_id = n.id
      WHERE dp.pessoa_id = ?
      ORDER BY d.data_viagem DESC
    `;

    return this.executeQuery(sql, [pessoaId]);
  }

  /**
   * Busca pessoas que não estão em uma DUV específica
   * @param {string} duvId - ID da DUV
   * @returns {Promise<Array>}
   */
  async findNotInDuv(duvId) {
    const sql = `
      SELECT p.*
      FROM pessoas p
      WHERE p.id NOT IN (
        SELECT pessoa_id 
        FROM duv_pessoas 
        WHERE duv_id = ?
      )
      ORDER BY p.tipo, p.nome
    `;

    return this.executeQuery(sql, [duvId]);
  }

  /**
   * Verifica se uma pessoa pode ser deletada
   * @param {string} id - ID da pessoa
   * @returns {Promise<boolean>}
   */
  async canDelete(id) {
    const sql = `SELECT COUNT(*) as count FROM duv_pessoas WHERE pessoa_id = ?`;
    const result = await this.executeQuery(sql, [id], 'get');
    return result.count === 0;
  }

  /**
   * Conta total de passageiros e tripulantes
   * @returns {Promise<Object>}
   */
  async getStatistics() {
    const sql = `
      SELECT 
        tipo,
        COUNT(*) as total
      FROM pessoas
      GROUP BY tipo
    `;

    const stats = await this.executeQuery(sql);
    
    return {
      passageiros: stats.find(s => s.tipo === 'passageiro')?.total || 0,
      tripulantes: stats.find(s => s.tipo === 'tripulante')?.total || 0,
      total: stats.reduce((sum, s) => sum + s.total, 0)
    };
  }

  /**
   * Valida dados de uma pessoa
   * @param {Object} data - Dados para validação
   * @returns {Object} Resultado da validação
   */
  validatePessoaData(data) {
    const errors = [];

    if (!data.nome || typeof data.nome !== 'string' || data.nome.trim().length === 0) {
      errors.push('Nome da pessoa é obrigatório');
    }

    if (!data.tipo || !['passageiro', 'tripulante'].includes(data.tipo)) {
      errors.push('Tipo deve ser "passageiro" ou "tripulante"');
    }

    if (!data.nacionalidade || typeof data.nacionalidade !== 'string' || data.nacionalidade.trim().length === 0) {
      errors.push('Nacionalidade é obrigatória');
    }

    // SID é obrigatório para tripulantes
    if (data.tipo === 'tripulante') {
      if (!data.sid || typeof data.sid !== 'string' || data.sid.trim().length === 0) {
        errors.push('SID é obrigatório para tripulantes');
      }
    }

    // Validação de foto (URL)
    if (data.foto && typeof data.foto !== 'string') {
      errors.push('URL da foto deve ser uma string');
    }

    if (data.foto && data.foto.trim().length > 0) {
      try {
        new URL(data.foto);
      } catch {
        errors.push('URL da foto deve ser válida');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

module.exports = PessoaModel;
