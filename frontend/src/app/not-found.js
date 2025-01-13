import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="w-64 mx-auto">
          {/* Illustration */}
          <Image
            src="https://via.placeholder.com/400x300?text=404+Error"
            alt="404 Illustration"
            width={400}
            height={300}
            className="mx-auto mb-8"
          />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <Link href="/" className="px-6 py-3 text-white bg-blue-500 rounded-md shadow hover:bg-blue-600 transition-all">
            Go Back Home
          
        </Link>
      </div>
    </div>
  );
}
