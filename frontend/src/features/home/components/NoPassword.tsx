import { Button } from "../../../ui/components/radix/Button";

interface Props {
  handleImport: () => void;
}

function NoPassword({ handleImport }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-secondary-text text-5xl max-w-150 text-center">
        Pas de mot de passe sauvegardé
      </h1>
      <Button onClick={handleImport}>
        Commencer par importer des mots de passe
      </Button>
    </div>
  );
}

export default NoPassword;
