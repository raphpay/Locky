import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { SignUpProps } from "../screens/SignUp";
import PHRASE_STATUS from "../enum/phraseStatus";
import AuthService from "../AuthService";
import RecoverySeedService from "../../recoverySeed/RecoverySeedService";
import UserService from "../../user/UserService";
import ROUTES from "../../navigation/Routes";
import SIGN_UP_STEP from "../enum/signUpStep";

export default function useSignUpScreen({
  pin,
  setPin,
  setMasterPassword,
  masterPassword,
}: SignUpProps) {
  const navigate = useNavigate();

  const [step, setStep] = useState<SIGN_UP_STEP>(SIGN_UP_STEP.PHRASE);
  const [showPhrase, setShowPhrase] = useState<boolean>(false);
  const [phraseStatus, setPhraseStatus] = useState<PHRASE_STATUS>(
    PHRASE_STATUS.HIDDEN,
  );
  const [copyButtonText, setCopyButtonText] =
    useState<string>("Copier la phrase");
  const [showInput, setShowInput] = useState<boolean>(false);
  const [phrase, setPhrase] = useState<string>("");
  const [showValidatePasswordButton, setShowValidatePasswordButton] =
    useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleMnemonicCopy() {
    navigator.clipboard.writeText(phrase);

    switch (phraseStatus) {
      case PHRASE_STATUS.SHOWN:
        setStep(SIGN_UP_STEP.MASTER_PASSWORD);
        setPhraseStatus(PHRASE_STATUS.COPIED);
        setShowPhrase(false);
        setShowInput(true);
        setCopyButtonText("Revoir la phrase");
        break;
      case PHRASE_STATUS.COPIED:
        setShowPhrase(true);
        setShowInput(false);
        setPhraseStatus(PHRASE_STATUS.COPIED_AND_REVEALED);
        setCopyButtonText("Copier la phrase");
        setStep(SIGN_UP_STEP.PHRASE);
        break;
      case PHRASE_STATUS.COPIED_AND_REVEALED:
        setStep(SIGN_UP_STEP.MASTER_PASSWORD);
        setPhraseStatus(PHRASE_STATUS.COPIED);
        setShowPhrase(false);
        setShowInput(true);
        setCopyButtonText("Revoir la phrase");
        break;
      default:
        setPhraseStatus(PHRASE_STATUS.COPIED);
        break;
    }
  }

  function handleSaveMasterPassword() {
    setStep(SIGN_UP_STEP.PIN);
    setShowValidatePasswordButton(false);
  }

  function handleNavigateBack() {
    navigate(-1);
  }

  function handleFinalPin(finalPin: string) {
    setStep(SIGN_UP_STEP.FINAL);
    setPin(finalPin);
  }

  async function handleSignIn() {
    setIsLoading(true);
    try {
      const userCred = await AuthService.signIn();

      if (userCred !== null)
        await UserService.create(phrase, masterPassword, pin);

      setIsLoading(false);
      navigate(ROUTES.HOME);
    } catch (error) {
      setIsLoading(false);
      console.error("Error signing in:", error);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      const mnemonic = RecoverySeedService.generateRecoverySeed();
      setPhrase(mnemonic);
      setPhraseStatus(PHRASE_STATUS.SHOWN);
      setShowPhrase(true);
    }, 1500);
  }, []);

  return {
    step,
    showPhrase,
    phrase,
    phraseStatus,
    copyButtonText,
    showInput,
    showValidatePasswordButton,
    isLoading,
    handleSaveMasterPassword,
    handleNavigateBack,
    handleMnemonicCopy,
    handleSignIn,
    handleFinalPin,
  };
}
