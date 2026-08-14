import { Modal, Typography } from "antd";

import { tokens } from "#/components/layout/theme";
import type { EmailTemplate } from "#/services/template";

const { Text, Title } = Typography;

interface TemplatePreviewModalProps {
  template: EmailTemplate | null;
  open: boolean;
  onClose: () => void;
}

export default function TemplatePreviewModal({
  template,
  open,
  onClose,
}: TemplatePreviewModalProps) {
  if (!template) {
    return null;
  }

  return (
    <Modal
      title={null}
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={820}
      styles={{
        body: {
          padding: 0,
        },
      }}
    >
      {/* =====================================================
          Modal Header
      ===================================================== */}

      <div
        style={{
          padding: `${tokens.spaceLG}px ${tokens.spaceXL}px`,
          borderBottom: `1px solid ${tokens.border}`,
          background: tokens.surface,
        }}
      >
        <Text
          style={{
            display: "block",
            marginBottom: tokens.spaceXS,
            fontSize: 11,
            fontWeight: 600,
            color: tokens.inkMuted,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Email preview
        </Text>

        <Title
          level={4}
          style={{
            margin: 0,
            color: tokens.ink,
            fontFamily: tokens.fontDisplay,
            fontWeight: 650,
            letterSpacing: "-0.015em",
          }}
        >
          {template.template_name}
        </Title>

        <div
          style={{
            marginTop: tokens.spaceSM,
            padding: `${tokens.spaceSM}px ${tokens.spaceMD}px`,
            borderRadius: tokens.radiusSM,
            background: tokens.surfaceSubtle,
            border: `1px solid ${tokens.border}`,
          }}
        >
          <Text
            style={{
              fontSize: 13,
              color: tokens.inkMuted,
            }}
          >
            Subject:
          </Text>

          <Text
            strong
            style={{
              marginLeft: tokens.spaceSM,
              fontSize: 13,
              color: tokens.ink,
            }}
          >
            {template.subject}
          </Text>
        </div>
      </div>

      {/* =====================================================
          Email Preview
      ===================================================== */}

      <div
        style={{
          padding: tokens.spaceXL,
          background: tokens.canvas,
        }}
      >
        <div
          style={{
            width: "100%",
            minHeight: 240,
            overflow: "hidden",
            border: `1px solid ${tokens.border}`,
            borderRadius: tokens.radiusLG,
            background: "#ffffff",
            boxShadow: tokens.shadowSm,
            padding: "20px",
          }}
        >
          <iframe
            title={`${template.template_name} preview`}
            srcDoc={template.preview}
            style={{
              display: "block",
              width: "100%",
              height: 250,
              border: "none",
              background: "#ffffff",
            }}
          />
        </div>
      </div>
    </Modal>
  );
}
