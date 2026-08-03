import { useState } from "react";
import { Button, Form, Input, Modal, Select, Typography } from "antd";

import { useAudiences } from "#/hooks/audience/useAudiences";
import { useAudience } from "#/hooks/audience/useAudience";

const { Title, Text } = Typography;

interface CreateCampaignModalProps {
  open: boolean;
  onCancel: () => void;
}

interface CampaignFormValues {
  name: string;
  audience: number;
  template: number;
}

export default function CreateCampaignModal({
  open,
  onCancel,
}: CreateCampaignModalProps) {
  const [form] = Form.useForm<CampaignFormValues>();

  const [selectedAudienceId, setSelectedAudienceId] = useState<number | null>(
    null,
  );

  const { data: audiences = [], isLoading: loadingAudiences } = useAudiences();

  const { data: audience } = useAudience(selectedAudienceId);

  const handleFinish = (values: CampaignFormValues) => {
    console.log(values);
    console.log("Audience:", audience);

    /**
     * Next step:
     * Fetch template details.
     * Render template preview.
     * Render variable mapping.
     */
  };

  const handleClose = () => {
    form.resetFields();
    setSelectedAudienceId(null);
    onCancel();
  };

  return (
    <Modal
      title={null}
      open={open}
      centered
      footer={null}
      destroyOnHidden
      width={1000}
      onCancel={handleClose}
    >
      <div
        style={{
          padding: "8px 4px",
        }}
      >
        <Title level={3} style={{ marginBottom: 4 }}>
          Create Campaign
        </Title>

        <Text type="secondary">
          Select an audience and an email template to create a new campaign.
        </Text>

        <Form
          form={form}
          layout="vertical"
          style={{ marginTop: 32 }}
          onFinish={handleFinish}
        >
          <Form.Item
            label="Campaign Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter a campaign name.",
              },
            ]}
          >
            <Input placeholder="e.g. Welcome Campaign" />
          </Form.Item>

          <Form.Item
            label="Audience"
            name="audience"
            rules={[
              {
                required: true,
                message: "Please select an audience.",
              },
            ]}
          >
            <Select
              placeholder="Select Audience"
              loading={loadingAudiences}
              options={audiences.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
              onChange={(value) => {
                setSelectedAudienceId(value);
              }}
            />
          </Form.Item>

          <Form.Item
            label="Email Template"
            name="template"
            rules={[
              {
                required: true,
                message: "Please select a template.",
              },
            ]}
          >
            <Select placeholder="Select Template" options={[]} />
          </Form.Item>

          {/* Next Step: Template Preview */}

          {/* Next Step: Variable Mapping */}

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 12,
              marginTop: 32,
            }}
          >
            <Button onClick={handleClose}>Cancel</Button>

            <Button type="primary" htmlType="submit">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
}
