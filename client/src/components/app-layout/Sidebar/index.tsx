import { type FC, useMemo, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";

import { SidebarContainerStyles } from "./styles";
import rastroLogo from "../../../images/logo.png";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { loggingOutUser, user } from "../../../store/reducers/user/userSlice";
import { logout, isAuthenticated } from "../../../store/reducers/user/authSlice";
import { getBio, loggingOutUserBio } from "../../../store/reducers/user/bioSlice";
import { IconButton } from "../../IconButton";
import { NavItem } from "../NavItem";
import { loggingOutUserTweets } from "../../../store/reducers/tweetSlice";
import { navItems as baseNavItems } from "../../../constants";
import { getImageUrl } from "../../../utils/getImageUrl";
import { avatarPath } from "../../../utils/getAvatarUrlPath";

export const Sidebar: FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(user);
  const currentUserBio = useAppSelector(getBio);
  const isAuth = useAppSelector(isAuthenticated);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      try {
        localStorage.removeItem("token");

        dispatch(logout());
        dispatch(loggingOutUser());
        dispatch(loggingOutUserBio());
        dispatch(loggingOutUserTweets());

        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 0);
      } catch (error) {
        console.error("Erro ao fazer logout:", error);
        navigate("/login", { replace: true });
      }
    },
    [dispatch, navigate],
  );

  const navItems = useMemo(() => {
    const items = [...baseNavItems];

    items.push({
      path: `/main/profile/${currentUser.id}`,
      icon: (
        <IconButton title={`Ir para perfil`}>
          <img
            src={
              currentUserBio?.avatar?.file_path
                ? getImageUrl(currentUserBio.avatar.file_path)
                : avatarPath(currentUser.first_name, currentUser.last_name)
            }
            alt={`Avatar de ${currentUser.first_name}`}
            style={{ width: "36px", height: "36px", borderRadius: "50%" }}
          />
        </IconButton>
      ),
      text: "Perfil",
    });

    if (currentUser?.nickname && isAuth) {
      items.push({
        path: `/logout`,
        icon: (
          <IconButton
            onClick={handleLogout}
            title="Logout"
          >
            <Logout />
          </IconButton>
        ),
        text: "Sair",
      });
    }

    return items;
  }, [currentUser, currentUserBio, isAuth, handleLogout]);

  return (
    <SidebarContainerStyles>
      <div style={{ marginBottom: "10px" }}>
        <Link to="/">
          <img
            className="logo"
            src={rastroLogo}
            alt="Logo do site Rastro"
          />
        </Link>
      </div>

      <nav>
        {navItems.map((navItem, index) => (
          <NavItem
            key={`nav-item-${navItem.path}-${index}`}
            to={navItem.path}
            $isActive={
              location.pathname === navItem.path ||
              (navItem.path.startsWith("/") && location.pathname.startsWith(navItem.path) && navItem.path !== "/")
            }
          >
            {navItem.icon} <span>{navItem.text}</span>
          </NavItem>
        ))}
      </nav>
    </SidebarContainerStyles>
  );
};
