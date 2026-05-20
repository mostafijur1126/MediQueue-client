"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl">Custom error page</h1>
          <h1 className="text-5xl font-bold text-red-500">Critical Error</h1>
          <p className="mt-4">Something went terribly wrong.</p>
          <button
            onClick={() => reset()}
            className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
