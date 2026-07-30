import { Link } from "@tanstack/react-router";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Typography } from "antd";

import { useRegister } from "#/hooks/auth/userRegister";
import { tokens } from "../layout/theme";
import AuthShell from "./AuthShell";

const { Title, Text } = Typography;

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

export default function Register() {
  const [form] = Form.useForm<RegisterForm>();
  const registerMutation = useRegister();

  const onFinish = (values: RegisterForm) => {
    registerMutation.mutate(values, {
      onError: (error: any) => {
        const errors = error.response?.data?.errors;

        form.setFields([
          { name: "email", errors: errors?.email },
          { name: "username", errors: errors?.username },
        ]);
      },
    });
  };

  return (
    <AuthShell
      headline="Set up your sending workspace"
      subtext="One place to manage templates, audiences, and every campaign you send."
    >
      <Card
        variant="borderless"
        className="w-full max-w-md rounded-2xl shadow-sm"
        style={{ border: "1px solid #ECEEF2" }}
      >
        <div className="mb-7">
          <Title
            level={3}
            style={{ fontFamily: tokens.fontDisplay, marginBottom: 4 }}
          >
            Create account
          </Title>
          <Text type="secondary">Start sending with Bulk Mail</Text>
        </div>

        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          scrollToFirstError
          size="large"
          onFinish={onFinish}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="john@example.com"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            hasFeedback
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            label="Confirm password"
            name="confirm_password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Confirm password"
            />
          </Form.Item>

          <Form.Item className="mb-4">
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={registerMutation.isPending}
              className="h-11 rounded-xl font-semibold"
            >
              Create account
            </Button>
          </Form.Item>

          <div className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold transition hover:opacity-80"
              style={{ color: tokens.accent }}
            >
              Log in
            </Link>
          </div>
        </Form>
      </Card>
    </AuthShell>
  );
}
