import { useState } from "react";
import { Button, Card, Space, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import AudienceTable from "#/components/audience/AudienceTable";
import UploadAudienceModal from "#/components/audience/UploadAudienceModal";
import { createFileRoute } from "@tanstack/react-router";

const { Title, Text } = Typography;

export const Route = createFileRoute("/app/audience/")({
  component: AudiencePage,
});

export default function AudiencePage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Space orientation="vertical" size={24} style={{ width: "100%" }}>
        <Card>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <Title
                level={2}
                style={{
                  marginBottom: 4,
                }}
              >
                Audience
              </Title>

              <Text type="secondary">
                Upload and manage your audience CSV files. These audiences can
                later be used while creating email campaigns.
              </Text>
            </div>

            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setOpen(true)}
            >
              Upload Audience
            </Button>
          </div>
        </Card>

        <AudienceTable />
      </Space>

      <UploadAudienceModal open={open} onCancel={() => setOpen(false)} />
    </>
  );
}
