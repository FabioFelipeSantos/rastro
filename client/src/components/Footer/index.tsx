import { Link } from "../Link";

export const Footer = () => {
  return (
    <footer>
      <Link
        url="#"
        text="X"
      />

      <div>
        <div>
          <Link
            url="#"
            text="Termos"
          />
          <Link
            url="#"
            text="Privacidade"
          />
          <Link
            url="#"
            text="Contato"
          />
        </div>

        <div>&copy; {new Date().getFullYear()} NOME. Todos os direitos reservados.</div>
      </div>
    </footer>
  );
};
