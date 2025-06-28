import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Ship, Users, FileText, Menu, X } from 'lucide-react';
import styled from 'styled-components';
import { Text } from './styles';
import DUVListPage from './pages/DUVListPage';
import DUVDetailPage from './pages/DUVDetailPage';
import NavioListPage from './pages/NavioListPage';
import PessoaListPage from './pages/PessoaListPage';

// Styled Components
const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
`;

const HeaderContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const LogoText = styled.div`
  .title {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.gray[900]};
    margin: 0;
  }
  
  .subtitle {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.gray[600]};
    margin: 0;
    
    @media (max-width: 640px) {
      display: none;
    }
  }
`;

const DesktopNav = styled.nav`
  display: none;
  gap: ${({ theme }) => theme.spacing.sm};
  
  @media (min-width: 768px) {
    display: flex;
  }
`;

const MobileMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.sm};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: transparent;
  color: ${({ theme }) => theme.colors.gray[600]};
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background: ${({ theme }) => theme.colors.gray[100]};
  }
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
  background: ${({ theme }) => theme.colors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.gray[200]};
  padding: ${({ theme }) => theme.spacing.md};
  animation: slideDown 0.3s ease-out;
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileNavLinks = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const NavLinkStyled = styled(Link)<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.normal};
  
  background: ${({ $isActive, theme }) => 
    $isActive ? theme.colors.primary[600] : 'transparent'};
  color: ${({ $isActive, theme }) => 
    $isActive ? theme.colors.white : theme.colors.gray[600]};
  
  &:hover {
    background: ${({ $isActive, theme }) => 
      $isActive ? theme.colors.primary[700] : theme.colors.gray[100]};
    color: ${({ $isActive, theme }) => 
      $isActive ? theme.colors.white : theme.colors.gray[700]};
  }
`;

const MobileNavLinkStyled = styled(NavLinkStyled)`
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const Main = styled.main`
  flex: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.md};
  width: 100%;
`;

const Footer = styled.footer`
  background: ${({ theme }) => theme.colors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.gray[200]};
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

function AppContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const NavLink = ({ to, children, icon: Icon }: { to: string; children: React.ReactNode; icon: any }) => (
    <NavLinkStyled to={to} $isActive={isActive(to)}>
      <Icon size={16} />
      {children}
    </NavLinkStyled>
  );

  const MobileNavLink = ({ to, children, icon: Icon }: { to: string; children: React.ReactNode; icon: any }) => (
    <MobileNavLinkStyled 
      to={to} 
      $isActive={isActive(to)}
      onClick={() => setMobileMenuOpen(false)}
    >
      <Icon size={20} />
      {children}
    </MobileNavLinkStyled>
  );

  return (
    <AppContainer>
      <Header>
        <HeaderContent>
          <Logo>
            <Ship size={32} color="#2563eb" />
            <LogoText>
              <h1 className="title">Sistema DUV</h1>
              <p className="subtitle">Gerenciamento de Documentos Únicos Virtuais</p>
            </LogoText>
          </Logo>
          
          <DesktopNav>
            <NavLink to="/" icon={FileText}>DUVs</NavLink>
            <NavLink to="/navios" icon={Ship}>Navios</NavLink>
            <NavLink to="/pessoas" icon={Users}>Pessoas</NavLink>
          </DesktopNav>

          <MobileMenuButton onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </MobileMenuButton>
        </HeaderContent>

        <MobileMenu isOpen={mobileMenuOpen}>
          <MobileNavLinks>
            <MobileNavLink to="/" icon={FileText}>DUVs</MobileNavLink>
            <MobileNavLink to="/navios" icon={Ship}>Navios</MobileNavLink>
            <MobileNavLink to="/pessoas" icon={Users}>Pessoas</MobileNavLink>
          </MobileNavLinks>
        </MobileMenu>
      </Header>

      <Main>
        <Routes>
          <Route path="/" element={<DUVListPage />} />
          <Route path="/duv/:id" element={<DUVDetailPage />} />
          <Route path="/navios" element={<NavioListPage />} />
          <Route path="/pessoas" element={<PessoaListPage />} />
        </Routes>
      </Main>

      <Footer>
        <FooterContent>
          <Text size="sm" color="#6b7280">
            © 2025 Sistema DUV - Processo Seletivo Seals Solutions
          </Text>
        </FooterContent>
      </Footer>
    </AppContainer>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
