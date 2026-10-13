import { Suspense } from "react";
import { ChatPanel } from "@/components/cyberai/ChatPanel";
import { consoleTitle } from "@/lib/cyberai";

export const metadata = consoleTitle("Chat");

export default function ChatPage() {
  return (
    <Suspense fallback={null}>
      <ChatPanel />
    </Suspense>
  );
}
