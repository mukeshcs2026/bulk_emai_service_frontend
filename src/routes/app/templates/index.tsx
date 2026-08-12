import { useState } from "react";

import { createFileRoute } from "@tanstack/react-router";
import { Alert, Col, Empty, Row, Spin, Typography } from "antd";

import TemplateCard from "#/components/template/TemplateCard";
import TemplatePreviewModal from "#/components/template/TemplatePreviewModel";
import { useTemplates } from "#/hooks/template/useTemplates";
import type { EmailTemplate } from "#/services/template";

const { Title, Text } = Typography;

export const Route = createFileRoute("/app/templates/")({
  component: TemplatesPage,
});

function TemplatesPage() {
  const { data: templates = [], isLoading, isError } = useTemplates();

  const [selectedTemplate, setSelectedTemplate] =
    useState<EmailTemplate | null>(null);

  const handlePreview = (template: EmailTemplate) => {
    setSelectedTemplate(template);
  };

  const handleClosePreview = () => {
    setSelectedTemplate(null);
  };

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

      <div style={{ marginTop: 24 }}>
        {isLoading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: 48,
            }}
          >
            <Spin size="large" />
          </div>
        )}

        {isError && (
          <Alert
            type="error"
            title="Failed to load templates"
            description="Something went wrong while fetching the email templates."
          />
        )}

        {!isLoading && !isError && templates.length === 0 && (
          <Empty description="No email templates available." />
        )}

        {!isLoading && !isError && templates.length > 0 && (
          <Row gutter={[16, 16]}>
            {templates.map((template) => (
              <Col key={template.id} xs={24} md={12} lg={8}>
                <TemplateCard template={template} onPreview={handlePreview} />
              </Col>
            ))}
          </Row>
        )}
      </div>

      <TemplatePreviewModal
        template={selectedTemplate}
        open={selectedTemplate !== null}
        onClose={handleClosePreview}
      />
    </div>
  );
}

export default TemplatesPage;
