import { Button } from "../../../ui/components/radix/Button";
import { Spinner } from "../../../ui/components/radix/Spinner";
import LoadingSpinner from "../components/LoadingSpinner";
import PinPad from "../components/PinPad";
import LOGIN_METHOD from "../enum/loginMethod";
import useLoginScreen from "../hooks/useLoginScreen";

export interface LoginProps {
  pin: string;
  masterPassword: string;
  setPin: (pin: string) => void;
  setMasterPassword: (password: string) => void;
}

function LogIn({ pin, masterPassword, setPin, setMasterPassword }: LoginProps) {
  const {
    step,
    isLoading,
    handleNavigateBack,
    handleLogIn,
    handleForgot,
    handleFinalPin,
  } = useLoginScreen({
    pin,
    masterPassword,
    setPin,
    setMasterPassword,
  });

  return (
    <div className="flex flex-col gap-2">
      <LoadingSpinner isLoading={isLoading} />

      <button className="absolute top-2 left-2" onClick={handleNavigateBack}>
        Retour
      </button>
      <h2 className="font-bold text-2xl">Les mots de passe sont bloqués</h2>

      {step === LOGIN_METHOD.PIN && (
        <div className="flex flex-col justify-center items-center">
          <p>Entrez votre code PIN pour dévérouiller l'app</p>
          <PinPad
            pin={pin}
            setPin={setPin}
            shuffled={true}
            onComplete={handleFinalPin}
          />
        </div>
      )}

      {step === LOGIN_METHOD.MASTER_PASSWORD && (
        <div className="flex flex-col justify-center items-center">
          <p>Entrez votre mot de passe pour dévérouiller l'app</p>
          <input
            value={masterPassword}
            onChange={(e) => setMasterPassword(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="Mot de passe général"
            type="password"
          />
        </div>
      )}

      {step === LOGIN_METHOD.PIN && (
        <div className="flex flex-col gap-2">
          {pin !== "" && (
            <Button onClick={() => handleLogIn(LOGIN_METHOD.PIN)}>
              Entrer dans l'application
            </Button>
          )}
          <Button
            variant={"link"}
            onClick={() => handleForgot(LOGIN_METHOD.MASTER_PASSWORD)}
          >
            Je ne me souviens plus de mon code PIN
          </Button>
        </div>
      )}

      {step === LOGIN_METHOD.MASTER_PASSWORD && (
        <div className="flex flex-col gap-2">
          {masterPassword !== "" && (
            <Button onClick={() => handleLogIn(LOGIN_METHOD.MASTER_PASSWORD)}>
              Entrer dans l'application
            </Button>
          )}
          <Button
            variant={"link"}
            onClick={() => handleForgot(LOGIN_METHOD.MASTER_PASSWORD)}
          >
            Je ne me souviens plus de mon mot de passe
          </Button>
        </div>
      )}

      {/*TODO: Handle mnemonic login*/}
      {step === LOGIN_METHOD.MASTER_PASSWORD && pin !== "" && (
        <Button onClick={() => handleLogIn(LOGIN_METHOD.MASTER_PASSWORD)}>
          Entrer dans l'application
        </Button>
      )}
    </div>
  );
}

export default LogIn;
