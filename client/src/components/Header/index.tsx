import { useState, type FC } from "react";
import { Menu, MenuOpen } from "@mui/icons-material";
import { useTheme } from "styled-components";

import * as S from "./styles";
import { ThemeToggle } from "../ThemeToggle";
import { Link, useNavigate } from "react-router-dom";
import rastroLogo from "../../images/logo.png";

export const Header: FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  window.addEventListener("resize", () => {
    if (window.innerWidth > parseInt(theme.breakpoints.mobile.replace("px", ""))) {
      setIsMenuOpen(false);
    }
  });

  const handleLoginClick = () => {
    setIsMenuOpen((state) => !state);
    navigate("/login");
  };

  const menuContent = () => {
    return (
      <S.HeaderContentContainer $isBurgerMenu={isMenuOpen}>
        <S.LinksContainer onClick={() => setIsMenuOpen((state) => !state)}>
          <Link to="/">Home</Link>
          <Link to="/">Explorar</Link>
          <Link to="/">Sobre</Link>
          <Link to="/">Contato</Link>
        </S.LinksContainer>
        <div className="toggle-button-container">
          <ThemeToggle />
        </div>
        <S.HeaderLoginButton
          onClick={handleLoginClick}
          text="Entrar"
        />
      </S.HeaderContentContainer>
    );
  };

  const burgerMenu = () => {
    return (
      <S.BurgerMenuContainer>
        <S.BurgerMenuStyles onClick={() => setIsMenuOpen((state) => !state)}>
          {!isMenuOpen ? <Menu /> : <MenuOpen />}
        </S.BurgerMenuStyles>

        {isMenuOpen && <div>{menuContent()}</div>}
      </S.BurgerMenuContainer>
    );
  };

  return (
    <>
      <S.PageHeader>
        <S.LogoContainer>
          <img
            src={rastroLogo}
            title="Rastro"
            alt="Rastro logo"
          />
        </S.LogoContainer>

        {!isMenuOpen && menuContent()}

        {burgerMenu()}
      </S.PageHeader>
    </>
  );
};
