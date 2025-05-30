import { type ReactNode, type FC } from "react";

import { LayoutContainer } from "./styles";
import { useAppSelector } from "../store/hooks";
import { isModalOpen } from "../store/reducers/modalSlice";
import { Modal } from "../components/Modal";

// import { Header } from "../components/Header";
// import { Footer } from "../components/Footer";

type LayoutProps = {
  children?: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children = null }) => {
  const isOpen = useAppSelector(isModalOpen);

  return (
    <LayoutContainer>
      {children}
      {isOpen && <Modal />}
    </LayoutContainer>
  );
};
