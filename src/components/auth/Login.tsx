import {useState} from "react"
import { Link } from '@tanstack/react-router';
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Typography,
  Card,
} from 'antd';
import { Mails } from 'lucide-react';

const { Title, Text } = Typography;

interface LoginForm {
  username: string;
  password: string;
  remember: boolean;
}

export default function Login() {
  const [form] = Form.useForm<LoginForm>();

  const onFinish = (values: LoginForm) => {
    console.log(values);

  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f172a] px-4 py-10">
      <Card
        variant="outlined"
        className="w-full max-w-md rounded-3xl border border-slate-700 bg-[#1e293b] shadow-2xl"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/30">
            <Mails size={30} className="text-white" />
          </div>

          <Title
            level={2}
            style={{
              color: 'white',
              marginTop: 20,
              marginBottom: 4,
            }}
          >
            Welcome Back
          </Title>

          <Text style={{ color: '#94a3b8' }}>
            Login to your Bulk Email Service account
          </Text>
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
            label={<span className="text-slate-300">Username</span>}
            name="username"
            rules={[
              {
                required: true,
                message: 'Please enter your username',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-slate-300">Password</span>}
            name="password"
            rules={[
              {
                required: true,
                message: 'Please enter your password',
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>

          <div className="mb-6 flex items-center justify-between">
            <Form.Item
              name="remember"
              valuePropName="checked"
              noStyle
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <button
              type="button"
              className="text-sm text-blue-400 transition hover:text-blue-300"
            >
              Forgot Password?
            </button>
          </div>

          <Form.Item className="mb-4">
            <Button
              type="primary"
              htmlType="submit"
              block
              className="h-11 rounded-xl font-semibold"
            >
              Sign In
            </Button>
          </Form.Item>

          <div className="text-center text-sm text-slate-400">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-semibold text-blue-400 transition hover:text-blue-300"
            >
              Create Account
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}