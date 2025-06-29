import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-8 pb-20 gap-12 sm:p-20 bg-white text-zinc-800 font-sans">
      {/* Hero Section */}
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-700">
          Sistema DUV 2
        </h1>
        <p className="text-lg md:text-xl text-zinc-600 mb-6">
          Gestão moderna de DUVs, Navios e Pessoas para o desafio técnico Seals
          Solutions 2025.
          <br />
          Stack: Next.js, TailwindCSS, Shadcn/ui, MongoDB Atlas.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <Link href="/duvs">
            <Button className="px-8 py-3 text-lg font-semibold shadow-md bg-blue-600 text-white hover:bg-blue-700">
              Ver DUVs
            </Button>
          </Link>
          <Link href="/pessoas">
            <Button className="px-8 py-3 text-lg font-semibold shadow-md bg-blue-600 text-white hover:bg-blue-700">
              Ver Pessoas
            </Button>
          </Link>
          <Link href="/navios">
            <Button className="px-8 py-3 text-lg font-semibold shadow-md bg-blue-600 text-white hover:bg-blue-700">
              Ver Navios
            </Button>
          </Link>
        </div>
      </div>
      {/* Destaques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-8">
        <div className="bg-zinc-100 rounded-xl p-6 border border-zinc-200 shadow">
          <h2 className="text-xl font-bold text-blue-600 mb-2">
            Stack Moderna
          </h2>
          <p className="text-zinc-600">
            Next.js 14, TailwindCSS, Shadcn/ui, MongoDB Atlas, TypeScript.
          </p>
        </div>
        <div className="bg-zinc-100 rounded-xl p-6 border border-zinc-200 shadow">
          <h2 className="text-xl font-bold text-blue-600 mb-2">
            Design Neutro
          </h2>
          <p className="text-zinc-600">
            Layout claro, responsivo, com navegação simples e componentes modernos.
          </p>
        </div>
        <div className="bg-zinc-100 rounded-xl p-6 border border-zinc-200 shadow">
          <h2 className="text-xl font-bold text-blue-600 mb-2">
            Mock & API Real
          </h2>
          <p className="text-zinc-600">
            Dados do mock.json importados para o MongoDB e servidos via API REST.
          </p>
        </div>
      </div>
      <footer className="flex gap-6 flex-wrap items-center justify-center border-t border-zinc-200 pt-6 w-full max-w-4xl mx-auto mt-8 text-sm text-zinc-500 bg-white">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
