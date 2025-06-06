import { type FC, type ReactNode } from "react";

import { PageHeader, LinksContainer, HeaderLoginButton } from "./styles";
import { ThemeToggle } from "../ThemeToggle";
import { Link, useNavigate } from "react-router-dom";

type HeaderProps = {
  main?: boolean;
};

export const Header: FC<HeaderProps> = ({ main = true }) => {
  const navigate = useNavigate();

  let content: ReactNode;

  if (main) {
    content = (
      <LinksContainer>
        <Link to="/">Home</Link>
        <Link to="/">Explorar</Link>
        <Link to="/">Sobre</Link>
        <Link to="/">Contato</Link>
      </LinksContainer>
    );
  }

  return (
    <PageHeader>
      {content}
      <div className="toggle-button-container">
        <ThemeToggle />
      </div>
      <HeaderLoginButton
        onClick={() => navigate("/login")}
        text="Entrar"
      />
    </PageHeader>
  );
};
