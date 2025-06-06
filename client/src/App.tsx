import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { ThemeProvider } from "./config/ThemeConfig";
import { AppLayout } from "./components/app-layout/AppLayout";
import { MainTweet } from "./pages/MainTweet";
import { useAppSelector } from "./store/hooks";
import { isModalOpen } from "./store/reducers/modalSlice";
import { Modal } from "./components/Modal";
import { ProfilePage } from "./pages/Profile";
import { PrivateRoute } from "./components/PrivateRoute";

export default function App() {
  const isOpen = useAppSelector(isModalOpen);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={<Home />}
          />
          <Route
            path="/main"
            element={
              <PrivateRoute>
                <AppLayout />
              </PrivateRoute>
            }
          >
            <Route
              index
              element={<MainTweet />}
            />
            <Route
              path="/main/profile/:userId"
              element={<ProfilePage />}
            />
          </Route>
          <Route
            path="login"
            element={<Login />}
          />
          <Route
            path="/signup"
            element={<Signup />}
          />
        </Routes>
        {isOpen && <Modal />}
      </BrowserRouter>
    </ThemeProvider>
  );
}
