# sistema-duv-2

Sistema fullstack para o desafio técnico Seals Solutions 2025

## Stack Utilizada
- Next.js 14 (App Router)
- TypeScript
- TailwindCSS (custom design)
- Shadcn/ui (componentes modernos)
- MongoDB Atlas + Mongoose (ODM)

## Como rodar o projeto

1. **Clone o repositório e acesse a pasta:**
   ```bash
   git clone <repo-url>
   cd sistema-duv-2
   ```

2. **Configure o arquivo `.env`**
   - Exemplo:
     ```env
     MONGODB_URI=mongodb+srv://<usuario>:<senha>@<cluster>/<database>?retryWrites=true&w=majority
     ```
   - Já está configurado para o cluster de testes.

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Importe os dados do mock.json para o MongoDB**
   - Use um script de importação ou `mongoimport`.
   - Exemplo de script disponível em `scripts/import-mock.js` (crie se necessário).

5. **Rode o projeto:**
   ```bash
   npm run dev
   ```

6. **Acesse:**
   - [http://localhost:3000](http://localhost:3000)
   - Endpoints de API: `/api/duvs`, `/api/pessoas`, etc.

## Diferenciais
- Design customizado com TailwindCSS e Shadcn/ui (não padrão Next.js)
- Dados servidos via MongoDB/Mongoose, importados do mock.json
- Estrutura moderna, código limpo e seguro (.env)
- Documentação clara e scripts de setup

## Endpoints principais
- `GET /api/duvs` — Lista todas as DUVs
- `GET /api/pessoas` — Lista todas as pessoas
- (Adicione outros conforme necessário)

## Como importar o mock.json para o MongoDB
- Use o comando:
  ```bash
  mongoimport --uri "$MONGODB_URI" --collection duvs --file mock.json --jsonArray
  ```
- Ou utilize o script de importação Node.js fornecido.

---

Para dúvidas ou sugestões, consulte o arquivo PROGRESSO.md ou abra uma issue.
