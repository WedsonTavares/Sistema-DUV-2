const BaseController = require('./BaseController');
const NavioModel = require('../models/NavioModel');

/**
 * Controller para gerenciamento de Navios
 */
class NavioController extends BaseController {
  constructor(db) {
    super();
    this.navioModel = new NavioModel(db);
  }

  index = this.asyncHandler(async (req, res) => {
    try {
      const navios = await this.navioModel.findAllWithStats();
      this.sendSuccess(res, navios, `${navios.length} navios encontrados`);
    } catch (error) {
      this.sendError(res, 'Erro ao buscar navios', 500, [error.message]);
    }
  });

  show = this.asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!this.isValidUUID(id)) {
      return this.sendError(res, 'ID do navio inválido', 400);
    }

    try {
      const navio = await this.navioModel.findByIdWithStats(id);
      
      if (!navio) {
        return this.sendNotFound(res, 'Navio');
      }

      this.sendSuccess(res, navio, 'Navio encontrado com sucesso');
    } catch (error) {
      this.sendError(res, 'Erro ao buscar navio', 500, [error.message]);
    }
  });

  store = this.asyncHandler(async (req, res) => {
    const { nome, bandeira, imagem } = req.body;

    const validation = this.navioModel.validateNavioData({ nome, bandeira, imagem });

    if (!validation.isValid) {
      return this.sendValidationError(res, validation.errors);
    }

    try {
      const navio = await this.navioModel.create({
        nome: nome.trim(),
        bandeira: bandeira.trim(),
        imagem: imagem?.trim()
      });

      this.sendSuccess(res, navio, 'Navio criado com sucesso', 201);
    } catch (error) {
      this.sendError(res, 'Erro ao criar navio', 500, [error.message]);
    }
  });

  update = this.asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { nome, bandeira, imagem } = req.body;

    if (!this.isValidUUID(id)) {
      return this.sendError(res, 'ID do navio inválido', 400);
    }

    const validation = this.navioModel.validateNavioData({ nome, bandeira, imagem });

    if (!validation.isValid) {
      return this.sendValidationError(res, validation.errors);
    }

    try {
      const existingNavio = await this.navioModel.findById(id);
      if (!existingNavio) {
        return this.sendNotFound(res, 'Navio');
      }

      const navio = await this.navioModel.update(id, {
        nome: nome.trim(),
        bandeira: bandeira.trim(),
        imagem: imagem?.trim()
      });

      this.sendSuccess(res, navio, 'Navio atualizado com sucesso');
    } catch (error) {
      this.sendError(res, 'Erro ao atualizar navio', 500, [error.message]);
    }
  });

  destroy = this.asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!this.isValidUUID(id)) {
      return this.sendError(res, 'ID do navio inválido', 400);
    }

    try {
      const existingNavio = await this.navioModel.findById(id);
      if (!existingNavio) {
        return this.sendNotFound(res, 'Navio');
      }

      const canDelete = await this.navioModel.canDelete(id);
      if (!canDelete) {
        return this.sendError(res, 'Não é possível deletar navio com viagens associadas', 409);
      }

      const deleted = await this.navioModel.delete(id);
      
      if (deleted) {
        this.sendSuccess(res, null, 'Navio removido com sucesso');
      } else {
        this.sendError(res, 'Erro ao remover navio', 500);
      }
    } catch (error) {
      this.sendError(res, 'Erro ao remover navio', 500, [error.message]);
    }
  });
}

module.exports = NavioController;
