import PHRASE_STATUS from "../enum/phraseStatus";
import useSignUpScreen from "../hooks/useSignUpScreen";

export interface SignUpProps {
  masterPassword: string;
  userID: string | null;
  setMasterPassword: (password: string) => void;
  setUserID: (userID: string | null) => void;
}

function SignUp({
  masterPassword,
  userID,
  setMasterPassword,
  setUserID,
}: SignUpProps) {
  const {
    showPhrase,
    phrase,
    phraseStatus,
    copyButtonText,
    showInput,
    handleNavigateBack,
    handleMnemonicCopy,
    handleSignIn,
  } = useSignUpScreen({ masterPassword, userID, setMasterPassword, setUserID });

  return (
    <div className="flex flex-1 flex-col gap-2">
      <button className="absolute top-2 left-2" onClick={handleNavigateBack}>
        Retour
      </button>
      <h1>Bonjour, et bienvenue sur Locky!</h1>

      {showPhrase && (
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
      {showInput && (
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

      {masterPassword !== "" && (
        <button onClick={handleSignIn}>Entrer dans l'application</button>
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
