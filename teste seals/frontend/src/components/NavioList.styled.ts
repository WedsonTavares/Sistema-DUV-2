import styled from 'styled-components';

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

export const NavioCard = styled.div`
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

export const CardHeader = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.blue[600]}, ${({ theme }) => theme.colors.blue[700]});
  padding: 1rem;

  h3 {
    font-size: 1.25rem;
    font-weight: bold;
    color: white;
    margin: 0 0 0.5rem 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .flag-info {
    display: flex;
    align-items: center;
    margin-top: 0.5rem;

    .flag-icon {
      width: 1.5rem;
      height: 1rem;
      margin-right: 0.5rem;
      border: 1px solid white;
      opacity: 0.8;
      background: ${({ theme }) => theme.colors.gray[300]};
    }

    span {
      color: ${({ theme }) => theme.colors.blue[100]};
      font-size: 0.875rem;
    }
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

  .single-info {
    margin-bottom: 1rem;

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
`;

export const StatsSection = styled.div`
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
        color: ${({ theme }) => theme.colors.blue[600]};
        margin: 0 0 0.25rem 0;
      }

      .label {
        font-size: 0.75rem;
        color: ${({ theme }) => theme.colors.gray[600]};
        margin: 0;
      }
    }
  }
`;

export const CardFooter = styled.div`
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
      color: ${({ theme }) => theme.colors.blue[600]};
      font-size: 0.875rem;
      font-weight: 500;

      svg {
        margin-left: 0.25rem;
        width: 1rem;
        height: 1rem;
      }
    }
  }
`;

export const NavioImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;
