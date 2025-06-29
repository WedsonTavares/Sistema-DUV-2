import mongoose from "mongoose";

const PessoaSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  nome: String,
  tipo: String,
  nacionalidade: String,
  sid: String,
  foto: String,
});

export default mongoose.models.Pessoa || mongoose.model("Pessoa", PessoaSchema);
