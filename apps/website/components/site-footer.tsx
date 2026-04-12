import type { HomeContent } from "@/lib/types";

type SiteFooterProps = {
  content: HomeContent;
};

export function SiteFooter({ content }: SiteFooterProps) {
  /* Footer is now rendered inside HomeSections as the dark card. 
     This component is kept as a placeholder for any additional 
     bottom-of-page elements. */
  return null;
}
