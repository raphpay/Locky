import { useLocation } from "react-router";
import { usePasswordQuery } from "./usePassword";
import { useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "sonner";

enum TOAST_MESSAGE {
  WEBSITE_COPIED = "Le site web a été copié.",
  USERNAME_COPIED = "Le nom d'utilisateur a été copié.",
  PASSWORD_COPIED = "Le mot de passe a été copié.",
  NOTES_COPIED = "Les notes ont été copiées.",
}

export default function useViewPasswordScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const { passwordID } = location.state;
  const { data, isLoading, error } = usePasswordQuery(passwordID);
  const [isHovered, setIsHovered] = useState<boolean>(false);

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

  return {
    data,
    isLoading,
    error,
    isHovered,
    setIsHovered,
    handleNavigateBack,
    handleCopyWebsite,
    handleCopyUsername,
    handleCopyPassword,
    handleCopyNotes,
  };
}
