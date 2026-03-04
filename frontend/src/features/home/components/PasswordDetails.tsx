import { Button } from "../../../ui/components/radix/Button";
import type FIRPasswordDecrypted from "../../password/model/FIRPasswordDecrypted";

interface Props {
  selectedPassword: FIRPasswordDecrypted;
}

interface DetailLineProps {
  label: string;
  value: string;
}
interface DetailLineProps {
  label: string;
  value: string;
}

function DetailLine({ label, value }: DetailLineProps) {
  return (
    <div className="flex w-full justify-between items-center gap-6 py-3 border-b border-gray-50 last:border-none">
      <p className="text-primary-text text-sm font-medium shrink-0">{label}</p>

      <div className="min-w-0 flex-1 flex justify-end">
        <p
          className="text-secondary-text text-sm truncate text-right w-fit max-w-full"
          title={value}
        >
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

function PasswordDetails({ selectedPassword }: Props) {
  return (
    <div className="flex flex-col gap-4 items-center h-full w-[50%] mt-16 p-6 animate-in fade-in slide-in-from-right-4 duration-300 overflow-hidden">
      <div className="flex flex-col w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 flex flex-col items-center bg-gray-50/50 border-b border-gray-100">
          <h1 className="text-primary-text text-3xl font-bold text-center wrap-break-words w-full px-4">
            {selectedPassword.title}
          </h1>

          <div className="flex flex-col items-center mt-2 gap-1">
            <p className="text-gray-400 text-xs uppercase tracking-wider">
              Créé le {selectedPassword.createdAt}
            </p>
            {selectedPassword.updatedAt && (
              <p className="text-gray-400 text-xs italic">
                Modifié le {selectedPassword.updatedAt}
              </p>
            )}
          </div>
        </div>

        <div className="p-6 flex flex-col">
          <div className="space-y-1">
            <DetailLine label="Utilisateur" value={selectedPassword.username} />
            <DetailLine
              label="Mot de passe"
              value={selectedPassword.password}
            />
            <DetailLine label="Site web" value={selectedPassword.website} />
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-primary-text text-sm font-medium mb-2">
                Notes
              </p>
              <p className="text-secondary-text text-sm leading-relaxed wrap-break-words">
                {selectedPassword.notes || "Aucune note."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Button variant={"destructive"}>Supprimer</Button>
    </div>
  );
}

export default PasswordDetails;
