// components/UserCard.tsx
import Link from "next/link";

export default function UserCard({ user }: any) {
  return (
    <Link href={`/user/${user?.login}`}>
      <div className="group bg-white border border-gray-300 rounded-lg shadow hover:shadow-lg transition-all duration-200 cursor-pointer p-4 text-center">
        <img
          src={user?.avatar_url}
          alt={user?.login}
          className="w-20 h-20 rounded-full mx-auto border-2 border-blue-500 group-hover:scale-105 transition-transform"
        />
        <h2 className="text-lg font-semibold mt-3">{user?.login}</h2>
        <p className="text-sm text-blue-600 mt-1">View Details →</p>
      </div>
    </Link>
  );
}
