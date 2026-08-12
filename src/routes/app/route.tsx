import { createFileRoute, redirect } from "@tanstack/react-router";
import AppLayout from "#/components/layout/AppLayout";

import { getCurrentUser } from "#/services/auth";

export const Route = createFileRoute("/app")({
  beforeLoad: async () => {
    try {
      const user = await getCurrentUser();

      return {
        user,
      };
    } catch {
      throw redirect({
        to: "/login",
      });
    }
  },

  component: Layout,
});

function Layout() {
  return <AppLayout />;
}
