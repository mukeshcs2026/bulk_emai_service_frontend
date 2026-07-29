import { Link } from '@tanstack/react-router';
import {
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Card, Form, Input, Typography } from 'antd';
import { Mails } from 'lucide-react';
import { useState } from 'react';
// import {Loader} from "#/components/utils/Loader"
import {register} from "#/services/auth"

const { Title, Text } = Typography;

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

export default function Register() {
  const [form] = Form.useForm<RegisterForm>();
  const [loading, setLoading] = useState(false)

const onFinish = async (values: RegisterForm) => {
  try {
    setLoading(true);
    
    console.log(values);

    const data = await register(values);

    console.log(data);

    // message.success("Registration successful");
    // navigate({ to: "/login" });
  } catch (error) {
    console.error(error);

    // message.error("Registration failed");
  } finally {
    setLoading(false);
  }
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
            style={{ color: 'white', marginTop: 20, marginBottom: 4 }}
          >
            Create Account
          </Title>

          <Text style={{ color: '#94a3b8' }}>
            Create your Bulk Email Service account
          </Text>
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
            label={<span className="text-slate-500">Username</span>}
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
            label={<span className="text-slate-500">Email</span>}
            name="email"
            rules={[
              {
                required: true,
                message: 'Please enter your email',
              },
              {
                type: 'email',
                message: 'Please enter a valid email',
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="john@example.com"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-slate-500">Password</span>}
            name="password"
            hasFeedback
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

          <Form.Item
            label={<span className="text-slate-500">Confirm Password</span>}
            name="confirm_password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    !value ||
                    getFieldValue('password') === value
                  ) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error('Passwords do not match')
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
            />
          </Form.Item>

          <Form.Item className="mb-4">
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              className="h-11 rounded-xl font-semibold"
            >
              Create Account
            </Button>
          </Form.Item>

          <div className="text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-blue-400 hover:text-blue-300"
            >
              Login
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}