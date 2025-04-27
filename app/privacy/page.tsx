/**
 * @author likhonsheikh
 * @license AGPL-3.0
 * @link https://github.com/likhonsheikhofficial
 */

export default function PrivacyPage() {
  return (
    <main className="flex min-h-screen flex-col py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <h2>1. Information We Collect</h2>
          <p>
            We collect transaction data, including wallet addresses, transaction amounts, and network information. We
            may also collect device information, IP addresses, and usage statistics.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>We use collected information to:</p>
          <ul>
            <li>Process and verify transactions</li>
            <li>Improve our services</li>
            <li>Prevent fraud and abuse</li>
            <li>Comply with legal obligations</li>
            <li>Communicate with users about service updates</li>
          </ul>

          <h2>3. Information Sharing</h2>
          <p>We do not sell user data to third parties. We may share information with:</p>
          <ul>
            <li>Service providers who assist in operating our platform</li>
            <li>Legal authorities when required by law</li>
            <li>Business partners with user consent</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect user data. However, no method of transmission
            over the internet is 100% secure.
          </p>

          <h2>5. User Rights</h2>
          <p>Depending on your jurisdiction, you may have rights to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Delete your data</li>
            <li>Object to processing</li>
            <li>Data portability</li>
          </ul>

          <h2>6. Cookies and Tracking</h2>
          <p>
            We use cookies and similar technologies to enhance user experience and collect usage data. Users can control
            cookie preferences through browser settings.
          </p>

          <h2>7. Changes to Privacy Policy</h2>
          <p>
            We may update this policy periodically. Significant changes will be notified to users. Continued use of the
            service constitutes acceptance of the updated policy.
          </p>

          <h2>8. Contact Information</h2>
          <p>For privacy-related inquiries, please contact us at privacy@flash-usdt-sender.com.</p>
        </div>
      </div>
    </main>
  )
}
