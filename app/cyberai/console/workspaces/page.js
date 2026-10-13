import { WorkspacesPanel } from "@/components/cyberai/AccountPanels";
import { consoleTitle } from "@/lib/cyberai";

export const metadata = consoleTitle("Workspaces");

export default function WorkspacesPage() {
  return <WorkspacesPanel />;
}
