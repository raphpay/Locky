import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../ui/components/radix/AlertDialog";
import useCreatePasswordScreen from "../hooks/useCreatePasswordScreen";

function CreatePassword() {
  const {
    formData,
    setFormData,
    sendButtonDisabled,
    isDialogOpen,
    dialogTitle,
    dialogDescription,
    handleNavigateBack,
    handleSubmit,
  } = useCreatePasswordScreen();

  return (
    <div className="flex flex-1 flex-col gap-2">
      <button onClick={handleNavigateBack} className="absolute top-2 left-2">
        Retour
      </button>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          className="border rounded-sm p-1"
          type="text"
          id="user-name"
          name="user-name"
          placeholder="Nom d'utilisateur"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <input
          className="border rounded-sm p-1"
          type="password"
          id="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <input
          className="border rounded-sm p-1"
          type="text"
          id="website"
          name="website"
          placeholder="Site Web"
          value={formData.website}
          onChange={(e) =>
            setFormData({ ...formData, website: e.target.value })
          }
        />
        <textarea
          className="border rounded-sm p-1"
          id="note"
          name="note"
          placeholder="Notes ( optionnel )"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />
        <button
          type="button"
          onClick={handleSubmit}
          disabled={sendButtonDisabled}
        >
          Create Password
        </button>
      </form>

      <AlertDialog defaultOpen={false} open={isDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
            <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default CreatePassword;
