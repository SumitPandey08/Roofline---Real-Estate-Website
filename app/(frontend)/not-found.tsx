import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md text-center bg-white p-10 rounded-3xl shadow-lg border">
        <h1 className="text-6xl font-black text-slate-900">404</h1>

        <p className="mt-4 text-xl font-bold text-slate-700">
          Property Not Found
        </p>

        <p className="mt-2 text-slate-500 text-sm">
          The property you are looking for does not exist, has been removed,
          or is temporarily unavailable.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition"
          >
            Go Home
          </Link>

          <Link
            href="/buy"
            className="px-6 py-3 bg-slate-200 text-slate-800 rounded-xl font-bold hover:bg-slate-300 transition"
          >
            Browse Properties
          </Link>
        </div>
      </div>
    </div>
  );
}
