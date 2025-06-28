import React from 'react';

const TestTailwind: React.FC = () => {
  return (
    <div className="test-tailwind">
      <h1 className="text-2xl font-bold text-red-500">Teste Tailwind</h1>
      <p className="mt-4 text-lg">Se este texto estiver estilizado, o Tailwind está funcionando.</p>
      <div className="mt-4 p-4 bg-green-500 text-white rounded-lg">
        Teste de classes do Tailwind
      </div>
    </div>
  );
};

export default TestTailwind;
