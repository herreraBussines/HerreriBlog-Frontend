import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const Nav = styled.nav`
  background: ${({ theme }) => theme.colors.primary};
  padding: 1rem 2rem;
  display: flex; 
  justify-content: space-between;
  align-items: center;
`;

const MenuLink = styled(Link)`
  color: white;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #f43f5e; 
  }
`;

export const Navbar = () => {
  return (
    <Nav>
      <h2>HerreriBlog</h2>
      <MenuLink to="/">Menú</MenuLink>
    </Nav>
  );
};
