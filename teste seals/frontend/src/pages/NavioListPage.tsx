import React, { useState, useEffect } from 'react';
import NavioList from '../components/NavioList';
import { Navio } from '../types';
import * as S from '../styles/PageStyles.styled';

const NavioListPage: React.FC = () => {
  const [navios, setNavios] = useState<Navio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNavio, setSelectedNavio] = useState<Navio | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchNavios();
  }, []);

  const fetchNavios = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:3001/api/navios');
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setNavios(result.data || []);
      } else {
        throw new Error(result.message || 'Erro ao carregar navios');
      }
    } catch (err) {
      console.error('Erro ao buscar navios:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao carregar navios');
    } finally {
      setLoading(false);
    }
  };

  const handleNavioClick = (navio: Navio) => {
    setSelectedNavio(navio);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedNavio(null);
  };

  // Calcular estatísticas
  const totalViagens = navios.reduce((sum, navio) => sum + (navio.total_viagens || 0), 0);
  const capacidadeTotal = navios.reduce((sum, navio) => sum + (navio.capacidade_passageiros || 0), 0);
  const tonelagem = navios.reduce((sum, navio) => sum + (navio.tonelagem || 0), 0);

  if (loading) {
    return (
      <S.Container>
        <S.ContentWrapper>
          <S.LoadingSpinner>
            <div className="spinner" />
            <div>
              <h3>Carregando navios...</h3>
              <p>Aguarde enquanto buscamos os dados.</p>
            </div>
          </S.LoadingSpinner>
        </S.ContentWrapper>
      </S.Container>
    );
  }

  if (error) {
    return (
      <S.Container>
        <S.ContentWrapper>
          <S.ErrorContainer>
            <div className="error-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3>Erro ao carregar navios</h3>
            <p>{error}</p>
            <S.Button variant="primary" onClick={fetchNavios}>
              Tentar novamente
            </S.Button>
          </S.ErrorContainer>
        </S.ContentWrapper>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.ContentWrapper>
        {/* Header */}
        <S.PageHeader>
          <div>
            <S.Title>Navios</S.Title>
            <S.Subtitle>Gerenciamento da frota de navios</S.Subtitle>
          </div>
          <S.Button variant="secondary" onClick={fetchNavios}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Atualizar
          </S.Button>
        </S.PageHeader>

        {/* Estatísticas */}
        <S.StatsGrid columns={4}>
          <S.StatCard>
            <div>
              <S.StatLabel>Total de Navios</S.StatLabel>
              <S.StatValue color="blue">{navios.length}</S.StatValue>
            </div>
            <S.StatIcon color="blue">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </S.StatIcon>
          </S.StatCard>

          <S.StatCard>
            <div>
              <S.StatLabel>Total de Viagens</S.StatLabel>
              <S.StatValue color="green">{totalViagens}</S.StatValue>
            </div>
            <S.StatIcon color="green">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </S.StatIcon>
          </S.StatCard>

          <S.StatCard>
            <div>
              <S.StatLabel>Capacidade Total</S.StatLabel>
              <S.StatValue color="purple">{capacidadeTotal.toLocaleString()}</S.StatValue>
            </div>
            <S.StatIcon color="purple">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </S.StatIcon>
          </S.StatCard>

          <S.StatCard>
            <div>
              <S.StatLabel>Tonelagem Total</S.StatLabel>
              <S.StatValue color="orange">{tonelagem.toLocaleString()}t</S.StatValue>
            </div>
            <S.StatIcon color="orange">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </S.StatIcon>
          </S.StatCard>
        </S.StatsGrid>

        {/* Lista de Navios */}
        <div>
          <NavioList navios={navios} onNavioClick={handleNavioClick} />
        </div>

        {/* Estado vazio */}
        {navios.length === 0 && (
          <S.EmptyStateContainer>
            <S.EmptyStateIcon>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </S.EmptyStateIcon>
            <S.EmptyStateTitle>Nenhum navio encontrado</S.EmptyStateTitle>
            <S.EmptyStateDescription>Não há navios cadastrados no sistema.</S.EmptyStateDescription>
          </S.EmptyStateContainer>
        )}
      </S.ContentWrapper>

      {/* Modal de Detalhes do Navio */}
      {showModal && selectedNavio && (
        <S.ModalOverlay onClick={closeModal}>
          <S.ModalContent onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <h2>Detalhes do Navio</h2>
              <S.CloseButton onClick={closeModal}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </S.CloseButton>
            </S.ModalHeader>
            
            <S.ModalBody>
              {selectedNavio.imagem && (
                <S.ModalImage>
                  <img src={selectedNavio.imagem} alt={selectedNavio.nome} />
                </S.ModalImage>
              )}
              
              <S.DetailGrid>
                <div className="detail-item">
                  <strong>Nome:</strong> {selectedNavio.nome}
                </div>
                <div className="detail-item">
                  <strong>Bandeira:</strong> {selectedNavio.bandeira}
                </div>
                <div className="detail-item">
                  <strong>ID:</strong> {selectedNavio.id}
                </div>
              </S.DetailGrid>
            </S.ModalBody>
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </S.Container>
  );
};

export default NavioListPage;
