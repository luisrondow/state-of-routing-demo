import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Hacker News API utilities
export interface Story {
  id: number;
  title: string;
  url?: string;
  score: number;
  by: string;
  time: number;
  descendants?: number;
  type: string;
}

async function fetchStories(endpoint: string): Promise<Story[]> {
  try {
    // Fetch story IDs
    const response = await fetch(
      `https://hacker-news.firebaseio.com/v0/${endpoint}.json`
    );
    const storyIds = await response.json();

    // Fetch first 30 stories
    const storyPromises = storyIds.slice(0, 30).map(async (id: number) => {
      const response = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );
      return response.json();
    });

    const fetchedStories = await Promise.all(storyPromises);
    return fetchedStories.filter(story => story && story.type === 'story');
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw new Error(`Failed to fetch ${endpoint}`);
  }
}

export async function fetchTopStories(): Promise<Story[]> {
  return fetchStories('topstories');
}

export async function fetchBestStories(): Promise<Story[]> {
  return fetchStories('beststories');
}

export async function fetchNewStories(): Promise<Story[]> {
  return fetchStories('newstories');
}

export function formatTimeAgo(timestamp: number): string {
  const now = Date.now() / 1000;
  const diff = now - timestamp;

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}
