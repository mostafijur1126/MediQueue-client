"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function ErrorPage({ error, unstable_retry }) {
  return (
    <div>
      <h2>Something went wrong! Custom error page</h2>
      <button onClick={() => unstable_retry()}>Try again</button>
    </div>
  );
}
