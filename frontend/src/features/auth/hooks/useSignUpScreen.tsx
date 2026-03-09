import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { CACHE_KEYS } from "../../cache/CACHE_KEYS";
import CacheService from "../../cache/CacheService";
import { ROUTES } from "../../navigation/Routes";
import RecoverySeedService from "../../recoverySeed/RecoverySeedService";
import SessionManager from "../../session/SessionManager";
import UserService from "../../user/UserService";
import AuthService from "../AuthService";
import { SIGN_UP_STEPS, TOAST_MESSAGE } from "../enum/signUpStates";

export default function useSignUpScreen() {
  const navigate = useNavigate();

  const [step, setStep] = useState<number>(0);
  const currentConfig = SIGN_UP_STEPS[step] || SIGN_UP_STEPS[0];

  const [pin, setPin] = useState<string>("");
  const [masterPassword, setMasterPassword] = useState<string>("");
  const [phrase, setPhrase] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isContinueDisabled, setIsContinueDisabled] = useState<boolean>(false);

  function handleMnemonicCopy() {
    navigator.clipboard.writeText(phrase);
    toast.success(TOAST_MESSAGE.PHRASE_COPIED, { position: "top-center" });
  }

  function handleNavigationToLogIn() {
    navigate(ROUTES.LOGIN_WITH_PHRASE);
  }

  async function nextStep() {
    if (step === 3 && pin.length === 6) {
      await handleSignIn();
    } else {
      setStep((s) => s + 1);
    }
  }

  function previousStep() {
    setStep((s) => Math.max(0, s - 1));
  }

  async function handleSignIn() {
    setIsLoading(true);
    try {
      const userCred = await AuthService.signIn();

      if (userCred !== null)
        await UserService.create(phrase, masterPassword, pin);

      setIsLoading(false);

      const res = await window.electron.promptTouchID(
        "Utiliser votre empreinte pour sécuriser vos données.",
      );

      if (res === true) {
        const masterKey = SessionManager.getMasterKey();
        if (!masterKey) throw new Error("Invalid session");
        const encryptedKey = await window.electron.encrypt(masterKey);
        CacheService.store(CACHE_KEYS.BIOMETRICS_WRAP, encryptedKey);
      }

      navigate(ROUTES.HOME);
    } catch (error) {
      setIsLoading(false);
      console.error("Error signing in:", error);
    }
  }

  useEffect(() => {
    const mnemonic = RecoverySeedService.generateRecoverySeed();
    setPhrase(mnemonic);
  }, []);

  useEffect(() => {
    if (step === 2) {
      if (masterPassword.length === 0) {
        setIsContinueDisabled(true);
      } else {
        setIsContinueDisabled(false);
      }
    }
  }, [step, masterPassword]);

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
    masterPassword,
    setMasterPassword,
    step,
    setStep,
    phrase,
    isLoading,
    currentConfig,
    isContinueDisabled,
    nextStep,
    previousStep,
    handleMnemonicCopy,
    handleSignIn,
    handleNavigationToLogIn,
  };
}
