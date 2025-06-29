import mongoose from "mongoose";

const NavioSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  nome: String,
  bandeira: String,
  imagem: String,
});

export default mongoose.models.Navio || mongoose.model("Navio", NavioSchema);
