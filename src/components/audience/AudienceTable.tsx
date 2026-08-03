import { useAudiences } from "#/hooks/audience/useAudiences";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";

interface Audience {
  id: number;
  name: string;
  total_rows: number;
  headers: string[];
  status: string;
  created_at: string;
}

const columns: TableProps<Audience>["columns"] = [
  {
    title: "Audience",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Rows",
    dataIndex: "total_rows",
    key: "total_rows",
  },
  {
    title: "Headers",
    dataIndex: "headers",
    key: "headers",
    render: (_, record) => (
      <Space wrap>
        {record.headers.map((header) => (
          <Tag key={header}>{header}</Tag>
        ))}
      </Space>
    ),
  },
  //   {
  //     title: "Status",
  //     dataIndex: "status",
  //     key: "status",
  //     render: (status) => {
  //       const color =
  //         status === "SUCCESS"
  //           ? "green"
  //           : status === "PROCESSING"
  //             ? "blue"
  //             : status === "FAILED"
  //               ? "red"
  //               : "gold";

  //       return <Tag color={color}>{status}</Tag>;
  //     },
  //   },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space>
        <a>View</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const AudienceTable = () => {
  //   const data: Audience[] = [
  //     {
  //       id: 1,
  //       name: "customers.csv",
  //       total_rows: 1520,
  //       headers: ["Email", "First Name", "Company", "City"],
  //       status: "SUCCESS",
  //       created_at: "2026-08-03",
  //     },
  //   ];

  const { data = [], isLoading } = useAudiences();

  //   console.log(data.data);

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data}
      loading={isLoading}
      pagination={false}
    />
  );
};

export default AudienceTable;
