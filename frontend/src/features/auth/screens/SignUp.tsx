import { ArrowLeft, ClipboardCopy } from "lucide-react";
import { cn } from "../../../lib/utils";
import { Button } from "../../../ui/components/radix/Button";
import { Toaster } from "../../../ui/components/radix/Sonner";

import LoadingSpinner from "../components/LoadingSpinner";
import useSignUpScreen from "../hooks/useSignUpScreen";
import { SecureInput } from "../../../ui/components/radix/SecureInput";
import PinPad from "../components/PinPad";
import BackButton from "../../../ui/components/custom/BackButton";

function SignUp() {
  const {
    pin,
    setPin,
    masterPassword,
    setMasterPassword,
    step,
    phrase,
    isLoading,
    currentConfig,
    isContinueDisabled,
    nextStep,
    previousStep,
    handleMnemonicCopy,
    handleNavigationToLogIn,
  } = useSignUpScreen();

  return (
    <div className="flex flex-1 flex-col items-center justify-center h-full w-full gap-4 m-auto">
      <LoadingSpinner isLoading={isLoading} />

      {step !== 0 && <BackButton onClick={previousStep} />}

      <div className="flex flex-col items-center justify-center w-full">
        <h1
          className={cn(
            "text-primary-text",
            step === 0 ? "text-5xl" : "text-2xl",
          )}
        >
          {currentConfig.title}
        </h1>
        <p className="text-xl text-secondary-text text-center max-w-150">
          {currentConfig.description}
        </p>
      </div>

      {step === 1 && (
        <div className="flex flex-row max-w-200">
          <p className="text-2xl font-semibold text-center">{phrase}</p>
          <Button variant={"accent"} onClick={handleMnemonicCopy}>
            <ClipboardCopy />
          </Button>
        </div>
      )}

      {step == 2 && (
        <SecureInput
          value={masterPassword}
          onChange={(e) => setMasterPassword(e.target.value)}
          placeholder={"Mot_de_passe123"}
          className="w-150"
          type="password"
        />
      )}

      {step === 3 && (
        <PinPad
          pin={pin}
          setPin={setPin}
          onComplete={() => console.log("Pin entered")}
        />
      )}

      <Button
        className="w-150"
        onClick={nextStep}
        disabled={isContinueDisabled}
      >
        {currentConfig.button}
      </Button>

      <Button variant={"link"} onClick={handleNavigationToLogIn}>
        J'ai déjà un coffre-fort
      </Button>

      <Toaster />
    </div>
  );
}

export default SignUp;
