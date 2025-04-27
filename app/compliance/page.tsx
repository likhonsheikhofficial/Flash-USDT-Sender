/**
 * @author likhonsheikh
 * @license AGPL-3.0
 * @link https://github.com/likhonsheikhofficial
 */

export default function CompliancePage() {
  return (
    <main className="flex min-h-screen flex-col py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Compliance Policy</h1>
        <div className="prose max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <h2>1. Anti-Money Laundering (AML) Policy</h2>
          <p>
            Flash USDT Sender is committed to preventing money laundering and any activity that facilitates money
            laundering or the funding of terrorist or criminal activities. We implement procedures to detect and prevent
            such activities.
          </p>

          <h2>2. Know Your Customer (KYC) Procedures</h2>
          <p>
            For transactions exceeding certain thresholds, we may require users to complete KYC verification, which may
            include providing identification documents and proof of address.
          </p>

          <h2>3. Transaction Monitoring</h2>
          <p>We monitor transactions for suspicious activities and reserve the right to:</p>
          <ul>
            <li>Request additional information about transactions</li>
            <li>Delay or refuse to process transactions</li>
            <li>Report suspicious activities to relevant authorities</li>
          </ul>

          <h2>4. Prohibited Activities</h2>
          <p>Users are prohibited from using Flash USDT Sender for:</p>
          <ul>
            <li>Money laundering or terrorist financing</li>
            <li>Fraudulent activities</li>
            <li>Transactions related to illegal goods or services</li>
            <li>Circumventing economic sanctions</li>
            <li>Any other illegal activities</li>
          </ul>

          <h2>5. Regulatory Compliance</h2>
          <p>
            Flash USDT Sender complies with applicable laws and regulations in the jurisdictions where we operate. We
            cooperate with law enforcement and regulatory authorities as required by law.
          </p>

          <h2>6. User Responsibility</h2>
          <p>
            Users are responsible for ensuring their activities comply with all applicable laws and regulations in their
            jurisdiction. By using our service, users represent that they are not subject to sanctions or engaged in
            prohibited activities.
          </p>

          <h2>7. Updates to Compliance Policy</h2>
          <p>
            We may update this policy to reflect changes in regulatory requirements or our business practices. Users
            will be notified of significant changes.
          </p>

          <h2>8. Contact Information</h2>
          <p>For compliance-related inquiries, please contact us at compliance@flash-usdt-sender.com.</p>
        </div>
      </div>
    </main>
  )
}
