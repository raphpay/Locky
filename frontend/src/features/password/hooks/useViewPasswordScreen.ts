import { useLocation } from "react-router";
import { usePasswordQuery } from "./usePassword";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import type FIRPasswordDecrypted from "../model/FIRPasswordDecrypted";
import updatePassword from "../api/updatePassword";
import ROUTES from "../../navigation/Routes";
import deletePassword from "../api/deletePassword";

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

  function handleNavigateBack() {
    navigate(-1);
  }

  function navigateBackWithTimeout() {
    setTimeout(() => {
      navigate(ROUTES.HOME);
    }, 1500);
  }

  function handleCopyWebsite() {
    if (data) {
      navigator.clipboard.writeText(data.website);
      displayToast(TOAST_MESSAGE.WEBSITE_COPIED);
    }
  }

  function handleCopyUsername() {
    if (data) {
      navigator.clipboard.writeText(data.username);
      displayToast(TOAST_MESSAGE.USERNAME_COPIED);
    }
  }

  function handleCopyPassword() {
    if (data) {
      navigator.clipboard.writeText(data.password);
      displayToast(TOAST_MESSAGE.PASSWORD_COPIED);
    }
  }

  function handleCopyNotes() {
    if (data) {
      navigator.clipboard.writeText(data.password);
      displayToast(TOAST_MESSAGE.NOTES_COPIED);
    }
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

  useEffect(() => {
    setEditingData(data);
  }, [data]);

  return {
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
  };
}
