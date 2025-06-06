import { type ReactNode } from "react";
import { Home } from "@mui/icons-material";

export const navItems: { path: string; icon: ReactNode; text: string }[] = [
  { path: "/main", icon: <Home />, text: "Home" },
];
