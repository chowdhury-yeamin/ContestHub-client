import React from "react";

const ContestRules = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Contest Rules
        </h1>
        <p className="text-lg sm:text-xl text-gray-500">
          Guidelines to ensure fair and fun participation in every contest.
        </p>
      </div>

      {/* Contest Rules Content */}
      <div className="space-y-8 text-gray-700 text-base sm:text-lg leading-relaxed">
        {/* 1. Eligibility */}
        <section>
          <h2 className="text-2xl font-bold mb-2">1. Eligibility</h2>
          <p>
            All participants must be registered users of ContestHub and meet the
            minimum age requirement for the contest. Each participant may submit
            only the allowed number of entries per contest.
          </p>
        </section>

        {/* 2. Entry Guidelines */}
        <section>
          <h2 className="text-2xl font-bold mb-2">2. Entry Guidelines</h2>
          <p>
            Submissions must follow the contest theme and instructions provided.
            Plagiarized content, offensive material, or incomplete entries will
            be disqualified.
          </p>
        </section>

        {/* 3. Submission Deadlines */}
        <section>
          <h2 className="text-2xl font-bold mb-2">3. Submission Deadlines</h2>
          <p>
            All entries must be submitted before the contest deadline. Late
            submissions will not be accepted.
          </p>
        </section>

        {/* 4. Judging Criteria */}
        <section>
          <h2 className="text-2xl font-bold mb-2">4. Judging Criteria</h2>
          <p>
            Contests are judged based on creativity, originality, adherence to
            guidelines, and overall quality. Judges’ decisions are final and
            binding.
          </p>
        </section>

        {/* 5. Winner Announcement */}
        <section>
          <h2 className="text-2xl font-bold mb-2">5. Winner Announcement</h2>
          <p>
            Winners will be announced on the ContestHub platform as per the
            contest timeline. Winners will be contacted via email, and prizes
            must be claimed within the stipulated period.
          </p>
        </section>

        {/* 6. Intellectual Property */}
        <section>
          <h2 className="text-2xl font-bold mb-2">6. Intellectual Property</h2>
          <p>
            Participants retain ownership of their submissions but grant
            ContestHub a non-exclusive license to display, promote, and use the
            submissions for contest-related purposes.
          </p>
        </section>

        {/* 7. Payment & Entry Fees */}
        <section>
          <h2 className="text-2xl font-bold mb-2">7. Payment & Entry Fees</h2>
          <p>
            Some contests may require an entry fee. Payments must be completed
            through the ContestHub platform. Failure to pay may result in
            disqualification.
          </p>
        </section>

        {/* 8. Code of Conduct */}
        <section>
          <h2 className="text-2xl font-bold mb-2">8. Code of Conduct</h2>
          <p>
            Participants must act respectfully towards creators, other
            participants, and judges. Harassment, spamming, or any unethical
            behavior may result in immediate disqualification.
          </p>
        </section>

        {/* 9. Changes to Rules */}
        <section>
          <h2 className="text-2xl font-bold mb-2">9. Changes to Rules</h2>
          <p>
            ContestHub reserves the right to update or modify contest rules at
            any time. Updates will be communicated on the contest page.
          </p>
        </section>

        {/* 10. Contact */}
        <section>
          <h2 className="text-2xl font-bold mb-2">10. Contact</h2>
          <p className="flex gap-1 flex-wrap">
            For questions regarding contest rules, please reach out to us at
            <a
              href="mailto:support@contesthub.com"
              className="text-blue-600 hover:underline"
            >
              chowdhuryyeamin07@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default ContestRules;
