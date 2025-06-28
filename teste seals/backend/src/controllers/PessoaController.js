const BaseController = require('./BaseController');
const PessoaModel = require('../models/PessoaModel');

/**
 * Controller para gerenciamento de Pessoas (Passageiros e Tripulantes)
 */
class PessoaController extends BaseController {
  constructor(db) {
    super();
    this.pessoaModel = new PessoaModel(db);
  }

  index = this.asyncHandler(async (req, res) => {
    const { tipo } = req.query;

    try {
      let pessoas;
      
      if (tipo && ['passageiro', 'tripulante'].includes(tipo)) {
        pessoas = await this.pessoaModel.findByTipo(tipo);
      } else {
        pessoas = await this.pessoaModel.findAllWithStats();
      }

      this.sendSuccess(res, pessoas, `${pessoas.length} pessoas encontradas`);
    } catch (error) {
      this.sendError(res, 'Erro ao buscar pessoas', 500, [error.message]);
    }
  });

  show = this.asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!this.isValidUUID(id)) {
      return this.sendError(res, 'ID da pessoa inválido', 400);
    }

    try {
      const pessoa = await this.pessoaModel.findByIdWithStats(id);
      
      if (!pessoa) {
        return this.sendNotFound(res, 'Pessoa');
      }

      this.sendSuccess(res, pessoa, 'Pessoa encontrada com sucesso');
    } catch (error) {
      this.sendError(res, 'Erro ao buscar pessoa', 500, [error.message]);
    }
  });

  store = this.asyncHandler(async (req, res) => {
    const { nome, tipo, nacionalidade, sid, foto } = req.body;

    const validation = this.pessoaModel.validatePessoaData({
      nome, tipo, nacionalidade, sid, foto
    });

    if (!validation.isValid) {
      return this.sendValidationError(res, validation.errors);
    }

    try {
      const pessoaData = {
        nome: nome.trim(),
        tipo,
        nacionalidade: nacionalidade.trim(),
        foto: foto?.trim()
      };

      // Adicionar SID apenas se for tripulante
      if (tipo === 'tripulante' && sid) {
        pessoaData.sid = sid.trim();
      }

      const pessoa = await this.pessoaModel.create(pessoaData);

      this.sendSuccess(res, pessoa, 'Pessoa criada com sucesso', 201);
    } catch (error) {
      this.sendError(res, 'Erro ao criar pessoa', 500, [error.message]);
    }
  });

  update = this.asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { nome, tipo, nacionalidade, sid, foto } = req.body;

    if (!this.isValidUUID(id)) {
      return this.sendError(res, 'ID da pessoa inválido', 400);
    }

    const validation = this.pessoaModel.validatePessoaData({
      nome, tipo, nacionalidade, sid, foto
    });

    if (!validation.isValid) {
      return this.sendValidationError(res, validation.errors);
    }

    try {
      const existingPessoa = await this.pessoaModel.findById(id);
      if (!existingPessoa) {
        return this.sendNotFound(res, 'Pessoa');
      }

      const pessoaData = {
        nome: nome.trim(),
        tipo,
        nacionalidade: nacionalidade.trim(),
        foto: foto?.trim()
      };

      // Gerenciar SID baseado no tipo
      if (tipo === 'tripulante' && sid) {
        pessoaData.sid = sid.trim();
      } else {
        pessoaData.sid = null;
      }

      const pessoa = await this.pessoaModel.update(id, pessoaData);

      this.sendSuccess(res, pessoa, 'Pessoa atualizada com sucesso');
    } catch (error) {
      this.sendError(res, 'Erro ao atualizar pessoa', 500, [error.message]);
    }
  });

  destroy = this.asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!this.isValidUUID(id)) {
      return this.sendError(res, 'ID da pessoa inválido', 400);
    }

    try {
      const existingPessoa = await this.pessoaModel.findById(id);
      if (!existingPessoa) {
        return this.sendNotFound(res, 'Pessoa');
      }

      const canDelete = await this.pessoaModel.canDelete(id);
      if (!canDelete) {
        return this.sendError(res, 'Não é possível deletar pessoa com viagens associadas', 409);
      }

      const deleted = await this.pessoaModel.delete(id);
      
      if (deleted) {
        this.sendSuccess(res, null, 'Pessoa removida com sucesso');
      } else {
        this.sendError(res, 'Erro ao remover pessoa', 500);
      }
    } catch (error) {
      this.sendError(res, 'Erro ao remover pessoa', 500, [error.message]);
    }
  });

  statistics = this.asyncHandler(async (req, res) => {
    try {
      const stats = await this.pessoaModel.getStatistics();
      this.sendSuccess(res, stats, 'Estatísticas obtidas com sucesso');
    } catch (error) {
      this.sendError(res, 'Erro ao obter estatísticas', 500, [error.message]);
    }
  });
}

module.exports = PessoaController;
