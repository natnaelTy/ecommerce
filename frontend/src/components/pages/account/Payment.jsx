import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

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

  return <h1>Payment Successful! Reference: {tx_ref}</h1>;
}
