import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NoResults() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] bg-gray-100 px-4 py-8 mt-5 mx-auto rounded-md">
      {/* Illustration */}
      <div className="w-64">
        <Image
          src="https://via.placeholder.com/400x300?text=No+Results" // Replace this URL with your custom illustration
          alt="No Results Illustration"
          width={400}
          height={300}
          className="object-contain"
        />
      </div>

      {/* Message */}
      <h2 className="text-2xl font-bold text-gray-800 mt-2">No Results Found</h2>
      <p className="text-gray-600 mt-2 text-center max-w-md">
        Sorry, we could not find any items that match your search. Try adjusting your search terms or explore other categories.
      </p>

      {/* Actions */}
      <div className="mt-3 space-x-4 flex flex-wrap items-center justify-center gap-3">
          <button onClick={()=>{router.refresh()}} className="px-6 py-3 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition">
            Go to Homepage
          </button>
        <Link href="/categories">
          <p className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md shadow hover:bg-gray-300 transition">
            Browse Categories
          </p>
        </Link>
      </div>
    </div>
  );
}
