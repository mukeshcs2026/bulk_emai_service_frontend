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
          padding: 20,
        },
      }}
      style={{
        height: "100%",
        background: tokens.surface,
        border: `1px solid ${tokens.border}`,
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(18, 23, 43, 0.04)",
      }}
    >
      <Space
        orientation="vertical"
        size={20}
        style={{
          width: "100%",
        }}
      >
        {/* Header */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 11,
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

        {/* Divider */}

        <div
          style={{
            height: 1,
            background: tokens.border,
          }}
        />

        {/* Subject */}

        <div>
          <Text
            type="secondary"
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.04em",
              display: "block",
              marginBottom: 7,
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
              fontWeight: 500,
              color: tokens.ink,
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
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.04em",
              display: "block",
              marginBottom: 9,
            }}
          >
            VARIABLES
          </Text>

          <Space wrap size={[6, 6]}>
            {template.variables.map((variable) => (
              <Tag
                key={variable}
                style={{
                  margin: 0,
                  borderRadius: 6,
                  border: `1px solid ${tokens.accentSoft}`,
                  background: tokens.accentSoft,
                  color: tokens.accent,
                  padding: "4px 8px",
                  fontFamily: tokens.fontMono,
                  fontSize: 11,
                }}
              >
                {`{{ ${variable} }}`}
              </Tag>
            ))}
          </Space>
        </div>

        {/* Preview Button */}

        <Button
          type="default"
          block
          icon={<EyeOutlined />}
          onClick={() => onPreview(template)}
          style={{
            height: 40,
            borderRadius: 9,
            fontWeight: 500,
            borderColor: tokens.border,
            color: tokens.ink,
          }}
        >
          Preview Template
        </Button>
      </Space>
    </Card>
  );
}
