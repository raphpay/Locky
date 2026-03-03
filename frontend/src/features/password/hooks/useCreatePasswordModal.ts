import { useState } from "react";
import { useNavigate } from "react-router";
import ROUTES from "../../navigation/Routes";
import savePassword from "../api/savePassword";
import { useForm } from "@tanstack/react-form";
import {
  passwordFormSchema,
  type PasswordFormData,
} from "../model/PasswordFormData";
import { extractSiteName } from "../api/extractSiteName";
import type { CreatePasswordModalProps } from "../components/CreatePasswordModal";
import DIALOG_STATUS from "../enum/DialogStatus";

export default function useCreatePasswordModal({
  setDisplay,
}: Partial<CreatePasswordModalProps>) {
  const navigate = useNavigate();
  const [sendButtonDisabled, setSendButtonDisabled] = useState<boolean>(false);
  const [dialogStatus, setDialogStatus] = useState<DIALOG_STATUS>(
    DIALOG_STATUS.BASE,
  );
  const [dialogTitle, setDialogTitle] = useState<string>(
    "Nouveau mot de passe",
  );
  const [dialogDescription, setDialogDescription] = useState<string>(
    "Créer un nouveau mot de passe pour votre compte.",
  );
  const [suggestedTitle, setSuggestedTitle] = useState<string>("");
  const form = useForm({
    defaultValues: {
      title: "",
      username: "",
      password: "",
      website: "",
      notes: "",
    },
    validators: {
      onSubmit: passwordFormSchema,
    },
    onSubmit: async (formData) => {
      await handleSubmit(formData.value);
    },
  });

  function handleNavigateBack() {
    navigate(ROUTES.HOME);
  }

  function handleStatusChange(status: DIALOG_STATUS) {
    setDialogStatus(status);
    switch (status) {
      case DIALOG_STATUS.BASE:
        setDialogTitle("Nouveau mot de passe");
        setDialogDescription(
          "Créer un nouveau mot de passe pour votre compte.",
        );
        break;
      case DIALOG_STATUS.SENDING:
        setDialogTitle("Envoi en cours");
        setDialogDescription("Veuillez patienter...");
        break;
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
  }

  function onWebsiteLosesFocus(url: string) {
    if (!url) {
      setSuggestedTitle("");
      return;
    }

    const extractedName = extractSiteName(url);

    // Automatically update the title
    // Logic: We only replace the placeholder of the title if empty or
    // if the user hasn't already changed it.
    const currentTitle = form.getFieldValue("title");

    if (
      !currentTitle ||
      currentTitle.length <= 1 ||
      url.includes(currentTitle.toLowerCase())
    ) {
      setSuggestedTitle(extractedName);
    }
  }

  async function handleSubmit(value: PasswordFormData) {
    setSendButtonDisabled(true);
    handleStatusChange(DIALOG_STATUS.SENDING);
    try {
      const finalTitle =
        value.title.trim() !== ""
          ? value.title
          : suggestedTitle || extractSiteName(value.website) || "Sans Titre";
      const dataToSave: PasswordFormData = {
        ...value,
        title: finalTitle,
      };
      await savePassword(dataToSave);
      handleStatusChange(DIALOG_STATUS.SUCCESS);
      setSendButtonDisabled(false);
      form.reset();
      setTimeout(() => {
        setDisplay?.(false);
        handleStatusChange(DIALOG_STATUS.BASE);
      }, 1500);
    } catch (error) {
      console.error("Error creating password:", error);
      handleStatusChange(DIALOG_STATUS.ERROR);
      setTimeout(() => {
        handleStatusChange(DIALOG_STATUS.BASE);
      }, 1500);
      setSendButtonDisabled(false);
    }
  }

  return {
    form,
    sendButtonDisabled,
    dialogStatus,
    dialogTitle,
    dialogDescription,
    suggestedTitle,
    handleNavigateBack,
    onWebsiteLosesFocus,
  };
}
