"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function NotFoundContent() {
  const searchParams = useSearchParams();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-2xl text-gray-800 mb-4">Page Not Found</p>
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed or does not
          exist.
        </p>
        <div className="bg-gray-200 p-4 rounded-md inline-block">
          <strong>Current Search Params:</strong>
          {searchParams.toString() || "No search parameters"}
        </div>
        <div className="mt-8">
          <Link
            href="/"
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function NotFound() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotFoundContent />
    </Suspense>
  );
}
