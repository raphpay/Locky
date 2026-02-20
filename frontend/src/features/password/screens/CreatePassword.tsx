import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../ui/components/radix/AlertDialog";
import useCreatePasswordScreen from "../hooks/useCreatePasswordScreen";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "../../../ui/components/radix/Field";
import { Input } from "../../../ui/components/radix/Input";
import { Textarea } from "../../../ui/components/radix/Textarea";
import { Button } from "../../../ui/components/radix/Button";

function CreatePassword() {
  const {
    form,
    sendButtonDisabled,
    isDialogOpen,
    dialogTitle,
    dialogDescription,
    suggestedTitle,
    handleNavigateBack,
    onWebsiteLosesFocus,
  } = useCreatePasswordScreen();

  return (
    <div className="flex flex-1 flex-col gap-2">
      <button onClick={handleNavigateBack} className="absolute top-2 left-2">
        Retour
      </button>
      <div className="flex flex-col gap-2 w-full">
        <form
          className="w-full"
          id="password-creation-form"
          onSubmit={(e) => {
            e.preventDefault();
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
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="My_strong_password"
                      autoComplete="off"
                      type="password"
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

        <Button
          type="submit"
          form="password-creation-form"
          disabled={sendButtonDisabled}
        >
          Créer le mot de passe
        </Button>
      </div>

      <AlertDialog defaultOpen={false} open={isDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
            <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default CreatePassword;
