import useLockScreen from "../hooks/useLockScreen";
import SVGLock from "../../../assets/SVGIcons/SVGLock";
import SVGTouchID from "../../../assets/SVGIcons/SVGTouchID";
import PinPad from "../components/PinPad";
import { Button } from "../../../ui/components/radix/Button";
import { LOCK_SCREEN_STATES } from "../enum/lockScreenStates";
import { Input } from "../../../ui/components/radix/Input";
import { ArrowRight } from "lucide-react";
import LOGIN_METHOD from "../enum/loginMethod";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../../ui/components/radix/HoverCard";

function LockScreen() {
  const {
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
  } = useLockScreen();

  return (
    <div className="flex flex-1 flex-col items-center justify-center h-full w-full gap-4">
      <LoadingSpinner isLoading={isLoading} />

      <SVGLock className="text-primary-text" />
      <div className="flex-col flex items-center">
        <h1 className="text-primary-text text-2xl">Coffre fort vérrouillé</h1>
        <p className="text-xl text-secondary-text">{description}</p>
      </div>
      {lockScreenState === LOCK_SCREEN_STATES.PIN_OR_BIO && (
        <div className="flex flex-col items-center justify-center gap-2">
          {hasBio && (
            <HoverCard openDelay={10} closeDelay={100}>
              <HoverCardTrigger asChild>
                <button
                  className="cursor-pointer"
                  onClick={() => handleLogIn(LOGIN_METHOD.BIOMETRICS)}
                >
                  <SVGTouchID className="text-primary" />
                </button>
              </HoverCardTrigger>
              <HoverCardContent className="flex w-64 flex-col gap-0.5">
                <p className="text-center text-primary-text text-sm font-medium">
                  Déverrouiller avec Touch ID
                </p>
              </HoverCardContent>
            </HoverCard>
          )}
          <PinPad
            pin={pin}
            setPin={setPin}
            shuffled={true}
            onComplete={handleFinalPin}
          />
        </div>
      )}

      {lockScreenState === LOCK_SCREEN_STATES.MASTER_PASSWORD && (
        <div className="flex flex-row gap-2">
          <Input
            id={"masterPassword"}
            name={"masterPassword"}
            value={masterPassword}
            onChange={(e) => setMasterPassword(e.target.value)}
            placeholder={"Mot_de_passe123"}
            autoComplete="off"
            className="w-150"
          />
          <Button onClick={() => handleLogIn(LOGIN_METHOD.MASTER_PASSWORD)}>
            <ArrowRight />
          </Button>
        </div>
      )}
      {lockScreenState === LOCK_SCREEN_STATES.PHRASE && (
        <div className="flex flex-row gap-2">
          <Input
            id={"recoveryPhrase"}
            name={"recoveryPhrase"}
            value={recoveryPhrase}
            onChange={(e) => setRecoveryPhrase(e.target.value)}
            placeholder={"citron boeuf machine ordinateur empreinte ..."}
            autoComplete="off"
            className="w-150"
          />
          <Button onClick={() => handleLogIn(LOGIN_METHOD.RECOVERY_PHRASE)}>
            <ArrowRight />
          </Button>
        </div>
      )}

      <div className="flex flex-col items-center justify-center">
        <Button
          variant={"link"}
          type="button"
          onClick={handleTopButtonTap}
          className="rounded-full flex items-center justify-center transition-all active:scale-90"
        >
          {topButtonText}
        </Button>
        <Button
          variant={"link"}
          type="button"
          onClick={handleBottomButtonTap}
          className="rounded-full flex items-center justify-center transition-all active:scale-90"
        >
          {bottomButtonText}
        </Button>
      </div>
    </div>
  );
}

export default LockScreen;
