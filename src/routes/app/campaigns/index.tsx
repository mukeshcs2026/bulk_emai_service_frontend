import { createFileRoute } from "@tanstack/react-router";
import { Button, Card, Space, Table, Tag, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

import CreateCampaignModal from "#/components/campaign/CreateCampaignModal";

const { Title, Text } = Typography;

export const Route = createFileRoute("/app/campaigns/")({
  component: CampaignPage,
});

function CampaignPage() {
  const [open, setOpen] = useState(false);

  const columns = [
    {
      title: "Campaign",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Audience",
      dataIndex: "audience",
      key: "audience",
    },
    {
      title: "Template",
      dataIndex: "template",
      key: "template",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag
          color={
            status === "Completed"
              ? "green"
              : status === "Processing"
                ? "blue"
                : "default"
          }
        >
          {status}
        </Tag>
      ),
    },
  ];

  return (
    <div
      style={{
        padding: 24,
      }}
    >
      <Space orientation="vertical" size={24} style={{ width: "100%" }}>
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

        <Card>
          <Table
            rowKey="id"
            columns={columns}
            dataSource={[]}
            pagination={false}
            locale={{
              emptyText: "No campaigns created yet.",
            }}
          />
        </Card>

        <CreateCampaignModal open={open} onCancel={() => setOpen(false)} />
      </Space>
    </div>
  );
}
