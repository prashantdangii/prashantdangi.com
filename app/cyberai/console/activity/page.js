import { ActivityPanel } from "@/components/cyberai/AccountPanels";
import { consoleTitle } from "@/lib/cyberai";

export const metadata = consoleTitle("Activity");

export default function ActivityPage() {
  return <ActivityPanel />;
}
