import { createFileRoute } from "@tanstack/react-router";
import { Legal } from "@/components/legal";

export const Route = createFileRoute("/privacy")({
  component: () => (
    <Legal title="Privacy" body={["We store the name, email, and phone you submit to open an account, plus the messages you send the desk.", "We do not sell that information. Market pages load public price feeds and a third-party chart."]} />
  ),
});
