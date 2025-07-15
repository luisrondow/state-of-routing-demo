import type { Route } from "./+types/home";
import { redirect } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Hacker News - Redirecting..." },
    { name: "description", content: "Redirecting to top stories" },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  throw redirect("/top-stories");
}

export default function Home() {
  return null;
}
