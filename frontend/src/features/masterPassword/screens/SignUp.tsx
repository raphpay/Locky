import { useEffect, useState } from "react";
import generateRecoverySeed from "../../recoverySeed/generateRecoverySeed";
import signIn from "../../auth/signIn";
import createUser from "../../user/createUser";
import { useNavigate } from "react-router";
import ROUTES from "../../navigation/ROUTES";

interface Props {
  masterPassword: string;
  userID: string | null;
  setMasterPassword: (password: string) => void;
  setUserID: (userID: string | null) => void;
}

enum PhraseStatus {
  HIDDEN = "hidden",
  SHOWN = "revealed",
  COPIED = "copied",
  COPIED_AND_REVEALED = "copied-and-revealed",
}

function SignUp({
  masterPassword,
  userID,
  setMasterPassword,
  setUserID,
}: Props) {
  const navigate = useNavigate();

  const [showPhrase, setShowPhrase] = useState<boolean>(false);
  const [phraseStatus, setPhraseStatus] = useState<PhraseStatus>(
    PhraseStatus.HIDDEN,
  );
  const [copyButtonText, setCopyButtonText] =
    useState<string>("Copier la phrase");
  const [showInput, setShowInput] = useState<boolean>(false);
  const [phrase, setPhrase] = useState<string>("");

  function handleMnemonicCopy() {
    navigator.clipboard.writeText(phrase);

    switch (phraseStatus) {
      case PhraseStatus.SHOWN:
        setPhraseStatus(PhraseStatus.COPIED);
        setShowPhrase(false);
        setShowInput(true);
        setCopyButtonText("Revoir la phrase");
        break;
      case PhraseStatus.COPIED:
        setShowPhrase(true);
        setShowInput(false);
        setPhraseStatus(PhraseStatus.COPIED_AND_REVEALED);
        setCopyButtonText("Copier la phrase");
        break;
      case PhraseStatus.COPIED_AND_REVEALED:
        setPhraseStatus(PhraseStatus.COPIED);
        setShowPhrase(false);
        setShowInput(true);
        setCopyButtonText("Revoir la phrase");
        break;
      default:
        setPhraseStatus(PhraseStatus.COPIED);
        break;
    }
  }

  async function handleSignIn() {
    try {
      const userCred = await signIn();
      setUserID(userCred);

      const mnemonic = generateRecoverySeed();
      setPhrase(mnemonic);

      if (userCred !== null)
        await createUser(userCred, mnemonic, masterPassword);

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
      const mnemonic = generateRecoverySeed();
      setPhrase(mnemonic);
      setPhraseStatus(PhraseStatus.SHOWN);
      setShowPhrase(true);
    }, 1500);
  }, []);

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
      {phraseStatus !== PhraseStatus.HIDDEN && (
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
