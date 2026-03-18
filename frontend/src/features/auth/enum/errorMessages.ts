const ERROR_MESSAGES = {
  INVALID_PHRASE: "Phrase de récupération invalide",
  NO_LINKED__ACCOUNT: "Pas de compte associé à cette phrase de récupération",
} as const;

type ERROR_MESSAGES = (typeof ERROR_MESSAGES)[keyof typeof ERROR_MESSAGES];

export { ERROR_MESSAGES };
