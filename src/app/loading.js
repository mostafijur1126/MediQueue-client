import { Spinner } from "@heroui/react";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="h-screen flex justify-center items-center">
      <Spinner className="w-20 h-20" />
    </div>
  );
}
