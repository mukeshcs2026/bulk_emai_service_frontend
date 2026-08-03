import { createFileRoute } from "@tanstack/react-router";
import { Typography } from "antd";

const { Title, Text } = Typography;

export const Route = createFileRoute("/app/templates/")({
  component: TemplatesPage,
});

function TemplatesPage() {
  return (
    <div
      style={{
        padding: 24,
      }}
    >
      <Title level={2}>Email Templates</Title>

      <Text type="secondary">
        Browse the email templates available for your campaigns.
      </Text>

      {/* Template list goes here */}
    </div>
  );
}
