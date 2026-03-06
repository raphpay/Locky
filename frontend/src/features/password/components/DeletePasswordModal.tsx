import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../ui/components/radix/AlertDialog";

interface Props {
  title: string;
  showDeletionAlert: boolean;
  setShowDeletionAlert: (value: boolean) => void;
  confirmDeletion: () => void;
}

function DeletePasswordModal({
  title,
  showDeletionAlert,
  setShowDeletionAlert,
  confirmDeletion,
}: Props) {
  return (
    <AlertDialog open={showDeletionAlert} onOpenChange={setShowDeletionAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Supprimer ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action effacera définitivement les identifiants pour {title}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={confirmDeletion} className="bg-accent">
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeletePasswordModal;
