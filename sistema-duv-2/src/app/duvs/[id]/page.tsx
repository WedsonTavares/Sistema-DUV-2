import { notFound } from "next/navigation";
import Image from "next/image";

async function getDuv(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/duvs?id=${id}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function DuvDetailPage({ params }: { params: { id: string } }) {
  const duv = await getDuv(params.id);
  if (!duv) return notFound();

  const navio = duv.navio;
  const passageiros = duv.passageiros || [];
  const passageirosList = passageiros.filter((p: any) => p.tipo === "Passageiro");
  const tripulantesList = passageiros.filter((p: any) => p.tipo === "Tripulante");

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-2 pb-3 pt-2 text-[#0e151b]">Detalhes da Viagem</h1>
      <div className="bg-white rounded-xl p-4 mb-8 flex gap-4 items-center border border-[#e7eef3] shadow">
        <Image src={navio.imagem} alt={navio.nome} width={80} height={80} className="rounded-lg object-cover" />
        <div>
          <h2 className="text-lg font-bold text-[#0e151b]">Navio: {navio.nome}</h2>
          <p className="text-[#4e7997]">Bandeira: {navio.bandeira}</p>
          <p className="text-[#4e7997] text-sm">DUV: {duv.numeroDuv} | Data: {duv.dataViagem}</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-base font-semibold text-[#0e151b] mb-2">Passageiros</h3>
          <ul className="space-y-2">
            {passageirosList.map((p: any) => (
              <li key={p.id} className="flex items-center gap-3 bg-[#e7eef3] rounded-xl p-2">
                <Image src={p.foto} alt={p.nome} width={40} height={40} className="rounded-full object-cover" />
                <span className="text-[#0e151b]">{p.nome} ({p.nacionalidade})</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-base font-semibold text-[#0e151b] mb-2">Tripulantes</h3>
          <ul className="space-y-2">
            {tripulantesList.map((p: any) => (
              <li key={p.id} className="flex items-center gap-3 bg-[#e7eef3] rounded-xl p-2">
                <Image src={p.foto} alt={p.nome} width={40} height={40} className="rounded-full object-cover" />
                <span className="text-[#0e151b]">{p.nome} ({p.nacionalidade})</span>
                <span className="ml-2 text-xs text-[#4e7997]">SID: {p.sid || "-"}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
