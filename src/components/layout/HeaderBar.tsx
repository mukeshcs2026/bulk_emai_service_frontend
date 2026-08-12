import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  Avatar,
  Breadcrumb,
  Button,
  Dropdown,
  Layout,
  Space,
  Typography,
} from "antd";
import { useNavigate, useRouterState } from "@tanstack/react-router";

import { useCurrentUser } from "#/hooks/auth/useCurrentUser";
import { useLogout } from "#/hooks/auth/useLogout";

import { tokens } from "./theme";

const { Header } = Layout;
const { Text } = Typography;

interface HeaderBarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  campaigns: "Campaigns",
  audience: "Audience",
  templates: "Templates",
  analytics: "Analytics",
  settings: "Settings",
};

export default function HeaderBar({ collapsed, setCollapsed }: HeaderBarProps) {
  const navigate = useNavigate();

  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });

  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbItems = segments.map((seg, i) => ({
    title:
      i === segments.length - 1 ? (
        <Text strong style={{ color: tokens.ink }}>
          {LABELS[seg] ?? seg}
        </Text>
      ) : (
        (LABELS[seg] ?? seg)
      ),
  }));

  // Current logged-in user
  const { data: user, isLoading: userLoading } = useCurrentUser();

  // Logout mutation
  const { mutate: logout, isPending: logoutPending } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        navigate({
          to: "/login",
        });
      },
    });
  };

  const userMenuItems = [
    {
      key: "logout",
      danger: true,
      label: logoutPending ? "Logging out..." : "Log out",
      disabled: logoutPending,
    },
  ];

  return (
    <Header
      style={{
        padding: "0 20px",
        background: tokens.surface,
        borderBottom: "1px solid #EEF0F4",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
      }}
    >
      {/* Left side */}
      <Space size={16} align="center">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            width: 36,
            height: 36,
          }}
        />

        <Breadcrumb
          items={
            breadcrumbItems.length ? breadcrumbItems : [{ title: "Dashboard" }]
          }
        />
      </Space>

      {/* Right side */}
      {!userLoading && user && (
        <Dropdown
          menu={{
            items: userMenuItems,
            onClick: ({ key }) => {
              if (key === "logout") {
                handleLogout();
              }
            },
          }}
          placement="bottomRight"
          trigger={["click"]}
        >
          <Space
            style={{
              cursor: "pointer",
            }}
          >
            <Avatar
              size={32}
              style={{
                background: tokens.accent,
              }}
            >
              {user.username.charAt(0).toUpperCase()}
            </Avatar>

            <div
              style={{
                lineHeight: 1.2,
              }}
            >
              <Text
                strong
                style={{
                  fontFamily: tokens.fontDisplay,
                }}
              >
                {user.username}
              </Text>
            </div>
          </Space>
        </Dropdown>
      )}
    </Header>
  );
}
