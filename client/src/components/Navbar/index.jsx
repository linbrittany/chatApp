import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Logo from "../../assets/images/chat_logo.png";
import { useAuth } from '../../contexts/UserContext';
import { Button } from '../../GlobalStyles';

const NavContainer = styled.nav`
  width: 100vw;
  max-width: 100vw;
  background: var(--primary);
  color: var(--background);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
`;

const LogoContainer = styled.nav`
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  height: fit-content;
  margin-left: 14px;

  &:hover {
    cursor: pointer;
  }
`;

const NavTitle = styled.h1`
  font-family: var(--font-family);
  font-size: 24px;
  margin: 0;
`;

const Image = styled.img`
  width: 35px;
`;

export const ButtonWrapper = styled.div`
  margin-right: 40px;
  font-weight: 700;
  font-size: 20px;
  display: flex;
  align-items: center;
  @media (max-width: 990px) {
    align-items: flex-end;
    flex-direction: column;
  }
`;

const Navbar = ({ isAuth }) => {
  let { logout } = useAuth();
  let navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <NavContainer>
      <LogoContainer onClick={() => navigate('/')}>
        <NavTitle>BrituChat</NavTitle>
        <Image src={Logo}/>
      </LogoContainer>
      {isAuth && <ButtonWrapper>
        <Button onClick={handleLogout}>Logout</Button>
      </ButtonWrapper>}
    </NavContainer>
  )
}

Navbar.defaultProps = {
  isAuth: false,
};

export default Navbar;
