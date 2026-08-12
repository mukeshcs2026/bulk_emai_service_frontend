import { useState } from "react";
import { Button, Card, Space, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { createFileRoute } from "@tanstack/react-router";

import CreateCampaignModal from "#/components/campaign/CreateCampaignModal";
import CampaignTable from "#/components/campaign/CampaignTable";

const { Title, Text } = Typography;

export const Route = createFileRoute("/app/campaigns/")({
  component: CampaignsPage,
});

function CampaignsPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Space orientation="vertical" size={24} style={{ width: "100%" }}>
        {/* Header */}

        <Card>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <Title level={2} style={{ marginBottom: 4 }}>
                Campaigns
              </Title>

              <Text type="secondary">
                Create and manage your email campaigns.
              </Text>
            </div>

            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setOpen(true)}
            >
              Create Campaign
            </Button>
          </div>
        </Card>

        {/* Campaign List */}

        <Card>
          <CampaignTable />
        </Card>
      </Space>

      <CreateCampaignModal open={open} onCancel={() => setOpen(false)} />
    </>
  );
}

export default CampaignsPage;
