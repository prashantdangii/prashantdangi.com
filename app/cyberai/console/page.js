import { Dashboard } from "@/components/cyberai/Dashboard";
import { consoleTitle } from "@/lib/cyberai";

export const metadata = consoleTitle("Home");

export default function ConsoleHome() {
  return <Dashboard />;
}
