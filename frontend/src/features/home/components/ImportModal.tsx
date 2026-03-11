import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../ui/components/radix/AlertDialog";

interface Props {
  display: boolean;
}

function ImportModal({ display }: Props) {
  return (
    <AlertDialog open={display}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Importation en cours</AlertDialogTitle>
          <AlertDialogDescription>Veuillez patienter</AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ImportModal;
