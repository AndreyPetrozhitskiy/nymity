import "@/src/styles/info/global-info.scss";
import GorizontalBar from "@/src/Components/Settings/GorizontalBar";
import { getUsersId } from "@/src/Func/profile";
import { notFound } from "next/navigation";
import PrevButton from "@/src/Components/Feed/Profile/PrevButton";
import { cookies } from "next/headers";
import { tokenCheck } from "@/src/Func/auth";
type Props = Readonly<{
  children: React.ReactNode;
  params: {
    slug: number;
  };
}>;
async function getData(slug: number | string) {
  const result = await getUsersId(slug);
  return result;
}
export default async function FeedLayout({
  children,
  params: { slug },
}: Props) {
  const user = await getData(slug);
  const cookieStore = cookies().getAll();
  let changeme: boolean = false;

  if (cookieStore.length > 0) {
    const objToken = cookieStore.find((item) => item.name === "jwt");
    if (objToken?.value) {
      await tokenCheck(objToken.value).then((response) => {
        if (response.status) {
          if (response.login === slug || response.id === Number(slug)) {
            changeme = true;
          }
        }
      });
    }
  }

  if (user) {
    return (
      <div className="Info">
        <div className="Info__name">
          <PrevButton />
          <h1>
            {user.name} {user.surname}
          </h1>
        </div>
        {changeme ? (
          <GorizontalBar
            pages={[
              { url: `/feed/info/${slug}/subscribers`, title: "Подписчики" },
              { url: `/feed/info/${slug}/subscriptions`, title: "Подписки" },
              {
                url: `/feed/info/${slug}/recommendations`,
                title: "Рекомендации",
              },
            ]}
          />
        ) : (
          <GorizontalBar
            pages={[
              { url: `/feed/info/${slug}/subscribers`, title: "Подписчики" },
              { url: `/feed/info/${slug}/subscriptions`, title: "Подписки" },
            ]}
          />
        )}
        <div className="Info__main">{children}</div>
      </div>
    );
  } else {
    notFound(); // Вызов функции notFound для выдачи 404 ошибки
  }
}
