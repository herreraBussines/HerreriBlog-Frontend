import styled from '@emotion/styled';

const FooterContainer = styled.footer`
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    padding: 1.5rem;
    text-align: center;
    width: 100%;
`;

export const Footer = () => {
    return (
        <FooterContainer>
            <p>© {new Date().getFullYear()} HerreriBlog. Todos los derechos reservados.</p>
            <p>Desarrollado por [Guillermo Herrera]</p>
        </FooterContainer>
    );
};