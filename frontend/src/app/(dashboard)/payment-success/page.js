"use client"
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();

  // Extract parameters from the query string
  const amount = searchParams.get("amount");
  const payment_intent = searchParams.get("payment_intent");
  const payment_intent_client_secret = searchParams.get("payment_intent_client_secret");
  const redirect_status = searchParams.get("redirect_status");

  // Render loading if query parameters are not available
  if (!redirect_status) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg text-center">
          <h1 className="text-2xl font-bold text-gray-700">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg text-center">
        {redirect_status === "succeeded" ? (
          <>
            <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
            <p className="text-gray-700 mt-4">Thank you for your purchase.</p>

            <div className="mt-6">
              <p className="text-gray-600">
                <strong>Amount Paid:</strong> ${(amount / 100).toFixed(2)}
              </p>
              {/* <p className="text-gray-600">
                <strong>Payment Intent:</strong> {payment_intent}
              </p> */}
              {/* <p className="text-gray-600 truncate">
                <strong>Client Secret:</strong> {payment_intent_client_secret}
              </p> */}
            </div>

            <div className="mt-6">
              <Link
                href="/"
                className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
              >
                Go Back to Home
              </Link>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-red-600">Payment Failed!</h1>
            <p className="text-gray-700 mt-4">
              Something went wrong with your payment. Please try again.
            </p>

            <div className="mt-6">
              <Link
                href="/"
                className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
              >
                Go Back to Home
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
