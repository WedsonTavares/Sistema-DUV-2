import React from 'react';
import { Navio } from '../types';
import * as S from './NavioList.styled';

interface NavioListProps {
  navios: Navio[];
  onNavioClick?: (navio: Navio) => void;
}

const NavioList: React.FC<NavioListProps> = ({ navios, onNavioClick }) => {
  const formatTonelagem = (tonelagem: number) => {
    return tonelagem?.toLocaleString() || '0';
  };

  const formatData = (dateString: string) => {
    if (!dateString) return 'Nenhuma viagem';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <S.Grid>
      {navios.map((navio) => (
        <S.NavioCard
          key={navio.id}
          onClick={() => onNavioClick?.(navio)}
        >
          {/* Imagem do navio */}
          {navio.imagem && (
            <S.NavioImage>
              <img src={navio.imagem} alt={navio.nome} />
            </S.NavioImage>
          )}

          {/* Header do Card */}
          <S.CardHeader>
            <h3>{navio.nome}</h3>
            <div className="flag-info">
              <span className="flag-icon"></span>
              <span>{navio.bandeira}</span>
            </div>
          </S.CardHeader>

          {/* Corpo do Card */}
          <S.CardBody>
            {/* Informações básicas disponíveis no mock.json */}
            <div className="info-grid">
              <div className="info-item">
                <p className="label">Bandeira</p>
                <p className="value">{navio.bandeira}</p>
              </div>
              <div className="info-item">
                <p className="label">ID</p>
                <p className="value">{navio.id}</p>
              </div>
            </div>

            {/* Campos opcionais do schema */}
            {(navio.tipo || navio.ano_construcao) && (
              <div className="info-grid">
                {navio.tipo && (
                  <div className="info-item">
                    <p className="label">Tipo</p>
                    <p className="value">{navio.tipo}</p>
                  </div>
                )}
                {navio.ano_construcao && (
                  <div className="info-item">
                    <p className="label">Ano</p>
                    <p className="value">{navio.ano_construcao}</p>
                  </div>
                )}
              </div>
            )}

            {(navio.comprimento || navio.largura) && (
              <div className="info-grid">
                {navio.comprimento && (
                  <div className="info-item">
                    <p className="label">Comprimento</p>
                    <p className="value">{navio.comprimento}m</p>
                  </div>
                )}
                {navio.largura && (
                  <div className="info-item">
                    <p className="label">Largura</p>
                    <p className="value">{navio.largura}m</p>
                  </div>
                )}
              </div>
            )}

            {navio.tonelagem && (
              <div className="single-info">
                <p className="label">Tonelagem</p>
                <p className="value">{formatTonelagem(navio.tonelagem)} t</p>
              </div>
            )}

            {navio.capacidade_passageiros && (
              <div className="single-info">
                <p className="label">Capacidade</p>
                <p className="value">{navio.capacidade_passageiros} passageiros</p>
              </div>
            )}

            {/* Estatísticas */}
            <S.StatsSection>
              <div className="stats-grid">
                <div className="stat-item">
                  <p className="number">{navio.total_viagens || 0}</p>
                  <p className="label">Viagens</p>
                </div>
                <div className="stat-item">
                  <p className="number">{formatData(navio.ultima_viagem!)}</p>
                  <p className="label">Última Viagem</p>
                </div>
              </div>
            </S.StatsSection>
          </S.CardBody>

          {/* Footer com ação */}
          <S.CardFooter>
            <div className="footer-content">
              <span className="id-text">
                ID: {navio.id.substring(0, 8)}...
              </span>
              <div className="action-link">
                <span>Ver detalhes</span>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </S.CardFooter>
        </S.NavioCard>
      ))}
    </S.Grid>
  );
};

export default NavioList;
