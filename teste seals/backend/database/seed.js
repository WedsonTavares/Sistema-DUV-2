/**
 * Script de seed para popular o banco de dados com dados mockados
 * Usado para desenvolvimento e testes
 */
const fs = require('fs');
const path = require('path');
const database = require('../src/config/database');
const DuvModel = require('../src/models/DuvModel');
const NavioModel = require('../src/models/NavioModel');
const PessoaModel = require('../src/models/PessoaModel');

/**
 * Carrega dados do mock.json
 */
function loadMockData() {
  const mockPath = path.join(__dirname, '../mock.json');
  const mockData = JSON.parse(fs.readFileSync(mockPath, 'utf8'));
  
  // Extrai navios únicos das DUVs
  const naviosMap = new Map();
  mockData.duvs.forEach(duv => {
    if (!naviosMap.has(duv.navio.id)) {
      naviosMap.set(duv.navio.id, duv.navio);
    }
  });
  
  return {
    navios: Array.from(naviosMap.values()),
    pessoas: mockData.pessoas,
    duvs: mockData.duvs
  };
}

/**
 * Popula a tabela de navios
 */
async function seedNavios(db) {
  console.log('🚢 Populando navios...');
  const navioModel = new NavioModel(db);
  const { navios } = loadMockData();
  
  for (const navio of navios) {
    try {
      await navioModel.create(navio);
      console.log(`✅ Navio criado: ${navio.nome}`);
    } catch (error) {
      if (!error.message.includes('UNIQUE constraint failed')) {
        console.error(`❌ Erro ao criar navio ${navio.nome}:`, error.message);
      }
    }
  }
  
  console.log(`🚢 ${navios.length} navios processados`);
}

/**
 * Popula a tabela de pessoas
 */
async function seedPessoas(db) {
  console.log('👥 Populando pessoas...');
  const pessoaModel = new PessoaModel(db);
  const { pessoas } = loadMockData();
  
  for (const pessoa of pessoas) {
    try {
      await pessoaModel.create(pessoa);
      console.log(`✅ Pessoa criada: ${pessoa.nome} (${pessoa.tipo})`);
    } catch (error) {
      if (!error.message.includes('UNIQUE constraint failed')) {
        console.error(`❌ Erro ao criar pessoa ${pessoa.nome}:`, error.message);
      }
    }
  }
  
  console.log(`👥 ${pessoas.length} pessoas processadas`);
}

/**
 * Popula a tabela de DUVs
 */
async function seedDuvs(db) {
  console.log('📋 Populando DUVs...');
  const duvModel = new DuvModel(db);
  const { duvs } = loadMockData();
  
  for (const duv of duvs) {
    try {
      // Cria a DUV
      const duvData = {
        id: duv.id,
        numero: duv.numero,
        data_viagem: duv.data_viagem,
        navio_id: duv.navio.id
      };
      
      await duvModel.create(duvData);
      console.log(`✅ DUV criada: ${duv.numero}`);
      
      // Adiciona pessoas à DUV
      if (duv.lista_pessoas && duv.lista_pessoas.length > 0) {
        await duvModel.addPeopleToDuv(duv.id, duv.lista_pessoas);
        console.log(`✅ ${duv.lista_pessoas.length} pessoas adicionadas à DUV ${duv.numero}`);
      }
    } catch (error) {
      if (!error.message.includes('UNIQUE constraint failed')) {
        console.error(`❌ Erro ao criar DUV ${duv.numero}:`, error.message);
      }
    }
  }
  
  console.log(`📋 ${duvs.length} DUVs processadas`);
}

/**
 * Função principal de seed
 */
async function runSeed() {
  console.log('🌱 Iniciando seed do banco de dados...');
  
  try {
    const db = await database.connect();
    console.log('✅ Conectado ao banco de dados');
    
    // Ordem de criação respeitando foreign keys
    await seedNavios(db);
    await seedPessoas(db);
    await seedDuvs(db);
    
    console.log('🎉 Seed concluído com sucesso!');
    console.log('💡 Para visualizar os dados, acesse: http://localhost:3001/api/duvs');
    
  } catch (error) {
    console.error('❌ Erro durante o seed:', error);
  }
}

// Executa o seed se o script for chamado diretamente
if (require.main === module) {
  runSeed();
}

module.exports = { runSeed };
