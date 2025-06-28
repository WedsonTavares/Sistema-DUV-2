import React, { useState, useEffect } from 'react';
import PessoaList from '../components/PessoaList';
import { Pessoa } from '../types';
import * as S from '../styles/PageStyles.styled';

const PessoaListPage: React.FC = () => {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtroTipo, setFiltroTipo] = useState<'todos' | 'passageiro' | 'tripulante'>('todos');
  const [selectedPessoa, setSelectedPessoa] = useState<Pessoa | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPessoas();
  }, []);

  const fetchPessoas = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:3001/api/pessoas');
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setPessoas(result.data || []);
      } else {
        throw new Error(result.message || 'Erro ao carregar pessoas');
      }
    } catch (err) {
      console.error('Erro ao buscar pessoas:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao carregar pessoas');
    } finally {
      setLoading(false);
    }
  };

  const handlePessoaClick = (pessoa: Pessoa) => {
    setSelectedPessoa(pessoa);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPessoa(null);
  };

  // Filtrar pessoas por tipo
  const pessoasFiltradas = pessoas.filter(pessoa => {
    if (filtroTipo === 'todos') return true;
    return pessoa.tipo === filtroTipo;
  });

  // Calcular estatísticas
  const passageiros = pessoas.filter(p => p.tipo === 'passageiro');
  const tripulantes = pessoas.filter(p => p.tipo === 'tripulante');
  
  const stats = {
    total: pessoas.length,
    passageiros: passageiros.length,
    tripulantes: tripulantes.length,
    totalViagens: pessoas.reduce((sum, pessoa) => sum + (pessoa.total_viagens || 0), 0),
    tripulantesComSid: tripulantes.filter(t => t.sid).length
  };

  if (loading) {
    return (
      <S.Container>
        <S.ContentWrapper>
          <S.LoadingSpinner>
            <div className="spinner" />
            <div>
              <h3>Carregando pessoas...</h3>
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
            <h3>Erro ao carregar pessoas</h3>
            <p>{error}</p>
            <S.Button variant="primary" onClick={fetchPessoas}>
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
            <S.Title>Pessoas</S.Title>
            <S.Subtitle>Gerenciamento de passageiros e tripulantes</S.Subtitle>
          </div>
          <S.Button variant="secondary" onClick={fetchPessoas}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Atualizar
          </S.Button>
        </S.PageHeader>

        {/* Estatísticas */}
        <S.StatsGrid columns={5}>
          <S.StatCard>
            <div>
              <S.StatLabel>Total de Pessoas</S.StatLabel>
              <S.StatValue color="blue">{stats.total}</S.StatValue>
            </div>
            <S.StatIcon color="blue">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </S.StatIcon>
          </S.StatCard>

          <S.StatCard>
            <div>
              <S.StatLabel>Passageiros</S.StatLabel>
              <S.StatValue color="purple">{stats.passageiros}</S.StatValue>
            </div>
            <S.StatIcon color="purple">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </S.StatIcon>
          </S.StatCard>

          <S.StatCard>
            <div>
              <S.StatLabel>Tripulantes</S.StatLabel>
              <S.StatValue color="green">{stats.tripulantes}</S.StatValue>
            </div>
            <S.StatIcon color="green">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </S.StatIcon>
          </S.StatCard>

          <S.StatCard>
            <div>
              <S.StatLabel>Total Viagens</S.StatLabel>
              <S.StatValue color="orange">{stats.totalViagens}</S.StatValue>
            </div>
            <S.StatIcon color="orange">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </S.StatIcon>
          </S.StatCard>

          <S.StatCard>
            <div>
              <S.StatLabel>Com SID</S.StatLabel>
              <S.StatValue color="indigo">{stats.tripulantesComSid}</S.StatValue>
            </div>
            <S.StatIcon color="indigo">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </S.StatIcon>
          </S.StatCard>
        </S.StatsGrid>

        {/* Filtros */}
        <S.FiltersContainer>
          <S.FilterLabel>Filtrar por tipo:</S.FilterLabel>
          <S.FilterButtonGroup>
            <S.FilterButton
              active={filtroTipo === 'todos'}
              onClick={() => setFiltroTipo('todos')}
            >
              Todos ({stats.total})
            </S.FilterButton>
            <S.FilterButton
              active={filtroTipo === 'passageiro'}
              variant="purple"
              onClick={() => setFiltroTipo('passageiro')}
            >
              Passageiros ({stats.passageiros})
            </S.FilterButton>
            <S.FilterButton
              active={filtroTipo === 'tripulante'}
              variant="green"
              onClick={() => setFiltroTipo('tripulante')}
            >
              Tripulantes ({stats.tripulantes})
            </S.FilterButton>
          </S.FilterButtonGroup>
        </S.FiltersContainer>

        {/* Lista de Pessoas */}
        <div>
          <PessoaList pessoas={pessoasFiltradas} onPessoaClick={handlePessoaClick} />
        </div>

        {/* Estado vazio com filtro */}
        {pessoasFiltradas.length === 0 && pessoas.length > 0 && (
          <S.EmptyStateContainer>
            <S.EmptyStateIcon>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </S.EmptyStateIcon>
            <S.EmptyStateTitle>Nenhuma pessoa encontrada</S.EmptyStateTitle>
            <S.EmptyStateDescription>
              Não há {filtroTipo === 'passageiro' ? 'passageiros' : filtroTipo === 'tripulante' ? 'tripulantes' : 'pessoas'} para exibir.
            </S.EmptyStateDescription>
            <S.Button variant="primary" onClick={() => setFiltroTipo('todos')}>
              Ver todos
            </S.Button>
          </S.EmptyStateContainer>
        )}
      </S.ContentWrapper>

      {/* Modal de Detalhes da Pessoa */}
      {showModal && selectedPessoa && (
        <S.ModalOverlay onClick={closeModal}>
          <S.ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <S.ModalHeader>
              <h2>Detalhes da Pessoa</h2>
              <S.CloseButton onClick={closeModal}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </S.CloseButton>
            </S.ModalHeader>
            
            <S.ModalBody>
              {selectedPessoa.foto && (
                <S.ModalImage>
                  <img src={selectedPessoa.foto} alt={selectedPessoa.nome} />
                </S.ModalImage>
              )}
              
              <S.DetailGrid>
                <div className="detail-item">
                  <strong>Nome:</strong> <span>{selectedPessoa.nome}</span>
                </div>
                <div className="detail-item">
                  <strong>Tipo:</strong> <span>{selectedPessoa.tipo === 'tripulante' ? 'Tripulante' : 'Passageiro'}</span>
                </div>
                <div className="detail-item">
                  <strong>Nacionalidade:</strong> <span>{selectedPessoa.nacionalidade}</span>
                </div>
                {selectedPessoa.sid && (
                  <div className="detail-item">
                    <strong>SID:</strong> <span>{selectedPessoa.sid}</span>
                  </div>
                )}
                <div className="detail-item">
                  <strong>ID:</strong> <span>{selectedPessoa.id}</span>
                </div>
              </S.DetailGrid>
            </S.ModalBody>
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </S.Container>
  );
};

export default PessoaListPage;
