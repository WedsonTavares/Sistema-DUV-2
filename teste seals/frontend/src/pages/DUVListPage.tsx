import React, { useState, useEffect } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import styled from 'styled-components';
import DUVList from '../components/DUVList';
import { DUV } from '../types';
import { duvAPI } from '../services/api';
import { Grid, Card, Button, Text, Heading, Spinner } from '../styles';

// Styled Components com melhor responsividade
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['2xl']};
  animation: fadeInUp 0.6s ease-out;
  
  @media (max-width: 768px) {
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

const PageHeader = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl} 0;
  
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.lg} 0;
  }
`;

const StatusIndicators = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  
  @media (max-width: 640px) {
    gap: ${({ theme }) => theme.spacing.sm};
    margin-top: ${({ theme }) => theme.spacing.sm};
  }
`;

const StatusBadge = styled.div<{ variant: 'online' | 'synced' }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  
  @media (max-width: 640px) {
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.typography.fontSize['2xs']};
  }
  
  ${({ variant, theme }) => {
    switch (variant) {
      case 'online':
        return `
          background: ${theme.colors.primary[50]};
          color: ${theme.colors.primary[700]};
        `;
      case 'synced':
        return `
          background: #f0fdf4;
          color: #15803d;
        `;
    }
  }}
`;

const StatusDot = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ color }) => color};
`;

const StatsCard = styled(Card)`
  text-align: center;
  transition: all ${({ theme }) => theme.transitions.normal};
  padding: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const StatNumber = styled.div<{ color: string }>`
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ color }) => color};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  
  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  }
  
  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }
`;

const StatsGrid = styled(Grid)`
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
  }
  
  @media (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing['3xl']} 0;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing['3xl']} 0;
  gap: ${({ theme }) => theme.spacing.md};
`;

const PageTitle = styled(Heading)`
  color: #1f2937;
  margin-bottom: 8px;
`;

const PageDescription = styled(Text)`
  margin-top: 8px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const DUVListPage: React.FC = () => {
  const [duvs, setDuvs] = useState<DUV[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDuvs();
  }, []);

  const loadDuvs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await duvAPI.getAll();
      setDuvs(data);
    } catch (err) {
      setError('Erro ao carregar DUVs. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <LoadingContainer>
        <Spinner size="lg" />
        <Text color="#6b7280">Carregando DUVs...</Text>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <AlertCircle size={48} color="#ef4444" />
        <Text size="lg" weight="medium" color="#dc2626">
          {error}
        </Text>
        <Button onClick={loadDuvs} variant="outline">
          <RefreshCw size={16} />
          Tentar novamente
        </Button>
      </ErrorContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle level={1} align="center">
          Documentos Únicos Virtuais
        </PageTitle>
        <PageDescription 
          size="lg" 
          color="#6b7280" 
          align="center"
        >
          Gerencie todos os DUVs de viagens marítimas de forma eficiente e organizada
        </PageDescription>
        
        <StatusIndicators>
          <StatusBadge variant="online">
            <StatusDot color="#10b981" />
            Sistema Online
          </StatusBadge>
          <StatusBadge variant="synced">
            <StatusDot color="#10b981" />
            Dados Sincronizados
          </StatusBadge>
        </StatusIndicators>
      </PageHeader>
      
      {/* Estatísticas */}
      <StatsGrid columns={3} gap="lg">
        <StatsCard variant="elevated">
          <StatNumber color="#2563eb">{duvs.length}</StatNumber>
          <Heading level={5}>Total de DUVs</Heading>
          <Text size="sm" color="#6b7280">Documentos cadastrados</Text>
        </StatsCard>
        
        <StatsCard variant="elevated">
          <StatNumber color="#16a34a">
            {duvs.filter(duv => duv.status === 'ativo').length}
          </StatNumber>
          <Heading level={5}>DUVs Ativas</Heading>
          <Text size="sm" color="#6b7280">Em andamento</Text>
        </StatsCard>
        
        <StatsCard variant="elevated">
          <StatNumber color="#9333ea">
            {duvs.reduce((sum, duv) => sum + (duv.total_pessoas || 0), 0)}
          </StatNumber>
          <Heading level={5}>Total de Pessoas</Heading>
          <Text size="sm" color="#6b7280">Em todas as viagens</Text>
        </StatsCard>
      </StatsGrid>
      
      <DUVList duvs={duvs} />
    </PageContainer>
  );
};

export default DUVListPage;
