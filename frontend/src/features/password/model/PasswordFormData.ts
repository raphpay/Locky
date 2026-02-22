import * as z from "zod";

export const passwordFormSchema = z.object({
  title: z.string(),
  username: z.string().min(1, "L'identifiant est requis"),
  password: z.string().min(1, "Le mot de passe est requis"),
  website: z
    .string("Veuillez entrer une adresse de site web.")
    .min(1, "L'URL est requise"),
  notes: z.string(),
});

export const firPasswordFormSchema = z.object({
  id: z.string(),
  title: z.string(),
  username: z.string().min(1, "L'identifiant est requis"),
  password: z.string().min(1, "Le mot de passe est requis"),
  website: z
    .string("Veuillez entrer une adresse de site web.")
    .min(1, "L'URL est requise"),
  notes: z.string(),
});
