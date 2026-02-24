import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ROUTES from "../../navigation/Routes";
import AuthService from "../AuthService";
import LOGIN_METHOD from "../enum/loginMethod";
import CacheService from "../../cache/CacheService";
import CACHE_KEYS from "../../cache/CACHE_KEYS";
import {
  LOCK_SCREEN_STATES,
  LOCK_SCREEN_BOTTOM_BUTTON_TEXTS,
  LOCK_SCREEN_BUTTON_TOP_TEXTS,
  LOCK_SCREEN_DESCRIPTIONS,
} from "../enum/lockScreenStates";

export default function useLockScreen() {
  const navigate = useNavigate();
  // Lock screen states
  const [lockScreenState, setLockScreenState] = useState<LOCK_SCREEN_STATES>(
    LOCK_SCREEN_STATES.PIN_OR_BIO,
  );
  const [description, setDescription] = useState<string>(
    LOCK_SCREEN_DESCRIPTIONS.PIN_OR_BIO,
  );
  const [topButtonText, setTopButtonText] = useState<string>(
    LOCK_SCREEN_BUTTON_TOP_TEXTS.PIN_OR_BIO,
  );
  const [bottomButtonText, setBottomButtonText] = useState<string>(
    LOCK_SCREEN_BOTTOM_BUTTON_TEXTS.PIN_OR_BIO,
  );

  // Unlock States
  const [pin, setPin] = useState<string>("");
  const [masterPassword, setMasterPassword] = useState<string>("");
  const [recoveryPhrase, setRecoveryPhrase] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasBio, setHasBio] = useState<boolean>(false);

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
      try {
        await AuthService.loginWithTouchID();
        setIsLoading(false);
        navigate(ROUTES.HOME);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    }
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

  async function retriveBio() {
    return !!CacheService.retrieve(CACHE_KEYS.BIOMETRICS_WRAP);
  }

  function handleTopButtonTap() {
    switch (lockScreenState) {
      case LOCK_SCREEN_STATES.PIN_OR_BIO:
        setLockScreenState(LOCK_SCREEN_STATES.MASTER_PASSWORD);
        setDescription(LOCK_SCREEN_DESCRIPTIONS.MASTER_PASSWORD);
        setTopButtonText(LOCK_SCREEN_BUTTON_TOP_TEXTS.MASTER_PASSWORD);
        setBottomButtonText(LOCK_SCREEN_BOTTOM_BUTTON_TEXTS.MASTER_PASSWORD);
        break;
      case LOCK_SCREEN_STATES.MASTER_PASSWORD:
        setLockScreenState(LOCK_SCREEN_STATES.PIN_OR_BIO);
        setDescription(LOCK_SCREEN_DESCRIPTIONS.PIN_OR_BIO);
        setTopButtonText(LOCK_SCREEN_BUTTON_TOP_TEXTS.PIN_OR_BIO);
        setBottomButtonText(LOCK_SCREEN_BOTTOM_BUTTON_TEXTS.PIN_OR_BIO);
        break;
      case LOCK_SCREEN_STATES.PHRASE:
        setLockScreenState(LOCK_SCREEN_STATES.PIN_OR_BIO);
        setDescription(LOCK_SCREEN_DESCRIPTIONS.PIN_OR_BIO);
        setTopButtonText(LOCK_SCREEN_BUTTON_TOP_TEXTS.PIN_OR_BIO);
        setBottomButtonText(LOCK_SCREEN_BOTTOM_BUTTON_TEXTS.PIN_OR_BIO);
        break;
    }
  }

  function handleBottomButtonTap() {
    switch (lockScreenState) {
      case LOCK_SCREEN_STATES.PIN_OR_BIO:
        setLockScreenState(LOCK_SCREEN_STATES.PHRASE);
        setDescription(LOCK_SCREEN_DESCRIPTIONS.PHRASE);
        setTopButtonText(LOCK_SCREEN_BUTTON_TOP_TEXTS.PHRASE);
        setBottomButtonText(LOCK_SCREEN_BOTTOM_BUTTON_TEXTS.PHRASE);
        break;
      case LOCK_SCREEN_STATES.MASTER_PASSWORD:
        setLockScreenState(LOCK_SCREEN_STATES.PHRASE);
        setDescription(LOCK_SCREEN_DESCRIPTIONS.PHRASE);
        setTopButtonText(LOCK_SCREEN_BUTTON_TOP_TEXTS.PHRASE);
        setBottomButtonText(LOCK_SCREEN_BOTTOM_BUTTON_TEXTS.PHRASE);
        break;
      case LOCK_SCREEN_STATES.PHRASE:
        setLockScreenState(LOCK_SCREEN_STATES.MASTER_PASSWORD);
        setDescription(LOCK_SCREEN_DESCRIPTIONS.MASTER_PASSWORD);
        setTopButtonText(LOCK_SCREEN_BUTTON_TOP_TEXTS.MASTER_PASSWORD);
        setBottomButtonText(LOCK_SCREEN_BOTTOM_BUTTON_TEXTS.MASTER_PASSWORD);
        break;
    }
  }

  useEffect(() => {
    retriveBio().then((result) => {
      setHasBio(result);
    });
  }, []);

  return {
    lockScreenState,
    description,
    topButtonText,
    bottomButtonText,
    pin,
    setPin,
    masterPassword,
    setMasterPassword,
    isLoading,
    recoveryPhrase,
    setRecoveryPhrase,
    hasBio,
    handleLogIn,
    handleTopButtonTap,
    handleBottomButtonTap,
    handleFinalPin,
  };
}
