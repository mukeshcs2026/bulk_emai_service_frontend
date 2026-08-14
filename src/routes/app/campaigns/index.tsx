import { useState } from "react";

import { PlusOutlined, SendOutlined } from "@ant-design/icons";
import { createFileRoute } from "@tanstack/react-router";
import { Button, Typography } from "antd";

import CampaignTable from "#/components/campaign/CampaignTable";
import CreateCampaignModal from "#/components/campaign/CreateCampaignModal";
import { tokens } from "#/components/layout/theme";

const { Title, Text } = Typography;

export const Route = createFileRoute("/app/campaigns/")({
  component: CampaignsPage,
});

function CampaignsPage() {
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
                  flexShrink: 0,
                  borderRadius: tokens.radiusMD,
                  background: tokens.accentSoft,
                  color: tokens.accent,
                }}
              >
                <SendOutlined style={{ fontSize: 15 }} />
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
                Campaigns
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
              Your campaigns
            </Title>

            {/* Description */}

            <Text
              style={{
                display: "block",
                maxWidth: 560,
                marginTop: tokens.spaceSM,
                fontSize: 14,
                lineHeight: 1.7,
                color: tokens.inkMuted,
              }}
            >
              Create, manage, and monitor your email campaigns from one place.
            </Text>
          </div>

          {/* =================================================
              Create Campaign
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
            Create campaign
          </Button>
        </div>

        {/* =====================================================
            Campaign List
        ===================================================== */}

        <CampaignTable />
      </div>

      {/* =======================================================
          Create Campaign Modal
      ======================================================= */}

      <CreateCampaignModal open={open} onCancel={() => setOpen(false)} />
    </div>
  );
}

export default CampaignsPage;
