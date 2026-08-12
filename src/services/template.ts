import api, { API_ENDPOINTS } from "./api";

export interface EmailTemplate {
  id: number;
  template_name: string;
  subject: string;
  template_path: string;
  variables: string[];
  preview: string;
}

export async function getTemplates(): Promise<EmailTemplate[]> {
  const response = await api.get(API_ENDPOINTS.template.templates);

  return response.data;
}

export async function getTemplate(
  templateId: number,
): Promise<EmailTemplate> {
  const response = await api.get(
    `${API_ENDPOINTS.template.templateById}${templateId}/`,
  );

  return response.data;
}