export function WellKnown() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Well-Known Endpoints</h1>
        <div className="bg-muted p-4 rounded-lg">
          <p className="text-muted-foreground">
            This route handles .well-known requests (like Chrome DevTools, security.txt, etc.)
          </p>
          <div className="mt-4 text-sm font-mono">
            Route: <span className="text-orange-600">/.well-known/*</span>
          </div>
        </div>
      </div>
    </div>
  );
}