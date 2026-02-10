import { useNavigate } from "react-router";
import { usePasswordsQuery } from "../../password/hooks/usePasswords";
import ROUTES from "../../navigation/Routes";

export default function useHomeScreen() {
  const navigate = useNavigate();

  const { data: passwords, isLoading, error } = usePasswordsQuery();
  function createPassword() {
    navigate(ROUTES.CREATE_PASSWORD);
  }

  function navigateToViewPassword(passwordID: string) {
    navigate(ROUTES.VIEW_PASSWORD, {
      state: {
        passwordID: passwordID,
      },
    });
  }

  return {
    passwords,
    isLoading,
    error,
    createPassword,
    navigateToViewPassword,
  };
}
