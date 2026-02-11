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
import useViewPasswordScreen from "../hooks/useViewPasswordScreen";

function ViewPassword() {
  const {
    data,
    isLoading,
    error,
    isHovered,
    setIsHovered,
    isEditing,
    setIsEditing,
    editingData,
    setEditingData,
    isSaveButtonDisabled,
    showDeletionAlert,
    setShowDeletionAlert,
    handleNavigateBack,
    handleCopyWebsite,
    handleCopyUsername,
    handleCopyPassword,
    handleCopyNotes,
    handleSave,
    confirmDeletion,
  } = useViewPasswordScreen();

  if (isLoading)
    return (
      <div className="h-full w-full flex items-center justify-center">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="h-full w-full flex items-center justify-center">
        Error while loading password
      </div>
    );

  return (
    <div className="flex flex-1 flex-col gap-2">
      <div className="absolute top-2 right-2 flex gap-2">
        <button onClick={handleNavigateBack}>Retour</button>
        <button
          className={isEditing ? "text-green-600 font-bold" : "text-blue-600"}
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          disabled={isSaveButtonDisabled}
        >
          {isEditing ? "Enregistrer" : "Modifier"}
        </button>
        {isEditing && (
          <button onClick={() => setIsEditing(false)}>Annuler</button>
        )}
      </div>

      {data ? (
        <div className="flex flex-col gap-2">
          <div>
            {isEditing && editingData ? (
              <input
                id="title"
                type="text"
                className="border rounded-sm p-1"
                placeholder="Titre"
                value={editingData.title}
                onChange={(e) =>
                  setEditingData({ ...editingData, title: e.target.value })
                }
              />
            ) : (
              <div className="cursor-copy" onClick={handleCopyWebsite}>
                <h2 className="font-bold text-2xl">{data.title}</h2>
              </div>
            )}
          </div>

          <div>
            <span className="text-sm text-gray-500 block">Site web</span>
            {isEditing && editingData ? (
              <input
                id="website"
                type="text"
                className="border rounded-sm p-1"
                placeholder="Site Web"
                value={editingData.website}
                onChange={(e) =>
                  setEditingData({ ...editingData, website: e.target.value })
                }
              />
            ) : (
              <div className="cursor-copy" onClick={handleCopyWebsite}>
                <p className="font-medium">{data.website}</p>
              </div>
            )}
          </div>
          <div>
            <span className="text-sm text-gray-500 block">Identifiant</span>
            {isEditing && editingData ? (
              <input
                id="username"
                type="text"
                className="border rounded-sm p-1"
                placeholder="Identifiant"
                value={editingData.username}
                onChange={(e) =>
                  setEditingData({ ...editingData, username: e.target.value })
                }
              />
            ) : (
              <div className="cursor-copy" onClick={handleCopyUsername}>
                <p className="font-medium">{data.username}</p>
              </div>
            )}
          </div>

          <div>
            <span className="text-sm text-gray-500 block">Password</span>
            {isEditing && editingData ? (
              <input
                id="password"
                type="text"
                className="border rounded-sm p-1"
                value={editingData.password}
                onChange={(e) =>
                  setEditingData({ ...editingData, password: e.target.value })
                }
              />
            ) : (
              <div
                className="p-2 rounded cursor-copy transition-all duration-200"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleCopyPassword}
              >
                {/* Logique d'affichage conditionnel */}
                <p className="font-mono text-lg tracking-wider">
                  {isHovered ? data.password : "••••••••••••"}
                </p>
              </div>
            )}
          </div>

          <div>
            <span className="text-sm text-gray-500 block">Notes</span>
            {isEditing && editingData ? (
              <input
                id="notes"
                type="text"
                className="border rounded-sm p-1"
                value={editingData.notes}
                onChange={(e) =>
                  setEditingData({ ...editingData, notes: e.target.value })
                }
              />
            ) : (
              <div className="cursor-copy" onClick={handleCopyNotes}>
                <p className="font-medium">{data.notes}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>Données invalides</p>
      )}

      {isEditing && (
        <button
          className="bg-red-400 hover:bg-red-300 cursor-pointer"
          onClick={() => setShowDeletionAlert(true)}
        >
          Supprimer
        </button>
      )}

      <Toaster />

      <AlertDialog defaultOpen={false} open={showDeletionAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer le mot de passe</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer ce mot de passe ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeletionAlert(false)}>
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeletion}>
              Confirmer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ViewPassword;
