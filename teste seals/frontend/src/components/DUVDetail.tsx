import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Ship, 
  Users, 
  ArrowLeft, 
  FileText, 
  Clock,
  Navigation,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { DUV } from '../types';
import { duvAPI } from '../services/api';
import * as S from './DUVDetail.styled';

const DUVDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [duv, setDuv] = useState<DUV | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadDuv(id);
    }
  }, [id]);

  const loadDuv = async (duvId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await duvAPI.getById(duvId);
      setDuv(data);
    } catch (err) {
      setError('Erro ao carregar DUV. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Data não informada';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return 'Data não informada';
    return new Date(dateString).toLocaleString('pt-BR');
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

  if (loading) {
    return (
      <S.Container>
        <S.Content>
          <S.LoadingContainer>
            <Loader2 />
            <p>Carregando detalhes do DUV...</p>
          </S.LoadingContainer>
        </S.Content>
      </S.Container>
    );
  }

  if (error || !duv) {
    return (
      <S.Container>
        <S.Content>
          <S.ErrorContainer>
            <AlertCircle />
            <h3>{error || 'DUV não encontrado'}</h3>
            <Link to="/">
              <ArrowLeft />
              Voltar para lista
            </Link>
          </S.ErrorContainer>
        </S.Content>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Content>
        {/* Header com navegação */}
        <div>
          <S.BackLink as={Link} to="/">
            <ArrowLeft />
            Voltar para lista de DUVs
          </S.BackLink>
          
          <S.Header>
            <S.HeaderInfo>
              <h1>DUV #{duv.numero}</h1>
              <p>Documento Único Virtual - Detalhes da viagem</p>
            </S.HeaderInfo>
            <S.StatusBadge status={duv.status}>
              {getStatusText(duv.status)}
            </S.StatusBadge>
          </S.Header>
        </div>

        {/* Grid de informações */}
        <S.Grid>
          {/* Coluna principal - Informações da viagem */}
          <S.MainColumn>
            {/* Card principal da viagem */}
            <S.Card>
              <S.CardHeader>
                <div className="header-content">
                  <div>
                    <h2>{duv.navio_nome || 'Navio não informado'}</h2>
                    <div className="route-info">
                      <Navigation />
                      <span>{duv.porto_origem ?? 'Porto não informado'} → {duv.porto_destino ?? 'Porto não informado'}</span>
                    </div>
                  </div>
                  <FileText />
                </div>
              </S.CardHeader>

              <S.CardBody>
                <S.InfoGrid>
                  {/* Data da viagem */}
                  <S.InfoCard variant="blue">
                    <Calendar />
                    <div className="info-content">
                      <p>Data da Viagem</p>
                      <p>{formatDate(duv.data_viagem)}</p>
                    </div>
                  </S.InfoCard>

                  {/* Porto de origem */}
                  <S.InfoCard variant="green">
                    <MapPin />
                    <div className="info-content">
                      <p>Porto de Origem</p>
                      <p>{duv.porto_origem ?? 'Não informado'}</p>
                    </div>
                  </S.InfoCard>

                  {/* Porto de destino */}
                  <S.InfoCard variant="red">
                    <MapPin />
                    <div className="info-content">
                      <p>Porto de Destino</p>
                      <p>{duv.porto_destino ?? 'Não informado'}</p>
                    </div>
                  </S.InfoCard>

                  {/* Total de pessoas */}
                  <S.InfoCard variant="purple">
                    <Users />
                    <div className="info-content">
                      <p>Total de Pessoas</p>
                      <p>{duv.total_pessoas || 0} {(duv.total_pessoas || 0) === 1 ? 'pessoa' : 'pessoas'}</p>
                    </div>
                  </S.InfoCard>
                </S.InfoGrid>

                {/* Rota visual */}
                <S.RouteSection>
                  <h3>Rota da Viagem</h3>
                  <S.RouteVisualization>
                    <div className="route-point">
                      <div className="point origin"></div>
                      <p className="name">{duv.porto_origem ?? 'Porto não informado'}</p>
                      <p className="label">Origem</p>
                    </div>
                    <div className="route-line">
                      <div className="ship-icon">
                        <Ship />
                      </div>
                    </div>
                    <div className="route-point">
                      <div className="point destination"></div>
                      <p className="name">{duv.porto_destino ?? 'Porto não informado'}</p>
                      <p className="label">Destino</p>
                    </div>
                  </S.RouteVisualization>
                </S.RouteSection>
              </S.CardBody>
            </S.Card>
          </S.MainColumn>

          {/* Coluna lateral - Informações adicionais */}
          <S.SideColumn>
            {/* Card de informações do sistema */}
            <S.SideCard>
              <h3>
                <Clock />
                Informações do Sistema
              </h3>
              <div>
                <S.InfoItem>
                  <p className="label">ID do Documento</p>
                  <p className="value mono">{duv.id}</p>
                </S.InfoItem>
                <S.InfoItem>
                  <p className="label">Data de Criação</p>
                  <p className="value">{formatDateTime(duv.created_at)}</p>
                </S.InfoItem>
                <S.InfoItem>
                  <p className="label">Última Atualização</p>
                  <p className="value">{formatDateTime(duv.updated_at)}</p>
                </S.InfoItem>
              </div>
            </S.SideCard>

            {/* Card de ações */}
            <S.SideCard>
              <h3>Ações</h3>
              <S.ActionButtons>
                <Link to="/navios">
                  <Ship />
                  Ver todos os navios
                </Link>
                <Link to="/pessoas">
                  <Users />
                  Ver todas as pessoas
                </Link>
              </S.ActionButtons>
            </S.SideCard>
          </S.SideColumn>
        </S.Grid>
      </S.Content>
    </S.Container>
  );
};

export default DUVDetail;
