import { createFileRoute, redirect } from "@tanstack/react-router";

import Register from "#/components/auth/Register";
import { getCurrentUser } from "#/services/auth";

export const Route = createFileRoute("/register")({
  beforeLoad: async () => {
    try {
      await getCurrentUser();

      // User is already authenticated
      throw redirect({
        to: "/app/dashboard",
      });
    } catch (error: any) {
      // Not authenticated → allow registration page
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        return;
      }

      throw error;
    }
  },

  component: Register,
});
