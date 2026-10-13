import { ConsoleGate } from "@/components/cyberai/ConsoleGate";

export const metadata = {
  robots: { index: false, follow: false }
};

export default function ConsoleLayout({ children }) {
  return <ConsoleGate>{children}</ConsoleGate>;
}
