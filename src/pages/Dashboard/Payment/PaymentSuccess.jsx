import React, { use, useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import api from "../../../services/api";
import { useQueryClient } from "@tanstack/react-query";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const queryClient = useQueryClient();

  console.log("Payment Success Session ID:", sessionId);

  useEffect(() => {
    if (sessionId) {
      // server expects session_id as query param
      api
        .patch(`/payment-success?session_id=${sessionId}`)
        .then(() => {
          // Refetch registrations and contests after successful payment
          queryClient.invalidateQueries({
            queryKey: ["user", "participatedContests"],
          });
          queryClient.invalidateQueries({ queryKey: ["contests"] });
          queryClient.invalidateQueries({ queryKey: ["contest"] });
          console.log("✅ Registration recorded and cache invalidated");
        })
        .catch((err) => {
          console.error("Payment success patch failed:", err);
        });
    }
  }, [sessionId, queryClient]);

  return (
    <div className="text-white flex flex-col items-center justify-center py-20">
      <h1 className="text-3xl font-bold">Payment Successful!</h1>
      <p className="text-lg font-semibold">You have successfully registered.</p>
      <Link to="/dashboard/participated">
        <button className="btn btn-primary mt-4">
          View Participated Contests
        </button>
      </Link>
    </div>
  );
};

export default PaymentSuccess;
