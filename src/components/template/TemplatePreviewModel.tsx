import { Modal, Typography } from "antd";

import type { EmailTemplate } from "#/services/template";

const { Text } = Typography;

interface TemplatePreviewModalProps {
  template: EmailTemplate | null;
  open: boolean;
  onClose: () => void;
}

export default function TemplatePreviewModal({
  template,
  open,
  onClose,
}: TemplatePreviewModalProps) {
  if (!template) {
    return null;
  }
  console.log(template);

  return (
    <Modal
      title={template.template_name}
      open={open}
      onCancel={onClose}
      footer={null}
      width={400}
    >
      <Text type="secondary">{template.subject}</Text>

      <iframe
        title={`${template.template_name} preview`}
        srcDoc={template.preview}
        style={{
          width: "100%",
          height: 300,
          border: "1px solid #d9d9d9",
          borderRadius: 8,
          marginTop: 16,
        }}
      />
    </Modal>
  );
}
