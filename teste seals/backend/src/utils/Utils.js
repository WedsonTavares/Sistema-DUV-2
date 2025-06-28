/**
 * Utilitários gerais da aplicação
 */
class Utils {
  
  /**
   * Gera um UUID v4
   * @returns {string} - UUID gerado
   */
  static generateUUID() {
    const { v4: uuidv4 } = require('uuid');
    return uuidv4();
  }
  
  /**
   * Valida se um UUID é válido
   * @param {string} uuid - UUID para validar
   * @returns {boolean} - Se é válido
   */
  static isValidUUID(uuid) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }
  
  /**
   * Formata data para padrão brasileiro
   * @param {Date|string} date - Data para formatar
   * @returns {string} - Data formatada
   */
  static formatDateToBR(date) {
    if (!date) return null;
    return new Date(date).toLocaleDateString('pt-BR');
  }
  
  /**
   * Formata data e hora para padrão brasileiro
   * @param {Date|string} datetime - Data/hora para formatar
   * @returns {string} - Data/hora formatada
   */
  static formatDateTimeToBR(datetime) {
    if (!datetime) return null;
    return new Date(datetime).toLocaleString('pt-BR');
  }
  
  /**
   * Remove propriedades undefined de um objeto
   * @param {Object} obj - Objeto para limpar
   * @returns {Object} - Objeto limpo
   */
  static removeUndefined(obj) {
    const cleaned = {};
    Object.keys(obj).forEach(key => {
      if (obj[key] !== undefined) {
        cleaned[key] = obj[key];
      }
    });
    return cleaned;
  }
  
  /**
   * Capitaliza a primeira letra de uma string
   * @param {string} str - String para capitalizar
   * @returns {string} - String capitalizada
   */
  static capitalize(str) {
    if (!str || typeof str !== 'string') return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}

module.exports = Utils;
