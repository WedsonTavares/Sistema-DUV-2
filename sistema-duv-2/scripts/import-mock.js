import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import Duv from "../src/models/Duv.js";
import Pessoa from "../src/models/Pessoa.js";
import Navio from "../src/models/Navio.js";
import "dotenv/config";

const MONGODB_URI = process.env.MONGODB_URI;

async function importMock() {
  await mongoose.connect(MONGODB_URI);
  const mockPath = path.resolve(process.cwd(), "mock.json");
  const mock = JSON.parse(fs.readFileSync(mockPath, "utf-8"));

  // Pessoas
  await Pessoa.deleteMany({});
  await Pessoa.insertMany(mock.pessoas);

  // Navios (extraídos dos DUVs)
  const naviosMap = {};
  for (const duv of mock.duvs) {
    const navio = duv.navio;
    if (!naviosMap[navio.id]) {
      naviosMap[navio.id] = navio;
    }
  }
  await Navio.deleteMany({});
  await Navio.insertMany(Object.values(naviosMap));

  // DUVs
  await Duv.deleteMany({});
  await Duv.insertMany(mock.duvs);

  console.log("Mock importado com sucesso!");
  process.exit(0);
}

importMock().catch((e) => {
  console.error(e);
  process.exit(1);
});
