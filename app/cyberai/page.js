import { HomeView } from "@/components/cyberai/HomeView";
import { HOME_DESCRIPTION, HOME_TITLE } from "@/lib/cyberai";

export const metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/" }
};

export default function Page() {
  return <HomeView />;
}
