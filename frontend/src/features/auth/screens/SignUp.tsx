import { Button } from "../../../ui/components/radix/Button";
import PinPad from "../components/PinPad";
import PHRASE_STATUS from "../enum/phraseStatus";
import SIGN_UP_STEP from "../enum/signUpStep";
import useSignUpScreen from "../hooks/useSignUpScreen";

export interface SignUpProps {
  pin: string;
  masterPassword: string;
  userID: string | null;
  setPin: (pin: string) => void;
  setMasterPassword: (password: string) => void;
  setUserID: (userID: string | null) => void;
}

function SignUp({
  pin,
  masterPassword,
  userID,
  setMasterPassword,
  setPin,
  setUserID,
}: SignUpProps) {
  const {
    step,
    phrase,
    phraseStatus,
    copyButtonText,
    showValidatePasswordButton,
    handleSaveMasterPassword,
    handleNavigateBack,
    handleMnemonicCopy,
    handleSignIn,
    handleFinalPin,
  } = useSignUpScreen({
    pin,
    masterPassword,
    userID,
    setPin,
    setMasterPassword,
    setUserID,
  });

  return (
    <div className="flex flex-1 flex-col gap-2">
      <button className="absolute top-2 left-2" onClick={handleNavigateBack}>
        Retour
      </button>
      <h1>Bonjour, et bienvenue sur Locky!</h1>

      {step === SIGN_UP_STEP.PHRASE && (
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-start">
            Pour commencer, veuillez noter précieusement la phrase suivante.
          </h2>
          <p>
            Elle vous permettra de vous authentifier dans le cas où vous
            perdriez votre mot de passe.
          </p>
          <p>{phrase}</p>
        </div>
      )}
      {phraseStatus !== PHRASE_STATUS.HIDDEN && (
        <button onClick={handleMnemonicCopy}>{copyButtonText}</button>
      )}
      {step === SIGN_UP_STEP.MASTER_PASSWORD && (
        <div className="flex flex-col justify-center items-center">
          <p>Entrez maintenant votre mot de passe :</p>
          <input
            value={masterPassword}
            onChange={(e) => setMasterPassword(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="Master Password"
            type="password"
          />
        </div>
      )}

      {masterPassword !== "" && showValidatePasswordButton && (
        <button onClick={handleSaveMasterPassword}>
          Valider le mot de passe général
        </button>
      )}

      {(step === SIGN_UP_STEP.PIN || step === SIGN_UP_STEP.FINAL) && (
        <div className="flex flex-col items-center gap-6">
          <div>
            <h2 className="text-xl font-bold">Créez votre code PIN :</h2>
            <p className="text-gray-500">Il sera demandé à chaque ouverture</p>
          </div>

          {/*TODO: On hover, display the current PIN */}
          <PinPad
            pin={pin}
            setPin={setPin}
            onComplete={(finalPin) => handleFinalPin(finalPin)}
          />
        </div>
      )}

      {step === SIGN_UP_STEP.FINAL && (
        <Button onClick={handleSignIn}>Commencer à utiliser Locky</Button>
      )}

      {userID && (
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-start">
            Vous êtes connecté en tant que {userID}.
          </h2>
          {/*<button onClick={handleSignOut}>Se déconnecter</button>*/}
        </div>
      )}
    </div>
  );
}

export default SignUp;
