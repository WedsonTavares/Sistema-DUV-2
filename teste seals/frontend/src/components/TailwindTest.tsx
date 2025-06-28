import React from 'react';

const TailwindTest: React.FC = () => {
  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded-xl shadow-lg space-y-4">
      <div className="text-center">
        <div className="text-2xl font-bold text-gray-900">Teste Tailwind CSS</div>
        <div className="text-gray-500">Verificando se o Tailwind está funcionando</div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="shrink-0">
          <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            ✓
          </div>
        </div>
        <div>
          <div className="text-xl font-medium text-black">Tailwind CSS</div>
          <p className="text-slate-500">Configuração funcionando!</p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
          Azul
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors">
          Verde
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors">
          Vermelho
        </button>
      </div>
      
      <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white p-4 rounded-lg text-center">
        <div className="font-bold">Gradiente funcionando!</div>
        <div className="text-sm opacity-90">Se você vê cores e estilos, o Tailwind está ativo</div>
      </div>
    </div>
  );
};

export default TailwindTest;
