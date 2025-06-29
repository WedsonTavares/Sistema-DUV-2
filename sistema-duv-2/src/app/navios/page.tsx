import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
}

// Página de listagem de Navios
export default async function NaviosPage() {
  // Busca os dados da API
  const res = await fetch(`${getBaseUrl()}/api/navios`, { cache: "no-store" });
  const navios = await res.json();

  return (
    <section>
      <h1 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-2 pb-3 pt-2 text-[#0e151b]">
        Navios
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {navios.map((navio: any) => (
          <Card key={navio.id} className="bg-white border border-[#e7eef3] rounded-xl shadow flex flex-col gap-2">
            <CardHeader>
              <CardTitle className="text-base text-[#0e151b] font-bold">{navio.nome}</CardTitle>
              <span className="text-xs text-[#4e7997]">{navio.bandeira}</span>
            </CardHeader>
            <CardContent>
              {navio.imagem && (
                <img src={navio.imagem} alt={navio.nome} className="rounded-lg w-32 h-20 object-cover mb-2" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
