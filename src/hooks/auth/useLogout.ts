import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logoutUser } from "#/services/auth";

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,

    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ["currentUser"],
      });
    },
  });
}