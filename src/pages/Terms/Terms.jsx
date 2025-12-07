import React from "react";

const Terms = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Terms & Conditions
        </h1>
        <p className="text-lg sm:text-xl text-gray-500">
          Please read these terms and conditions carefully before using our
          platform.
        </p>
      </div>

      {/* Terms Content */}
      <div className="space-y-8 text-gray-700 text-base sm:text-lg leading-relaxed">
        {/* 1. Introduction */}
        <section>
          <h2 className="text-2xl font-bold mb-2">1. Introduction</h2>
          <p>
            Welcome to ContestHub! By accessing or using our platform, you agree
            to be bound by these terms and conditions. If you do not agree with
            any part of these terms, you must not use our services.
          </p>
        </section>

        {/* 2. Eligibility */}
        <section>
          <h2 className="text-2xl font-bold mb-2">2. Eligibility</h2>
          <p>
            Users must be at least 13 years old to register and participate in
            contests. By creating an account, you represent and warrant that you
            meet this age requirement.
          </p>
        </section>

        {/* 3. Account Responsibilities */}
        <section>
          <h2 className="text-2xl font-bold mb-2">
            3. Account Responsibilities
          </h2>
          <p>
            Users are responsible for maintaining the confidentiality of their
            account credentials. Any activity conducted through your account is
            your responsibility.
          </p>
        </section>

        {/* 4. Contest Participation */}
        <section>
          <h2 className="text-2xl font-bold mb-2">4. Contest Participation</h2>
          <p>
            All contests have specific rules and deadlines. Participants must
            comply with contest requirements, and any submission that violates
            rules may be disqualified.
          </p>
        </section>

        {/* 5. Payments */}
        <section>
          <h2 className="text-2xl font-bold mb-2">5. Payments</h2>
          <p>
            Contest entry fees and prizes are handled through our integrated
            payment system. Refunds are only available under certain conditions
            as specified in each contest.
          </p>
        </section>

        {/* 6. Intellectual Property */}
        <section>
          <h2 className="text-2xl font-bold mb-2">6. Intellectual Property</h2>
          <p>
            Users retain ownership of their submissions but grant ContestHub a
            license to display, share, and promote submissions within the
            platform.
          </p>
        </section>

        {/* 7. Prohibited Activities */}
        <section>
          <h2 className="text-2xl font-bold mb-2">7. Prohibited Activities</h2>
          <p>
            Users must not engage in fraud, harassment, spamming, or any illegal
            activities. Violation may result in account suspension or
            termination.
          </p>
        </section>

        {/* 8. Limitation of Liability */}
        <section>
          <h2 className="text-2xl font-bold mb-2">
            8. Limitation of Liability
          </h2>
          <p>
            ContestHub is not liable for any damages or losses resulting from
            the use of the platform, participation in contests, or inability to
            access the service.
          </p>
        </section>

        {/* 9. Changes to Terms */}
        <section>
          <h2 className="text-2xl font-bold mb-2">9. Changes to Terms</h2>
          <p>
            We may update these terms from time to time. Users will be notified
            of significant changes, and continued use constitutes acceptance of
            the updated terms.
          </p>
        </section>

        {/* 10. Contact */}
        <section>
          <h2 className="text-2xl font-bold mb-2">10. Contact</h2>
          <p>
            For any questions regarding these terms, please contact us at{" "}
            <a
              href="mailto:support@contesthub.com"
              className="text-blue-600 hover:underline"
            >
              support@contesthub.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
