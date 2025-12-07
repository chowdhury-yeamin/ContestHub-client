import React from "react";

const CreatorGuide = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Creator Guide
        </h1>
        <p className="text-lg sm:text-xl text-gray-500">
          Step-by-step guide to creating and managing contests on ContestHub.
        </p>
      </div>

      {/* Guide Content */}
      <div className="space-y-10 text-gray-700 text-base sm:text-lg leading-relaxed">
        {/* 1. Account Setup */}
        <section>
          <h2 className="text-2xl font-bold mb-2">1. Account Setup</h2>
          <p>
            To create contests, you need a Creator account. Sign up or upgrade
            your existing account to a Creator role via the dashboard. Ensure
            your profile picture, display name, and bio are complete to build
            credibility.
          </p>
        </section>

        {/* 2. Adding a Contest */}
        <section>
          <h2 className="text-2xl font-bold mb-2">2. Adding a Contest</h2>
          <p>
            Navigate to the Creator Dashboard → Add Contest. Fill in the contest
            details including:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Contest Name & Description</li>
            <li>Contest Type (Design, Writing, etc.)</li>
            <li>Entry Fee & Prize Money</li>
            <li>Submission Guidelines & Tasks</li>
            <li>Deadline (use calendar picker)</li>
            <li>Upload a creative contest image/banner</li>
          </ul>
          <p className="mt-2">
            Click <strong>Submit</strong> to send your contest for admin
            approval.
          </p>
        </section>

        {/* 3. Managing Contests */}
        <section>
          <h2 className="text-2xl font-bold mb-2">3. Managing Contests</h2>
          <p>Go to My Contests page in your dashboard. Here you can:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Edit or Delete contests (only if still pending approval)</li>
            <li>View participant submissions</li>
            <li>Track participation count and prize status</li>
          </ul>
        </section>

        {/* 4. Declaring Winners */}
        <section>
          <h2 className="text-2xl font-bold mb-2">4. Declaring Winners</h2>
          <p>
            After the contest deadline, review all submissions. You can then
            select a winner and declare it via the Submissions page. The
            winner’s profile and prize will be showcased publicly on the
            platform.
          </p>
        </section>

        {/* 5. Best Practices */}
        <section>
          <h2 className="text-2xl font-bold mb-2">5. Best Practices</h2>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              Be clear and detailed in your contest description and tasks.
            </li>
            <li>
              Set realistic deadlines and prize money to attract participants.
            </li>
            <li>Ensure your submissions guidelines are easy to follow.</li>
            <li>Communicate with participants politely and promptly.</li>
            <li>
              Promote your contests on social media to increase participation.
            </li>
          </ul>
        </section>

        {/* 6. Support */}
        <section>
          <h2 className="text-2xl font-bold mb-2">6. Support</h2>
          <p>
            If you encounter any issues or have questions, contact our support
            team at
            <a
              href="mailto:support@contesthub.com"
              className="text-blue-600 hover:underline"
            >
              {" "}
              support@contesthub.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default CreatorGuide;
