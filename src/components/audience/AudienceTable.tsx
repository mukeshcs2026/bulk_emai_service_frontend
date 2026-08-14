import { DeleteOutlined, EyeOutlined, TeamOutlined } from "@ant-design/icons";
import { Button, Card, Empty, Space, Table, Tag, Typography } from "antd";
import type { TableProps } from "antd";

import { tokens } from "#/components/layout/theme";
import { useAudiences } from "#/hooks/audience/useAudiences";

const { Text } = Typography;

interface Audience {
  id: number;
  name: string;
  file_name?: string;
  total_rows: number;
  headers: string[];
}

const columns: TableProps<Audience>["columns"] = [
  // ─────────────────────────────────────
  // Audience
  // ─────────────────────────────────────

  {
    title: "Audience",
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

            borderRadius: tokens.radiusMD,

            background: tokens.accentSoft,
            color: tokens.accent,
          }}
        >
          <TeamOutlined style={{ fontSize: 17 }} />
        </div>

        <div
          style={{
            minWidth: 0,
          }}
        >
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
          ></Text>
        </div>
      </Space>
    ),
  },

  // ─────────────────────────────────────
  // Contacts
  // ─────────────────────────────────────

  {
    title: "Contacts",
    dataIndex: "total_rows",
    key: "total_rows",
    width: 140,

    render: (totalRows) => (
      <Text
        strong
        style={{
          color: tokens.ink,
          fontSize: 14,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {totalRows.toLocaleString()}
      </Text>
    ),
  },

  // ─────────────────────────────────────
  // Columns
  // ─────────────────────────────────────

  {
    title: "Columns",
    dataIndex: "headers",
    key: "headers",

    render: (headers: string[]) => (
      <Space wrap size={[tokens.spaceXS, tokens.spaceXS]}>
        {headers.length > 0 ? (
          headers.map((header) => (
            <Tag
              key={header}
              style={{
                margin: 0,

                border: `1px solid ${tokens.border}`,
                borderRadius: tokens.radiusSM,

                background: tokens.surfaceSubtle,
                color: tokens.inkSecondary,

                padding: "3px 9px",

                fontSize: 12,
                lineHeight: "18px",
              }}
            >
              {header}
            </Tag>
          ))
        ) : (
          <Text
            style={{
              color: tokens.inkSubtle,
              fontSize: 13,
            }}
          >
            No columns
          </Text>
        )}
      </Space>
    ),
  },

  // ─────────────────────────────────────
  // Actions
  // ─────────────────────────────────────

  {
    title: "Actions",
    key: "action",
    width: 160,
    align: "right",

    render: () => (
      <Space size={tokens.spaceXS}>
        <Button
          type="text"
          icon={<EyeOutlined />}
          style={{
            color: tokens.inkSecondary,
            borderRadius: tokens.radiusSM,
          }}
        >
          View
        </Button>

        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          style={{
            borderRadius: tokens.radiusSM,
          }}
        >
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
      <Table<Audience>
        rowKey="id"
        columns={columns}
        dataSource={data}
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
                      No audiences yet
                    </Text>

                    <Text
                      style={{
                        color: tokens.inkMuted,
                        fontSize: 13,
                      }}
                    >
                      Upload a CSV file to create your first audience.
                    </Text>
                  </div>
                }
              />
            </div>
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
