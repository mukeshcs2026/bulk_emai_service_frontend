import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  BellOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Dropdown,
  Layout,
  Space,
  Typography,
} from "antd";
import { Link, useRouterState } from "@tanstack/react-router";

import { tokens } from "./theme";

const { Header } = Layout;
const { Text } = Typography;

interface HeaderBarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  userName?: string;
  /** Count of Celery jobs currently running (audience imports, campaign sends). */
  activeJobCount?: number;
}

const LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  campaigns: "Campaigns",
  audience: "Audience",
  templates: "Templates",
  analytics: "Analytics",
  settings: "Settings",
};

export default function HeaderBar({
  collapsed,
  setCollapsed,
  userName = "Mukesh",
  activeJobCount = 0,
}: HeaderBarProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
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

  const userMenuItems = [
    { key: "profile", label: "Profile" },
    { key: "settings", label: "Settings" },
    { type: "divider" as const },
    { key: "logout", danger: true, label: "Log out" },
  ];

  const hasActiveJobs = activeJobCount > 0;

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
      <Space size={16} align="center">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{ width: 36, height: 36 }}
        />
        <Breadcrumb
          items={
            breadcrumbItems.length ? breadcrumbItems : [{ title: "Dashboard" }]
          }
        />
      </Space>

      <Space size={20} align="center">
        {/* Live job-activity indicator: pulses while a Celery task (import/send) is running */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 12px",
            borderRadius: 999,
            background: hasActiveJobs ? tokens.accentSoft : "transparent",
            border: `1px solid ${hasActiveJobs ? tokens.accent : "#E5E7EB"}`,
          }}
        >
          <span
            style={{
              position: "relative",
              display: "inline-flex",
              width: 8,
              height: 8,
            }}
          >
            <span
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: hasActiveJobs ? tokens.accent : "#9CA3AF",
                animation: hasActiveJobs
                  ? "job-pulse 1.4s ease-out infinite"
                  : "none",
              }}
            />
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: hasActiveJobs ? tokens.accent : "#9CA3AF",
              }}
            />
          </span>
          <Text style={{ fontFamily: tokens.fontMono, fontSize: 12.5 }}>
            {hasActiveJobs
              ? `${activeJobCount} job${activeJobCount > 1 ? "s" : ""} running`
              : "No active jobs"}
          </Text>
        </Link>

        <Badge count={0} size="small">
          <Button
            type="text"
            icon={<BellOutlined />}
            style={{ width: 36, height: 36 }}
          />
        </Badge>

        <Dropdown
          menu={{ items: userMenuItems }}
          placement="bottomRight"
          trigger={["click"]}
        >
          <Space style={{ cursor: "pointer" }}>
            <Avatar
              size={32}
              icon={<UserOutlined />}
              style={{ background: tokens.accent }}
            />
            <Text strong style={{ fontFamily: tokens.fontDisplay }}>
              {userName}
            </Text>
          </Space>
        </Dropdown>
      </Space>

      <style>{`
        @keyframes job-pulse {
          0% { transform: scale(1); opacity: 0.6; }
          70% { transform: scale(2.4); opacity: 0; }
          100% { transform: scale(2.4); opacity: 0; }
        }
      `}</style>
    </Header>
  );
}
