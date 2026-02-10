import { useLocation } from "react-router";
import { usePasswordQuery } from "./usePassword";
import { useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "sonner";

enum TOAST_MESSAGE {
  PASSWORD_COPIED = "Le mot de passe a été copié.",
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

  function handleCopyPassword() {
    if (data) {
      navigator.clipboard.writeText(data.password);
      toast.success(TOAST_MESSAGE.PASSWORD_COPIED, { position: "top-center" });
    }
  }

  return {
    data,
    isLoading,
    error,
    isHovered,
    setIsHovered,
    handleNavigateBack,
    handleCopyPassword,
  };
}
