import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Form, Modal, Progress, Typography, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";

import { useUploadAudience } from "#/hooks/audience/useUploadAudience";
import { useJobStatus } from "#/hooks/audience/useJobStatus";
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

  const [jobId, setJobId] = useState<number | null>(null);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useUploadAudience();

  const { data: job } = useJobStatus(jobId);

  /*
   * Calculate progress from the job data.
   *
   * Example:
   * processed_items = 3150
   * total_items = 6300
   *
   * progress = 50%
   */
  const progress =
    job && job.total_items > 0
      ? Math.round((job.processed_items / job.total_items) * 100)
      : 0;

  /*
   * Watch the Celery job status.
   */
  useEffect(() => {
    if (!job) {
      return;
    }

    /*
     * Celery finished successfully.
     *
     * At this point the Audience object has its
     * final headers and total_rows.
     */
    if (job.status === "success") {
      /*
       * Tell TanStack Query that the cached audience
       * list is now stale.
       *
       * This causes useAudiences() to fetch the
       * updated audience list.
       */
      queryClient.invalidateQueries({
        queryKey: ["audiences"],
      });

      form.resetFields();
      setJobId(null);

      onCancel();
    }
  }, [job, queryClient, form, onCancel]);

  /*
   * Called when the user submits the upload form.
   */
  const handleFinish = (values: any) => {
    const file = values.csv_file[0].originFileObj;

    mutate(file, {
      onSuccess: (response) => {
        /*
         * The upload API returns the Celery job ID.
         *
         * Setting jobId enables useJobStatus(jobId),
         * which starts polling the job API.
         */
        setJobId(response.job_id);
      },
    });
  };

  /*
   * Cancel handler.
   *
   * If there is an active job, we remove the job ID
   * from this component's state.
   */
  const handleCancel = () => {
    setJobId(null);
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title={null}
      centered
      open={open}
      footer={null}
      onCancel={handleCancel}
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

        {/*
         * ============================================================
         * UPLOAD FORM
         * ============================================================
         *
         * Show this when there is no active Celery job.
         */}
        {jobId === null && (
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
              <Button onClick={handleCancel}>Cancel</Button>

              <Button type="primary" htmlType="submit" loading={isPending}>
                Upload Audience
              </Button>
            </div>
          </Form>
        )}

        {/*
         * ============================================================
         * PROGRESS UI
         * ============================================================
         *
         * Show this after the upload API returns a job_id.
         */}
        {jobId !== null && (
          <div
            style={{
              marginTop: 32,
            }}
          >
            <Title level={5}>Importing Audience</Title>

            <Text type="secondary">
              Please wait while your audience is being processed.
            </Text>

            <div
              style={{
                marginTop: 24,
              }}
            >
              <Progress
                percent={progress}
                status={
                  job?.status === "failed"
                    ? "exception"
                    : job?.status === "success"
                      ? "success"
                      : "active"
                }
              />
            </div>

            {job && (
              <div
                style={{
                  marginTop: 12,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Text type="secondary">
                  {job.processed_items ?? 0} / {job.total_items ?? 0} rows
                  processed
                </Text>

                <Text type="secondary">{progress}%</Text>
              </div>
            )}

            {job?.status === "failed" && (
              <Text
                type="danger"
                style={{
                  display: "block",
                  marginTop: 16,
                }}
              >
                Audience import failed. Please try uploading the file again.
              </Text>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
