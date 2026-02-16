import { useNavigate } from "react-router";
import ROUTES from "../../navigation/Routes";
import AuthService from "../AuthService";
import type { LoginProps } from "../screens/LogIn";
import { useState } from "react";
import LOGIN_METHOD from "../enum/loginMethod";

export default function useLoginScreen() {
  const navigate = useNavigate();
  const [pin, setPin] = useState<string>("");
  const [masterPassword, setMasterPassword] = useState<string>("");
  const [step, setStep] = useState<LOGIN_METHOD>(LOGIN_METHOD.PIN);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recoveryPhrase, setRecoveryPhrase] = useState<string>("");

  function handleNavigateBack() {
    navigate(ROUTES.ROOT);
  }

  async function handleLogIn(method: LOGIN_METHOD) {
    setIsLoading(true);
    if (method === LOGIN_METHOD.PIN) {
      try {
        await AuthService.loginWithPin(pin);
        setIsLoading(false);
        navigate(ROUTES.HOME);
      } catch (error) {
        setIsLoading(false);
        throw error;
      }
    } else if (method === LOGIN_METHOD.MASTER_PASSWORD) {
      try {
        await AuthService.login(masterPassword);
        setIsLoading(false);
        navigate(ROUTES.HOME);
      } catch (error) {
        setIsLoading(false);
        throw error;
      }
    } else if (method === LOGIN_METHOD.RECOVERY_PHRASE) {
      try {
        await AuthService.loginWithRecoveryPhrase(recoveryPhrase);
        setIsLoading(false);
        navigate(ROUTES.HOME);
      } catch (error) {
        setIsLoading(false);
        throw error;
      }
    } else if (method === LOGIN_METHOD.BIOMETRICS) {
      // TODO: Handle biometrics login
    }
  }

  function handleForgot(nextStep: LOGIN_METHOD) {
    setStep(nextStep);
  }

  async function handleFinalPin(pin: string) {
    setIsLoading(true);
    try {
      await AuthService.loginWithPin(pin);
      setIsLoading(false);
      navigate(ROUTES.HOME);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }

  return {
    pin,
    setPin,
    masterPassword,
    setMasterPassword,
    step,
    isLoading,
    recoveryPhrase,
    setRecoveryPhrase,
    handleNavigateBack,
    handleLogIn,
    handleForgot,
    handleFinalPin,
  };
}
