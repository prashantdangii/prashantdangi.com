import { KeysPanel } from "@/components/cyberai/KeysPanel";
import { consoleTitle } from "@/lib/cyberai";

export const metadata = consoleTitle("API keys");

export default function KeysPage() {
  return <KeysPanel />;
}
