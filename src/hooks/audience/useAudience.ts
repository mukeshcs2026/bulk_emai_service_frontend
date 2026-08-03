import { useQuery } from "@tanstack/react-query";
import { getAudienceById } from "#/services/audience";

export function useAudience(audienceId: number | null) {
  return useQuery({
    queryKey: ["audiences", audienceId],
    queryFn: () => getAudienceById(audienceId!),
    enabled: audienceId !== null,
  });
}