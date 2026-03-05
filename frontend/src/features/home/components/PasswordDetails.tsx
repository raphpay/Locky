import { Toaster } from "../../../ui/components/radix/Sonner";
import { Input } from "../../../ui/components/radix/Input";
import { Button } from "../../../ui/components/radix/Button";
import { Label } from "../../../ui/components/radix/Label";
import useViewPasswordScreen from "../../password/hooks/useViewPasswordScreen";
import DetailField from "../../password/PasswordDetailField";
import type FIRPasswordDecrypted from "../../password/model/FIRPasswordDecrypted";
import DeletePasswordModal from "../../password/components/DeletePasswordModal";
import { ArrowLeft } from "lucide-react";

interface Props {
  selectedPassword: FIRPasswordDecrypted;
  setSelectedPassword: (password: FIRPasswordDecrypted | null) => void;
}

function PasswordDetails({ selectedPassword, setSelectedPassword }: Props) {
  const {
    form,
    data,
    isLoading,
    error,
    isHovered,
    setIsHovered,
    isEditing,
    setIsEditing,
    showDeletionAlert,
    setShowDeletionAlert,
    handleCopy,
    confirmDeletion,
  } = useViewPasswordScreen({ selectedPassword, setSelectedPassword });

  if (isLoading)
    return (
      <div className="h-full flex items-center justify-center p-10 text-secondary-text">
        Chargement...
      </div>
    );

  if (error || !data)
    return (
      <div className="h-full flex items-center justify-center text-destructive p-10">
        Sélectionnez un mot de passe
      </div>
    );

  return (
    <div className="h-full w-full p-6 pt-16 gap-2 animate-in fade-in slide-in-from-right-4 duration-300 overflow-y-auto">
      <Toaster />

      <div className="flex justify-end mb-6 gap-2">
        {isEditing ? (
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                form.reset();
                setIsEditing(false);
              }}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              form="edit-password-form"
              size="sm"
              disabled={!form.state.canSubmit}
            >
              Enregistrer
            </Button>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              variant={"outline"}
              onClick={() => setSelectedPassword(null)}
              size="sm"
            >
              <ArrowLeft />
              Retour
            </Button>
            <Button
              onClick={() => setIsEditing(true)}
              variant="secondary"
              size="sm"
            >
              Modifier
            </Button>
          </div>
        )}
      </div>

      <form
        id="edit-password-form"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="flex flex-col w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-8 flex flex-col items-center bg-gray-50/50 border-b border-gray-100">
          <form.Field
            name="title"
            children={(field) => (
              <div className="w-full">
                {isEditing ? (
                  <Input
                    className="text-center text-2xl font-bold bg-white"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                ) : (
                  <h1
                    className="text-primary-text text-3xl font-bold text-center wrap-break-words cursor-copy hover:text-primary transition-colors"
                    onClick={() => handleCopy(field.state.value, "Titre copié")}
                  >
                    {field.state.value}
                  </h1>
                )}
              </div>
            )}
          />
          {data.updatedAt ||
            (data.createdAt && (
              <p className="text-gray-400 text-[10px] mt-2 uppercase tracking-widest">
                Dernière modification :{" "}
                {new Date(
                  data.updatedAt || data.createdAt,
                ).toLocaleDateString()}
              </p>
            ))}
        </div>

        <div className="p-6">
          <form.Field
            name="username"
            children={(field) => (
              <DetailField
                label="Identifiant"
                value={field.state.value}
                isEditing={isEditing}
                onCopy={() =>
                  handleCopy(field.state.value, "Identifiant copié")
                }
                renderInput={() => (
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                )}
              />
            )}
          />

          <form.Field
            name="password"
            children={(field) => (
              <DetailField
                label="Mot de passe"
                value={field.state.value}
                isEditing={isEditing}
                isPassword
                isHovered={isHovered}
                onHoverChange={setIsHovered}
                onCopy={() =>
                  handleCopy(field.state.value, "Mot de passe copié")
                }
                renderInput={() => (
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                )}
              />
            )}
          />

          <form.Field
            name="website"
            children={(field) => (
              <DetailField
                label="Site Web"
                value={field.state.value}
                isEditing={isEditing}
                onCopy={() => handleCopy(field.state.value, "Lien copié")}
                renderInput={() => (
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                )}
              />
            )}
          />

          <form.Field
            name="notes"
            children={(field) => (
              <div className="mt-6 pt-4 border-gray-50">
                <Label className="text-gray-500 text-xs font-medium mb-2 block uppercase">
                  Notes
                </Label>
                {isEditing ? (
                  <textarea
                    className="w-full p-3 text-sm border rounded-lg focus:ring-1 focus:ring-primary outline-none"
                    rows={3}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                ) : (
                  <p
                    className="text-secondary-text text-sm leading-relaxed cursor-copy hover:bg-gray-50 p-2 rounded-md"
                    onClick={() =>
                      handleCopy(field.state.value, "Notes copiées")
                    }
                  >
                    {field.state.value || (
                      <span className="text-gray-300 italic">Aucune note.</span>
                    )}
                  </p>
                )}
              </div>
            )}
          />
        </div>
      </form>

      {isEditing && (
        <Button
          variant="destructive"
          onClick={() => setShowDeletionAlert(true)}
          className="w-full text-[10px] mt-4 uppercase font-bold tracking-tighter transition-colors"
        >
          Supprimer ce mot de passe
        </Button>
      )}

      <DeletePasswordModal
        title={data.title}
        showDeletionAlert={showDeletionAlert}
        setShowDeletionAlert={setShowDeletionAlert}
        confirmDeletion={confirmDeletion}
      />
    </div>
  );
}

export default PasswordDetails;
