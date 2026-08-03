import { InboxOutlined } from "@ant-design/icons";
import { Button, Form, Modal, Typography, Upload, Progress } from "antd";
import { useUploadAudience } from "#/hooks/audience/useUploadAudience";
import { useState, useEffect } from "react";

import { tokens } from "#/components/layout/theme";
import { useJobStatus } from "#/hooks/audience/useJobStatus";

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

  const [jobId, setJobId] = useState<number | null>(null);

  const { mutate, isPending } = useUploadAudience();
  const { data: job } = useJobStatus(jobId);

  useEffect(() => {
    if (!job) return;

    if (job.status === "success") {
      form.resetFields();
      setJobId(null);
      onCancel();
    }

    if (job.status === "failed") {
      setJobId(null);
    }
  }, [job, form, onCancel]);

  // console.log(job?.progress);

  const handleFinish = (values: any) => {
    console.log(values);
    const file = values.csv_file[0].originFileObj;

    mutate(file, {
      onSuccess: (response) => {
        setJobId(response.job_id);
      },
    });
  };

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

        {jobId === null ? (
          <Form
            layout="vertical"
            form={form}
            onFinish={handleFinish}
            style={{
              marginTop: 32,
            }}
          >
            <Form.Item
              label="CSV File"
              name="csv_file"
              valuePropName="fileList"
              getValueFromEvent={(e) => e?.fileList}
              rules={[
                {
                  required: true,
                  message: "Please select a CSV file.",
                },
              ]}
            >
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

              <Button type="primary" htmlType="submit" loading={isPending}>
                Upload Audience
              </Button>
            </div>
          </Form>
        ) : (
          <div
            style={{
              marginTop: 32,
            }}
          >
            {/* Progress UI */}
            <Progress
              percent={job?.progress ?? 0}
              status={job?.status === "success" ? "success" : "active"}
            />
          </div>
        )}
      </div>
    </Modal>
  );
}
