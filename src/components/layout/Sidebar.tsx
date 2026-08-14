import {
  DashboardOutlined,
  SendOutlined,
  TeamOutlined,
  FileTextOutlined,
  BarChartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link, useRouterState } from "@tanstack/react-router";

import { tokens } from "./theme";

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
}

// Centralize nav config so header breadcrumbs / page titles can reuse it later.
const NAV_ITEMS = [
  { key: "/app/dashboard", label: "Dashboard", icon: <DashboardOutlined /> },
  { key: "/app/templates", label: "Templates", icon: <FileTextOutlined /> },
  { key: "/app/audience", label: "Audience", icon: <TeamOutlined /> },
  { key: "/app/campaigns", label: "Campaigns", icon: <SendOutlined /> },
  //   { key: "/analytics", label: "Analytics", icon: <BarChartOutlined /> },
];

const FOOTER_ITEMS = [
  { key: "/app/settings", label: "Settings", icon: <SettingOutlined /> },
];

export default function Sidebar({ collapsed }: SidebarProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Match the deepest nav key that prefixes the current path, so nested
  // routes like /campaigns/123 still highlight "Campaigns".
  const activeKey = [...NAV_ITEMS, ...FOOTER_ITEMS]
    .map((item) => item.key)
    .filter((key) => pathname.startsWith(key))
    .sort((a, b) => b.length - a.length)[0];

  const toMenuItems = (items: typeof NAV_ITEMS) =>
    items.map(({ key, label, icon }) => ({
      key,
      icon,
      label: <Link to={key}>{label}</Link>,
    }));

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={244}
      collapsedWidth={76}
      style={{
        background: tokens.sidebarBg,
        borderRight: `1px solid ${tokens.sidebarBorder}`,
        position: "sticky",
        top: 0,
        height: "100vh",
        overflow: "auto",
      }}
    >
      {/* Brand mark */}
      <div
        style={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          gap: 10,
          padding: collapsed ? 0 : "0 20px",
          borderBottom: `1px solid ${tokens.sidebarBorder}`,
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            flexShrink: 0,
            borderRadius: 8,
            background: tokens.accent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SendOutlined
            style={{
              color: tokens.ink,
              fontSize: 15,
            }}
          />
        </div>
        {!collapsed && (
          <Link
            to="/app/dashboard"
            style={{
              color: "#fff",
              fontFamily: tokens.fontDisplay,
              fontWeight: 600,
              fontSize: 16,
              letterSpacing: -0.2,
              textDecoration: "none",
            }}
          >
            Bulk Mail
          </Link>
        )}
      </div>

      {/* Primary nav */}
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={activeKey ? [activeKey] : []}
        items={toMenuItems(NAV_ITEMS)}
        style={{ background: "transparent", border: "none", marginTop: 12 }}
      />

      {/* Footer nav, pinned via flex layout of the parent — settings sits apart from the task list */}
      <div
        style={{
          position: "absolute",
          bottom: 12,
          left: 0,
          right: 0,
          borderTop: `1px solid ${tokens.sidebarBorder}`,
          paddingTop: 12,
        }}
      >
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={activeKey ? [activeKey] : []}
          items={toMenuItems(FOOTER_ITEMS)}
          style={{ background: "transparent", border: "none" }}
        />
      </div>
    </Sider>
  );
}
