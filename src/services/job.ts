import api, { API_ENDPOINTS } from "./api";

export interface JobStatus {
  id: number;
  status: string;
  total_items: number;
  processed_items: number;
  progress: number;
}

export async function getJobStatus(jobId: number): Promise<JobStatus> {
  const response = await api.get(
    `${API_ENDPOINTS.jobs.status}${jobId}/`
  );

  return response.data.data;
}