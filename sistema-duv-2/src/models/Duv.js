import mongoose from "mongoose";

const DuvSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  numero: String,
  data_viagem: String,
  navio: {
    id: String,
    nome: String,
    bandeira: String,
    imagem: String,
  },
  lista_pessoas: [String],
});

export default mongoose.models.Duv || mongoose.model("Duv", DuvSchema);
