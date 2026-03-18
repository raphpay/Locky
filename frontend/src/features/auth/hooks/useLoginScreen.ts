import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { ROUTES } from "../../navigation/Routes";
import AuthService from "../AuthService";
import { SIGN_UP_STEPS, TOAST_MESSAGE } from "../enum/signUpStates";
import UserService from "../../user/UserService";
import SessionManager from "../../session/SessionManager";
import CacheService from "../../cache/CacheService";
import { CACHE_KEYS } from "../../cache/CACHE_KEYS";
import promptTouchID from "../../bio/promptTouchID";

export default function useLoginScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { recoveryPhrase } = location.state || {};

  const [step, setStep] = useState<number>(3);
  const currentConfig = SIGN_UP_STEPS[step] || SIGN_UP_STEPS[0];

  const [pin, setPin] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isContinueDisabled, setIsContinueDisabled] = useState<boolean>(false);

  async function nextStep() {
    if (step === 3 && pin.length === 6) {
      await handleLogIn();
    } else {
      setStep((s) => s + 1);
    }
  }

  function previousStep() {
    setStep((s) => Math.max(0, s - 1));
  }

  async function backToRoot() {
    CacheService.clear();
    await AuthService.signOut();
    SessionManager.clear();
    navigate(ROUTES.ROOT);
  }

  async function handleLogIn() {
    setIsLoading(true);
    try {
      await UserService.retrieveAccount(recoveryPhrase, pin);
      setIsLoading(false);

      await promptTouchID();

      navigate(ROUTES.HOME);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }

  useEffect(() => {
    if (step === 3) {
      if (pin.length !== 6) {
        setIsContinueDisabled(true);
      } else {
        setIsContinueDisabled(false);
      }
    }
  }, [step, pin]);

  return {
    pin,
    setPin,
    step,
    setStep,
    isLoading,
    currentConfig,
    isContinueDisabled,
    nextStep,
    previousStep,
    backToRoot,
    handleLogIn,
  };
}
