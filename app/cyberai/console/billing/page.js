import { BillingPanel } from "@/components/cyberai/AccountPanels";
import { consoleTitle } from "@/lib/cyberai";

export const metadata = consoleTitle("Billing");

export default function BillingPage() {
  return <BillingPanel />;
}
