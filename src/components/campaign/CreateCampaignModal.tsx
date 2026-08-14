import { useState } from "react";

import {
  CheckCircleOutlined,
  FileTextOutlined,
  SendOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Tag,
  Typography,
} from "antd";

import { tokens } from "#/components/layout/theme";

import { useAudience } from "#/hooks/audience/useAudience";
import { useAudiences } from "#/hooks/audience/useAudiences";

import { useCreateCampaign } from "#/hooks/campaign/useCreateCampaign";

import { useTemplate } from "#/hooks/template/useTemplate";
import { useTemplates } from "#/hooks/template/useTemplates";

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

  const { data: templates = [], isLoading: templatesLoading } = useTemplates();

  const { data: selectedTemplate, isLoading: templateLoading } =
    useTemplate(selectedTemplateId);

  const { data: audiences = [], isLoading: audiencesLoading } = useAudiences();

  const { data: selectedAudience, isLoading: audienceLoading } =
    useAudience(selectedAudienceId);

  const { mutate, isPending } = useCreateCampaign();

  const handleFinish = (values: CreateCampaignPayload) => {
    mutate(values, {
      onSuccess: () => {
        form.resetFields();

        setSelectedTemplateId(null);
        setSelectedAudienceId(null);

        onCancel();
      },
    });
  };

  const handleCancel = () => {
    form.resetFields();

    setSelectedTemplateId(null);
    setSelectedAudienceId(null);

    onCancel();
  };

  return (
    <Modal
      centered
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={760}
      title={
        <div>
          <Space size={tokens.spaceMD}>
            <div
              style={{
                width: 34,
                height: 34,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                borderRadius: tokens.radiusMD,

                background: tokens.accentSoft,
                color: tokens.accent,
              }}
            >
              <SendOutlined />
            </div>

            <div>
              <Text
                strong
                style={{
                  display: "block",
                  fontFamily: tokens.fontDisplay,
                  fontSize: 16,
                  color: tokens.ink,
                }}
              >
                Create campaign
              </Text>

              <Text
                style={{
                  display: "block",
                  marginTop: 2,
                  color: tokens.inkMuted,
                  fontSize: 12,
                  fontWeight: 400,
                }}
              >
                Configure your email campaign
              </Text>
            </div>
          </Space>
        </div>
      }
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        {/* =====================================================
            Campaign Details
        ===================================================== */}

        <div
          style={{
            marginTop: tokens.spaceLG,
          }}
        >
          <Form.Item
            label="Campaign name"
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
        </div>

        <Divider />

        {/* =====================================================
            Template
        ===================================================== */}

        <SectionHeader
          icon={<FileTextOutlined />}
          title="Email template"
          description="Choose the template that will be used for this campaign."
        />

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

              form.setFieldValue("variable_mapping", {});
            }}
          />
        </Form.Item>

        {/* Template loading */}

        {selectedTemplateId && templateLoading && (
          <LoadingMessage>Loading template details...</LoadingMessage>
        )}

        {/* =====================================================
            Template Preview
        ===================================================== */}

        {selectedTemplate && (
          <div
            style={{
              marginTop: tokens.spaceLG,
              marginBottom: tokens.spaceLG,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: tokens.spaceSM,
              }}
            >
              <Text
                strong
                style={{
                  color: tokens.ink,
                  fontSize: 22,
                }}
              >
                Template preview
              </Text>

              <Tag
                style={{
                  margin: 0,
                  border: `1px solid ${tokens.infoBorder}`,
                  background: tokens.infoSoft,
                  color: tokens.accent,
                  borderRadius: tokens.radiusSM,
                }}
              >
                Preview
              </Tag>
            </div>

            <Text
              style={{
                display: "block",
                marginBottom: tokens.spaceSM,
                color: tokens.inkMuted,
                fontSize: 15,
              }}
            >
              {selectedTemplate.subject}
            </Text>

            <div
              style={{
                overflow: "hidden",

                border: `1px solid ${tokens.border}`,
                borderRadius: tokens.radiusLG,

                background: tokens.surface,

                boxShadow: tokens.shadowSm,
              }}
            >
              <iframe
                title="Email Template Preview"
                srcDoc={`
                      <style>
                        body {
                          font-family: Arial, sans-serif !important;
                          font-size: 13px !important;
                        }

                        p, div, span, td, th {
                          font-size: 15px !important;
                          padding-left: 15px;
                        }
                      </style>

                      ${selectedTemplate.preview}
                    `}
                style={{
                  display: "block",
                  width: "100%",
                  height: 200,
                  border: "none",
                }}
              />
            </div>
          </div>
        )}

        {/* =====================================================
            Template Variables
        ===================================================== */}

        {selectedTemplate && selectedTemplate.variables.length > 0 && (
          <div
            style={{
              padding: tokens.spaceLG,

              border: `1px solid ${tokens.border}`,
              borderRadius: tokens.radiusLG,

              background: tokens.surfaceSubtle,
            }}
          >
            <Text
              strong
              style={{
                display: "block",
                marginBottom: tokens.spaceXS,
                color: tokens.ink,
                fontSize: 22,
              }}
            >
              Template variables
            </Text>

            <Text
              style={{
                display: "block",
                marginBottom: tokens.spaceMD,
                color: tokens.inkMuted,
                fontSize: 13,
              }}
            >
              These values will be populated from columns in your audience.
            </Text>

            <Space wrap size={[tokens.spaceXS, tokens.spaceXS]}>
              {selectedTemplate.variables.map((variable) => (
                <Tag
                  key={variable}
                  style={{
                    margin: 0,

                    border: `1px solid ${tokens.border}`,
                    borderRadius: tokens.radiusSM,

                    background: tokens.surface,
                    color: tokens.inkSecondary,

                    padding: "4px 9px",

                    fontFamily: tokens.fontMono,
                    fontSize: 12,
                  }}
                >
                  {`{{ ${variable} }}`}
                </Tag>
              ))}
            </Space>
          </div>
        )}

        <Divider />

        {/* =====================================================
            Audience
        ===================================================== */}

        <SectionHeader
          icon={<TeamOutlined />}
          title="Audience"
          description="Choose the contacts that should receive this campaign."
        />

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
              label: `${audience.name} (${audience.total_rows.toLocaleString()} contacts)`,
              value: audience.id,
            }))}
            onChange={(value) => {
              setSelectedAudienceId(value);

              form.setFieldValue("variable_mapping", {});
            }}
          />
        </Form.Item>

        {/* Audience loading */}

        {selectedAudienceId && audienceLoading && (
          <LoadingMessage>Loading audience columns...</LoadingMessage>
        )}

        {/* =====================================================
            Variable Mapping
        ===================================================== */}

        {selectedTemplate && selectedAudience && !audienceLoading && (
          <>
            <Divider />

            <SectionHeader
              icon={<CheckCircleOutlined />}
              title="Variable mapping"
              description="Connect each template variable to a column in your audience."
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: tokens.spaceSM,
              }}
            >
              {selectedTemplate.variables.map((variable) => (
                <div
                  key={variable}
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "minmax(140px, 0.8fr) minmax(200px, 1.5fr)",
                    gap: tokens.spaceLG,
                    alignItems: "center",

                    padding: tokens.spaceMD,

                    border: `1px solid ${tokens.border}`,
                    borderRadius: tokens.radiusMD,

                    background: tokens.surfaceSubtle,
                  }}
                >
                  {/* Variable */}

                  <div>
                    <Tag
                      style={{
                        margin: 0,

                        border: `1px solid ${tokens.border}`,
                        borderRadius: tokens.radiusSM,

                        background: tokens.surface,
                        color: tokens.inkSecondary,

                        fontFamily: tokens.fontMono,
                        fontSize: 12,
                      }}
                    >
                      {`{{ ${variable} }}`}
                    </Tag>
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
                      margin: 0,
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
          </>
        )}

        {/* =====================================================
            Actions
        ===================================================== */}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: tokens.spaceSM,

            marginTop: tokens.spaceXXL,
            paddingTop: tokens.spaceLG,

            borderTop: `1px solid ${tokens.border}`,
          }}
        >
          <Button
            onClick={handleCancel}
            style={{
              borderRadius: tokens.radiusMD,
            }}
          >
            Cancel
          </Button>

          <Button
            type="primary"
            htmlType="submit"
            loading={isPending}
            icon={<SendOutlined />}
            style={{
              borderRadius: tokens.radiusMD,
            }}
          >
            Create campaign
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

