// Mock news data and comments for nested routing demo
export interface NewsItem {
  id: string;
  title: string;
  url?: string;
  score: number;
  by: string;
  time: number;
  descendants: number;
  text?: string;
  type: string;
}

export interface Comment {
  id: string;
  by: string;
  time: number;
  text: string;
  parent: string;
  kids?: string[];
  score: number;
  depth: number;
}

// Mock news items (extended from real HN data)
const mockNews: Record<string, NewsItem> = {
  "1": {
    id: "1",
    title: "React Router v7: The Future of React Navigation",
    url: "https://reactrouter.com/v7",
    score: 342,
    by: "reactteam",
    time: Date.now() / 1000 - 3600,
    descendants: 89,
    type: "story"
  },
  "2": {
    id: "2",
    title: "Show HN: Built a Hacker News Clone with React Router v7",
    score: 156,
    by: "devbuilder",
    time: Date.now() / 1000 - 7200,
    descendants: 34,
    text: "Hey HN! I built this demo to showcase the new routing capabilities in React Router v7. Features include nested routes, loaders, and SSR. Would love your feedback!",
    type: "story"
  },
  "3": {
    id: "3",
    title: "TypeScript 5.6 Released with New Features",
    url: "https://typescript.org/5.6",
    score: 289,
    by: "typescript",
    time: Date.now() / 1000 - 10800,
    descendants: 67,
    type: "story"
  }
};

// Mock comments data
const mockComments: Record<string, Comment[]> = {
  "1": [
    {
      id: "c1",
      by: "developer123",
      time: Date.now() / 1000 - 3000,
      text: "This looks amazing! The nested routing in v7 is exactly what we needed. The data loading story is so much cleaner now.",
      parent: "1",
      kids: ["c2", "c3"],
      score: 23,
      depth: 0
    },
    {
      id: "c2",
      by: "reactfan",
      time: Date.now() / 1000 - 2800,
      text: "Agreed! The fact that you can have loaders at every route level is game-changing. No more prop drilling or complex state management for route data.",
      parent: "c1",
      score: 12,
      depth: 1
    },
    {
      id: "c3",
      by: "skeptic_dev",
      time: Date.now() / 1000 - 2600,
      text: "I'm curious about the bundle size impact. Has anyone done performance comparisons with other routing solutions?",
      parent: "c1",
      kids: ["c4"],
      score: 8,
      depth: 1
    },
    {
      id: "c4",
      by: "perfguru",
      time: Date.now() / 1000 - 2400,
      text: "From my testing, React Router v7 with tree-shaking gives you about the same bundle size as v6, but with way more features. The SSR improvements alone make it worth it.",
      parent: "c3",
      score: 15,
      depth: 2
    },
    {
      id: "c5",
      by: "uxdesigner",
      time: Date.now() / 1000 - 2000,
      text: "The loading states and error boundaries at the route level are fantastic for UX. Users get immediate feedback and the app feels much more responsive.",
      parent: "1",
      score: 19,
      depth: 0
    }
  ],
  "2": [
    {
      id: "c6",
      by: "hackernews_lover",
      time: Date.now() / 1000 - 6000,
      text: "Nice work! The demo really shows off the nested routing capabilities. I especially like how the comments section is its own route.",
      parent: "2",
      score: 14,
      depth: 0
    },
    {
      id: "c7",
      by: "code_reviewer",
      time: Date.now() / 1000 - 5800,
      text: "The query parameter handling for sorting and filtering is clean. Mind sharing how you implemented the loader logic?",
      parent: "2",
      kids: ["c8"],
      score: 9,
      depth: 0
    },
    {
      id: "c8",
      by: "devbuilder",
      time: Date.now() / 1000 - 5600,
      text: "Sure! I used React Router's new loader functions with URL search params. Each nested route can have its own loader that runs in parallel. The code is pretty straightforward.",
      parent: "c7",
      score: 6,
      depth: 1
    }
  ],
  "3": [
    {
      id: "c9",
      by: "ts_enthusiast",
      time: Date.now() / 1000 - 9000,
      text: "The new TypeScript features are solid, but I'm more excited about React Router v7's TypeScript integration. The route typing is chef's kiss 👌",
      parent: "3",
      score: 21,
      depth: 0
    }
  ]
};

export function getNewsItem(id: string): NewsItem | null {
  return mockNews[id] || null;
}

export function getComments(newsId: string, sortBy: string = "best"): Comment[] {
  const comments = mockComments[newsId] || [];

  switch (sortBy) {
    case "newest":
      return [...comments].sort((a, b) => b.time - a.time);
    case "oldest":
      return [...comments].sort((a, b) => a.time - b.time);
    case "best":
    default:
      return [...comments].sort((a, b) => b.score - a.score);
  }
}

export function getComment(commentId: string): Comment | null {
  for (const comments of Object.values(mockComments)) {
    const comment = comments.find(c => c.id === commentId);
    if (comment) return comment;
  }
  return null;
}

export function getCommentThread(commentId: string): Comment[] {
  const comment = getComment(commentId);
  if (!comment) return [];

  const allComments = Object.values(mockComments).flat();
  const thread: Comment[] = [comment];

  // Get replies recursively
  function getReplies(parentId: string, currentDepth: number) {
    const replies = allComments.filter(c => c.parent === parentId);
    replies.forEach(reply => {
      thread.push({ ...reply, depth: currentDepth });
      if (reply.kids) {
        getReplies(reply.id, currentDepth + 1);
      }
    });
  }

  if (comment.kids) {
    getReplies(comment.id, comment.depth + 1);
  }

  return thread;
}

// Export function to get all mock news as array
export function getAllMockNews(): NewsItem[] {
  return Object.values(mockNews);
}

export function getMockNewsById(id: string): NewsItem | undefined {
  return mockNews[id];
}