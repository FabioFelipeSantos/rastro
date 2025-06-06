import { type FC, type ReactNode } from "react";

import { AppContainerStyles } from "./styles";

type AppContainerProps = {
  children: ReactNode;
};

export const AppContainer: FC<AppContainerProps> = ({ children }) => {
  return <AppContainerStyles>{children}</AppContainerStyles>;
};
