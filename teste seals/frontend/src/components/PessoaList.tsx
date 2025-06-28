import React from 'react';
import { Pessoa } from '../types';
import * as S from './PessoaList.styled';

interface PessoaListProps {
  pessoas: Pessoa[];
  onPessoaClick?: (pessoa: Pessoa) => void;
}

const PessoaList: React.FC<PessoaListProps> = ({ pessoas, onPessoaClick }) => {
  const formatData = (dateString: string) => {
    if (!dateString) return 'Nenhuma viagem';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  // Separar passageiros e tripulantes
  const passageiros = pessoas.filter(p => p.tipo === 'passageiro');
  const tripulantes = pessoas.filter(p => p.tipo === 'tripulante');

  const renderPessoaCard = (pessoa: Pessoa) => (
    <S.PessoaCard
      key={pessoa.id}
      tipo={pessoa.tipo}
      onClick={() => onPessoaClick?.(pessoa)}
    >
      {/* Header do Card */}
      <S.CardHeader tipo={pessoa.tipo}>
        <div className="header-content">
          {/* Foto da pessoa */}
          {pessoa.foto && (
            <div className="foto-container">
              <img src={pessoa.foto} alt={pessoa.nome} />
            </div>
          )}
          <div className="text-content">
            <h3>{pessoa.nome}</h3>
            <div className="tipo-badge">
              {pessoa.tipo === 'tripulante' ? 'Tripulante' : 'Passageiro'}
            </div>
          </div>
        </div>
        <p className="nacionalidade">{pessoa.nacionalidade}</p>
      </S.CardHeader>

      {/* Corpo do Card */}
      <S.CardBody>
        {/* Informações disponíveis no mock.json */}
        <div className="info-grid">
          <div className="info-item">
            <p className="label">Tipo</p>
            <p className="value">{pessoa.tipo === 'tripulante' ? 'Tripulante' : 'Passageiro'}</p>
          </div>
          <div className="info-item">
            <p className="label">Nacionalidade</p>
            <p className="value">{pessoa.nacionalidade}</p>
          </div>
        </div>

        {/* SID para tripulantes */}
        {pessoa.tipo === 'tripulante' && pessoa.sid && (
          <div className="sid-info">
            <p className="label">SID (Seafarers' Identity Document)</p>
            <p className="value">{pessoa.sid}</p>
          </div>
        )}

        {/* Estatísticas */}
        <S.StatsSection tipo={pessoa.tipo}>
          <div className="stats-grid">
            <div className="stat-item">
              <p className="number">{pessoa.total_viagens || 0}</p>
              <p className="label">Viagens</p>
            </div>
            <div className="stat-item">
              <p className="text-value">{formatData(pessoa.ultima_viagem!)}</p>
              <p className="label">Última Viagem</p>
            </div>
          </div>
        </S.StatsSection>
      </S.CardBody>

      {/* Footer com ação */}
      <S.CardFooter tipo={pessoa.tipo}>
        <div className="footer-content">
          <span className="id-text">
            ID: {pessoa.id.substring(0, 8)}...
          </span>
          <div className="action-link">
            <span>Ver detalhes</span>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </S.CardFooter>
    </S.PessoaCard>
  );

  return (
    <S.Container>
      {/* Seção Tripulantes */}
      {tripulantes.length > 0 && (
        <S.Section>
          <div className="section-header">
            <div className="header-content">
              <div className="color-indicator tripulante"></div>
              <h2>Tripulantes</h2>
              <span className="count-badge tripulante">{tripulantes.length}</span>
            </div>
          </div>
          <S.Grid>
            {tripulantes.map(renderPessoaCard)}
          </S.Grid>
        </S.Section>
      )}

      {/* Seção Passageiros */}
      {passageiros.length > 0 && (
        <S.Section>
          <div className="section-header">
            <div className="header-content">
              <div className="color-indicator passageiro"></div>
              <h2>Passageiros</h2>
              <span className="count-badge passageiro">{passageiros.length}</span>
            </div>
          </div>
          <S.Grid>
            {passageiros.map(renderPessoaCard)}
          </S.Grid>
        </S.Section>
      )}

      {/* Estado vazio */}
      {pessoas.length === 0 && (
        <S.EmptyState>
          <div className="icon-container">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
          <h3>Nenhuma pessoa encontrada</h3>
          <p>Não há pessoas cadastradas no sistema.</p>
        </S.EmptyState>
      )}
    </S.Container>
  );
};

export default PessoaList;
