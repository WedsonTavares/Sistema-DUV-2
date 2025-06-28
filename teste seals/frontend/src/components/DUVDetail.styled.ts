import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray[50]};
`;

export const Content = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

export const BackLink = styled.a`
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.blue[600]};
  margin-bottom: 1rem;
  transition: color 0.2s ease;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.blue[700]};
  }

  svg {
    margin-right: 0.5rem;
    width: 1rem;
    height: 1rem;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const HeaderInfo = styled.div`
  h1 {
    font-size: 1.875rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.gray[900]};
    margin: 0 0 0.25rem 0;
  }

  p {
    color: ${({ theme }) => theme.colors.gray[600]};
    margin: 0;
  }
`;

export const StatusBadge = styled.div<{ status?: string }>`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: 1px solid;
  font-size: 0.875rem;
  font-weight: 600;

  ${({ status, theme }) => {
    switch (status) {
      case 'ativo':
        return `
          background-color: ${theme.colors.green[100]};
          color: ${theme.colors.green[800]};
          border-color: ${theme.colors.green[200]};
        `;
      case 'concluido':
        return `
          background-color: ${theme.colors.blue[100]};
          color: ${theme.colors.blue[800]};
          border-color: ${theme.colors.blue[200]};
        `;
      case 'cancelado':
        return `
          background-color: ${theme.colors.red[100]};
          color: ${theme.colors.red[800]};
          border-color: ${theme.colors.red[200]};
        `;
      default:
        return `
          background-color: ${theme.colors.gray[100]};
          color: ${theme.colors.gray[800]};
          border-color: ${theme.colors.gray[200]};
        `;
    }
  }}

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: currentColor;
    margin-right: 0.5rem;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
  }
`;

export const MainColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const SideColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Card = styled.div`
  background: white;
  border-radius: 0.75rem;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  overflow: hidden;
`;

export const CardHeader = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.blue[600]}, ${({ theme }) => theme.colors.blue[700]});
  padding: 1.5rem;
  color: white;

  h2 {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0 0 0.5rem 0;
  }

  .route-info {
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.blue[100]};

    svg {
      margin-right: 0.5rem;
      width: 1rem;
      height: 1rem;
    }
  }

  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;

    svg {
      width: 3rem;
      height: 3rem;
      color: ${({ theme }) => theme.colors.blue[200]};
    }
  }
`;

export const CardBody = styled.div`
  padding: 1.5rem;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const InfoCard = styled.div<{ variant: 'blue' | 'green' | 'red' | 'purple' }>`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 0.5rem;

  ${({ variant, theme }) => {
    const colors = {
      blue: { bg: theme.colors.blue[50], icon: theme.colors.blue[600] },
      green: { bg: theme.colors.green[50], icon: theme.colors.green[600] },
      red: { bg: theme.colors.red[50], icon: theme.colors.red[600] },
      purple: { bg: theme.colors.purple[50], icon: theme.colors.purple[600] }
    };
    return `
      background-color: ${colors[variant].bg};
      svg {
        color: ${colors[variant].icon};
      }
    `;
  }}

  svg {
    width: 2rem;
    height: 2rem;
    margin-right: 1rem;
  }

  .info-content {
    p:first-child {
      font-size: 0.875rem;
      color: ${({ theme }) => theme.colors.gray[600]};
      font-weight: 500;
      margin: 0 0 0.25rem 0;
    }

    p:last-child {
      font-size: 1.125rem;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.gray[900]};
      margin: 0;
    }
  }
`;

export const RouteSection = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.gray[50]};
  border-radius: 0.5rem;

  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray[900]};
    margin: 0 0 1rem 0;
  }
`;

export const RouteVisualization = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .route-point {
    text-align: center;

    .point {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      margin: 0 auto 0.5rem;
    }

    .origin {
      background-color: ${({ theme }) => theme.colors.green[500]};
    }

    .destination {
      background-color: ${({ theme }) => theme.colors.red[500]};
    }

    .name {
      font-size: 0.875rem;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.gray[900]};
      margin: 0 0 0.25rem 0;
    }

    .label {
      font-size: 0.75rem;
      color: ${({ theme }) => theme.colors.gray[600]};
      margin: 0;
    }
  }

  .route-line {
    flex: 1;
    margin: 0 1rem;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(to right, transparent 0%, ${({ theme }) => theme.colors.gray[300]} 50%, transparent 100%);
      border-top: 2px dashed ${({ theme }) => theme.colors.gray[300]};
      transform: translateY(-50%);
    }

    .ship-icon {
      position: relative;
      display: flex;
      justify-content: center;
      z-index: 1;

      svg {
        width: 1.5rem;
        height: 1.5rem;
        color: ${({ theme }) => theme.colors.blue[600]};
        background: white;
        padding: 0.25rem;
      }
    }
  }
`;

export const SideCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: 1.5rem;

  h3 {
    display: flex;
    align-items: center;
    font-size: 1.125rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray[900]};
    margin: 0 0 1rem 0;

    svg {
      margin-right: 0.5rem;
      width: 1.25rem;
      height: 1.25rem;
      color: ${({ theme }) => theme.colors.gray[600]};
    }
  }
`;

export const InfoItem = styled.div`
  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  .label {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.gray[600]};
    margin: 0 0 0.25rem 0;
  }

  .value {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray[900]};
    margin: 0;

    &.mono {
      font-family: monospace;
      font-size: 0.875rem;
      background-color: ${({ theme }) => theme.colors.gray[100]};
      padding: 0.5rem;
      border-radius: 0.25rem;
      word-break: break-all;
    }
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    border: 1px solid ${({ theme }) => theme.colors.gray[300]};
    border-radius: 0.5rem;
    color: ${({ theme }) => theme.colors.gray[700]};
    text-decoration: none;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: ${({ theme }) => theme.colors.gray[50]};
    }

    svg {
      margin-right: 0.5rem;
      width: 1rem;
      height: 1rem;
    }
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
  gap: 1rem;

  svg {
    width: 2rem;
    height: 2rem;
    color: ${({ theme }) => theme.colors.blue[600]};
    animation: spin 1s linear infinite;
  }

  p {
    color: ${({ theme }) => theme.colors.gray[600]};
    margin: 0;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
  gap: 1rem;

  svg {
    width: 3rem;
    height: 3rem;
    color: ${({ theme }) => theme.colors.red[500]};
  }

  h3 {
    font-size: 1.125rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.red[600]};
    margin: 0;
  }

  a {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1rem;
    background-color: ${({ theme }) => theme.colors.blue[600]};
    color: white;
    border-radius: 0.5rem;
    text-decoration: none;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: ${({ theme }) => theme.colors.blue[700]};
    }

    svg {
      margin-right: 0.5rem;
      width: 1rem;
      height: 1rem;
      color: white;
    }
  }
`;
