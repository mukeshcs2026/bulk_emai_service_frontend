import api, { API_ENDPOINTS } from "./api";

export interface Campaign {
  id: number;
  name: string;
  status: string;
  job: number | null;
}

export interface CreateCampaignPayload {
  name: string;
  template: number;
  audience: number;
  variable_mapping: Record<string, string>;
}

export async function createCampaign(data: CreateCampaignPayload) {
  const response = await api.post(API_ENDPOINTS.campaign.create, data);

  return response.data;
}

export async function getCampaigns(): Promise<Campaign[]> {
  const response = await api.get(API_ENDPOINTS.campaign.campaign);

  return response.data.data;
}

export async function sendCampaign(campaignId: number) {
  const response = await api.post(API_ENDPOINTS.campaign.sendMail(campaignId));

  return response.data;
}
