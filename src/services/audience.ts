import api, { API_ENDPOINTS } from "./api";

export interface Audience {
  id: number;
  name: string;
  headers: string[];
  total_rows: number;
  status: string;
  created_at: string;
}

export interface AudienceDetail {
  id: number;
  name: string;
  file_name: string;
  headers: string[];
  total_rows: number;
}

export async function getAudiences(): Promise<Audience[]> {
  const response = await api.get(API_ENDPOINTS.audience.audiences);

  return response.data.data;
}

export async function getAudienceById(
  audienceId: number
): Promise<AudienceDetail> {
  const response = await api.get(
    `${API_ENDPOINTS.audience.audienceById}${audienceId}/`
  );

  return response.data.data;
}

export async function uploadAudience(file: File) {
  const formData = new FormData();

  formData.append("csv_file", file);

  const response = await api.post(
    API_ENDPOINTS.audience.upload,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}