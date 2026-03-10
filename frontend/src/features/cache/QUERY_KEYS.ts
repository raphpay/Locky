const QUERY_KEYS = {
  PASSWORDS: "passwords",
} as const;

type QUERY_KEYS = (typeof QUERY_KEYS)[keyof typeof QUERY_KEYS];

export { QUERY_KEYS };
