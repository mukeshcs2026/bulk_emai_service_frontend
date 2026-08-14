import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  LoadingOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Button, Card, Empty, Space, Table, Tag, Typography } from "antd";
import type { TableProps } from "antd";

import { tokens } from "#/components/layout/theme";
import { useCampaigns, useSendCampaign } from "#/hooks/campaign/useCampaigns";
import { useJobStatus } from "#/hooks/audience/useJobStatus";
import type { Campaign } from "#/services/campaign";
import { useQueryClient } from "@tanstack/react-query";

const { Text } = Typography;

const getStatusConfig = (status: Campaign["status"]) => {
  switch (status) {
    case "draft":
      return {
        label: "Draft",
        color: tokens.inkMuted,
        background: tokens.surfaceSubtle,
        border: tokens.border,
        icon: <ClockCircleOutlined />,
      };

    case "processing":
      return {
        label: "Processing",
        color: tokens.accent,
        background: tokens.accentSoft,
        border: tokens.infoBorder,
        icon: <LoadingOutlined />,
      };

    case "success":
      return {
        label: "Completed",
        color: tokens.success,
        background: tokens.successSoft,
        border: tokens.successBorder,
        icon: <CheckCircleOutlined />,
      };

    case "failed":
      return {
        label: "Failed",
        color: tokens.danger,
        background: tokens.dangerSoft,
        border: tokens.dangerBorder,
        icon: <ExclamationCircleOutlined />,
      };

    default:
      return {
        label: status,
        color: tokens.inkMuted,
        background: tokens.surfaceSubtle,
        border: tokens.border,
        icon: null,
      };
  }
};

function CampaignStatus({ campaign }: { campaign: Campaign }) {
  const { data: job } = useJobStatus(campaign.job);

  const status = job?.status ?? campaign.status;

  const config = getStatusConfig(status);

  return (
    <Space orientation="vertical" size={2}>
      <Tag
        icon={config.icon}
        style={{
          margin: 0,
          display: "inline-flex",
          alignItems: "center",
          gap: tokens.spaceXS,
          padding: "4px 9px",
          borderRadius: tokens.radiusSM,
          border: `1px solid ${config.border}`,
          background: config.background,
          color: config.color,
          fontSize: 12,
          fontWeight: 600,
          lineHeight: "18px",
        }}
      >
        {config.label}
      </Tag>

      {job?.status === "processing" && (
        <Text
          style={{
            fontSize: 11,
            color: tokens.inkMuted,
          }}
        >
          {job.processed_items} / {job.total_items}
        </Text>
      )}
    </Space>
  );
}

export default function CampaignTable() {
  const { data: campaigns = [], isLoading } = useCampaigns();
  const queryClient = useQueryClient();

  const sendCampaignMutation = useSendCampaign();

  const columns: TableProps<Campaign>["columns"] = [
    // ─────────────────────────────────────
    // Campaign
    // ─────────────────────────────────────

    {
      title: "Campaign",
      dataIndex: "name",
      key: "name",
      width: 280,

      render: (name) => (
        <Space size={tokens.spaceSM}>
          <div
            style={{
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              borderRadius: tokens.radiusSM,
              background: tokens.accentSoft,
              color: tokens.accent,
            }}
          >
            <SendOutlined style={{ fontSize: 16 }} />
          </div>

          <div>
            <Text
              strong
              style={{
                display: "block",
                color: tokens.ink,
                fontSize: 14,
                lineHeight: 1.5,
              }}
            >
              {name}
            </Text>

            <Text
              style={{
                display: "block",
                marginTop: 2,
                color: tokens.inkSubtle,
                fontSize: 12,
                lineHeight: 1.4,
              }}
            />
          </div>
        </Space>
      ),
    },

    // ─────────────────────────────────────
    // Status
    // ─────────────────────────────────────

    {
      title: "Status",
      key: "status",
      width: 160,

      render: (_, record) => <CampaignStatus campaign={record} />,
    },

    // ─────────────────────────────────────
    // Action
    // ─────────────────────────────────────

    {
      title: "Action",
      key: "action",
      width: 150,

      render: (_, record) => {
        const canSend = record.status === "draft";

        const isSending =
          sendCampaignMutation.isPending &&
          sendCampaignMutation.variables === record.id;

        return (
          <Button
            type="text"
            icon={<SendOutlined />}
            disabled={!canSend}
            loading={isSending}
            onClick={() => {
              sendCampaignMutation.mutate(record.id, {
                onSuccess: () => {
                  queryClient.invalidateQueries({
                    queryKey: ["campaigns"],
                  });
                },
              });
            }}
            style={{
              paddingInline: tokens.spaceSM,
              borderRadius: tokens.radiusSM,
              color: canSend ? tokens.accent : tokens.inkDisabled,
              fontWeight: canSend ? 500 : 400,
            }}
          >
            Send email
          </Button>
        );
      },
    },
  ];

  return (
    <Card
      style={{
        overflow: "hidden",
        border: `1px solid ${tokens.border}`,
        borderRadius: tokens.radiusLG,
        background: tokens.surface,
        boxShadow: tokens.shadowSm,
      }}
      styles={{
        body: {
          padding: 0,
        },
      }}
    >
      <Table<Campaign>
        rowKey="id"
        columns={columns}
        dataSource={campaigns}
        loading={isLoading}
        pagination={false}
        locale={{
          emptyText: (
            <div
              style={{
                padding: `${tokens.spaceXXL}px ${tokens.spaceLG}px`,
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
                      No campaigns yet
                    </Text>

                    <Text
                      style={{
                        color: tokens.inkMuted,
                        fontSize: 13,
                      }}
                    >
                      Create a campaign to start sending emails.
                    </Text>
                  </div>
                }
              />
            </div>
          ),
        }}
        scroll={{
          x: 700,
        }}
      />
    </Card>
  );
}
