const SIGN_UP_TITLE = {
  START: "Bienvenue sur Locky",
  PHRASE: "Commençons par votre phrase de récupération.",
  MASTER_PASSWORD: "Choisissez maintenant un mot de passe principal",
  PIN: "On y est presque.",
  FINAL: "Dernière étape",
};

const SIGN_UP_DESCRIPTION = {
  START:
    "Vos mots de passe sécurisés, et sans compte à créer. \n Que demander de plus ?",
  PHRASE:
    "Notez-là bien, elle vous servira à récupérer votre compte en cas d’oubli du mot de passe principal ou du PIN",
  MASTER_PASSWORD: "Le mot de passe vous servira à ouvrir votre coffre-fort.",
  PIN: "Un PIN sera plus simple qu’un mot de passe pour sécuriser vos données. ",
  FINAL: "On sécurise le tout avec votre empreinte.",
};

const CONTINUE_BUTTON_TEXT = {
  START: "Commencer maintenant",
  PHRASE: "Continuer",
  MASTER_PASSWORD: "Continuer",
  PIN: "Continuer",
  FINAL: "Terminer",
};

const SIGN_UP_STEPS = {
  0: {
    title: SIGN_UP_TITLE.START,
    description: SIGN_UP_DESCRIPTION.START,
    button: CONTINUE_BUTTON_TEXT.START,
  },
  1: {
    title: SIGN_UP_TITLE.PHRASE,
    description: SIGN_UP_DESCRIPTION.PHRASE,
    button: CONTINUE_BUTTON_TEXT.PHRASE,
  },
  2: {
    title: SIGN_UP_TITLE.MASTER_PASSWORD,
    description: SIGN_UP_DESCRIPTION.MASTER_PASSWORD,
    button: CONTINUE_BUTTON_TEXT.MASTER_PASSWORD,
  },
  3: {
    title: SIGN_UP_TITLE.PIN,
    description: SIGN_UP_DESCRIPTION.PIN,
    button: CONTINUE_BUTTON_TEXT.PIN,
  },
  4: {
    title: SIGN_UP_TITLE.FINAL,
    description: SIGN_UP_DESCRIPTION.FINAL,
    button: CONTINUE_BUTTON_TEXT.FINAL,
  },
};

const TOAST_MESSAGE = {
  PHRASE_COPIED: "Phrase copiée !",
};

export { SIGN_UP_STEPS, TOAST_MESSAGE };
