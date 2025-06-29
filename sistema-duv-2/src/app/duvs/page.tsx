import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Utilitário para obter a base URL absoluta
function getBaseUrl() {
  if (typeof window !== "undefined") return ""; // Client-side
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
}

// Página de listagem de DUVs
export default async function DuvsPage() {
  // Busca os dados da API com URL absoluta
  const res = await fetch(`${getBaseUrl()}/api/duvs`, { cache: "no-store" });
  const duvs = await res.json();

  return (
    <section>
      <h1 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-2 pb-3 pt-2 text-[#0e151b]">
        Featured Cruise Deals
      </h1>
      <div className="flex overflow-x-auto gap-4 pb-4 px-2">
        {duvs.map((duv: any) => (
          <Card key={duv.id} className="min-w-[260px] max-w-xs bg-white border border-[#e7eef3] rounded-xl shadow flex flex-col gap-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-[#0e151b] font-bold">{duv.numero}</CardTitle>
              <span className="text-xs text-[#4e7997]">Data: {duv.data_viagem}</span>
            </CardHeader>
            <CardContent>
              <div className="mb-2 text-sm">
                <span className="font-semibold">Navio:</span> {duv.navio?.nome}{" "}
                <span className="text-xs text-[#4e7997]">({duv.navio?.bandeira})</span>
              </div>
              <div className="mb-2 text-sm">
                <span className="font-semibold">Passageiros/Tripulantes:</span> {duv.lista_pessoas?.length}
              </div>
              <Link href={`/duvs/${duv.id}`}>
                <Button variant="secondary" className="mt-2 bg-[#e7eef3] text-[#4e7997] hover:bg-[#d1e3ef] rounded-lg font-bold">
                  Ver detalhes
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
