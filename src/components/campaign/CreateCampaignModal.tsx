import { Button, Form, Input, Modal, Select, Typography } from "antd";
import { useState } from "react";

import { useTemplates } from "#/hooks/template/useTemplates";
import { useTemplate } from "#/hooks/template/useTemplate";

import { useAudiences } from "#/hooks/audience/useAudiences";
import { useAudience } from "#/hooks/audience/useAudience";

import { useCreateCampaign } from "#/hooks/campaign/useCreateCampaign";

import type { CreateCampaignPayload } from "#/services/campaign";

const { Title, Text } = Typography;

interface CreateCampaignModalProps {
  open: boolean;
  onCancel: () => void;
}

export default function CreateCampaignModal({
  open,
  onCancel,
}: CreateCampaignModalProps) {
  const [form] = Form.useForm();

  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(
    null,
  );

  const [selectedAudienceId, setSelectedAudienceId] = useState<number | null>(
    null,
  );

  /*
   * Get templates for the dropdown.
   */
  const { data: templates = [], isLoading: templatesLoading } = useTemplates();

  /*
   * Once a template is selected, fetch its full details.
   *
   * This gives us:
   * - subject
   * - preview
   * - variables
   */
  const { data: selectedTemplate, isLoading: templateLoading } =
    useTemplate(selectedTemplateId);

  /*
   * Get audiences for the dropdown.
   */
  const { data: audiences = [], isLoading: audiencesLoading } = useAudiences();

  /*
   * Once an audience is selected, fetch its full details.
   *
   * This gives us:
   * - headers
   * - total_rows
   * - etc.
   */
  const { data: selectedAudience, isLoading: audienceLoading } =
    useAudience(selectedAudienceId);

  /*
   * Campaign creation mutation.
   */
  const { mutate, isPending } = useCreateCampaign();

  /*
   * Submit campaign.
   */
  const handleFinish = (values: CreateCampaignPayload) => {
    console.log("Campaign payload:", values);

    mutate(values, {
      onSuccess: () => {
        form.resetFields();

        setSelectedTemplateId(null);
        setSelectedAudienceId(null);

        onCancel();
      },
    });
  };

  /*
   * When modal is closed manually, reset the local state as well.
   */
  const handleCancel = () => {
    form.resetFields();

    setSelectedTemplateId(null);
    setSelectedAudienceId(null);

    onCancel();
  };

  return (
    <Modal
      title="Create Campaign"
      centered
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={750}
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        {/* =========================
            Campaign Name
        ========================== */}

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

        {/* =========================
            Template
        ========================== */}

        <Form.Item
          label="Template"
          name="template"
          rules={[
            {
              required: true,
              message: "Please select a template.",
            },
          ]}
        >
          <Select
            placeholder="Select a template"
            loading={templatesLoading}
            options={templates.map((template) => ({
              label: template.template_name,
              value: template.id,
            }))}
            onChange={(value) => {
              setSelectedTemplateId(value);

              /*
               * The variables may have changed,
               * so remove the previous mapping.
               */
              form.setFieldValue("variable_mapping", {});
            }}
          />
        </Form.Item>

        {/* =========================
            Template Loading
        ========================== */}

        {selectedTemplateId && templateLoading && (
          <Text type="secondary">Loading template...</Text>
        )}

        {/* Template Preview */}

        {selectedTemplate && (
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <Title level={5}>Template Preview</Title>

            <Text type="secondary">{selectedTemplate.subject}</Text>

            <div
              style={{
                marginTop: 16,
                border: "1px solid #e5e7eb",
                borderRadius: 8,
                overflow: "hidden",
                background: "#fff",
              }}
            >
              <iframe
                title="Email Template Preview"
                srcDoc={selectedTemplate.preview}
                style={{
                  width: "100%",
                  height: 250,
                  border: "none",
                }}
              />
            </div>
          </div>
        )}

        {/* =========================
            Template Variables
        ========================== */}

        {selectedTemplate && (
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <Title level={5}>Template Variables</Title>

            <Text type="secondary">
              These variables will be mapped to columns from your audience.
            </Text>

            <div
              style={{
                marginTop: 12,
              }}
            >
              {selectedTemplate.variables.map((variable) => (
                <div
                  key={variable}
                  style={{
                    padding: "8px 12px",
                    marginBottom: 8,
                    border: "1px solid #e5e7eb",
                    borderRadius: 6,
                  }}
                >
                  {`{{ ${variable} }}`}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================
            Audience
        ========================== */}

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
            placeholder="Select an audience"
            loading={audiencesLoading}
            options={audiences.map((audience) => ({
              label: `${audience.name} (${audience.total_rows} contacts)`,
              value: audience.id,
            }))}
            onChange={(value) => {
              setSelectedAudienceId(value);

              /*
               * The audience columns may have changed,
               * so remove any previous mapping.
               */
              form.setFieldValue("variable_mapping", {});
            }}
          />
        </Form.Item>

        {/* =========================
            Audience Loading
        ========================== */}

        {selectedAudienceId && audienceLoading && (
          <Text type="secondary">Loading audience columns...</Text>
        )}

        {/* =========================
            Variable Mapping
        ========================== */}

        {selectedTemplate && selectedAudience && !audienceLoading && (
          <div
            style={{
              marginTop: 24,
            }}
          >
            <Title level={5}>Variable Mapping</Title>

            <Text type="secondary">
              Map each template variable to a column from your audience.
            </Text>

            <div
              style={{
                marginTop: 16,
              }}
            >
              {selectedTemplate.variables.map((variable) => (
                <div
                  key={variable}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1.5fr",
                    gap: 16,
                    alignItems: "start",
                  }}
                >
                  {/* Template variable */}

                  <div
                    style={{
                      paddingTop: 8,
                    }}
                  >
                    <Text strong>{`{{ ${variable} }}`}</Text>
                  </div>

                  {/* Audience column */}

                  <Form.Item
                    name={["variable_mapping", variable]}
                    rules={[
                      {
                        required: true,
                        message: `Please select a column for ${variable}.`,
                      },
                    ]}
                    style={{
                      marginBottom: 16,
                    }}
                  >
                    <Select
                      placeholder="Select audience column"
                      options={selectedAudience.headers.map((header) => ({
                        label: header,
                        value: header,
                      }))}
                    />
                  </Form.Item>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================
            Actions
        ========================== */}

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
            Create Campaign
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
