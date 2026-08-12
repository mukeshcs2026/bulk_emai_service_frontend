import { useQuery } from "@tanstack/react-query";
import { getTemplates } from "#/services/template";

export function useTemplates() {
  return useQuery({
    queryKey: ["templates"],
    queryFn: getTemplates,
  });
}