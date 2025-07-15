import {
  createBrowserRouter,
  redirect,
  type LoaderFunctionArgs,
} from "react-router";

// Import route components
import { RootLayout } from "@/routes/root-layout";
import { BestStories } from "@/routes/stories/best-stories";
import { NewStories } from "@/routes/stories/new-stories";
import { StaticStories } from "@/routes/stories/static-stories";
import { TopStories } from "@/routes/stories/top-stories";
import { Login } from "@/routes/auth/login";
import { NewsLayout } from "@/routes/news/layout";
import { NewsDetail } from "@/routes/news/detail";
import { NewsComments } from "@/routes/news/comments";
import { CommentThread } from "@/routes/news/comment-thread";
import { NewsShare } from "@/routes/news/share";
import { WellKnown } from "@/routes/well-known";
import { NotFound } from "@/routes/404";
import {
  fetchBestStories,
  fetchNewStories,
  fetchTopStories,
  type Story,
} from "@/lib/utils";
import { getStoredUser } from "@/lib/auth";
import {
  getAllMockNews,
  getComment,
  getComments,
  getCommentThread,
  getNewsItem,
} from "@/lib/mock-data";

const router = createBrowserRouter([
  {
    // Root layout route - no path, just component for layout
    Component: RootLayout,
    children: [
      {
        path: "/",
        loader: async () => {
          throw redirect("/stories/top");
        },
      },

      // Stories prefix route - groups all story-related routes under /stories
      {
        path: "/stories",
        children: [
          {
            path: "top",
            loader: async () => {
              const stories = await fetchTopStories();
              return { stories };
            },
            Component: TopStories,
          },
          {
            path: "best",
            loader: async () => {
              const user = getStoredUser();
              if (!user) {
                throw redirect("/auth/login?redirectTo=/stories/best");
              }

              const stories = await fetchBestStories();
              return { stories };
            },
            Component: BestStories,
          },
          {
            path: "new",
            loader: async () => {
              const stories = await fetchNewStories();
              return { stories };
            },
            Component: NewStories,
          },
          {
            path: "static",
            loader: () => {
              const mockStories = getAllMockNews();

              const stories: Story[] = mockStories.map((item) => ({
                id: parseInt(item.id),
                title: item.title,
                url: item.url,
                score: item.score,
                by: item.by,
                time: item.time,
                descendants: item.descendants,
                type: item.type,
              }));

              return { stories };
            },
            Component: StaticStories,
          },
        ],
      },

      // Legacy redirects for old story URLs
      {
        path: "/stories/static",
        loader: async () => {
          throw redirect("/stories/static");
        },
      },

      // Auth prefix route - groups authentication-related routes under /auth
      {
        path: "/auth",
        children: [
          {
            path: "login",
            Component: Login,
          },
        ],
      },

      // Legacy redirect for old login URL
      {
        path: "/login",
        loader: async () => {
          throw redirect("/auth/login");
        },
      },

      // News prefix route with layout route pattern
      {
        path: "/news",
        children: [
          {
            path: ":id",
            // Layout Route - Component without path creates nested routes without URL segments
            Component: NewsLayout,
            loader: ({ params }: LoaderFunctionArgs) => {
              if (!params.id) {
                throw new Response("News ID is required", { status: 400 });
              }

              const newsItem = getNewsItem(params.id);

              if (!newsItem) {
                throw new Response("News item not found", { status: 404 });
              }

              return { newsItem };
            },
            children: [
              {
                index: true,
                Component: NewsDetail,
              },
              {
                path: "comments",
                loader: ({ params, request }: LoaderFunctionArgs) => {
                  if (!params.id) {
                    throw new Response("News ID is required", { status: 400 });
                  }

                  const url = new URL(request.url);
                  const sortBy = url.searchParams.get("sort") || "best";
                  const filter = url.searchParams.get("filter") || "all";
                  const page = parseInt(url.searchParams.get("page") || "1");

                  const allComments = getComments(params.id, sortBy);

                  // Apply filters
                  let filteredComments = allComments;
                  if (filter === "top") {
                    filteredComments = allComments.filter((c) => c.score >= 10);
                  } else if (filter === "recent") {
                    const oneDayAgo = Date.now() / 1000 - 86400;
                    filteredComments = allComments.filter(
                      (c) => c.time > oneDayAgo
                    );
                  }

                  // Pagination
                  const perPage = 5;
                  const start = (page - 1) * perPage;
                  const paginatedComments = filteredComments.slice(
                    start,
                    start + perPage
                  );

                  return {
                    comments: paginatedComments,
                    totalComments: filteredComments.length,
                    currentPage: page,
                    totalPages: Math.ceil(filteredComments.length / perPage),
                    sortBy,
                    filter,
                  };
                },
                Component: NewsComments,
              },
              {
                path: "comments/:commentId",
                loader: ({ params }: LoaderFunctionArgs) => {
                  if (!params.commentId) {
                    throw new Response("Comment ID is required", {
                      status: 400,
                    });
                  }

                  const thread = getCommentThread(params.commentId);
                  const mainComment = getComment(params.commentId);

                  if (!mainComment) {
                    throw new Response("Comment not found", { status: 404 });
                  }

                  return { thread, mainComment };
                },
                Component: CommentThread,
              },
              {
                path: "share",
                Component: NewsShare,
              },
            ],
          },
        ],
      },

      // Utility routes
      {
        path: "/.well-known/*",
        Component: WellKnown,
      },

      // 404 catch-all route (must be last)
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);

export default router;
