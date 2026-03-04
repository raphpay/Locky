import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import QUERY_KEYS from "../../cache/QUERY_KEYS";
import ROUTES from "../../navigation/Routes";
import importPasswords from "../../password/api/importPasswords";
import { usePasswordsQuery } from "../../password/hooks/usePasswords";
import SORTING_SELECTION from "../sort/sortingSelection";
import ImportStatus from "../enum/ImportStatus";

enum TOAST_MESSAGE {
  IMPORT_SUCCESS = "Mots de passe importés avec succès !",
  IMPORT_ERROR = "Une erreur est survenue lors de l'importation des mots de passe.",
}

export default function useHomeScreen() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: passwords, isLoading, error } = usePasswordsQuery();
  const [sortingSelection, setSortingSelection] = useState<SORTING_SELECTION>(
    SORTING_SELECTION.TITLE,
  );
  const [isSortingAscending, setIsSortingAscending] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [displayCreatePasswordModal, setDisplayCreatePasswordModal] =
    useState<boolean>(false);
  const [isImportingPasswords, setIsImportingPasswords] =
    useState<boolean>(false);

  const fileRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredAndSortedPasswords = useMemo(() => {
    if (!passwords) return [];

    // 1. D'abord, on FILTRE
    const filtered = passwords.filter((p) => {
      const query = searchQuery.toLowerCase().trim();
      if (!query) return true;

      // Recherche dans le titre, le site web et même l'username (optionnel mais utile)
      return (
        p.title.toLowerCase().includes(query) ||
        p.website.toLowerCase().includes(query) ||
        (p.username && p.username.toLowerCase().includes(query))
      );
    });

    // 2. Ensuite, on TRIE les résultats filtrés
    return [...filtered].sort((a, b) => {
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
        // ... tes autres cases (CREATED_AT, etc.)
      }

      if (fieldA < fieldB) return isSortingAscending ? -1 : 1;
      if (fieldA > fieldB) return isSortingAscending ? 1 : -1;
      return 0;
    });
  }, [passwords, searchQuery, sortingSelection, isSortingAscending]);

  function navigateToViewPassword(passwordID: string) {
    navigate(ROUTES.VIEW_PASSWORD, {
      state: {
        passwordID: passwordID,
      },
    });
  }

  function handleImport() {
    setIsImportingPasswords(true);
    fileRef.current?.click();

    // Close the import dialog when the window regains focus
    const checkCancel = () => {
      setTimeout(() => {
        if (fileRef.current?.files?.length === 0) {
          setIsImportingPasswords(false);
        }
        window.removeEventListener("focus", checkCancel);
      }, 500);
    };

    window.addEventListener("focus", checkCancel);
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      try {
        await importPasswords(file, passwords ?? []);
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PASSWORDS] });
        toast.success(TOAST_MESSAGE.IMPORT_SUCCESS, { position: "top-center" });
        setIsImportingPasswords(false);
      } catch (error) {
        console.error(error);
        toast.error(TOAST_MESSAGE.IMPORT_ERROR, { position: "top-center" });
        setIsImportingPasswords(false);
      }
    } else {
      setIsImportingPasswords(false);
    }
  }

  function handleSortSelection(selection: SORTING_SELECTION) {
    setSortingSelection(selection);
  }

  function handleSortIsAscendingChange(newValue: boolean) {
    setIsSortingAscending(newValue);
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Detect Cmd (Mac) ou Ctrl (Windows/Linux) + K
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault(); // Empêche le comportement par défaut du navigateur
        searchInputRef.current?.focus();
      }

      if (
        event.key === "Escape" &&
        document.activeElement === searchInputRef.current
      ) {
        setSearchQuery("");
        searchInputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return {
    passwords,
    filteredAndSortedPasswords,
    isLoading,
    error,
    fileRef,
    sortingSelection,
    isSortingAscending,
    searchQuery,
    setSearchQuery,
    isImportingPasswords,
    setIsImportingPasswords,
    displayCreatePasswordModal,
    setDisplayCreatePasswordModal,
    navigateToViewPassword,
    handleImport,
    handleFileChange,
    handleSortSelection,
    handleSortIsAscendingChange,
    searchInputRef,
  };
}
