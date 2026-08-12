import { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "@tanstack/react-router";

import Sidebar from "./Sidebar";
import HeaderBar from "./HeaderBar";
import { tokens } from "./theme";

const { Content } = Layout;

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh", background: tokens.canvas }}>
      <Sidebar collapsed={collapsed} />

      <Layout>
        <HeaderBar collapsed={collapsed} setCollapsed={setCollapsed} />

        <Content
          style={{
            margin: 20,
            padding: 24,
            background: tokens.canvas,
            borderRadius: 10,
            minHeight: "calc(100vh - 64px - 40px)",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
