import { useNavigate } from "react-router";
import { usePasswordsQuery } from "../../password/hooks/usePasswords";
import ROUTES from "../../navigation/Routes";
import { useRef, useState } from "react";
import { FileInput } from "lucide-react";
import importPasswords from "../../password/api/importPasswords";
import { useQueryClient } from "@tanstack/react-query";
import QUERY_KEYS from "../../cache/QUERY_KEYS";
import { toast } from "sonner";

enum TOAST_MESSAGE {
  IMPORT_SUCCESS = "Mots de passe importés avec succès !",
  IMPORT_ERROR = "Une erreur est survenue lors de l'importation des mots de passe.",
}

export default function useHomeScreen() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: passwords, isLoading, error } = usePasswordsQuery();
  const [isSendingPasswords, setIsSendingPasswords] = useState<boolean>(false);

  const fileRef = useRef<HTMLInputElement>(null);

  function createPassword() {
    navigate(ROUTES.CREATE_PASSWORD);
  }

  function navigateToViewPassword(passwordID: string) {
    navigate(ROUTES.VIEW_PASSWORD, {
      state: {
        passwordID: passwordID,
      },
    });
  }

  function handleImport() {
    fileRef.current?.click();
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setIsSendingPasswords(true);
      try {
        await importPasswords(file);
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PASSWORDS] });
        toast.success(TOAST_MESSAGE.IMPORT_SUCCESS, { position: "top-center" });
        setIsSendingPasswords(false);
      } catch (error) {
        console.error(error);
        toast.error(TOAST_MESSAGE.IMPORT_ERROR, { position: "top-center" });
        setIsSendingPasswords(false);
      }
    }
  }

  return {
    passwords,
    isLoading,
    error,
    fileRef,
    isSendingPasswords,
    createPassword,
    navigateToViewPassword,
    handleImport,
    handleFileChange,
  };
}
