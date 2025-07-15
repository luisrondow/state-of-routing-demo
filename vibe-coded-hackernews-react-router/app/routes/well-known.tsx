// Handle .well-known requests (like Chrome DevTools requests)
// This prevents 404 errors for browser/devtools automated requests

export function loader() {
  // Return a 404 response for .well-known requests
  throw new Response("Not Found", { status: 404 });
}

export default function WellKnown() {
  // This component should never render since loader throws
  return null;
}