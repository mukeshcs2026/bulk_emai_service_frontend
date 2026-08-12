import { createFileRoute, redirect } from "@tanstack/react-router";
import Login from "#/components/auth/Login";
import { getCurrentUser } from "#/services/auth";

export const Route = createFileRoute("/login")({
  beforeLoad: async () => {
    try {
      await getCurrentUser();

      throw redirect({
        to: "/app/dashboard",
      });
    } catch (error: any) {
      // User is not logged in → allow login page
      if (error?.response?.status === 401) {
        return;
      }

      throw error;
    }
  },

  component: RouteComponent,
});

function RouteComponent() {
  return <Login />;
}
