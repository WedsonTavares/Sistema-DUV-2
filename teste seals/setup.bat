@echo off
REM Script de inicialização do Sistema DUV - Seals Solutions 2025
REM SISTEMA 1: React + styled-components + Node.js + Express

echo 🚢 Iniciando Sistema de Gerenciamento de DUVs...
echo 📋 Processo Seletivo Seals Solutions 2025
echo 🔧 SISTEMA 1: React + styled-components + Express
echo.
echo ℹ️  NOTA: Este é o Sistema 1 de 2 desenvolvidos
echo    Sistema 2 Em desenvolvimento (Next.js): https://github.com/WedsonTavares/Sistema-DUV-2.git
echo.

REM Instalar dependências do backend
echo 📦 Instalando dependências do backend...
cd backend
call npm install
echo ✅ Dependências do backend instaladas!
echo.

REM Configurar banco de dados
echo 🗄️ Configurando banco de dados...
call npm run seed
echo ✅ Banco de dados configurado com dados do mock.json!
echo.

REM Instalar dependências do frontend
echo 📦 Instalando dependências do frontend...
cd ..\frontend
call npm install
echo ✅ Dependências do frontend instaladas!
echo.

echo 🎉 Sistema 1 configurado com sucesso!
echo.
echo 📋 Para executar o sistema:
echo    Backend:  cd backend ^&^& npm start    (porta 3001)
echo    Frontend: cd frontend ^&^& npm start   (porta 3000)
echo.
echo 🌐 URLs do sistema:
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:3001
echo    Health:   http://localhost:3001/health
echo.
echo 📚 Documentação:
echo    Geral:    README.md
echo    Backend:  backend\README-BACKEND.md
echo    Frontend: frontend\README-FRONTEND.md
echo.
echo 🚀 Sistema 2 (Next.js): https://github.com/WedsonTavares/Sistema-DUV-2.git

cd ..
pause
