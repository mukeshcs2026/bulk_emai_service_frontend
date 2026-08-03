import { useQuery } from "@tanstack/react-query";
import { getJobStatus } from "#/services/job";

export function useJobStatus(jobId: number | null) {
  return useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getJobStatus(jobId!),
    enabled: jobId !== null,

    refetchInterval: (query) => {
      const status = query.state.data?.status;

      if (status === "success" || status === "failed") {
        return false;   
      }

      return 2000;      
    },
  });
}