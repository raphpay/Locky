import { useState } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "../../navigation/Routes";
import RecoverySeedService from "../../recoverySeed/RecoverySeedService";
import AuthService from "../AuthService";
import { ERROR_MESSAGES } from "../enum/errorMessages";

export default function useLoginWithPhrase() {
  const navigate = useNavigate();

  const [recoveryPhrase, setRecoveryPhrase] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function setUpPassword() {
    setIsLoading(true);
    const isValid = RecoverySeedService.validateMnemonic(recoveryPhrase);
    if (!isValid) {
      setIsLoading(false);
      setErrorMessage(ERROR_MESSAGES.INVALID_PHRASE);
      return;
    } else {
      setErrorMessage(null);
    }

    // TODO: Handle login heres
    try {
      await AuthService.verifyAccountExistence(recoveryPhrase);
      navigate(ROUTES.LOGIN, { state: { recoveryPhrase } });
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      setErrorMessage(ERROR_MESSAGES.NO_LINKED__ACCOUNT);
    }
  }

  return {
    errorMessage,
    recoveryPhrase,
    setRecoveryPhrase,
    isLoading,
    setUpPassword,
  };
}
