import AdsFeed from "@/uiComponents/AdsFeed";
import ServiceFeed from "@/uiComponents/ServiceFeed";
import type { Metadata } from "next";
import "../../styles/Feed/Feed.scss"
export const metadata: Metadata = {
  title: "Feed",
};

export default function FeedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="Feed__Container">
      <div className="Feed__Container__Content">
        <ServiceFeed />
        <div className="Feed__Container__Content-Base">{children}</div>
        <AdsFeed />
      </div>

      {/* Рекомендации и реклама */}
    </div>
  );
}
