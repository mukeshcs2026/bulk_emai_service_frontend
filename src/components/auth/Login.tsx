import { Link } from "@tanstack/react-router";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Typography, Card, message } from "antd";

import { useLogin } from "#/hooks/auth/userLogin";
import { tokens } from "../layout/theme";
import AuthShell from "./AuthShell";

const { Title, Text } = Typography;

interface LoginForm {
  username: string;
  password: string;
  remember: boolean;
}

export default function Login() {
  const [form] = Form.useForm<LoginForm>();
  const loginMutation = useLogin();

  const onFinish = (values: LoginForm) => {
    loginMutation.mutate(values, {
      onError: (error: any) => {
        const errors = error.response?.data?.errors;
        message.error(errors.non_field_errors);
      },
    });
  };

  return (
    <AuthShell
      headline="Send one template. Reach every contact."
      subtext="Map variables once, import your list, and send with confidence."
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
            Welcome back
          </Title>
          <Text type="secondary">Log in to your Bulk Mail workspace</Text>
        </div>

        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          size="large"
          initialValues={{ remember: true }}
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
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Password"
            />
          </Form.Item>

          <div className="mb-6 flex items-center justify-between">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <button
              type="button"
              className="text-sm font-medium transition hover:opacity-80"
              style={{ color: tokens.accent }}
            >
              Forgot password?
            </button>
          </div>

          <Form.Item className="mb-4">
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loginMutation.isPending}
              className="h-11 rounded-xl font-semibold"
            >
              Sign in
            </Button>
          </Form.Item>

          <div className="text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold transition hover:opacity-80"
              style={{ color: tokens.accent }}
            >
              Create account
            </Link>
          </div>
        </Form>
      </Card>
    </AuthShell>
  );
}
