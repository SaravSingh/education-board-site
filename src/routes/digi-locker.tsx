import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/digi-locker")({
  beforeLoad: () => {
    throw redirect({ to: "/digilocker" });
  },
});
