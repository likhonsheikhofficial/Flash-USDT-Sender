/**
 * @author likhonsheikh
 * @license AGPL-3.0
 * @link https://github.com/likhonsheikhofficial
 */

export default function DisclaimerPage() {
  return (
    <main className="flex min-h-screen flex-col py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Disclaimer</h1>
        <div className="prose max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <h2>1. No Financial Advice</h2>
          <p>
            Flash USDT Sender does not provide financial, investment, legal, or tax advice. The information provided on
            this website is for general informational purposes only.
          </p>

          <h2>2. Risk Disclosure</h2>
          <p>Cryptocurrency transactions involve significant risk. Users should be aware that:</p>
          <ul>
            <li>Cryptocurrency values can be highly volatile</li>
            <li>Transactions cannot be reversed once confirmed</li>
            <li>Sending to incorrect addresses will result in permanent loss of funds</li>
            <li>Network congestion may affect transaction times</li>
          </ul>

          <h2>3. Accuracy of Information</h2>
          <p>
            While we strive to provide accurate information, we make no representations or warranties regarding the
            completeness, reliability, or accuracy of the content on this website.
          </p>

          <h2>4. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We have no control over the content, privacy
            policies, or practices of these sites and assume no responsibility for them.
          </p>

          <h2>5. Service Availability</h2>
          <p>
            Flash USDT Sender does not guarantee uninterrupted service. Blockchain network conditions, technical issues,
            or maintenance may affect service availability.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Flash USDT Sender shall not be liable for any direct, indirect,
            incidental, special, consequential, or punitive damages resulting from the use or inability to use our
            services.
          </p>

          <h2>7. Compliance Responsibility</h2>
          <p>
            Users are responsible for ensuring their use of Flash USDT Sender complies with all applicable laws and
            regulations in their jurisdiction.
          </p>
        </div>
      </div>
    </main>
  )
}
