import { SettingsPanel } from "@/components/cyberai/AccountPanels";
import { consoleTitle } from "@/lib/cyberai";

export const metadata = consoleTitle("Settings");

export default function SettingsPage() {
  return <SettingsPanel />;
}
