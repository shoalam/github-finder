'use client';

import { useState } from "react";

export default function SearchForm({
  defaultValue = '',
  onSearch,
}: {
  defaultValue?: string;
  onSearch: (query: string) => void;
}) {
  const [query, setQuery] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 my-6">
      <input
        type="text"
        placeholder="Search GitHub username..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 rounded border border-gray-100 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
      >
        Search
      </button>
    </form>
  );
}
