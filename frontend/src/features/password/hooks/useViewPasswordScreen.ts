import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { usePasswordQuery } from "./usePassword";

import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../cache/QUERY_KEYS";
import deletePassword from "../api/deletePassword";
import updatePassword from "../api/updatePassword";
import type FIRPasswordDecrypted from "../model/FIRPasswordDecrypted";
import { firPasswordFormSchema } from "../model/PasswordFormData";

const TOAST_MESSAGE = {
  WEBSITE_COPIED: "Le site web a été copié.",
  USERNAME_COPIED: "Le nom d'utilisateur a été copié.",
  PASSWORD_COPIED: "Le mot de passe a été copié.",
  NOTES_COPIED: "Les notes ont été copiées.",
  PASSWORD_EDITED: "Le mot de passe a été modifié.",
  PASSWORD_EDITION_ERROR: "Une erreur s'est produite lors de la modification du mot de passe.",
  PASSWORD_DELETED: "Le mot de passe a été supprimé.",
  PASSWORD_DELETION_ERROR: "Une erreur s'est produite lors de la suppression du mot de passe.",
}

const TOAST_TYPE = {
  SUCCESS: "success",
  ERROR: "error",
}

type TOAST_TYPE = (typeof TOAST_TYPE)[keyof typeof TOAST_TYPE];

export default function useViewPasswordScreen({
  selectedPassword,
  setSelectedPassword,
}: {
  selectedPassword: FIRPasswordDecrypted;
  setSelectedPassword: (password: FIRPasswordDecrypted | null) => void;
}) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading, error } = usePasswordQuery(selectedPassword.id);
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
        setSelectedPassword(null);

        await deletePassword(data.id);
        // Reload passwords
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.PASSWORDS],
        });
        queryClient.setQueryData([QUERY_KEYS.PASSWORDS, data.id], null);

        displayToast(TOAST_MESSAGE.PASSWORD_DELETED);
      } catch (error) {
        console.error(error);
        displayToast(TOAST_MESSAGE.PASSWORD_DELETION_ERROR, TOAST_TYPE.ERROR);
      }
    }
  }

  async function handleSubmit(value: FIRPasswordDecrypted) {
    try {
      await updatePassword(value);
      // Reload passwords
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PASSWORDS] });
      queryClient.setQueryData([QUERY_KEYS.PASSWORDS, value.id], value);
      // Tell the user the password has been updated
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
