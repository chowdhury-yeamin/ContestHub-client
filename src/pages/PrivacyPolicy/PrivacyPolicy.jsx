const PrivacyPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Privacy Policy
        </h1>
        <p className="text-lg sm:text-xl text-gray-500">
          Learn how we collect, use, and protect your personal information.
        </p>
      </div>

      {/* Privacy Content */}
      <div className="space-y-8 text-gray-700 text-base sm:text-lg leading-relaxed">
        {/* 1. Information Collection */}
        <section>
          <h2 className="text-2xl font-bold mb-2">1. Information We Collect</h2>
          <p>
            We collect information you provide directly when creating an
            account, participating in contests, or contacting us. This may
            include your name, email, profile photo, contest submissions, and
            payment information.
          </p>
        </section>

        {/* 2. Usage of Information */}
        <section>
          <h2 className="text-2xl font-bold mb-2">
            2. How We Use Your Information
          </h2>
          <p>
            Your information is used to provide and improve our services,
            process payments, manage contests, communicate updates, and
            personalize your experience on ContestHub.
          </p>
        </section>

        {/* 3. Sharing of Information */}
        <section>
          <h2 className="text-2xl font-bold mb-2">
            3. Sharing Your Information
          </h2>
          <p>
            We do not sell your personal information. We may share information
            with service providers for payment processing, hosting, analytics,
            or legal requirements.
          </p>
        </section>

        {/* 4. Cookies & Tracking */}
        <section>
          <h2 className="text-2xl font-bold mb-2">4. Cookies and Tracking</h2>
          <p>
            We use cookies and similar technologies to enhance your experience,
            understand site usage, and show relevant content. You can control
            cookies through your browser settings.
          </p>
        </section>

        {/* 5. Security */}
        <section>
          <h2 className="text-2xl font-bold mb-2">5. Security</h2>
          <p>
            We implement reasonable security measures to protect your data.
            However, no online platform is completely secure. We cannot
            guarantee absolute protection against unauthorized access.
          </p>
        </section>

        {/* 6. User Rights */}
        <section>
          <h2 className="text-2xl font-bold mb-2">6. Your Rights</h2>
          <p>
            You may access, update, or delete your account information by
            contacting us. You may also opt out of marketing communications at
            any time.
          </p>
        </section>

        {/* 7. Third-Party Services */}
        <section>
          <h2 className="text-2xl font-bold mb-2">7. Third-Party Services</h2>
          <p>
            Our platform may include links to third-party services or
            advertisements. We are not responsible for the privacy practices of
            these services. Please review their policies separately.
          </p>
        </section>

        {/* 8. Children’s Privacy */}
        <section>
          <h2 className="text-2xl font-bold mb-2">8. Children’s Privacy</h2>
          <p>
            ContestHub is not intended for children under 13. We do not
            knowingly collect information from children. If we learn that we
            have, we will take steps to delete it.
          </p>
        </section>

        {/* 9. Changes to Privacy Policy */}
        <section>
          <h2 className="text-2xl font-bold mb-2">
            9. Changes to Privacy Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Updates will be
            posted on this page, and your continued use of the platform
            constitutes acceptance of the revised policy.
          </p>
        </section>

        {/* 10. Contact */}
        <section>
          <h2 className="text-2xl font-bold mb-2">10. Contact Us</h2>
          <p>
            For any questions regarding this Privacy Policy, please contact us
            at
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

export default PrivacyPolicy;
