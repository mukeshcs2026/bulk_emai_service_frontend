import { InboxOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Typography, Upload } from "antd";

import { tokens } from "#/components/layout/theme";

const { Title, Text } = Typography;
const { Dragger } = Upload;

interface UploadAudienceModalProps {
  open: boolean;
  onCancel: () => void;
}

export default function UploadAudienceModal({
  open,
  onCancel,
}: UploadAudienceModalProps) {
  const [form] = Form.useForm();

  return (
    <Modal
      title={null}
      centered
      open={open}
      footer={null}
      onCancel={onCancel}
      width={{
        xs: "95%",
        sm: "85%",
        md: "700px",
        lg: "750px",
        xl: "800px",
      }}
    >
      <div
        style={{
          padding: "8px 4px",
        }}
      >
        <Title
          level={3}
          style={{
            marginBottom: 4,
          }}
        >
          Upload Audience
        </Title>

        <Text type="secondary">
          Upload a CSV file containing your audience. This audience can later be
          selected while creating email campaigns.
        </Text>

        <Form
          layout="vertical"
          form={form}
          style={{
            marginTop: 32,
          }}
        >
          <Form.Item
            label="Audience Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter an audience name.",
              },
            ]}
          >
            <Input placeholder="e.g. Customers, Leads, Newsletter Subscribers" />
          </Form.Item>

          <Form.Item label="CSV File" name="csv_file" valuePropName="fileList">
            <Dragger
              accept=".csv"
              beforeUpload={() => false}
              maxCount={1}
              style={{
                background: tokens.accentSoft,
                border: `2px dashed ${tokens.accent}`,
                borderRadius: 12,
                padding: 16,
              }}
            >
              <p
                style={{
                  fontSize: 42,
                  color: tokens.accent,
                  marginBottom: 12,
                }}
              >
                <InboxOutlined />
              </p>

              <Title
                level={5}
                style={{
                  marginBottom: 8,
                }}
              >
                Click or drag your CSV here
              </Title>

              <Text type="secondary">Only CSV files are supported.</Text>
            </Dragger>
          </Form.Item>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 12,
              marginTop: 24,
            }}
          >
            <Button onClick={onCancel}>Cancel</Button>

            <Button type="primary" htmlType="submit">
              Upload Audience
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
}
