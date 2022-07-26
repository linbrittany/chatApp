import React from 'react';
import styled from "styled-components";
import Logo from "../../assets/images/chat_logo.png";

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
  /* background: var(--primary);
  color: var(--background); */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  height: fit-content;
  margin-left: 14px;
`;

const NavTitle = styled.h1`
  font-family: var(--font-family);
  font-size: 24px;
  margin: 0;
`;

const Image = styled.img`
  width: 35px;
`

const Navbar = () => {
  return (
    <NavContainer>
      <LogoContainer>
        <NavTitle>BrituChat</NavTitle>
        <Image src={Logo}/>
      </LogoContainer>
    </NavContainer>
  )
}

Navbar.propTypes = {};

export default Navbar;
