const BaseModel = require('./BaseModel');

/**
 * Model para entidade DUV (Documento Único Virtual)
 * Gerencia viagens de navios com seus passageiros
 */
class DuvModel extends BaseModel {
  constructor(db) {
    super(db);
    this.tableName = 'duvs';
  }

  /**
   * Busca todas as DUVs com informações dos navios
   * @returns {Promise<Array>}
   */
  async findAllWithShips() {
    const sql = `
      SELECT 
        d.id,
        d.numero,
        d.data_viagem,
        d.created_at,
        d.updated_at,
        n.id as navio_id,
        n.nome as navio_nome,
        n.bandeira as navio_bandeira,
        n.imagem as navio_imagem
      FROM duvs d
      JOIN navios n ON d.navio_id = n.id
      ORDER BY d.data_viagem DESC
    `;

    const rows = await this.executeQuery(sql);
    
    return rows.map(row => ({
      id: row.id,
      numero: row.numero,
      data_viagem: row.data_viagem,
      created_at: row.created_at,
      updated_at: row.updated_at,
      navio: {
        id: row.navio_id,
        nome: row.navio_nome,
        bandeira: row.navio_bandeira,
        imagem: row.navio_imagem
      }
    }));
  }

  /**
   * Busca uma DUV por ID com navio e passageiros
   * @param {string} id - ID da DUV
   * @returns {Promise<Object|null>}
   */
  async findByIdWithDetails(id) {
    // Buscar DUV com navio
    const duvSql = `
      SELECT 
        d.id,
        d.numero,
        d.data_viagem,
        d.created_at,
        d.updated_at,
        n.id as navio_id,
        n.nome as navio_nome,
        n.bandeira as navio_bandeira,
        n.imagem as navio_imagem
      FROM duvs d
      JOIN navios n ON d.navio_id = n.id
      WHERE d.id = ?
    `;

    const duvRow = await this.executeQuery(duvSql, [id], 'get');
    
    if (!duvRow) {
      return null;
    }

    // Buscar pessoas da DUV
    const pessoasSql = `
      SELECT 
        p.*,
        dp.embarque_timestamp
      FROM pessoas p
      JOIN duv_pessoas dp ON p.id = dp.pessoa_id
      WHERE dp.duv_id = ?
      ORDER BY p.tipo, p.nome
    `;

    const pessoas = await this.executeQuery(pessoasSql, [id]);

    return {
      id: duvRow.id,
      numero: duvRow.numero,
      data_viagem: duvRow.data_viagem,
      created_at: duvRow.created_at,
      updated_at: duvRow.updated_at,
      navio: {
        id: duvRow.navio_id,
        nome: duvRow.navio_nome,
        bandeira: duvRow.navio_bandeira,
        imagem: duvRow.navio_imagem
      },
      pessoas: pessoas
    };
  }

  /**
   * Cria uma nova DUV com passageiros
   * @param {Object} duvData - Dados da DUV
   * @param {Array} pessoaIds - IDs das pessoas
   * @returns {Promise<Object>}
   */
  async createWithPeople(duvData, pessoaIds = []) {
    const duv = await this.create(duvData);
    
    if (pessoaIds.length > 0) {
      await this.addPeopleToDuv(duv.id, pessoaIds);
    }
    
    return this.findByIdWithDetails(duv.id);
  }

  /**
   * Atualiza uma DUV e seus passageiros
   * @param {string} id - ID da DUV
   * @param {Object} duvData - Dados da DUV
   * @param {Array} pessoaIds - IDs das pessoas
   * @returns {Promise<Object>}
   */
  async updateWithPeople(id, duvData, pessoaIds = []) {
    await this.update(id, duvData);
    
    // Remove pessoas existentes
    await this.removeAllPeopleFromDuv(id);
    
    // Adiciona novas pessoas
    if (pessoaIds.length > 0) {
      await this.addPeopleToDuv(id, pessoaIds);
    }
    
    return this.findByIdWithDetails(id);
  }

  /**
   * Adiciona pessoas a uma DUV
   * @param {string} duvId - ID da DUV
   * @param {Array} pessoaIds - IDs das pessoas
   * @returns {Promise<void>}
   */
  async addPeopleToDuv(duvId, pessoaIds) {
    const sql = `INSERT INTO duv_pessoas (duv_id, pessoa_id) VALUES (?, ?)`;
    
    for (const pessoaId of pessoaIds) {
      await this.executeQuery(sql, [duvId, pessoaId], 'run');
    }
  }

  /**
   * Remove todas as pessoas de uma DUV
   * @param {string} duvId - ID da DUV
   * @returns {Promise<void>}
   */
  async removeAllPeopleFromDuv(duvId) {
    const sql = `DELETE FROM duv_pessoas WHERE duv_id = ?`;
    await this.executeQuery(sql, [duvId], 'run');
  }

  /**
   * Valida dados de uma DUV
   * @param {Object} data - Dados para validação
   * @returns {Object} Resultado da validação
   */
  validateDuvData(data) {
    const errors = [];

    if (!data.numero || typeof data.numero !== 'string' || data.numero.trim().length === 0) {
      errors.push('Número da DUV é obrigatório');
    }

    if (!data.data_viagem) {
      errors.push('Data da viagem é obrigatória');
    } else {
      const date = new Date(data.data_viagem);
      if (isNaN(date.getTime())) {
        errors.push('Data da viagem deve ser uma data válida');
      }
    }

    if (!data.navio_id || typeof data.navio_id !== 'string') {
      errors.push('ID do navio é obrigatório');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Busca todas as DUVs com informações dos navios e algumas fotos de pessoas
   * @returns {Promise<Array>}
   */
  async findAllWithShipsAndPeople() {
    const sql = `
      SELECT 
        d.id,
        d.numero,
        d.data_viagem,
        d.created_at,
        d.updated_at,
        n.id as navio_id,
        n.nome as navio_nome,
        n.bandeira as navio_bandeira,
        n.imagem as navio_imagem
      FROM duvs d
      JOIN navios n ON d.navio_id = n.id
      ORDER BY d.data_viagem DESC
    `;

    const rows = await this.executeQuery(sql);
    
    // Para cada DUV, buscar algumas pessoas para mostrar fotos
    const duvs = [];
    for (const row of rows) {
      const pessoasSql = `
        SELECT 
          p.id,
          p.nome,
          p.foto,
          p.tipo
        FROM pessoas p
        JOIN duv_pessoas dp ON p.id = dp.pessoa_id
        WHERE dp.duv_id = ?
        ORDER BY p.tipo, p.nome
        LIMIT 5
      `;

      const pessoas = await this.executeQuery(pessoasSql, [row.id]);
      
      duvs.push({
        id: row.id,
        numero: row.numero,
        data_viagem: row.data_viagem,
        created_at: row.created_at,
        updated_at: row.updated_at,
        total_pessoas: pessoas.length,
        navio: {
          id: row.navio_id,
          nome: row.navio_nome,
          bandeira: row.navio_bandeira,
          imagem: row.navio_imagem
        },
        pessoas_preview: pessoas // Primeiras 5 pessoas para mostrar fotos
      });
    }
    
    return duvs;
  }
}

module.exports = DuvModel;
