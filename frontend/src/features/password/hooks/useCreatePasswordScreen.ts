import { useState } from "react";
import { useNavigate } from "react-router";
import type PasswordFormData from "../model/PasswordFormData";
import ROUTES from "../../navigation/Routes";
import savePassword from "../api/savePassword";

enum DIALOG_STATUS {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export default function useCreatePasswordScreen() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PasswordFormData>({
    username: "",
    password: "",
    website: "",
    notes: "",
  });
  const [sendButtonDisabled, setSendButtonDisabled] = useState<boolean>(false);
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
    setSendButtonDisabled(true);
    try {
      await savePassword(formData);
      handleDialogOpen(DIALOG_STATUS.SUCCESS);
      setSendButtonDisabled(false);
      setTimeout(() => {
        navigate(ROUTES.HOME);
      }, 1500);
    } catch (error) {
      console.error("Error creating password:", error);
      setSendButtonDisabled(false);
    }
  }

  return {
    formData,
    setFormData,
    sendButtonDisabled,
    isDialogOpen,
    dialogTitle,
    dialogDescription,
    handleNavigateBack,
    handleSubmit,
  };
}
