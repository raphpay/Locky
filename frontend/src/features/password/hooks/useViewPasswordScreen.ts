import { useLocation } from "react-router";
import { usePasswordQuery } from "./usePassword";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import type FIRPasswordDecrypted from "../model/FIRPasswordDecrypted";
import updatePassword from "../api/updatePassword";
import ROUTES from "../../navigation/Routes";

enum TOAST_MESSAGE {
  WEBSITE_COPIED = "Le site web a été copié.",
  USERNAME_COPIED = "Le nom d'utilisateur a été copié.",
  PASSWORD_COPIED = "Le mot de passe a été copié.",
  NOTES_COPIED = "Les notes ont été copiées.",
  PASSWORD_EDITED = "Le mot de passe a été modifié.",
  PASSWORD_EDITION_ERROR = "Une erreur s'est produite lors de la modification du mot de passe.",
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

  function handleNavigateBack() {
    navigate(-1);
  }

  function handleCopyWebsite() {
    if (data) {
      navigator.clipboard.writeText(data.website);
      toast.success(TOAST_MESSAGE.WEBSITE_COPIED, { position: "top-center" });
    }
  }

  function handleCopyUsername() {
    if (data) {
      navigator.clipboard.writeText(data.username);
      toast.success(TOAST_MESSAGE.USERNAME_COPIED, { position: "top-center" });
    }
  }

  function handleCopyPassword() {
    if (data) {
      navigator.clipboard.writeText(data.password);
      toast.success(TOAST_MESSAGE.PASSWORD_COPIED, { position: "top-center" });
    }
  }

  function handleCopyNotes() {
    if (data) {
      navigator.clipboard.writeText(data.password);
      toast.success(TOAST_MESSAGE.NOTES_COPIED, { position: "top-center" });
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
        setTimeout(() => {
          navigate(ROUTES.HOME);
        }, 1500);
      } catch (error) {
        console.error(error);
        toast.error(TOAST_MESSAGE.PASSWORD_EDITION_ERROR, {
          position: "top-center",
        });
      }
    }

    setIsSaveButtonDisabled(false);
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
    handleNavigateBack,
    handleCopyWebsite,
    handleCopyUsername,
    handleCopyPassword,
    handleCopyNotes,
    handleSave,
  };
}
