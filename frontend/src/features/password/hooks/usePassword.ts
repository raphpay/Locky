import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../cache/QUERY_KEYS";
import { fetchPassword } from "../api/fetchPassword";
import type FIRPasswordDecrypted from "../model/FIRPasswordDecrypted";

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
