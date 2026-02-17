import { Button } from "../../../ui/components/radix/Button";
import CACHE_KEYS from "../../cache/CACHE_KEYS";
import CacheService from "../../cache/CacheService";
import LoadingSpinner from "../components/LoadingSpinner";
import PinPad from "../components/PinPad";
import LOGIN_METHOD from "../enum/loginMethod";
import useLoginScreen from "../hooks/useLoginScreen";

function LogIn() {
  const {
    pin,
    setPin,
    masterPassword,
    setMasterPassword,
    step,
    isLoading,
    recoveryPhrase,
    setRecoveryPhrase,
    hasBio,
    handleNavigateBack,
    handleLogIn,
    handleForgot,
    handleFinalPin,
  } = useLoginScreen();

  return (
    <div className="flex flex-col gap-2">
      <LoadingSpinner isLoading={isLoading} />

      <button className="absolute top-2 left-2" onClick={handleNavigateBack}>
        Retour
      </button>

      <h2 className="font-bold text-2xl">Les mots de passe sont bloqués</h2>

      {hasBio && (
        <button
          className="btn btn-primary"
          onClick={() => handleLogIn(LOGIN_METHOD.BIOMETRICS)}
        >
          Utiliser la biometrie
        </button>
      )}
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

      {step === LOGIN_METHOD.RECOVERY_PHRASE && (
        <div className="flex flex-col justify-center items-center">
          <p>Entrez votre phrase de récupération pour dévérouiller l'app</p>
          <p>Attention, c'est votre dernière chance pour débloquer l'app</p>
          <input
            value={recoveryPhrase}
            onChange={(e) => setRecoveryPhrase(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="lorem ipsum dolor"
            type="text"
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
            onClick={() => handleForgot(LOGIN_METHOD.RECOVERY_PHRASE)}
          >
            Je ne me souviens plus de mon mot de passe
          </Button>
        </div>
      )}

      {step === LOGIN_METHOD.RECOVERY_PHRASE && recoveryPhrase !== "" && (
        <Button onClick={() => handleLogIn(LOGIN_METHOD.RECOVERY_PHRASE)}>
          Entrer dans l'application
        </Button>
      )}
    </div>
  );
}

export default LogIn;
