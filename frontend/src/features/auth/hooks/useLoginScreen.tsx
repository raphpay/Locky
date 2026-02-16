import { useNavigate } from "react-router";
import ROUTES from "../../navigation/Routes";
import AuthService from "../AuthService";
import CacheService from "../../cache/CacheService";
import type { LoginProps } from "../screens/LogIn";
import { useState } from "react";
import LOGIN_METHOD from "../enum/loginMethod";

export default function useLoginScreen({ masterPassword, pin }: LoginProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState<LOGIN_METHOD>(LOGIN_METHOD.PIN);

  function handleNavigateBack() {
    navigate(ROUTES.ROOT);
  }

  async function handleLogIn(method: LOGIN_METHOD) {
    if (method === LOGIN_METHOD.PIN) {
      await AuthService.loginWithPin(pin);
      navigate(ROUTES.HOME);
    } else if (method === LOGIN_METHOD.MASTER_PASSWORD) {
      await AuthService.login(masterPassword);
      navigate(ROUTES.HOME);
    } else if (method === LOGIN_METHOD.RECOVERY_PHRASE) {
      // TODO: Handle recovery phrase login
    } else if (method === LOGIN_METHOD.BIOMETRICS) {
      // TODO: Handle biometrics login
    }
  }

  function handleForgot(nextStep: LOGIN_METHOD) {
    setStep(nextStep);
  }

  async function handleFinalPin(pin: string) {
    // TODO: Handle loading
    try {
      await AuthService.loginWithPin(pin);
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error(error);
    }
  }

  return {
    step,
    handleNavigateBack,
    handleLogIn,
    handleForgot,
    handleFinalPin,
  };
}
