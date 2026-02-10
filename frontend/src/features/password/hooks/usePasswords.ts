import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "../../cache/QUERY_KEYS";
import { fetchPasswords } from "../api/fetchPasswords";
import type FIRPasswordDecrypted from "../model/FIRPasswordDecrypted";

export function usePasswordsQuery() {
  const query = useQuery<FIRPasswordDecrypted[], Error>({
    queryKey: [QUERY_KEYS.PASSWORDS],
    queryFn: () => fetchPasswords(),
  });

  return {
    isLoading: query.isLoading,
    error: query.error,
    data: query.data,
    refetch: query.refetch,
  };
}
