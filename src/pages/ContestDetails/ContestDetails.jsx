import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useContest,
  useRegisterContest,
  useSubmitTask,
} from "../../hooks/useContests";
import { useAuth } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import {
  FaUsers,
  FaTrophy,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

const ContestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: contest, isLoading } = useContest(id);
  const registerMutation = useRegisterContest();
  const submitMutation = useSubmitTask();
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submissionLink, setSubmissionLink] = useState("");

  // Check if contest has ended
  const isEnded = contest && new Date(contest.deadline) < new Date();

  // Check if user is registered (mock - replace with API call)
  const [isRegistered, setIsRegistered] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Countdown timer
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (contest && !isEnded) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const deadline = new Date(contest.deadline).getTime();
        const distance = deadline - now;

        if (distance < 0) {
          setTimeLeft("Contest Ended");
          clearInterval(interval);
        } else {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [contest, isEnded]);

  // TODO: Replace with actual payment integration - POST /payment/create-intent, then POST /contests/:id/register
  const handleRegister = async () => {
    Swal.fire({
      title: "Processing Payment",
      text: "Redirecting to payment gateway...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // Simulate payment processing
    setTimeout(async () => {
      try {
        await registerMutation.mutateAsync({
          contestId: id,
          paymentData: { amount: contest.price, method: "card" },
        });

        setIsRegistered(true);
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "You have successfully registered for this contest",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: "Payment processing failed. Please try again.",
        });
      }
    }, 2000);
  };

  const handleSubmit = async () => {
    if (!submissionLink.trim()) {
      Swal.fire({
        icon: "error",
        title: "Invalid Submission",
        text: "Please provide a valid submission link",
      });
      return;
    }

    try {
      await submitMutation.mutateAsync({
        contestId: id,
        submissionData: { submission: submissionLink },
      });

      setHasSubmitted(true);
      setShowSubmitModal(false);
      setSubmissionLink("");

      Swal.fire({
        icon: "success",
        title: "Submission Successful!",
        text: "Your task has been submitted successfully",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Failed to submit your task. Please try again.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!contest) {
    return (
      <div className="text-center py-12">
        <p className="text-xl">Contest not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
      {/* Contest details with color scheme */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Contest Banner */}
        <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden mb-8">
          <img
            src={contest.image}
            alt={contest.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {contest.name}
            </h1>
            <div className="flex flex-wrap gap-2 sm:gap-4 text-sm sm:text-base md:text-lg">
              <span className="flex items-center gap-2">
                <FaUsers /> {contest.participantsCount} Participants
              </span>
              <span className="flex items-center gap-2">
                <FaTrophy /> ${contest.prizeMoney} Prize
              </span>
              <span className="flex items-center gap-2">
                <FaCalendarAlt />{" "}
                {new Date(contest.deadline).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Contest Description</h2>
                <p className="text-muted whitespace-pre-line">
                  {contest.description}
                </p>
              </div>
            </div>

            {/* Task Instructions */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Task Instructions</h2>
                <p className="text-muted whitespace-pre-line">
                  {contest.taskInstruction}
                </p>
              </div>
            </div>

            {/* Winner Section */}
            {contest.winner && (
              <div className="card bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">🏆 Winner</h2>
                  <div className="flex items-center gap-4">
                    <img
                      src={contest.winner.photoURL}
                      alt={contest.winner.name}
                      className="w-16 h-16 rounded-full border-4 border-white"
                    />
                    <div>
                      <h3 className="text-xl font-bold">
                        {contest.winner.name}
                      </h3>
                      <p className="text-white/90">
                        Congratulations on winning ${contest.prizeMoney}!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Deadline Countdown */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Deadline</h3>
                {isEnded ? (
                  <p className="text-error text-xl font-bold">Contest Ended</p>
                ) : (
                  <p className="text-2xl font-bold text-accent-custom">
                    {timeLeft}
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Entry Fee</h3>
                <p className="text-3xl font-bold text-accent-custom">
                  ${contest.price}
                </p>

                {/* Accent color for CTA buttons */}
                {!isRegistered ? (
                  <button
                    onClick={handleRegister}
                    disabled={isEnded || registerMutation.isPending}
                    className="bg-accent-custom hover:bg-accent-custom/90 text-white border-0 w-full mt-4 px-4 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
                  >
                    {registerMutation.isPending ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      "Register & Pay"
                    )}
                  </button>
                ) : (
                  <div className="mt-4 space-y-2">
                    <div className="alert alert-success">
                      <FaCheckCircle />
                      <span>You are registered for this contest</span>
                    </div>
                    {!hasSubmitted && !isEnded && (
                      <button
                        onClick={() => setShowSubmitModal(true)}
                        className="bg-primary-custom hover:bg-primary-custom/90 text-white border-0 w-full px-4 py-3 rounded-lg font-semibold transition-colors"
                      >
                        Submit Task
                      </button>
                    )}
                    {hasSubmitted && (
                      <div className="alert alert-info">
                        <FaCheckCircle />
                        <span>Task submitted successfully</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Submit Modal */}
      {showSubmitModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Submit Your Task</h3>
            <p className="mb-4 text-muted">
              Please provide the link to your submission (e.g., Google Drive,
              Dropbox, portfolio link, etc.)
            </p>
            <textarea
              value={submissionLink}
              onChange={(e) => setSubmissionLink(e.target.value)}
              className="textarea textarea-bordered w-full h-32 mb-4"
              placeholder="Enter submission link..."
            />
            <div className="modal-action">
              <button
                onClick={() => {
                  setShowSubmitModal(false);
                  setSubmissionLink("");
                }}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-accent-custom hover:bg-accent-custom/90 text-white border-0 px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                {submitMutation.isPending ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContestDetails;
