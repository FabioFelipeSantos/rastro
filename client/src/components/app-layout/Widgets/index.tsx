import { type FC } from "react";

import { WidgetsContainerStyles, WidgetBox } from "./styles";
import { Input } from "../../form/Input";

// type WidgetsContainerProps = {
//   children: ReactNode;
// };

export const Widgets: FC = () => {
  return (
    <WidgetsContainerStyles>
      <WidgetBox>
        <Input
          type="search"
          placeholder="Buscar no Twitter"
        />
      </WidgetBox>

      <WidgetBox>
        <h3>O que está acontecendo</h3>
        <p>#ReactDev</p>
        <p>#TypeScriptÉVida</p>
      </WidgetBox>

      <WidgetBox>
        <h3>Quem seguir</h3>
        <p>Usuário Alpha</p>
      </WidgetBox>
    </WidgetsContainerStyles>
  );
};
