import styled from '@emotion/styled';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 2rem 1rem;
  text-align: center;
  border-top: 4px solid ${({ theme }) => theme.colors.accent};
`;

export const Footer = () => {
  return (
    <FooterContainer>
            <p>© {new Date().getFullYear()} HerreriBlog. Todos los derechos reservados.</p>
            <p>Desarrollado por Guillermo Herrera</p>
        </FooterContainer>
    );
};