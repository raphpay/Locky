const SORTING_SELECTION = {
  TITLE: "Titre",
  WEBSITE: "Site Web",
  CREATED_AT: "Date de création",
  UPDATED_AT: "Date de modification",
}

type SORTING_SELECTION = (typeof SORTING_SELECTION)[keyof typeof SORTING_SELECTION];

export { SORTING_SELECTION };
