import { HomeSections } from "@/components/home-sections";
import { getSiteConfig } from "@/lib/api-client";

export default async function HomePage() {
  const config = await getSiteConfig();
  return <HomeSections config={config} />;
}
