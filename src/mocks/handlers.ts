import { http, HttpResponse } from "msw";

export const handlers = [
  // 깃허브 로그인 요청
  http.get("/api/auth/me", () => {
    return HttpResponse.json({
      id: 1,
      name: "Mock User",
      avatar_url: "https://i.pinimg.com/736x/06/ad/70/06ad70af9637a540aa78d647d28fd027.jpg",
    });
  }),

  // 현재 깃허브 로그인한 사용자 정보 요청
  http.post("/api/auth/github/callback", async ({ request }) => {
    const body = (await request.json()) as { code?: string };
    const code = body.code;

    if (code) {
      return HttpResponse.json({ error: "Missing code" }, { status: 400 });
    }

    return HttpResponse.json({
      message: "Mock login successful",
    });
  }),

  // 깃허브 로그아웃 요청
  http.post("/api/auth/logout", () => {
    return HttpResponse.json(null, { status: 200 });
  }),
];
