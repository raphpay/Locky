import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../ui/components/radix/AlertDialog";
import { Toaster } from "../../../ui/components/radix/Sonner";
import { Input } from "../../../ui/components/radix/Input";
import { Button } from "../../../ui/components/radix/Button";
import useViewPasswordScreen from "../hooks/useViewPasswordScreen";
import { Label } from "../../../ui/components/radix/Label";

function ViewPassword() {
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
    handleNavigateBack,
    handleCopy,
    confirmDeletion,
  } = useViewPasswordScreen();

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        Chargement...
      </div>
    );
  if (error || !data)
    return (
      <div className="flex h-full w-full items-center justify-center text-red-500">
        Erreur de chargement
      </div>
    );

  return (
    <div className="flex flex-1 flex-col gap-6 p-4">
      <Toaster />

      {/* Header avec Navigation et Actions */}
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={handleNavigateBack}>
          ← Retour
        </Button>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
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
                className="bg-green-600 hover:bg-green-700"
                disabled={!form.state.canSubmit}
              >
                Enregistrer
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Modifier</Button>
          )}
        </div>
      </div>

      {/* Formulaire Principal */}
      <form
        id="edit-password-form"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="flex flex-col gap-4"
      >
        {/* TITRE */}
        <form.Field
          name="title"
          children={(field) => (
            <div className="mb-4">
              {isEditing ? (
                <Input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="text-2xl font-bold h-auto py-1"
                  placeholder="Titre"
                />
              ) : (
                <h2
                  className="text-3xl font-bold cursor-copy hover:text-blue-600 transition-colors"
                  onClick={() => handleCopy(field.state.value, "Titre copié")}
                >
                  {field.state.value}
                </h2>
              )}
            </div>
          )}
        />

        {/* SITE WEB */}
        <form.Field
          name="website"
          children={(field) => (
            <>
              <Label className="text-gray-500">Site Web</Label>
              <div>
                {isEditing ? (
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                ) : (
                  <p
                    className="font-medium cursor-copy p-2 rounded hover:bg-gray-100"
                    onClick={() => handleCopy(field.state.value, "Lien copié")}
                  >
                    {field.state.value}
                  </p>
                )}
              </div>
            </>
          )}
        />

        {/* IDENTIFIANT */}
        <form.Field
          name="username"
          children={(field) => (
            <>
              <Label className="text-gray-500">Identifiant</Label>
              <div>
                {isEditing ? (
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                ) : (
                  <p
                    className="font-medium cursor-copy p-2 rounded hover:bg-gray-100"
                    onClick={() =>
                      handleCopy(field.state.value, "Identifiant copié")
                    }
                  >
                    {field.state.value}
                  </p>
                )}
              </div>
            </>
          )}
        />

        <form.Field
          name="password"
          children={(field) => (
            <>
              <Label className="text-gray-500">Mot de passe</Label>
              <div>
                {isEditing ? (
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                ) : (
                  <div
                    className="p-2 rounded cursor-copy hover:bg-gray-100 transition-all font-mono text-lg tracking-wider"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() =>
                      handleCopy(field.state.value, "Mot de passe copié")
                    }
                  >
                    {isHovered ? field.state.value : "••••••••••••"}
                  </div>
                )}
              </div>
            </>
          )}
        />

        {/* NOTES */}
        <form.Field
          name="notes"
          children={(field) => (
            <>
              <Label className="text-gray-500">Notes</Label>
              <div>
                {isEditing ? (
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                ) : (
                  <p
                    className="font-medium cursor-copy p-2 rounded hover:bg-gray-100 min-h-10"
                    onClick={() =>
                      handleCopy(field.state.value, "Notes copiées")
                    }
                  >
                    {field.state.value || (
                      <span className="text-gray-300 italic">Aucune note</span>
                    )}
                  </p>
                )}
              </div>
            </>
          )}
        />
      </form>

      {/* Bouton de Suppression */}
      {isEditing && (
        <Button
          variant="destructive"
          className="mt-8 w-full"
          onClick={() => setShowDeletionAlert(true)}
        >
          Supprimer ce mot de passe
        </Button>
      )}

      {/* Dialog de confirmation */}
      <AlertDialog open={showDeletionAlert} onOpenChange={setShowDeletionAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmation</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Voulez-vous vraiment supprimer ce
              compte ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeletion} className="bg-red-600">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ViewPassword;
