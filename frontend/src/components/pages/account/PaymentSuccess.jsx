import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";


export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const tx_ref = searchParams.get("tx_ref");

  useEffect(() => {
    if (tx_ref) {
      axios.get(`http://localhost:5000/api/payment/verify/${tx_ref}`)
        .then(res => console.log("Verified:", res.data))
        .catch(err => console.error("Verification failed", err));
    }
  }, [tx_ref]);

  console.log(tx_ref)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
          <svg
            className="w-20 h-20 text-green-500 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2l4 -4m5 2a9 9 0 11-18 0a9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h2>
          <p className="text-gray-700 mb-6 text-center">
            Thank you for your purchase. Your payment has been processed successfully.
          </p>
           <h3 className="text-lg font-semibold text-gray-800 text-center mb-4">Your transaction ID is:  {tx_ref}</h3>
          <Link
            to="/"
            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Go to Home
          </Link>
        </div>
      </div>
    )
}
