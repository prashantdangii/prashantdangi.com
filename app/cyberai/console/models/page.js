import { ModelsPanel } from "@/components/cyberai/AccountPanels";
import { consoleTitle } from "@/lib/cyberai";

export const metadata = consoleTitle("Models");

export default function ConsoleModelsPage() {
  return <ModelsPanel />;
}
