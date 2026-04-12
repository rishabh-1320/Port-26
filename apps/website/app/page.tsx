import { HomeSections } from "@/components/home-sections";
import { homeContent } from "@/lib/site-content";

export default function HomePage() {
  return <HomeSections content={homeContent} />;
}
