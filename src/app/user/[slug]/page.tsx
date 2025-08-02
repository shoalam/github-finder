// app/user/[slug]/page.tsx

import React from "react";
import Link from "next/link";

async function fetchUser(username: string) {
  const res = await fetch(`https://api.github.com/users/${username}`);
  if (!res.ok) throw new Error("User not found");
  return res.json();
}

async function fetchRepos(username: string) {
  const res = await fetch(`https://api.github.com/users/${username}/repos`);
  if (!res.ok) throw new Error("Failed to fetch repositories");
  return res.json();
}

export default async function UserDetails({ params }: { params: { slug: string } }) {
  const { slug: username } = params;

  const user = await fetchUser(username);
  const repos = await fetchRepos(username);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col items-center text-center">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-32 h-32 rounded-full border-4 border-blue-600 shadow"
          />
          <h1 className="text-3xl font-bold mt-4">{user.name || user.login}</h1>
          <p className="text-gray-600">@{user.login}</p>
          {user.bio && <p className="mt-3 text-sm text-gray-700">{user.bio}</p>}
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-700 justify-center">
            <span>👥 {user.followers} Followers</span>
            <span>👤 {user.following} Following</span>
            <span>📁 {user.public_repos} Public Repos</span>
          </div>
          <a
            href={user.html_url}
            target="_blank"
            className="mt-4 text-blue-600 hover:underline font-medium"
          >
            View on GitHub →
          </a>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">📚 Public Repositories</h2>
          {repos.length > 0 ? (
            <ul className="space-y-4">
              {repos.map((repo: any) => (
                <li key={repo.id} className="p-4 border rounded-lg hover:bg-gray-50 transition">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    className="text-blue-700 text-lg font-medium hover:underline"
                  >
                    {repo.name}
                  </a>
                  {repo.description && (
                    <p className="text-sm text-gray-600 mt-1">{repo.description}</p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No public repositories found.</p>
          )}
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-blue-500 hover:underline text-sm">
            ← Back to Search
          </Link>
        </div>
      </div>
    </div>
  );
}
