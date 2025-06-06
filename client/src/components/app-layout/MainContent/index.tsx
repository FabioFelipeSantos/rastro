import { type FC, type ReactNode } from "react";

import { MainContentContainer } from "./styles";

type MainContentProps = {
  children: ReactNode;
};

export const MainContent: FC<MainContentProps> = ({ children }) => {
  return <MainContentContainer>{children}</MainContentContainer>;
};
