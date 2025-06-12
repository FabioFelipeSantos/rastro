import type { FC, ReactNode } from "react";
import { Instagram, Facebook, LinkedIn, YouTube, Tag, Groups2, Bolt } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";

import * as S from "./styles";
import { AppContainer } from "../../components/app-layout/AppContainer";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import womanImage from "../../images/principal.png";

const cardsContent: { icon: ReactNode; title: string; text: string }[] = [
  {
    icon: <Tag className="card-icon" />,
    title: "Feed Personalizado",
    text: "Receba conteúdos relevantes e tendências baseados nos seus interesses e conexões",
  },
  {
    icon: <Groups2 className="card-icon" />,
    title: "Comunidades Ativas",
    text: "Participe de grupos, converse e compartilhe experiências com pessoas do mundo todo",
  },
  {
    icon: <Bolt className="card-icon" />,
    title: "Atualização instantânea",
    text: "Veja novidades em tempo real, interaja e descubra o que está bombando no momento",
  },
];

export const Home: FC = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <>
      <AppContainer>
        <S.HomeContainer>
          <Header />

          <S.CTAContainer>
            <div>
              <S.CTATitle>Conecte-se ao mundo em tempo real</S.CTATitle>

              <img
                className="on-tablet"
                src={womanImage}
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
              src={womanImage}
              alt="Imagem de uma mulher tomando café e clicando em um telefone"
            />
          </S.CTAContainer>

          <S.CardsContainer>
            {cardsContent.map((card, index) => (
              <li key={`card-${index}-${card.title}`}>
                <div>{card.icon}</div>

                <h3>{card.title}</h3>

                <p>{card.text}</p>
              </li>
            ))}
          </S.CardsContainer>

          <S.AnotherCTA>
            <S.AnotherCTAContentContainer>
              <h2>Pronto para se juntar à conversa?</h2>

              <Button
                className="another-cta-button"
                text="Criar minha conta grátis"
                fullWidth={false}
                primary={false}
                onClick={() => navigate("/signup")}
              />

              <p>
                Já tem uma conta?{" "}
                <Link
                  to="/login"
                  className="cta-link"
                >
                  Clique aqui Entrar
                </Link>
              </p>
            </S.AnotherCTAContentContainer>
          </S.AnotherCTA>

          <S.HomeFooter>
            <ul>
              <a href="#">Termos</a>
              <a href="#">Privacidade</a>
              <a href="#">Contato</a>
            </ul>

            <div className="footer-time">&copy; {currentYear} Rastro. Todos os direitos reservados.</div>
          </S.HomeFooter>
        </S.HomeContainer>
      </AppContainer>
    </>
  );
};
