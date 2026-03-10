const CACHE_KEYS = {
    PUBLIC_ID : "publicID",
    PIN_WRAP : "pinWrap",
    BIOMETRICS_WRAP : "biometricsWrap",
} as const;

type CACHE_KEYS = (typeof CACHE_KEYS)[keyof typeof CACHE_KEYS];

export { CACHE_KEYS };
