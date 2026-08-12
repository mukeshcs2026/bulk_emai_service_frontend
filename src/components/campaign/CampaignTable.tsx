import { Table, Tag, Typography } from "antd";
import type { TableProps } from "antd";

import { useCampaigns } from "#/hooks/campaign/useCampaigns";
import type { Campaign } from "#/services/campaign";

const { Text } = Typography;

const columns: TableProps<Campaign>["columns"] = [
  {
    title: "Campaign",
    dataIndex: "name",
    key: "name",
    render: (name) => <Text strong>{name}</Text>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      const color =
        status === "draft"
          ? "default"
          : status === "processing"
            ? "blue"
            : status === "success"
              ? "green"
              : status === "failed"
                ? "red"
                : "gold";

      return <Tag color={color}>{status.toUpperCase()}</Tag>;
    },
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Text
        type={record.status === "draft" ? undefined : "secondary"}
        style={{
          cursor: record.status === "draft" ? "pointer" : "not-allowed",
        }}
      >
        Send Email
      </Text>
    ),
  },
];

export default function CampaignTable() {
  const { data: campaigns = [], isLoading } = useCampaigns();

  return (
    <Table<Campaign>
      rowKey="id"
      columns={columns}
      dataSource={campaigns}
      loading={isLoading}
      pagination={false}
    />
  );
}
