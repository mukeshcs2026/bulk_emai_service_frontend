import { Outlet, createRootRoute } from "@tanstack/react-router";

// import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
// import { TanStackDevtools } from "@tanstack/react-devtools";

import "../styles.css";
import { queryClient } from "#/lib/queryClient";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Outlet />
        {/* <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      /> */}
      </QueryClientProvider>
    </>
  );
}
