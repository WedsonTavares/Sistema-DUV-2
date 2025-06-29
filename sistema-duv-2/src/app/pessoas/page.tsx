import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
}

// Página de listagem de Pessoas
export default async function PessoasPage() {
  // Busca os dados da API
  const res = await fetch(`${getBaseUrl()}/api/pessoas`, { cache: "no-store" });
  const pessoas = await res.json();

  return (
    <section>
      <h1 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-2 pb-3 pt-2 text-[#0e151b]">
        Passageiros e Tripulantes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pessoas.map((pessoa: any) => (
          <Card key={pessoa.id} className="bg-white border border-[#e7eef3] rounded-xl shadow flex flex-col gap-2">
            <CardHeader>
              <CardTitle className="text-base text-[#0e151b] font-bold">{pessoa.nome}</CardTitle>
              <span className="text-xs text-[#4e7997]">{pessoa.tipo}</span>
            </CardHeader>
            <CardContent>
              <div className="mb-2 text-sm">
                <span className="font-semibold">Nacionalidade:</span> {pessoa.nacionalidade}
              </div>
              {pessoa.sid && (
                <div className="mb-2 text-sm">
                  <span className="font-semibold">SID:</span> {pessoa.sid}
                </div>
              )}
              {pessoa.foto && (
                <img src={pessoa.foto} alt={pessoa.nome} className="rounded-lg w-20 h-20 object-cover mt-2" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
