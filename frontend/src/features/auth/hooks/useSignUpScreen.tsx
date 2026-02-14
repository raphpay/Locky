import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { SignUpProps } from "../screens/SignUp";
import PHRASE_STATUS from "../enum/phraseStatus";
import AuthService from "../AuthService";
import RecoverySeedService from "../../recoverySeed/RecoverySeedService";
import UserService from "../../user/UserService";
import ROUTES from "../../navigation/Routes";

export default function useSignUpScreen({
  masterPassword,
  setUserID,
}: SignUpProps) {
  const navigate = useNavigate();

  const [showPhrase, setShowPhrase] = useState<boolean>(false);
  const [phraseStatus, setPhraseStatus] = useState<PHRASE_STATUS>(
    PHRASE_STATUS.HIDDEN,
  );
  const [copyButtonText, setCopyButtonText] =
    useState<string>("Copier la phrase");
  const [showInput, setShowInput] = useState<boolean>(false);
  const [phrase, setPhrase] = useState<string>("");

  function handleMnemonicCopy() {
    navigator.clipboard.writeText(phrase);

    switch (phraseStatus) {
      case PHRASE_STATUS.SHOWN:
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
        break;
      case PHRASE_STATUS.COPIED_AND_REVEALED:
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

  async function handleSignIn() {
    try {
      const userCred = await AuthService.signIn();
      setUserID(userCred);

      const mnemonic = RecoverySeedService.generateRecoverySeed();
      setPhrase(mnemonic);

      if (userCred !== null)
        await UserService.create(userCred, mnemonic, masterPassword);

      console.log("1", userCred);
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  }

  function handleNavigateBack() {
    navigate(-1);
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
    showPhrase,
    phrase,
    phraseStatus,
    copyButtonText,
    showInput,
    handleNavigateBack,
    handleMnemonicCopy,
    handleSignIn,
  };
}
