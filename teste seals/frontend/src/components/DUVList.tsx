import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Ship, Users, Eye, FileText } from 'lucide-react';
import styled from 'styled-components';
import { DUV } from '../types';
import { Grid, Card, Text, Heading } from '../styles';

// Styled Components com melhor responsividade
const DUVCard = styled(Card)`
  overflow: hidden;
  transition: all ${({ theme }) => theme.transitions.normal};
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  
  @media (max-width: 768px) {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`;

const CardHeader = styled.div<{ hasImage?: boolean }>`
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  padding: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ hasImage }) => hasImage ? '0' : '12px 12px 0 0'};
  
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const CardHeaderTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const DUVNumber = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }
  
  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  
  ${({ status, theme }) => {
    switch (status) {
      case 'ativo':
        return `
          background: #dcfce7;
          color: #166534;
        `;
      case 'concluido':
        return `
          background: #dbeafe;
          color: #1e40af;
        `;
      case 'cancelado':
        return `
          background: #fee2e2;
          color: #991b1b;
        `;
      default:
        return `
          background: #f3f4f6;
          color: #1f2937;
        `;
    }
  }}
`;

const DateInfo = styled.div`
  display: flex;
  align-items: center;
  color: #bfdbfe;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.sm};
  }
`;

const ResponsiveGrid = styled(Grid)`
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
  }
  
  @media (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const CardBody = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const ShipInfo = styled.div`
  margin-bottom: 1rem;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.gray[50]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  
  display: flex;
  align-items: center;
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.primary[600]};
  }
`;

const CardFooterSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.gray[200]};
`;

const PeopleCount = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray[600]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.sm};
  }
`;

const ViewButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.primary[600]};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary[700]};
    transform: scale(1.05);
    color: ${({ theme }) => theme.colors.white};
  }
`;

const CardFooter = styled.div`
  background: ${({ theme }) => theme.colors.gray[50]};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
`;

const IdText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.gray[500]};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['3xl']} 0;
`;

const EmptyIcon = styled.div`
  width: 64px;
  height: 64px;
  margin: 0 auto ${({ theme }) => theme.spacing.md} auto;
  background: ${({ theme }) => theme.colors.gray[100]};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

const ShipImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  display: block;
`;

const BandeiraText = styled(Text)`
  margin-left: 8px;
`;

interface DUVListProps {
  duvs: DUV[];
}

const DUVList: React.FC<DUVListProps> = ({ duvs }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case 'ativo':
        return 'Ativo';
      case 'concluido':
        return 'Concluído';
      case 'cancelado':
        return 'Cancelado';
      default:
        return 'Status não informado';
    }
  };

  if (duvs.length === 0) {
    return (
      <EmptyState>
        <EmptyIcon>
          <FileText size={32} />
        </EmptyIcon>
        <Heading level={4} align="center">
          Nenhum DUV encontrado
        </Heading>
        <Text color="#6b7280" align="center" className="mt-2">
          Não há documentos únicos virtuais cadastrados no sistema.
        </Text>
      </EmptyState>
    );
  }

  return (
    <ResponsiveGrid columns={3} gap="lg">
      {duvs.map((duv) => {
        const hasNavioImage = Boolean(duv.navio?.nome?.toLowerCase().includes('cruzeiro') && duv.navio.imagem);
        
        return (
          <DUVCard key={duv.id}>
            {/* Imagem do navio de cruzeiro no topo do card */}
            {hasNavioImage && (
              <ShipImage
                src={duv.navio?.imagem || ''}
                alt={duv.navio?.nome || 'Navio'}
              />
            )}
            
            <CardHeader hasImage={hasNavioImage}>
              <CardHeaderTop>
                <DUVNumber>{duv.numero}</DUVNumber>
                {duv.status && (
                  <StatusBadge status={duv.status}>
                    {getStatusText(duv.status)}
                  </StatusBadge>
                )}
              </CardHeaderTop>
              <DateInfo>
                <Calendar size={16} />
                {formatDate(duv.data_viagem)}
              </DateInfo>
            </CardHeader>

          <CardBody>
            {/* Informações do navio baseadas nos dados reais do mock.json */}
            {(duv.navio || duv.navio_nome) && (
              <ShipInfo>
                <Ship size={16} />
                <Text size="sm" weight="medium">
                  {duv.navio?.nome || duv.navio_nome}
                </Text>
                {duv.navio?.bandeira && (
                  <BandeiraText size="xs" color="#6b7280">
                    • {duv.navio.bandeira}
                  </BandeiraText>
                )}
              </ShipInfo>
            )}

            <CardFooterSection>
              <PeopleCount>
                <Users size={16} />
                {duv.total_pessoas || duv.lista_pessoas?.length || 0} pessoa{((duv.total_pessoas || duv.lista_pessoas?.length || 0) !== 1) ? 's' : ''}
              </PeopleCount>
              <ViewButton to={`/duv/${duv.id}`}>
                <Eye size={16} />
                Ver detalhes
              </ViewButton>
            </CardFooterSection>
          </CardBody>

          <CardFooter>
            <IdText>
              ID: {duv.id.substring(0, 8)}...
            </IdText>
          </CardFooter>
        </DUVCard>
        );
      })}
    </ResponsiveGrid>
  );
};

export default DUVList;
