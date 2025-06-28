import styled from 'styled-components';

// Define colors inline to avoid theme dependencies
const colors = {
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    600: '#4b5563',
    700: '#374151',
    900: '#111827'
  },
  blue: {
    100: '#dbeafe',
    600: '#2563eb',
    700: '#1d4ed8'
  },
  green: {
    100: '#dcfce7',
    600: '#16a34a',
    700: '#15803d'
  },
  red: {
    100: '#fee2e2',
    600: '#dc2626',
    700: '#b91c1c'
  },
  purple: {
    100: '#f3e8ff',
    600: '#9333ea',
    700: '#7c3aed'
  },
  orange: {
    100: '#fed7aa',
    600: '#ea580c',
    700: '#c2410c'
  },
  indigo: {
    100: '#e0e7ff',
    600: '#4f46e5',
    700: '#4338ca'
  }
};

export const ContentWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

export const PageContainer = styled.div<{ isMobile?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ isMobile }) => isMobile ? '1rem' : '1.5rem'};
  animation: fadeInUp 0.6s ease-out;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const Container = styled.div`
  min-height: 100vh;
  background-color: ${colors.gray[50]};
`;

export const Content = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

export const Header = styled.div`
  margin-bottom: 2rem;

  .header-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;

    .header-info {
      h1 {
        font-size: 1.875rem;
        font-weight: bold;
        color: ${colors.gray[900]};
        margin: 0 0 0.5rem 0;
      }

      p {
        color: ${colors.gray[600]};
        margin: 0;
      }
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  }
`;

export const RefreshButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: white;
  color: ${colors.gray[700]};
  border: 1px solid ${colors.gray[300]};
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: ${colors.gray[50]};
  }

  svg {
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
  }
`;

export const StatsGrid = styled.div<{ columns?: number }>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(${({ columns = 3 }) => Math.min(columns, 3)}, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(${({ columns = 5 }) => columns}, 1fr);
  }
`;

export const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid ${colors.gray[200]};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StatIcon = styled.div<{ color?: 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'indigo' }>`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  ${({ color = 'blue' }) => {
    const colorPalette = colors[color];
    return `
      background-color: ${colorPalette[100]};
      
      svg {
        width: 1.5rem;
        height: 1.5rem;
        color: ${colorPalette[600]};
      }
    `;
  }}
`;

export const StatLabel = styled.p`
  font-size: 0.875rem;
  color: ${colors.gray[600]};
  margin: 0 0 0.25rem 0;
`;

export const StatValue = styled.p<{ color?: 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'indigo' }>`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  
  ${({ color = 'blue' }) => {
    const colorPalette = colors[color];
    return `
      color: ${colorPalette[600]};
    `;
  }}
`;

export const FilterSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;

  .filter-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: ${colors.gray[700]};
    margin: 0;
  }

  .filter-buttons {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
`;

export const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const FilterLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${colors.gray[700]};
`;

export const FilterButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const FilterButton = styled.button<{ active?: boolean; variant?: 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'indigo' }>`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  border: 1px solid ${colors.gray[300]};

  ${({ active, variant = 'blue' }) => {
    if (active) {
      const colorPalette = colors[variant];
      return `
        background-color: ${colorPalette[600]};
        color: white;
        border-color: ${colorPalette[600]};
      `;
    } else {
      return `
        background-color: white;
        color: ${colors.gray[700]};

        &:hover {
          background-color: ${colors.gray[50]};
        }
      `;
    }
  }}
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;

  .loading-content {
    text-align: center;

    .spinner {
      width: 4rem;
      height: 4rem;
      border: 4px solid ${colors.gray[200]};
      border-top: 4px solid ${colors.purple[600]};
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 1rem;
    }

    h3 {
      font-size: 1.125rem;
      font-weight: 500;
      color: ${colors.gray[900]};
      margin-bottom: 0.5rem;
    }

    p {
      color: ${colors.gray[600]};
    }
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

export const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  text-align: center;

  .spinner {
    width: 4rem;
    height: 4rem;
    border: 4px solid ${colors.gray[200]};
    border-top: 4px solid ${colors.purple[600]};
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.125rem;
    font-weight: 500;
    color: ${colors.gray[900]};
    margin-bottom: 0.5rem;
  }

  p {
    color: ${colors.gray[600]};
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  text-align: center;

  .error-icon {
    width: 4rem;
    height: 4rem;
    margin-bottom: 1rem;
    background-color: ${colors.red[100]};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 2rem;
      height: 2rem;
      color: ${colors.red[600]};
    }
  }

  h3 {
    font-size: 1.125rem;
    font-weight: 500;
    color: ${colors.gray[900]};
    margin-bottom: 0.5rem;
  }

  p {
    color: ${colors.gray[600]};
    margin-bottom: 1rem;
  }
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  text-decoration: none;

  ${({ variant = 'primary' }) => {
    if (variant === 'primary') {
      return `
        background-color: ${colors.purple[600]};
        color: white;

        &:hover {
          background-color: ${colors.purple[700]};
        }
      `;
    } else {
      return `
        background-color: white;
        color: ${colors.gray[700]};
        border: 1px solid ${colors.gray[300]};

        &:hover {
          background-color: ${colors.gray[50]};
        }
      `;
    }
  }}

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

export const ListContainer = styled.div`
  animation: fadeInUp 0.6s ease-out;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const EmptyStateContainer = styled.div`
  text-align: center;
  padding: 3rem 1rem;
`;

export const EmptyStateIcon = styled.div`
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1rem;
  background-color: ${colors.gray[100]};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 2rem;
    height: 2rem;
    color: ${colors.gray[400]};
  }
`;

export const EmptyStateTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  color: ${colors.gray[900]};
  margin: 0 0 0.5rem 0;
`;

export const EmptyStateDescription = styled.p`
  color: ${colors.gray[600]};
  margin: 0 0 1rem 0;
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;

  > div {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
  color: ${colors.gray[900]};
  margin: 0 0 0.5rem 0;
`;

export const Subtitle = styled.p`
  color: ${colors.gray[600]};
  margin: 0;
`;

// Modal Styles
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 0.75rem;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid ${colors.gray[200]};

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${colors.gray[900]};
    margin: 0;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  color: ${colors.gray[400]};
  transition: all 0.2s ease;

  &:hover {
    color: ${colors.gray[600]};
    background-color: ${colors.gray[100]};
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export const ModalBody = styled.div`
  padding: 1.5rem;
`;

export const ModalImage = styled.div`
  width: 100%;
  height: 200px;
  margin-bottom: 1.5rem;
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: ${colors.gray[100]};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const DetailGrid = styled.div`
  display: grid;
  gap: 1rem;

  .detail-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 1rem;
    background-color: ${colors.gray[50]};
    border-radius: 0.5rem;
    border: 1px solid ${colors.gray[200]};

    strong {
      font-size: 0.875rem;
      font-weight: 600;
      color: ${colors.gray[700]};
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    span {
      font-size: 1rem;
      color: ${colors.gray[900]};
    }
  }

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
