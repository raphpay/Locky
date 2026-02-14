import { useNavigate } from "react-router";
import ROUTES from "../../navigation/Routes";
import AuthService from "../AuthService";
import CacheService from "../../cache/CacheService";
import type { LoginProps } from "../screens/LogIn";

export default function useLoginScreen({ masterPassword }: LoginProps) {
  const navigate = useNavigate();

  function handleNavigateBack() {
    navigate(ROUTES.ROOT);
  }

  async function handleLogIn() {
    await AuthService.login(masterPassword);
    navigate(ROUTES.HOME);
  }

  async function handleForceSignOut() {
    await AuthService.signOut();
    CacheService.clear();
    navigate(ROUTES.ROOT);
  }

  return {
    handleNavigateBack,
    handleLogIn,
    handleForceSignOut,
  };
}
