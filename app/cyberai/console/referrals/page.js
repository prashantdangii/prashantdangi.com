import { ReferralsPanel } from "@/components/cyberai/AccountPanels";
import { consoleTitle } from "@/lib/cyberai";

export const metadata = consoleTitle("Referrals");

export default function ReferralsPage() {
  return <ReferralsPanel />;
}
