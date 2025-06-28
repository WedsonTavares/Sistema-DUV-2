const BaseController = require('./BaseController');
const DuvModel = require('../models/DuvModel');

/**
 * Controller para gerenciamento de DUVs
 * Implementa todas as operações CRUD para Documentos Únicos Virtuais
 */
class DuvController extends BaseController {
  constructor(db) {
    super();
    this.duvModel = new DuvModel(db);
  }

  /**
   * Lista todas as DUVs com informações dos navios
   * GET /api/duvs
   */
  index = this.asyncHandler(async (req, res) => {
    try {
      const duvs = await this.duvModel.findAllWithShips();
      
      this.sendSuccess(res, duvs, `${duvs.length} DUVs encontradas`);
    } catch (error) {
      this.sendError(res, 'Erro ao buscar DUVs', 500, [error.message]);
    }
  });

  /**
   * Busca uma DUV específica com detalhes completos
   * GET /api/duvs/:id
   */
  show = this.asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!this.isValidUUID(id)) {
      return this.sendError(res, 'ID da DUV inválido', 400);
    }

    try {
      const duv = await this.duvModel.findByIdWithDetails(id);
      
      if (!duv) {
        return this.sendNotFound(res, 'DUV');
      }

      this.sendSuccess(res, duv, 'DUV encontrada com sucesso');
    } catch (error) {
      this.sendError(res, 'Erro ao buscar DUV', 500, [error.message]);
    }
  });

  /**
   * Cria uma nova DUV
   * POST /api/duvs
   */
  store = this.asyncHandler(async (req, res) => {
    const { numero, data_viagem, navio_id, pessoa_ids = [] } = req.body;

    // Validação dos dados
    const validation = this.duvModel.validateDuvData({
      numero,
      data_viagem,
      navio_id
    });

    if (!validation.isValid) {
      return this.sendValidationError(res, validation.errors);
    }

    // Validação dos IDs das pessoas
    if (pessoa_ids.length > 0) {
      const invalidIds = pessoa_ids.filter(id => !this.isValidUUID(id));
      if (invalidIds.length > 0) {
        return this.sendError(res, 'IDs de pessoas inválidos', 400, invalidIds);
      }
    }

    try {
      const duv = await this.duvModel.createWithPeople({
        numero: numero.trim(),
        data_viagem,
        navio_id
      }, pessoa_ids);

      this.sendSuccess(res, duv, 'DUV criada com sucesso', 201);
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT' && error.message.includes('UNIQUE')) {
        return this.sendError(res, 'Número da DUV já existe', 409);
      }
      
      this.sendError(res, 'Erro ao criar DUV', 500, [error.message]);
    }
  });

  /**
   * Atualiza uma DUV existente
   * PUT /api/duvs/:id
   */
  update = this.asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { numero, data_viagem, navio_id, pessoa_ids = [] } = req.body;

    if (!this.isValidUUID(id)) {
      return this.sendError(res, 'ID da DUV inválido', 400);
    }

    // Validação dos dados
    const validation = this.duvModel.validateDuvData({
      numero,
      data_viagem,
      navio_id
    });

    if (!validation.isValid) {
      return this.sendValidationError(res, validation.errors);
    }

    // Validação dos IDs das pessoas
    if (pessoa_ids.length > 0) {
      const invalidIds = pessoa_ids.filter(pid => !this.isValidUUID(pid));
      if (invalidIds.length > 0) {
        return this.sendError(res, 'IDs de pessoas inválidos', 400, invalidIds);
      }
    }

    try {
      // Verificar se DUV existe
      const existingDuv = await this.duvModel.findById(id);
      if (!existingDuv) {
        return this.sendNotFound(res, 'DUV');
      }

      const duv = await this.duvModel.updateWithPeople(id, {
        numero: numero.trim(),
        data_viagem,
        navio_id
      }, pessoa_ids);

      this.sendSuccess(res, duv, 'DUV atualizada com sucesso');
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT' && error.message.includes('UNIQUE')) {
        return this.sendError(res, 'Número da DUV já existe', 409);
      }
      
      this.sendError(res, 'Erro ao atualizar DUV', 500, [error.message]);
    }
  });

  /**
   * Remove uma DUV
   * DELETE /api/duvs/:id
   */
  destroy = this.asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!this.isValidUUID(id)) {
      return this.sendError(res, 'ID da DUV inválido', 400);
    }

    try {
      // Verificar se DUV existe
      const existingDuv = await this.duvModel.findById(id);
      if (!existingDuv) {
        return this.sendNotFound(res, 'DUV');
      }

      const deleted = await this.duvModel.delete(id);
      
      if (deleted) {
        this.sendSuccess(res, null, 'DUV removida com sucesso');
      } else {
        this.sendError(res, 'Erro ao remover DUV', 500);
      }
    } catch (error) {
      this.sendError(res, 'Erro ao remover DUV', 500, [error.message]);
    }
  });

  /**
   * Adiciona pessoas a uma DUV existente
   * POST /api/duvs/:id/pessoas
   */
  addPeople = this.asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { pessoa_ids = [] } = req.body;

    if (!this.isValidUUID(id)) {
      return this.sendError(res, 'ID da DUV inválido', 400);
    }

    if (!Array.isArray(pessoa_ids) || pessoa_ids.length === 0) {
      return this.sendError(res, 'Lista de pessoas é obrigatória', 400);
    }

    const invalidIds = pessoa_ids.filter(pid => !this.isValidUUID(pid));
    if (invalidIds.length > 0) {
      return this.sendError(res, 'IDs de pessoas inválidos', 400, invalidIds);
    }

    try {
      // Verificar se DUV existe
      const existingDuv = await this.duvModel.findById(id);
      if (!existingDuv) {
        return this.sendNotFound(res, 'DUV');
      }

      await this.duvModel.addPeopleToDuv(id, pessoa_ids);
      const duvAtualizada = await this.duvModel.findByIdWithDetails(id);

      this.sendSuccess(res, duvAtualizada, 'Pessoas adicionadas à DUV com sucesso');
    } catch (error) {
      this.sendError(res, 'Erro ao adicionar pessoas à DUV', 500, [error.message]);
    }
  });
}

module.exports = DuvController;
