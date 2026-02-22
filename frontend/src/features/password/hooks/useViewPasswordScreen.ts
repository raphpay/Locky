import { useLocation } from "react-router";
import { usePasswordQuery } from "./usePassword";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import type FIRPasswordDecrypted from "../model/FIRPasswordDecrypted";
import updatePassword from "../api/updatePassword";
import ROUTES from "../../navigation/Routes";
import deletePassword from "../api/deletePassword";
import { useForm } from "@tanstack/react-form";
import { firPasswordFormSchema } from "../model/PasswordFormData";

enum TOAST_MESSAGE {
  WEBSITE_COPIED = "Le site web a été copié.",
  USERNAME_COPIED = "Le nom d'utilisateur a été copié.",
  PASSWORD_COPIED = "Le mot de passe a été copié.",
  NOTES_COPIED = "Les notes ont été copiées.",
  PASSWORD_EDITED = "Le mot de passe a été modifié.",
  PASSWORD_EDITION_ERROR = "Une erreur s'est produite lors de la modification du mot de passe.",
  PASSWORD_DELETED = "Le mot de passe a été supprimé.",
  PASSWORD_DELETION_ERROR = "Une erreur s'est produite lors de la suppression du mot de passe.",
}

enum TOAST_TYPE {
  SUCCESS = "success",
  ERROR = "error",
}

export default function useViewPasswordScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const { passwordID } = location.state;
  const { data, isLoading, error } = usePasswordQuery(passwordID);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingData, setEditingData] = useState<
    FIRPasswordDecrypted | undefined
  >(undefined);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] =
    useState<boolean>(false);
  const [showDeletionAlert, setShowDeletionAlert] = useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      id: data?.id || "",
      title: data?.title || "",
      username: data?.username || "",
      password: data?.password || "",
      website: data?.website || "",
      notes: data?.notes || "",
    },
    validators: {
      onChange: firPasswordFormSchema,
    },
    onSubmit: async ({ value }) => {
      await handleSubmit(value);
    },
  });

  function navigateBackWithTimeout() {
    setTimeout(() => {
      navigate(ROUTES.HOME);
    }, 1500);
  }

  function handleCopy(text: string, message: string) {
    navigator.clipboard.writeText(text);
    displayToast(message);
  }

  function displayToast(
    message: string,
    type: TOAST_TYPE = TOAST_TYPE.SUCCESS,
  ) {
    if (type === TOAST_TYPE.SUCCESS) {
      toast.success(message, {
        position: "top-center",
      });
    } else if (type === TOAST_TYPE.ERROR) {
      toast.error(message, {
        position: "top-center",
      });
    }
  }

  async function handleSave() {
    setIsSaveButtonDisabled(true);

    if (editingData) {
      try {
        await updatePassword(editingData);
        toast.success(TOAST_MESSAGE.PASSWORD_EDITED, {
          position: "top-center",
        });
        displayToast(TOAST_MESSAGE.PASSWORD_EDITED);
        navigateBackWithTimeout();
      } catch (error) {
        console.error(error);
        displayToast(TOAST_MESSAGE.PASSWORD_EDITION_ERROR, TOAST_TYPE.ERROR);
      }
    }

    setIsSaveButtonDisabled(false);
  }

  async function confirmDeletion() {
    if (data) {
      try {
        await deletePassword(data.id);
        displayToast(TOAST_MESSAGE.PASSWORD_DELETED);
        navigateBackWithTimeout();
      } catch (error) {
        console.error(error);
        displayToast(TOAST_MESSAGE.PASSWORD_DELETION_ERROR, TOAST_TYPE.ERROR);
      }
    }
  }

  async function handleSubmit(value: FIRPasswordDecrypted) {
    try {
      await updatePassword(value);
      displayToast(TOAST_MESSAGE.PASSWORD_EDITED);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      displayToast(TOAST_MESSAGE.PASSWORD_EDITION_ERROR, TOAST_TYPE.ERROR);
    }
  }

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, form]);

  return {
    data,
    form,
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
    handleNavigateBack: () => navigate(-1),
    handleCopy,
    handleSave,
    confirmDeletion,
  };
}
