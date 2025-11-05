export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>

      <div className="prose prose-lg mx-auto">
        <p className="text-xl mb-6">
          At DreamVerse, we are committed to protecting your privacy. This privacy policy explains how we collect,
          use, and safeguard your information.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
        <ul className="list-disc pl-6 mb-6">
          <li><strong>Account Information:</strong> Username, display name, and email (if provided)</li>
          <li><strong>User-Generated Content:</strong> Worlds, avatars, and other creations you make</li>
          <li><strong>Usage Data:</strong> How you interact with the platform</li>
          <li><strong>Device Information:</strong> Browser type, device type, and screen resolution</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
        <ul className="list-disc pl-6 mb-6">
          <li>To provide and maintain the DreamVerse platform</li>
          <li>To personalize your experience</li>
          <li>To improve our services and develop new features</li>
          <li>To communicate with you about updates and support</li>
          <li>To ensure platform security and prevent abuse</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Data Storage and Security</h2>
        <p className="mb-6">
          All data is stored locally on your device using IndexedDB and localStorage. We do not transmit your personal
          data to external servers unless you explicitly choose to share worlds publicly. Your creations remain private
          unless you choose to share them.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
        <ul className="list-disc pl-6 mb-6">
          <li>Access and download your data</li>
          <li>Delete your account and associated data</li>
          <li>Opt-out of data collection (though this may limit functionality)</li>
          <li>Request corrections to your information</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking</h2>
        <p className="mb-6">
          DreamVerse may use local storage and cookies for functionality and preferences. We do not use third-party
          tracking or analytics services.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
        <p className="mb-6">
          DreamVerse is designed for teens and young adults. We do not knowingly collect personal information from
          children under 13. If you are under 13, please do not use this service.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
        <p className="mb-6">
          We may update this privacy policy from time to time. We will notify users of significant changes through
          the platform or via email.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p>
          If you have questions about this privacy policy, please contact us at{' '}
          <a href="mailto:privacy@dreamverse.app" className="text-primary hover:text-primary-hover">
            privacy@dreamverse.app
          </a>
        </p>

        <p className="text-sm text-text-muted mt-8">
          Last updated: November 2025
        </p>
      </div>
    </div>
  )
}