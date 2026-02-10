import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "../../cache/QUERY_KEYS";
import type FIRPasswordDecrypted from "../model/FIRPasswordDecrypted";
import { fetchPassword } from "../api/fetchPassword";

export function usePasswordQuery(passwordID: string) {
  const query = useQuery<FIRPasswordDecrypted, Error>({
    queryKey: [QUERY_KEYS.PASSWORDS, passwordID],
    queryFn: () => fetchPassword(passwordID),
  });

  return {
    isLoading: query.isLoading,
    error: query.error,
    data: query.data,
    refetch: query.refetch,
  };
}
