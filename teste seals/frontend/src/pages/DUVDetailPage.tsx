import React from 'react';
import DUVDetail from '../components/DUVDetail';
import { PageContainer } from '../styles/PageStyles.styled';

const DUVDetailPage: React.FC = () => {
  const isMobile = window.innerWidth < 640;

  return (
    <PageContainer isMobile={isMobile}>
      <DUVDetail />
    </PageContainer>
  );
};

export default DUVDetailPage;
