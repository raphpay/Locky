import { Input } from "../../../ui/components/radix/Input";
import { Button } from "../../../ui/components/radix/Button";
import { ArrowRight } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import useLoginWithPhrase from "../hooks/useLoginWithPhrase";
import BackButton from "../../../ui/components/custom/BackButton";

function LoginWithPhrase() {
  const { isLoading, recoveryPhrase, setRecoveryPhrase, handleLogIn } =
    useLoginWithPhrase();

  return (
    <div className="flex flex-1 flex-col items-center justify-center h-full w-full gap-4">
      <BackButton />
      <LoadingSpinner isLoading={isLoading} />

      <h1 className="text-primary-text text-2xl">
        Entrez votre phrase de récupération
      </h1>
      <p className="text-xl text-secondary-text">
        Seule cette phrase vous permettra de relier votre compte à cet appareil.
      </p>
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
        <Button onClick={handleLogIn}>
          <ArrowRight />
        </Button>
      </div>

      <Button onClick={handleLogIn}>Continuer</Button>
    </div>
  );
}

export default LoginWithPhrase;
