import { type FC, type ReactNode } from "react";

import { PageHeader } from "./styles";

type HeaderProps = {
  children: ReactNode;
};

export const Header: FC<HeaderProps> = ({ children }) => {
  return <PageHeader>{children}</PageHeader>;
};
