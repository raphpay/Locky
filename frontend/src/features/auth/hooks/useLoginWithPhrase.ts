import { useState } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "../../navigation/Routes";
import AuthService from "../AuthService";

export default function useLoginWithPhrase() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recoveryPhrase, setRecoveryPhrase] = useState<string>("");

  async function handleLogIn() {
    setIsLoading(true);
    try {
      await AuthService.loginWithRecoveryPhrase(recoveryPhrase);
      setIsLoading(false);
      navigate(ROUTES.HOME);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }

  return {
    isLoading,
    recoveryPhrase,
    setRecoveryPhrase,
    handleLogIn,
  };
}
