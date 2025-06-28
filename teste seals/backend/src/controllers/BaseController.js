/**
 * Controller base com funcionalidades comuns para padronização
 * 
 * Fornece funcionalidades essenciais para todos os controllers:
 * - Padronização de respostas HTTP
 * - Validação de dados de entrada  
 * - Tratamento de erros centralizado
 * - Utilitários para validação de UUID e formatação
 * 
 * @class BaseController
 * @author Seals Solutions
 * @version 1.0.0
 */
class BaseController {
  
  /**
   * Envia resposta de sucesso
   * @param {Object} res - Response object
   * @param {*} data - Dados para retornar
   * @param {string} message - Mensagem de sucesso
   * @param {number} statusCode - Código de status HTTP
   */
  sendSuccess(res, data, message = 'Operação realizada com sucesso', statusCode = 200) {
    res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Envia resposta de erro
   * @param {Object} res - Response object
   * @param {string} message - Mensagem de erro
   * @param {number} statusCode - Código de status HTTP
   * @param {Array} details - Detalhes do erro
   */
  sendError(res, message = 'Erro interno do servidor', statusCode = 500, details = []) {
    console.error(`Erro ${statusCode}: ${message}`, details);
    
    res.status(statusCode).json({
      success: false,
      message,
      details,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Envia resposta de validação inválida
   * @param {Object} res - Response object
   * @param {Array} errors - Lista de erros de validação
   */
  sendValidationError(res, errors) {
    this.sendError(res, 'Dados inválidos', 400, errors);
  }

  /**
   * Envia resposta de recurso não encontrado
   * @param {Object} res - Response object
   * @param {string} resource - Nome do recurso
   */
  sendNotFound(res, resource = 'Recurso') {
    this.sendError(res, `${resource} não encontrado`, 404);
  }

  /**
   * Wrapper para tratamento de erros async
   * @param {Function} fn - Função async para executar
   * @returns {Function} Middleware express
   */
  asyncHandler(fn) {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }

  /**
   * Middleware de tratamento de erros global
   * @param {Error} err - Erro capturado
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @param {Function} next - Next function
   */
  errorHandler(err, req, res, next) {
    console.error('Erro não tratado:', err);

    // Erro de violação de constraint do SQLite
    if (err.code === 'SQLITE_CONSTRAINT') {
      return this.sendError(res, 'Violação de regra de integridade do banco', 400, [err.message]);
    }

    // Erro de SQL genérico
    if (err.code && err.code.startsWith('SQLITE_')) {
      return this.sendError(res, 'Erro no banco de dados', 500, [err.message]);
    }

    // Erro JSON malformado
    if (err instanceof SyntaxError && err.status === 400) {
      return this.sendError(res, 'JSON malformado na requisição', 400);
    }

    // Erro genérico
    this.sendError(res, 'Erro interno do servidor');
  }

  /**
   * Valida se um ID tem formato UUID válido
   * @param {string} id - ID para validar
   * @returns {boolean}
   */
  isValidUUID(id) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  }

  /**
   * Extrai parâmetros de paginação da query string
   * @param {Object} query - Query parameters
   * @returns {Object} Parâmetros de paginação
   */
  getPaginationParams(query) {
    const page = Math.max(1, parseInt(query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 10));
    const offset = (page - 1) * limit;

    return { page, limit, offset };
  }

  /**
   * Formata resposta paginada
   * @param {Array} data - Dados da página atual
   * @param {number} total - Total de registros
   * @param {Object} pagination - Parâmetros de paginação
   * @returns {Object} Resposta formatada
   */
  formatPaginatedResponse(data, total, pagination) {
    const { page, limit } = pagination;
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    };
  }
}

module.exports = BaseController;
