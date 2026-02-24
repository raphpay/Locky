import { Button } from "../../../ui/components/radix/Button";
import LoadingSpinner from "../components/LoadingSpinner";
import PinPad from "../components/PinPad";
import PHRASE_STATUS from "../enum/phraseStatus";
import SIGN_UP_STEP from "../enum/signUpStep";
import useSignUpScreen from "../hooks/useSignUpScreen";

function SignUp() {
  const {
    pin,
    setPin,
    masterPassword,
    setMasterPassword,
    step,
    phrase,
    phraseStatus,
    copyButtonText,
    showValidatePasswordButton,
    isLoading,
    handleSaveMasterPassword,
    handleNavigateBack,
    handleMnemonicCopy,
    handleSignIn,
    handleFinalPin,
    handleNavigationToLogIn,
  } = useSignUpScreen();

  return (
    <div className="flex flex-1 flex-col items-center justify-center h-full w-full gap-4">
      <LoadingSpinner isLoading={isLoading} />
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-primary-text text-4xl">Bienvenue sur Locky</h1>
        <p className="text-xl text-secondary-text text-center">
          Vos mots de passe sécurisés, et sans compte à créer. <br /> Que
          demander de plus ?
        </p>
      </div>

      <Button variant={"link"} onClick={handleNavigationToLogIn}>
        J'ai déjà un coffre-fort
      </Button>
    </div>
  );
}

export default SignUp;
