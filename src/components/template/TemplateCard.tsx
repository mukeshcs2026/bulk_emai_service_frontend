import { EyeOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Card, Space, Tag, Typography } from "antd";

import type { EmailTemplate } from "#/services/template";
import { tokens } from "#/components/layout/theme";

const { Text, Title } = Typography;

interface TemplateCardProps {
  template: EmailTemplate;
  onPreview: (template: EmailTemplate) => void;
}

export default function TemplateCard({
  template,
  onPreview,
}: TemplateCardProps) {
  return (
    <Card
      hoverable
      styles={{
        body: {
          padding: 0,
        },
      }}
      style={{
        height: "100%",
        overflow: "hidden",
        background: tokens.surface,
        border: `1px solid ${tokens.border}`,
        borderRadius: 14,
        boxShadow: "0 1px 3px rgba(16, 24, 40, 0.06)",
        transition: "all 0.2s ease",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "18px 20px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: tokens.accentSoft,
            color: tokens.accent,
            flexShrink: 0,
          }}
        >
          <MailOutlined style={{ fontSize: 18 }} />
        </div>

        <div
          style={{
            minWidth: 0,
            flex: 1,
          }}
        >
          <Title
            level={5}
            ellipsis
            style={{
              margin: 0,
              color: tokens.ink,
              fontFamily: tokens.fontDisplay,
              fontWeight: 600,
            }}
          >
            {template.template_name}
          </Title>

          <Text
            type="secondary"
            style={{
              fontSize: 12,
            }}
          >
            Email template
          </Text>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          margin: "0 10px",
          padding: 16,
          background: tokens.surface,
          borderRadius: 10,
        }}
      >
        <Space
          orientation="vertical"
          size={18}
          style={{
            width: "100%",
          }}
        >
          {/* Subject */}
          <div>
            <Text
              type="secondary"
              style={{
                display: "block",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.05em",
                marginBottom: 6,
              }}
            >
              SUBJECT
            </Text>

            <Text
              ellipsis={{
                tooltip: template.subject,
              }}
              style={{
                display: "block",
                color: tokens.ink,
                fontWeight: 500,
                lineHeight: 1.5,
              }}
            >
              {template.subject}
            </Text>
          </div>

          {/* Variables */}
          <div>
            <Text
              type="secondary"
              style={{
                display: "block",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.05em",
                marginBottom: 8,
              }}
            >
              VARIABLES
            </Text>

            {template.variables.length > 0 ? (
              <Space wrap size={[6, 6]}>
                {template.variables.map((variable) => (
                  <Tag
                    key={variable}
                    style={{
                      margin: 0,
                      padding: "3px 7px",
                      borderRadius: 6,
                      border: `1px solid ${tokens.accentSoft}`,
                      background: tokens.accentSoft,
                      color: tokens.accent,
                      fontFamily: tokens.fontMono,
                      fontSize: 11,
                    }}
                  >
                    {`{{ ${variable} }}`}
                  </Tag>
                ))}
              </Space>
            ) : (
              <Text type="secondary" style={{ fontSize: 12 }}>
                No variables
              </Text>
            )}
          </div>
        </Space>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "14px 20px 18px",
        }}
      >
        <Button
          block
          icon={<EyeOutlined />}
          onClick={() => onPreview(template)}
          style={{
            height: 40,
            borderRadius: 9,
            fontWeight: 500,
            borderColor: tokens.borderStrong ?? tokens.border,
            color: tokens.ink,
            background: tokens.surfaceSoft,
          }}
        >
          Preview Template
        </Button>
      </div>
    </Card>
  );
}
