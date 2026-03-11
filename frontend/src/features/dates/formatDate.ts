export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return "—";

  const date = new Date(dateString);

  // Vérifie si la date est valide pour éviter les "Invalid Date"
  if (isNaN(date.getTime())) return "Date invalide";

  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
