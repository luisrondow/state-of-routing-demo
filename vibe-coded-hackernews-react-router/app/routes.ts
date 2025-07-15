import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/top-stories", "routes/stories/top-stories.tsx"),
  route("/best-stories", "routes/stories/best-stories.tsx"),
  route("/new-stories", "routes/stories/new-stories.tsx"),
  route("/static-stories", "routes/stories/static-stories.tsx"),
  route("/login", "routes/auth/login.tsx"),

  route("/news/:id", "routes/news/layout.tsx", [
    index("routes/news/detail.tsx"),
    route("comments", "routes/news/comments.tsx"),
    route("comments/:commentId", "routes/news/comment-thread.tsx"),
    route("share", "routes/news/share.tsx"),
  ]),

  // Handle .well-known requests (Chrome DevTools, etc.)
  route("/.well-known/*", "routes/well-known.tsx"),

  // Catch-all 404 route (must be last)
  route("*", "routes/404.tsx"),
] satisfies RouteConfig;
