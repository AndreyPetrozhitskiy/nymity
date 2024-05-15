import { NextRequest, NextResponse } from "next/server";
import { tokenCheck } from "./Func/auth";

export function middleware(req: NextRequest) {
  const cookies = req.cookies;
  const specificCookie: any = cookies.get("jwt");

  if (specificCookie) {
    return tokenCheck(specificCookie.value)
      .then((response) => {
        const url = new URL(req.url);
        if (response.status) {
          // Перенаправляем на /feed только если пользователь на главной странице
          if (url.pathname === '/') {
            return NextResponse.redirect(new URL("/feed", req.url));
          }
          // В противном случае, если пользователь уже на /feed, разрешаем доступ
          return NextResponse.next();
        } else {
          // Если пользователь не авторизован, перенаправляем на главную, только если он не там
          if (url.pathname !== '/') {
            return NextResponse.redirect(new URL("/", req.url));
          }
          return NextResponse.next();
        }
      })
      .catch(function (error) {
        console.log(error);
        // В случае ошибки перенаправляем на главную, только если пользователь не там
        if (new URL(req.url).pathname !== '/') {
          return NextResponse.redirect(new URL("/", req.url));
        }
        return NextResponse.next();
      });
  } else {
    // Если в куках нет JWT, перенаправляем на главную, только если пользователь не там
    if (new URL(req.url).pathname !== '/') {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/feed", "/"],
};