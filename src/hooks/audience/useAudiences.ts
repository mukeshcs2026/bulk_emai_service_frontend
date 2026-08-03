import { useQuery } from "@tanstack/react-query";

import { getAudiences } from "#/services/audience";

export function useAudiences() {
  return useQuery({
    queryKey: ["audiences"],
    queryFn: getAudiences,
  });
}