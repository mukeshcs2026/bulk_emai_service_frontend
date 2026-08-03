import { useMutation, useQueryClient } from "@tanstack/react-query";

import { uploadAudience } from "#/services/audience";

export function useUploadAudience() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadAudience,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["audiences"],
      });
    },
  });
}