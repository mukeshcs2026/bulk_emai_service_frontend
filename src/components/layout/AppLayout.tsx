import { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "@tanstack/react-router";

import Sidebar from "./Sidebar";
import HeaderBar from "./HeaderBar";
import { tokens } from "./theme";
// Swap for your real hook, e.g. a react-query poll against GET /tasks?status=running
// import { useActiveJobCount } from "../hooks/useActiveJobCount";

const { Content } = Layout;

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  // const activeJobCount = useActiveJobCount();
  const activeJobCount = 0;

  return (
    <Layout style={{ minHeight: "100vh", background: tokens.canvas }}>
      <Sidebar collapsed={collapsed} />

      <Layout>
        <HeaderBar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          activeJobCount={activeJobCount}
        />

        <Content
          style={{
            margin: 20,
            padding: 24,
            background: tokens.surface,
            borderRadius: 14,
            minHeight: "calc(100vh - 64px - 40px)",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
