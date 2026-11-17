import { createFileRoute } from "@tanstack/react-router";
import { Legal } from "@/components/legal";

export const Route = createFileRoute("/terms")({
  component: () => (
    <Legal title="Terms of use" body={["The site is for information and education. An account is a way to correspond and to read research. It is not a brokerage, custody, or advisory agreement.", "Do not rely on any figure on this site as a dealing price."]} />
  ),
});
