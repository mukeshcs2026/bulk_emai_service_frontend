import { DeleteOutlined, EyeOutlined, TeamOutlined } from "@ant-design/icons";
import { Button, Card, Empty, Space, Table, Tag, Typography } from "antd";
import type { TableProps } from "antd";

import { useAudiences } from "#/hooks/audience/useAudiences";
import { tokens } from "#/components/layout/theme";

const { Text } = Typography;

interface Audience {
  id: number;
  name: string;
  file_name?: string;
  total_rows: number;
  headers: string[];
}

const columns: TableProps<Audience>["columns"] = [
  {
    title: "Audience",
    dataIndex: "name",
    key: "name",
    width: 260,
    render: (name) => (
      <Space size={12}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: tokens.accentSoft,
            color: tokens.accent,
            flexShrink: 0,
          }}
        >
          <TeamOutlined />
        </div>

        <div>
          <Text
            strong
            style={{
              display: "block",
              color: tokens.ink,
            }}
          >
            {name}
          </Text>

          <Text
            type="secondary"
            style={{
              fontSize: 12,
            }}
          >
            Audience
          </Text>
        </div>
      </Space>
    ),
  },

  {
    title: "Contacts",
    dataIndex: "total_rows",
    key: "total_rows",
    width: 120,
    render: (totalRows) => (
      <Text
        strong
        style={{
          color: tokens.ink,
        }}
      >
        {totalRows.toLocaleString()}
      </Text>
    ),
  },

  {
    title: "Columns",
    dataIndex: "headers",
    key: "headers",
    render: (headers: string[]) => (
      <Space wrap size={[6, 6]}>
        {headers.length > 0 ? (
          headers.map((header) => (
            <Tag
              key={header}
              style={{
                margin: 0,
                borderRadius: 6,
                border: `1px solid ${tokens.border}`,
                background: tokens.canvas,
                color: tokens.inkMuted,
                padding: "3px 8px",
                fontSize: 12,
              }}
            >
              {header}
            </Tag>
          ))
        ) : (
          <Text type="secondary">No columns</Text>
        )}
      </Space>
    ),
  },

  {
    title: "Actions",
    key: "action",
    width: 150,
    align: "right",
    render: () => (
      <Space size={4}>
        <Button
          type="text"
          icon={<EyeOutlined />}
          style={{
            color: tokens.inkMuted,
          }}
        >
          View
        </Button>

        <Button type="text" danger icon={<DeleteOutlined />}>
          Delete
        </Button>
      </Space>
    ),
  },
];

const AudienceTable = () => {
  const { data = [], isLoading } = useAudiences();

  return (
    <Card
      style={{
        borderRadius: 14,
        border: `1px solid ${tokens.border}`,
        boxShadow: tokens.accentSoft,
        overflow: "hidden",
      }}
      styles={{
        body: {
          padding: 0,
        },
      }}
    >
      <Table<Audience>
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={isLoading}
        pagination={false}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <Text type="secondary">
                  No audiences have been uploaded yet.
                </Text>
              }
            />
          ),
        }}
        scroll={{
          x: 800,
        }}
      />
    </Card>
  );
};

export default AudienceTable;
