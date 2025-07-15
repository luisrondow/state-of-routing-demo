import { redirect } from "react-router";
import { fetchBestStories } from "@/lib/utils";
import { getStoredUser } from "@/lib/auth";

export async function bestStoriesLoader() {
  const user = getStoredUser();
  if (!user) {
    throw redirect("/login?redirectTo=/stories/best");
  }

  const stories = await fetchBestStories();
  return { stories };
}