import { type FC, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";

import { navItems as baseNavItems } from "../../constants";
import { MobileBottomNav } from "./styles";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loggingOutUser, user } from "../../store/reducers/user/userSlice";
import { IconButton } from "../IconButton";
import { logout } from "../../store/reducers/user/authSlice";
import { getBio, loggingOutUserBio } from "../../store/reducers/user/bioSlice";
import { loggingOutUserTweets } from "../../store/reducers/tweetSlice";
import { getImageUrl } from "../../utils/getImageUrl";

export const MobileBottom: FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(user);
  const currentUserBio = useAppSelector(getBio);
  const navigate = useNavigate();

  const navItems = useMemo(() => {
    const handleLogout = (e: React.MouseEvent) => {
      e.stopPropagation();
      dispatch(logout());
      dispatch(loggingOutUser());
      dispatch(loggingOutUserBio());
      dispatch(loggingOutUserTweets());

      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
      }

      navigate("/login");
    };

    const items = baseNavItems.slice(0, 3);

    if (currentUser?.nickname) {
      items.push({
        path: `/login`,
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

      // Item de perfil
      if (currentUserBio?.avatar?.file_path) {
        items.push({
          path: `/main/profile/${currentUser.id}`,
          icon: (
            <IconButton title={`Ir para perfil`}>
              <img
                src={getImageUrl(currentUserBio.avatar.file_path)}
                alt={`Avatar de ${currentUser.first_name}`}
                style={{ width: "24px", height: "24px", borderRadius: "50%" }}
              />
            </IconButton>
          ),
          text: "Perfil",
        });
      }
    }

    return items;
  }, [currentUser, currentUserBio, dispatch, navigate]);

  return (
    <MobileBottomNav>
      {navItems.map((item, index) => (
        <Link
          key={`mobile-link-${item.path}-${index}`}
          to={item.path}
        >
          {item.icon}
        </Link>
      ))}
    </MobileBottomNav>
  );
};
