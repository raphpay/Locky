import { cn } from "../../../lib/utils";
import { Button } from "../../../ui/components/radix/Button";
import { Toaster } from "../../../ui/components/radix/Sonner";
import LoadingSpinner from "../components/LoadingSpinner";
import PinPad from "../components/PinPad";
import BackButton from "../../../ui/components/custom/BackButton";
import useLoginScreen from "../hooks/useLoginScreen";

function Login() {
  const {
    pin,
    setPin,
    step,
    isLoading,
    currentConfig,
    isContinueDisabled,
    nextStep,
    backToRoot,
  } = useLoginScreen();

  return (
    <div className="flex flex-1 flex-col items-center justify-center h-full w-full gap-4 m-auto">
      <LoadingSpinner isLoading={isLoading} />

      {step !== 0 && <BackButton onClick={backToRoot} />}

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

      <Toaster />
    </div>
  );
}

export default Login;
