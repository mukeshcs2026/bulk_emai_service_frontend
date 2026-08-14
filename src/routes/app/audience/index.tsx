import { useState } from "react";

import { PlusOutlined, TeamOutlined } from "@ant-design/icons";
import { createFileRoute } from "@tanstack/react-router";
import { Button, Col, Row, Typography } from "antd";

import AudienceTable from "#/components/audience/AudienceTable";
import UploadAudienceModal from "#/components/audience/UploadAudienceModal";
import { tokens } from "#/components/layout/theme";

const { Title, Text } = Typography;

export const Route = createFileRoute("/app/audience/")({
  component: AudiencePage,
});

export default function AudiencePage() {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        minHeight: "100%",
        padding: `${tokens.spaceXL}px ${tokens.spaceXL}px ${tokens.spaceXXL}px`,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {/* =====================================================
            Page Header
        ===================================================== */}

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: tokens.spaceLG,
            marginBottom: tokens.spaceXXL,
          }}
        >
          <div>
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
                  width: 30,
                  height: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: tokens.radiusMD,
                  background: tokens.accentSoft,
                  color: tokens.accent,
                  flexShrink: 0,
                }}
              >
                <TeamOutlined style={{ fontSize: 15 }} />
              </div>

              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: tokens.inkMuted,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Audience
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
              Your audiences
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
              Upload and manage your audience CSV files. These audiences can
              later be used while creating email campaigns.
            </Text>
          </div>

          {/* =================================================
              Upload Action
          ================================================= */}

          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={() => setOpen(true)}
            style={{
              flexShrink: 0,
              marginTop: tokens.spaceLG,
              borderRadius: tokens.radiusMD,
              fontWeight: 500,
            }}
          >
            Upload audience
          </Button>
        </div>

        {/* =====================================================
            Audience Table
        ===================================================== */}

        <AudienceTable />
      </div>

      {/* =======================================================
          Upload Modal
      ======================================================= */}

      <UploadAudienceModal open={open} onCancel={() => setOpen(false)} />
    </div>
  );
}
