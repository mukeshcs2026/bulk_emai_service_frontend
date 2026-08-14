import { useMutation, useQuery } from "@tanstack/react-query";

import { getCampaigns, sendCampaign } from "#/services/campaign";

export function useCampaigns() {
  return useQuery({
    queryKey: ["campaigns"],
    queryFn: getCampaigns,
  });
}

export function useSendCampaign() {
  return useMutation({
    mutationFn: sendCampaign,
  });
}
