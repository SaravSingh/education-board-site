import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/verification")({
  beforeLoad: ({ search }: { search: Record<string, unknown> }) => {
    throw redirect({
      to: "/digilocker",
      search: search,
    });
  },
});
