import { type ReactNode, type FC } from "react";

// import { Header } from "../components/Header";
// import { Footer } from "../components/Footer";

type LayoutProps = {
  children?: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children = null }) => {
  return (
    <>
      <h1>Layout</h1>
      {children}
    </>
  );
};
