const ImportStatus = {
  SUCCESS: "success",
  ERROR: "error",
  PENDING: "pending",
} as const;

type ImportStatus = (typeof ImportStatus)[keyof typeof ImportStatus];

export { ImportStatus };
