import { createFileRoute } from "@tanstack/react-router";
import { Legal } from "@/components/legal";

export const Route = createFileRoute("/risk")({
  component: () => (
    <Legal title="Risk disclosure" body={["Foreign exchange, indices, commodities, and digital assets can move quickly and can result in the loss of capital.", "Nothing published by D.BENJAMIN FX is a recommendation to buy, sell, or hold any instrument. Past description of a market is not a forecast."]} />
  ),
});
