import { useNavigate } from "react-router";
import { usePasswordsQuery } from "../../password/hooks/usePasswords";
import ROUTES from "../../navigation/Routes";
import { useMemo, useRef, useState } from "react";
import importPasswords from "../../password/api/importPasswords";
import { useQueryClient } from "@tanstack/react-query";
import QUERY_KEYS from "../../cache/QUERY_KEYS";
import { toast } from "sonner";
import SORTING_SELECTION from "../sort/sortingSelection";

enum TOAST_MESSAGE {
  IMPORT_SUCCESS = "Mots de passe importés avec succès !",
  IMPORT_ERROR = "Une erreur est survenue lors de l'importation des mots de passe.",
}

export default function useHomeScreen() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: passwords, isLoading, error } = usePasswordsQuery();
  const [isSendingPasswords, setIsSendingPasswords] = useState<boolean>(false);
  const [sortingSelection, setSortingSelection] = useState<SORTING_SELECTION>(
    SORTING_SELECTION.TITLE,
  );
  const [isSortingAscending, setIsSortingAscending] = useState<boolean>(true);

  const fileRef = useRef<HTMLInputElement>(null);

  const sortedPasswords = useMemo(() => {
    if (!passwords) return [];

    return [...passwords].sort((a, b) => {
      let fieldA: string = "";
      let fieldB: string = "";

      switch (sortingSelection) {
        case SORTING_SELECTION.TITLE:
          fieldA = a.title.toLowerCase();
          fieldB = b.title.toLowerCase();
          break;
        case SORTING_SELECTION.WEBSITE:
          fieldA = a.website.toLowerCase();
          fieldB = b.website.toLowerCase();
          break;
        case SORTING_SELECTION.CREATED_AT:
          if (!a.createdAt || !b.createdAt) return 0;
          fieldA = a.createdAt;
          fieldB = b.createdAt;
          break;
        case SORTING_SELECTION.UPDATED_AT:
          if (!a.updatedAt || !b.updatedAt) return 0;
          fieldA = a.updatedAt;
          fieldB = b.updatedAt;
          break;
      }

      if (fieldA < fieldB) return isSortingAscending ? -1 : 1;
      if (fieldA > fieldB) return isSortingAscending ? 1 : -1;
      return 0;
    });
  }, [passwords, sortingSelection, isSortingAscending]);

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

  function handleSortSelection(selection: SORTING_SELECTION) {
    setSortingSelection(selection);
  }

  function handleSortIsAscendingChange(newValue: boolean) {
    setIsSortingAscending(newValue);
  }

  return {
    sortedPasswords,
    isLoading,
    error,
    fileRef,
    isSendingPasswords,
    sortingSelection,
    isSortingAscending,
    createPassword,
    navigateToViewPassword,
    handleImport,
    handleFileChange,
    handleSortSelection,
    handleSortIsAscendingChange,
  };
}
