import { NextRequest, NextResponse } from "next/server";
import { tokenCheck } from "./Func/auth";

export function middleware(req: NextRequest) {
  const cookies = req.cookies;
  const specificCookie: any = cookies.get("jwt");

  const handleRedirect = (url: URL, newPath: string) => {
    return NextResponse.redirect(new URL(newPath, req.url));
  };

  if (specificCookie) {
    return tokenCheck(specificCookie.value)
      .then((response) => {
        const url = new URL(req.url);
        if (response.status) {
          // Перенаправление с /feed/settings на /feed/settings/edit
          if (url.pathname === '/feed/settings') {
            return handleRedirect(url, "/feed/settings/edit");
          }
          if (url.pathname === '/feed/profile') {
            return handleRedirect(url, "/");
          }
          if (url.pathname === '/feed/info') {
            return handleRedirect(url, "/");
          }
          // Проверка и перенаправление для /feed/info/[slug]
          const infoSlugMatch = url.pathname.match(/^\/feed\/info\/([^\/]+)\/?$/);
          if (infoSlugMatch) {
            const slug = infoSlugMatch[1];
            return handleRedirect(url, `/feed/info/${slug}/subscribers`);
          }
          // Перенаправляем на /feed только если пользователь на главной странице
          if (url.pathname === '/') {
            return handleRedirect(url, "/feed");
          }
          // В противном случае, если пользователь уже на /feed, разрешаем доступ
          return NextResponse.next();
        } else {
          // Если пользователь не авторизован, перенаправляем на главную, только если он не там
          if (url.pathname !== '/') {
            return handleRedirect(url, "/");
          }
          return NextResponse.next();
        }
      })
      .catch((error) => {
        console.log(error);
        // В случае ошибки перенаправляем на главную, только если пользователь не там
        if (new URL(req.url).pathname !== '/') {
          return handleRedirect(new URL(req.url), "/");
        }
        return NextResponse.next();
      });
  } else {
    // Если в куках нет JWT, перенаправляем на главную, только если пользователь не там
    if (new URL(req.url).pathname !== '/') {
      return handleRedirect(new URL(req.url), "/");
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/feed", "/", "/feed/settings/:path*", "/feed/profile", "/feed/info/:path*"],
};