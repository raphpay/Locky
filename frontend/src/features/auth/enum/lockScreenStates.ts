const LOCK_SCREEN_STATES = {
  PIN_OR_BIO : "PIN_OR_BIO",
  MASTER_PASSWORD : "MASTER_PASSWORD",
  PHRASE : "PHRASE",
} as const;

type LOCK_SCREEN_STATES = (typeof LOCK_SCREEN_STATES)[keyof typeof LOCK_SCREEN_STATES];

export { LOCK_SCREEN_STATES };


const LOCK_SCREEN_DESCRIPTIONS = {
  PIN_OR_BIO:
    "Dévérrouillez avec votre empreinte ou entrez votre PIN pour entrer",
  MASTER_PASSWORD: "Dévérouillez avec votre mot de passe principal",
  PHRASE: "Dévérouillez avec votre phrase de récupération",
};

const LOCK_SCREEN_BUTTON_TOP_TEXTS = {
  PIN_OR_BIO: "Entrer avec votre mot de passe principal",
  MASTER_PASSWORD: "Entrer avec votre PIN ou empreinte",
  PHRASE: "Entrer avec votre PIN ou empreinte ",
};

const LOCK_SCREEN_BOTTOM_BUTTON_TEXTS = {
  PIN_OR_BIO: "Entrer avec votre phrase de récupération",
  MASTER_PASSWORD: "Entrer avec votre phrase de récupération",
  PHRASE: "Entrer avec votre mot de passe principal",
};

export {
  LOCK_SCREEN_BOTTOM_BUTTON_TEXTS, LOCK_SCREEN_BUTTON_TOP_TEXTS, LOCK_SCREEN_DESCRIPTIONS
};

