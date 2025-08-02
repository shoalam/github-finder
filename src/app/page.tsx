"use client";

import Header from "@/components/common/Header";
import React, { useReducer, useEffect, useState } from "react";
import SearchForm from "@/components/SearchForm";
import UserCard from "@/components/UserCard";

const searchReducer = (
  state: string | null,
  action: { type: string; payload?: string }
) => {
  switch (action.type) {
    case "SET_QUERY":
      return action.payload || null;
    case "CLEAR_QUERY":
      return null;
    default:
      return state;
  }
};

export default function Home() {
  const [query, dispatch] = useReducer(searchReducer, null);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!query) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://api.github.com/search/users?q=${query}`
        );
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setResults(data.items || []);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [query]);

  const handleSearch = (input: string) => {
    dispatch({ type: "SET_QUERY", payload: input });
  };

  return (
    <>
      <Header />
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            GitHub User Finder
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Search for GitHub profiles instantly by username.
          </p>
          <div className="max-w-xl mx-auto">
            <SearchForm defaultValue={query || ""} onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="container mx-auto px-4 py-12">
        {loading && (
          <p className="text-center text-gray-500 text-lg">
            Searching GitHub users...
          </p>
        )}
        {error && <p className="text-center text-red-500 text-lg">{error}</p>}

        {results.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold text-center mb-8">
              Search Results
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {results.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
