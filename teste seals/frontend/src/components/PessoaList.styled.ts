import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Section = styled.div`
  .section-header {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;

    .header-content {
      display: flex;
      align-items: center;

      .color-indicator {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        margin-right: 0.75rem;

        &.tripulante {
          background-color: ${({ theme }) => theme.colors.green[600]};
        }

        &.passageiro {
          background-color: ${({ theme }) => theme.colors.purple[600]};
        }
      }

      h2 {
        font-size: 1.5rem;
        font-weight: bold;
        color: ${({ theme }) => theme.colors.gray[900]};
        margin: 0;
      }

      .count-badge {
        margin-left: 0.75rem;
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        font-size: 0.875rem;
        font-weight: 600;

        &.tripulante {
          background-color: ${({ theme }) => theme.colors.green[100]};
          color: ${({ theme }) => theme.colors.green[800]};
        }

        &.passageiro {
          background-color: ${({ theme }) => theme.colors.purple[100]};
          color: ${({ theme }) => theme.colors.purple[800]};
        }
      }
    }
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const PessoaCard = styled.div<{ tipo: 'passageiro' | 'tripulante' }>`
  background: white;
  border-radius: 0.75rem;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.xl};
    transform: scale(1.02);
  }
`;

export const CardHeader = styled.div<{ tipo: 'passageiro' | 'tripulante' }>`
  padding: 1rem;
  ${({ tipo, theme }) => 
    tipo === 'tripulante' 
      ? `background: linear-gradient(135deg, ${theme.colors.green[600]}, ${theme.colors.green[700]});`
      : `background: linear-gradient(135deg, ${theme.colors.purple[600]}, ${theme.colors.purple[700]});`
  }

  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    .foto-container {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      overflow: hidden;
      border: 2px solid rgba(255, 255, 255, 0.3);
      margin-right: 12px;
      flex-shrink: 0;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    
    .text-content {
      flex: 1;
      min-width: 0;
      
      h3 {
        font-size: 1.125rem;
        font-weight: bold;
        color: white;
        margin: 0 0 4px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      
      .tipo-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        font-size: 0.75rem;
        font-weight: 600;
        display: inline-block;

        ${({ tipo, theme }) => 
          tipo === 'tripulante' 
            ? `
              background-color: ${theme.colors.green[100]};
              color: ${theme.colors.green[800]};
            `
            : `
              background-color: ${theme.colors.purple[100]};
              color: ${theme.colors.purple[800]};
            `
        }
      }
    }

    /* Fallback para layout sem foto */
    &:not(:has(.foto-container)) {
      h3 {
        font-size: 1.125rem;
        font-weight: bold;
        color: white;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .tipo-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        font-size: 0.75rem;
        font-weight: 600;

        ${({ tipo, theme }) => 
          tipo === 'tripulante' 
            ? `
              background-color: ${theme.colors.green[100]};
              color: ${theme.colors.green[800]};
            `
            : `
              background-color: ${theme.colors.purple[100]};
              color: ${theme.colors.purple[800]};
            `
        }
      }
    }
  }

  .nacionalidade {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.8);
    margin: 0.25rem 0 0 0;
  }
`;

export const CardBody = styled.div`
  padding: 1rem;

  .info-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: 1rem;

    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }

  .info-item {
    .label {
      font-size: 0.875rem;
      color: ${({ theme }) => theme.colors.gray[600]};
      margin: 0 0 0.25rem 0;
    }

    .value {
      font-weight: 600;
      color: ${({ theme }) => theme.colors.gray[900]};
      margin: 0;
    }
  }

  .sid-info {
    margin-bottom: 1rem;

    .label {
      font-size: 0.875rem;
      color: ${({ theme }) => theme.colors.gray[600]};
      margin: 0 0 0.25rem 0;
    }

    .value {
      font-weight: 600;
      color: ${({ theme }) => theme.colors.green[700]};
      background-color: ${({ theme }) => theme.colors.green[50]};
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      margin: 0;
    }
  }
`;

export const StatsSection = styled.div<{ tipo: 'passageiro' | 'tripulante' }>`
  border-top: 1px solid ${({ theme }) => theme.colors.gray[200]};
  padding-top: 1rem;
  margin-top: 1rem;

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    text-align: center;

    .stat-item {
      .number {
        font-size: 1.5rem;
        font-weight: bold;
        margin: 0 0 0.25rem 0;
        ${({ tipo, theme }) => 
          tipo === 'tripulante' 
            ? `color: ${theme.colors.green[600]};`
            : `color: ${theme.colors.purple[600]};`
        }
      }

      .label {
        font-size: 0.75rem;
        color: ${({ theme }) => theme.colors.gray[600]};
        margin: 0;
      }

      .text-value {
        font-size: 0.875rem;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.gray[900]};
        margin: 0;
      }
    }
  }
`;

export const CardFooter = styled.div<{ tipo: 'passageiro' | 'tripulante' }>`
  background-color: ${({ theme }) => theme.colors.gray[50]};
  padding: 0.75rem 1rem;

  .footer-content {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .id-text {
      font-size: 0.875rem;
      color: ${({ theme }) => theme.colors.gray[600]};
      margin: 0;
    }

    .action-link {
      display: flex;
      align-items: center;
      font-size: 0.875rem;
      font-weight: 500;
      ${({ tipo, theme }) => 
        tipo === 'tripulante' 
          ? `color: ${theme.colors.green[600]};`
          : `color: ${theme.colors.purple[600]};`
      }

      svg {
        margin-left: 0.25rem;
        width: 1rem;
        height: 1rem;
      }
    }
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 0;

  .icon-container {
    width: 4rem;
    height: 4rem;
    margin: 0 auto 1rem;
    background-color: ${({ theme }) => theme.colors.gray[100]};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 2rem;
      height: 2rem;
      color: ${({ theme }) => theme.colors.gray[400]};
    }
  }

  h3 {
    font-size: 1.125rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray[900]};
    margin: 0 0 0.5rem 0;
  }

  p {
    color: ${({ theme }) => theme.colors.gray[600]};
    margin: 0;
  }
`;
