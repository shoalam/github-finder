'use client';

import Header from "@/components/common/Header";
import React, { useReducer, useEffect, useState } from "react";
import SearchForm from "@/components/SearchForm";
import UserCard from "@/components/UserCard";

const searchReducer = (state: string | null, action: { type: string; payload?: string }) => {
  switch (action.type) {
    case 'SET_QUERY':
      return action.payload || null;
    case 'CLEAR_QUERY':
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
        const res = await fetch(`https://api.github.com/search/users?q=${query}`);
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
    dispatch({ type: 'SET_QUERY', payload: input });
  };

  return (
    <>
      <Header />
      <div className="container mx-auto">
        <SearchForm defaultValue={query || ""} onSearch={handleSearch} />
        {loading && <p className="text-center text-gray-500">Searching GitHub users...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {results.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {results.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
