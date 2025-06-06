import type { FC } from "react";
import { Instagram, Facebook, LinkedIn, YouTube } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import * as S from "./styles";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";

export const Home: FC = () => {
  const navigate = useNavigate();

  return (
    <S.HomeContainer>
      <Header />

      <S.CTAContainer>
        <div>
          <S.CTATitle>Conecte-se ao mundo em tempo real</S.CTATitle>

          <img
            className="on-tablet"
            src="src/images/principal.png"
            alt="Imagem de uma mulher tomando café e clicando em um telefone"
          />

          <S.CTAContent>
            Compartilhe ideias, converse sobre o que está acontecendo agora e participe de conversas e amizades que
            importam de verdade para você.
          </S.CTAContent>

          <S.CTAButtonsContainer>
            <Button
              text="Criar uma conta"
              fullWidth
              onClick={() => navigate("/signup")}
            />
            <Button
              text="Entrar"
              primary={false}
              fullWidth
              onClick={() => navigate("/login")}
            />
          </S.CTAButtonsContainer>

          <S.CTASocialIcons>
            <a href="#">
              <Instagram />
            </a>
            <a href="#">
              <Facebook />
            </a>
            <a href="#">
              <LinkedIn />
            </a>
            <a href="#">
              <YouTube />
            </a>
          </S.CTASocialIcons>
        </div>
        <img
          src="src/images/principal.png"
          alt="Imagem de uma mulher tomando café e clicando em um telefone"
        />
      </S.CTAContainer>
    </S.HomeContainer>
  );
};