/* =============================================================
   Reusable Section Header
============================================================= */

interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function SectionHeader({ icon, title, description }: SectionHeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: tokens.spaceSM,
        marginBottom: tokens.spaceLG,
      }}
    >
      <div
        style={{
          width: 30,
          height: 30,

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          flexShrink: 0,

          borderRadius: tokens.radiusSM,

          background: tokens.accentSoft,
          color: tokens.accent,
        }}
      >
        {icon}
      </div>

      <div>
        <Text
          strong
          style={{
            display: "block",
            color: tokens.ink,
            fontSize: 14,
          }}
        >
          {title}
        </Text>

        <Text
          style={{
            display: "block",
            marginTop: 2,
            color: tokens.inkMuted,
            fontSize: 12,
            lineHeight: 1.5,
          }}
        >
          {description}
        </Text>
      </div>
    </div>
  );
}

/* =============================================================
   Loading Message
============================================================= */

function LoadingMessage({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        marginBottom: tokens.spaceLG,
        padding: `${tokens.spaceSM}px ${tokens.spaceMD}px`,

        border: `1px solid ${tokens.border}`,
        borderRadius: tokens.radiusSM,

        background: tokens.surfaceSubtle,

        color: tokens.inkMuted,
        fontSize: 13,
      }}
    >
      {children}
    </div>
  );
}
