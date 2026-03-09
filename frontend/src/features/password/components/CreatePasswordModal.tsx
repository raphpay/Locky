import { SecureInput } from "../../../ui/components/custom/SecureInput";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "../../../ui/components/radix/AlertDialog";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "../../../ui/components/radix/Field";
import { Input } from "../../../ui/components/radix/Input";
import { Textarea } from "../../../ui/components/radix/Textarea";
import { DIALOG_STATUS } from "../enum/DialogStatus";
import useCreatePasswordModal from "../hooks/useCreatePasswordModal";

export interface CreatePasswordModalProps {
  display: boolean;
  setDisplay: (value: boolean) => void;
}

function CreatePasswordModal({
  display,
  setDisplay,
}: CreatePasswordModalProps) {
  const {
    form,
    sendButtonDisabled,
    dialogStatus,
    dialogTitle,
    dialogDescription,
    suggestedTitle,
    passwordMutation,
    onWebsiteLosesFocus,
  } = useCreatePasswordModal({ setDisplay });

  function BaseState() {
    return (
      <div className="overflow-y-scroll overflow-x-clip">
        <form
          className="w-full"
          id="create-password-form-modal"
          onSubmit={(e) => {
            console.log("submit", e);
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="title"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Titre</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder={suggestedTitle || "Titre"}
                      autoComplete="off"
                    />
                  </Field>
                );
              }}
            />
            <form.Field
              name="username"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Nom d'utilisateur
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="john_doe"
                      autoComplete="off"
                    />
                  </Field>
                );
              }}
            />
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Mot de passe</FieldLabel>
                    <SecureInput
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="My_strong_password"
                      autoComplete="off"
                    />
                  </Field>
                );
              }}
            />
            <form.Field
              name="website"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Site web</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={() => {
                        onWebsiteLosesFocus(field.state.value);
                        field.handleBlur();
                      }}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="www.apple.com"
                      autoComplete="off"
                    />
                  </Field>
                );
              }}
            />
            <form.Field
              name="notes"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Notes</FieldLabel>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Entrer des notes ici ( optionnel )"
                      autoComplete="off"
                    />
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setDisplay(false)}>
            Fermer
          </AlertDialogCancel>

          <AlertDialogAction
            type="submit"
            form="create-password-form-modal"
            disabled={sendButtonDisabled}
            variant={"default"}
          >
            {passwordMutation.isPending ? "En cours..." : "Ajouter"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </div>
    );
  }

  return (
    <AlertDialog open={display}>
      <AlertDialogContent>
        <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
        <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
        {dialogStatus === DIALOG_STATUS.BASE && BaseState()}
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CreatePasswordModal;
