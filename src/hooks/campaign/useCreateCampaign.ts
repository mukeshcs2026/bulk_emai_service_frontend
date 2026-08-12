import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createCampaign } from "#/services/campaign";

export function useCreateCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCampaign,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["campaigns"],
      });
    },
  });
}