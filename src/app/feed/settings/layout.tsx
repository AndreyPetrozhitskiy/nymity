import type { Metadata } from "next";
import "@/src/styles/Settings/global-settings.scss";
import GorizontalBar from "@/src/Components/Settings/GorizontalBar";
export const metadata: Metadata = {
  title: "Настройки",
};

export default function FeedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="Settings">
      <GorizontalBar
        pages={[
          { url: "/feed/settings/edit", title: "Редактирование профиля" },
          { url: "/feed/settings/account", title: "Управление аккаунтом" },
        ]}
      />
      <div className="Settings__container">{children}</div>
    </div>
  );
}
