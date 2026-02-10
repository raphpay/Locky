import { useLocation } from "react-router";
import { usePasswordQuery } from "./usePassword";
import { useNavigate } from "react-router";
import { useState } from "react";

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
      // TODO: Show a toast message indicating that the password has been copied
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
