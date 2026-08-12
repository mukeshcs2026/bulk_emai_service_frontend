import { useQuery } from "@tanstack/react-query";

import { getTemplate } from "#/services/template";

export function useTemplate(templateId: number | null) {
  return useQuery({
    queryKey: ["template", templateId],
    queryFn: () => getTemplate(templateId!),
    enabled: templateId !== null,
  });
}