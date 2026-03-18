import { useState } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "../../navigation/Routes";
import RecoverySeedService from "../../recoverySeed/RecoverySeedService";
import AuthService from "../AuthService";

export default function useLoginWithPhrase() {
  const navigate = useNavigate();

  const [recoveryPhrase, setRecoveryPhrase] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function setUpPassword() {
    const isValid = RecoverySeedService.validateMnemonic(recoveryPhrase);
    if (!isValid) {
      setErrorMessage("Phrase de récupération invalide");
      return;
    } else {
      setErrorMessage(null);
    }

    // TODO: Handle login heres
    try {
      await AuthService.verifyAccountExistence(recoveryPhrase);
      navigate(ROUTES.LOGIN, { state: { recoveryPhrase } });
    } catch {
      setErrorMessage("Pas de compte associé à cette phrase de récupération");
    }
  }

  return {
    errorMessage,
    recoveryPhrase,
    setRecoveryPhrase,
    setUpPassword,
  };
}
