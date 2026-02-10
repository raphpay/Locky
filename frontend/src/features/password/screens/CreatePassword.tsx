import { useNavigate } from "react-router";
import ROUTES from "../../navigation/Routes";
import { useState } from "react";
import type FormData from "../model/PasswordFormData";
import savePassword from "../savePassword";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../ui/components/radix/AlertDialog";

enum DIALOG_STATUS {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

function CreatePassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    website: "",
    notes: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [dialogTitle, setDialogTitle] = useState<string>("");
  const [dialogDescription, setDialogDescription] = useState<string>("");

  function handleNavigateBack() {
    navigate(ROUTES.HOME);
  }

  function handleDialogOpen(status: DIALOG_STATUS) {
    switch (status) {
      case DIALOG_STATUS.SUCCESS:
        setDialogTitle("Succès");
        setDialogDescription("Mot de passe créé avec succès.");
        break;
      case DIALOG_STATUS.ERROR:
        setDialogTitle("Erreur");
        setDialogDescription(
          "Une erreur s'est produite lors de la création du mot de passe.",
        );
        break;
    }
    setIsDialogOpen(true);
  }

  async function handleSubmit() {
    try {
      await savePassword(formData);
      handleDialogOpen(DIALOG_STATUS.SUCCESS);
      setTimeout(() => {
        navigate(ROUTES.HOME);
      }, 1500);
    } catch (error) {
      console.error("Error creating password:", error);
    }
  }

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
        <button type="button" onClick={handleSubmit}>
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
