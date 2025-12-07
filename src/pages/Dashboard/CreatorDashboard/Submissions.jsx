import { useParams } from "react-router-dom";
import { useDeclareWinner } from "../../../hooks/useContests";
import { useContestSubmissions } from "../../../hooks/useCreator";
import { useMyContests } from "../../../hooks/useCreator";
import Swal from "sweetalert2";
import { FaTrophy, FaCalendarAlt } from "react-icons/fa";
import { useState } from "react";

const Submissions = () => {
  const { id } = useParams();
  const { data: submissions = [], isLoading } = useContestSubmissions(id);
  const { data: contests = [] } = useMyContests();
  const declareWinnerMutation = useDeclareWinner();
  const [selectedWinner, setSelectedWinner] = useState(null);

  const contest = contests.find((c) => c._id === id);

  const handleDeclareWinner = async (submissionId, participantName) => {
    const result = await Swal.fire({
      title: "Declare Winner",
      text: `Are you sure you want to declare ${participantName} as the winner?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, declare winner!",
    });

    if (result.isConfirmed) {
      try {
        await declareWinnerMutation.mutateAsync({
          contestId: id,
          winnerId: submissionId,
        });

        setSelectedWinner(submissionId);
        Swal.fire({
          icon: "success",
          title: "Winner Declared!",
          text: `${participantName} has been declared as the winner`,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to declare winner. Please try again.",
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title mb-6">Submitted Tasks</h2>

        {contest && (
          <div className="alert alert-info mb-6">
            <FaCalendarAlt />
            <div>
              <h3 className="font-bold">{contest.name}</h3>
              <p>Deadline: {new Date(contest.deadline).toLocaleDateString()}</p>
            </div>
          </div>
        )}

        {submissions.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📤</div>
            <p className="text-xl text-muted mb-2">
              No submissions yet for this contest.
            </p>
            <p className="text-sm text-muted">
              Participants will appear here once they submit their tasks.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission) => (
              <div
                key={submission._id}
                className={`card bg-base-100 shadow-lg ${
                  selectedWinner === submission._id
                    ? "ring-2 ring-yellow-500"
                    : ""
                }`}
              >
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={submission.participant.photoURL}
                        alt={submission.participant.name}
                        className="w-16 h-16 rounded-full"
                      />
                      <div>
                        <h3 className="font-bold text-lg">
                          {submission.participant.name}
                        </h3>
                        <p className="text-muted">
                          {submission.participant.email}
                        </p>
                        <p className="text-sm text-base-content/50 mt-2">
                          Submitted:{" "}
                          {new Date(submission.submittedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    {selectedWinner === submission._id && (
                      <div className="badge badge-lg badge-warning">
                        <FaTrophy className="mr-1" />
                        Winner
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <p className="font-semibold mb-2">Submission:</p>
                    <a
                      href={submission.submission}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link text-primary-custom hover:text-accent-custom break-all underline"
                    >
                      {submission.submission}
                    </a>
                  </div>

                  {contest &&
                    new Date(contest.deadline) < new Date() &&
                    selectedWinner !== submission._id && (
                      <div className="card-actions justify-end mt-4">
                        <button
                          onClick={() =>
                            handleDeclareWinner(
                              submission._id,
                              submission.participant.name
                            )
                          }
                          className="btn bg-accent-custom hover:bg-accent-custom/90 text-white border-0"
                          disabled={
                            declareWinnerMutation.isPending ||
                            selectedWinner !== null
                          }
                        >
                          <FaTrophy className="mr-2" />
                          Declare Winner
                        </button>
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Submissions;
