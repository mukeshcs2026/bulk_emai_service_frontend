import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpOutlined,
  MailOutlined,
  TeamOutlined,
  FileTextOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Space, Typography } from "antd";

import { tokens } from "#/components/layout/theme";

const { Title, Text } = Typography;

export const Route = createFileRoute("/app/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div
      style={{
        padding: tokens.spaceXL,
      }}
    >
      {/* ============================================================
          PAGE HEADER
      ============================================================ */}

      <div
        style={{
          marginBottom: tokens.spaceXL,
        }}
      >
        <Title
          level={2}
          style={{
            margin: 0,
            color: tokens.ink,
          }}
        >
          Dashboard
        </Title>

        <Text
          style={{
            display: "block",
            marginTop: tokens.spaceXS,
            color: tokens.inkMuted,
            fontSize: 14,
          }}
        >
          Overview of your email campaigns and audience activity.
        </Text>
      </div>

      {/* ============================================================
          STAT CARDS
      ============================================================ */}

      <Row gutter={[tokens.spaceLG, tokens.spaceLG]}>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Total Campaigns"
            value="24"
            icon={<SendOutlined />}
            description="12% from last month"
          />
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Emails Sent"
            value="12,480"
            icon={<MailOutlined />}
            description="8.4% from last month"
          />
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Audiences"
            value="8"
            icon={<TeamOutlined />}
            description="3 new this month"
          />
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Templates"
            value="6"
            icon={<FileTextOutlined />}
            description="All templates ready"
          />
        </Col>
      </Row>

      {/* ============================================================
          MAIN CONTENT
      ============================================================ */}

      <Row
        gutter={[tokens.spaceLG, tokens.spaceLG]}
        style={{
          marginTop: tokens.spaceLG,
        }}
      >
        {/* Campaign Activity */}

        <Col xs={24} lg={16}>
          <Card
            title="Campaign Activity"
            style={{
              height: "100%",
              border: `1px solid ${tokens.border}`,
              borderRadius: tokens.radiusLG,
              background: tokens.surface,
              boxShadow: tokens.shadowSm,
            }}
            styles={{
              header: {
                borderBottom: `1px solid ${tokens.border}`,
              },
            }}
          >
            <div
              style={{
                minHeight: 280,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: tokens.inkMuted,
              }}
            >
              <Space direction="vertical" align="center">
                <SendOutlined
                  style={{
                    fontSize: 28,
                    color: tokens.accent,
                  }}
                />

                <Text
                  style={{
                    color: tokens.inkMuted,
                  }}
                >
                  Campaign activity will appear here.
                </Text>
              </Space>
            </div>
          </Card>
        </Col>

        {/* Quick Overview */}

        <Col xs={24} lg={8}>
          <Card
            title="Quick Overview"
            style={{
              height: "100%",
              border: `1px solid ${tokens.border}`,
              borderRadius: tokens.radiusLG,
              background: tokens.surface,
              boxShadow: tokens.shadowSm,
            }}
            styles={{
              header: {
                borderBottom: `1px solid ${tokens.border}`,
              },
            }}
          >
            <Space
              direction="vertical"
              size={tokens.spaceLG}
              style={{
                width: "100%",
              }}
            >
              <OverviewItem label="Completed campaigns" value="18" />

              <OverviewItem label="Processing campaigns" value="2" />

              <OverviewItem label="Draft campaigns" value="4" />

              <OverviewItem label="Total contacts" value="9,870" />
            </Space>
          </Card>
        </Col>
      </Row>

      {/* ============================================================
          RECENT ACTIVITY
      ============================================================ */}

      <Card
        title="Recent Activity"
        style={{
          marginTop: tokens.spaceLG,
          border: `1px solid ${tokens.border}`,
          borderRadius: tokens.radiusLG,
          background: tokens.surface,
          boxShadow: tokens.shadowSm,
        }}
        styles={{
          header: {
            borderBottom: `1px solid ${tokens.border}`,
          },
        }}
      >
        <div
          style={{
            minHeight: 180,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: tokens.inkMuted,
          }}
        >
          <Text style={{ color: tokens.inkMuted }}>
            Recent activity will appear here.
          </Text>
        </div>
      </Card>
    </div>
  );
}

/* ================================================================
   STAT CARD
================================================================ */

function StatCard({
  title,
  value,
  icon,
  description,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}) {
  return (
    <Card
      style={{
        border: `1px solid ${tokens.border}`,
        borderRadius: tokens.radiusLG,
        background: tokens.surface,
        boxShadow: tokens.shadowSm,
      }}
      styles={{
        body: {
          padding: tokens.spaceLG,
        },
      }}
    >
      <Space
        direction="vertical"
        size={tokens.spaceSM}
        style={{
          width: "100%",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: tokens.radiusSM,
            background: tokens.accentSoft,
            color: tokens.accent,
            fontSize: 17,
          }}
        >
          {icon}
        </div>

        <Text
          style={{
            color: tokens.inkMuted,
            fontSize: 13,
          }}
        >
          {title}
        </Text>

        <Title
          level={3}
          style={{
            margin: 0,
            color: tokens.ink,
          }}
        >
          {value}
        </Title>

        <Space size={tokens.spaceXS}>
          <ArrowUpOutlined
            style={{
              color: tokens.success,
              fontSize: 11,
            }}
          />

          <Text
            style={{
              color: tokens.inkMuted,
              fontSize: 12,
            }}
          >
            {description}
          </Text>
        </Space>
      </Space>
    </Card>
  );
}

/* ================================================================
   OVERVIEW ITEM
================================================================ */

function OverviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: tokens.spaceMD,
        borderBottom: `1px solid ${tokens.border}`,
      }}
    >
      <Text
        style={{
          color: tokens.inkMuted,
          fontSize: 13,
        }}
      >
        {label}
      </Text>

      <Text
        strong
        style={{
          color: tokens.ink,
          fontSize: 14,
        }}
      >
        {value}
      </Text>
    </div>
  );
}
