import type { FC } from "react";
import { Outlet } from "react-router-dom";

import { AppContainer } from "../AppContainer";
import { Sidebar } from "../Sidebar";
import { MainContent } from "../MainContent";
import { Widgets } from "../Widgets";
import { MobileBottom } from "../../MobileBottom";

export const AppLayout: FC = () => {
  return (
    <AppContainer>
      <Sidebar />

      <MainContent>
        <Outlet />
      </MainContent>

      <Widgets />

      <MobileBottom />
    </AppContainer>
  );
};
