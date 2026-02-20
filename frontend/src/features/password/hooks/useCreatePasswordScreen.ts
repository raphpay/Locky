import { useState } from "react";
import { useNavigate } from "react-router";
import type PasswordFormData from "../model/PasswordFormData";
import ROUTES from "../../navigation/Routes";
import savePassword from "../api/savePassword";
import { useForm } from "@tanstack/react-form";
import { passwordFormSchema } from "../model/PasswordFormData";
import { extractSiteName } from "../api/extractSiteName";

enum DIALOG_STATUS {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export default function useCreatePasswordScreen() {
  const navigate = useNavigate();
  const [sendButtonDisabled, setSendButtonDisabled] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [dialogTitle, setDialogTitle] = useState<string>("");
  const [dialogDescription, setDialogDescription] = useState<string>("");
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
      await handleSubmit(formData.value as PasswordFormData);
    },
  });

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
    form,
    sendButtonDisabled,
    isDialogOpen,
    dialogTitle,
    dialogDescription,
    suggestedTitle,
    handleNavigateBack,
    onWebsiteLosesFocus,
  };
}
