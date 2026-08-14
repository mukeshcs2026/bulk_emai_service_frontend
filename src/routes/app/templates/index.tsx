import { useState } from "react";

import { FileTextOutlined } from "@ant-design/icons";
import { createFileRoute } from "@tanstack/react-router";
import { Alert, Col, Empty, Row, Skeleton, Typography } from "antd";

import { tokens } from "#/components/layout/theme";
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

  const hasTemplates = templates.length > 0;

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100%",
        padding: `${tokens.spaceXL}px ${tokens.spaceXL}px ${tokens.spaceXXL}px`,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        {/* =====================================================
            Page Header
        ===================================================== */}

        <div
          style={{
            marginBottom: tokens.spaceXXL,
          }}
        >
          {/* Eyebrow */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: tokens.spaceSM,
              marginBottom: tokens.spaceSM,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                borderRadius: tokens.radiusMD,
                background: tokens.accentSoft,
                color: tokens.accent,
              }}
            >
              <FileTextOutlined
                style={{
                  fontSize: 15,
                }}
              />
            </div>

            <Text
              style={{
                fontSize: 12,
                fontWeight: 600,
                lineHeight: 1.4,
                color: tokens.inkMuted,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Templates
            </Text>
          </div>

          {/* Title */}

          <Title
            level={1}
            style={{
              margin: 0,
              fontFamily: tokens.fontDisplay,
              fontSize: 32,
              lineHeight: 1.2,
              fontWeight: 650,
              letterSpacing: "-0.025em",
              color: tokens.ink,
            }}
          >
            Email templates
          </Title>

          {/* Description */}

          <Text
            style={{
              display: "block",
              maxWidth: 600,
              marginTop: tokens.spaceSM,
              fontSize: 14,
              lineHeight: 1.7,
              color: tokens.inkMuted,
            }}
          >
            Choose from your predefined email templates and use them to create
            campaigns faster.
          </Text>
        </div>

        {/* =====================================================
            Section Header
        ===================================================== */}

        {!isLoading && !isError && hasTemplates && (
          <div
            style={{
              marginBottom: tokens.spaceLG,
            }}
          >
            <Text
              strong
              style={{
                display: "block",
                fontSize: 16,
                lineHeight: 1.5,
                color: tokens.ink,
              }}
            >
              Your templates
            </Text>

            <Text
              style={{
                display: "block",
                marginTop: 3,
                fontSize: 13,
                lineHeight: 1.6,
                color: tokens.inkMuted,
              }}
            >
              Pre-built designs ready for your campaigns.
            </Text>
          </div>
        )}

        {/* =====================================================
            Loading State
        ===================================================== */}

        {isLoading && (
          <Row gutter={[tokens.spaceLG, tokens.spaceXL]}>
            {[1, 2, 3].map((item) => (
              <Col key={item} xs={24} sm={12} lg={8}>
                <div
                  style={{
                    minHeight: 360,
                    padding: tokens.spaceLG,
                    border: `1px solid ${tokens.border}`,
                    borderRadius: tokens.radiusLG,
                    background: tokens.surface,
                    boxShadow: tokens.shadowSm,
                    boxSizing: "border-box",
                  }}
                >
                  <Skeleton
                    active
                    avatar
                    paragraph={{
                      rows: 5,
                    }}
                  />
                </div>
              </Col>
            ))}
          </Row>
        )}

        {/* =====================================================
            Error State
        ===================================================== */}

        {isError && (
          <div
            style={{
              padding: tokens.spaceLG,
              border: `1px solid ${tokens.border}`,
              borderRadius: tokens.radiusLG,
              background: tokens.surface,
              boxShadow: tokens.shadowSm,
            }}
          >
            <Alert
              type="error"
              title="Unable to load templates"
              description="Something went wrong while fetching your email templates. Please try again."
              showIcon
            />
          </div>
        )}

        {/* =====================================================
            Empty State
        ===================================================== */}

        {!isLoading && !isError && !hasTemplates && (
          <div
            style={{
              minHeight: 320,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: tokens.spaceXXL,
              border: `1px dashed ${tokens.borderStrong}`,
              borderRadius: tokens.radiusXL,
              background: tokens.surfaceSoft,
              boxSizing: "border-box",
            }}
          >
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <div>
                  <Text
                    strong
                    style={{
                      display: "block",
                      marginBottom: tokens.spaceXS,
                      color: tokens.ink,
                    }}
                  >
                    No templates yet
                  </Text>

                  <Text
                    style={{
                      fontSize: 13,
                      color: tokens.inkMuted,
                    }}
                  >
                    Your available email templates will appear here.
                  </Text>
                </div>
              }
            />
          </div>
        )}

        {/* =====================================================
            Template Grid
        ===================================================== */}

        {!isLoading && !isError && hasTemplates && (
          <Row gutter={[tokens.spaceLG, tokens.spaceXL]}>
            {templates.map((template) => (
              <Col key={template.id} xs={24} sm={12} lg={8}>
                <TemplateCard template={template} onPreview={handlePreview} />
              </Col>
            ))}
          </Row>
        )}
      </div>

      {/* =======================================================
          Template Preview
      ======================================================= */}

      <TemplatePreviewModal
        template={selectedTemplate}
        open={selectedTemplate !== null}
        onClose={handleClosePreview}
      />
    </div>
  );
}

export default TemplatesPage;
