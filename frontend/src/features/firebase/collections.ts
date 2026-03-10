const COLLECTIONS = {
  USERS: "users",
  PASSWORDS: "passwords",
} as const;

type COLLECTIONS = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];

export { COLLECTIONS };
