/**
 * @author likhonsheikh
 * @license AGPL-3.0
 * @link https://github.com/likhonsheikhofficial
 */

export default function TermsPage() {
  return (
    <main className="flex min-h-screen flex-col py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="prose max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using Flash USDT Sender, you agree to be bound by these Terms of Service. If you do not
            agree to these terms, please do not use our service.
          </p>

          <h2>2. Service Description</h2>
          <p>
            Flash USDT Sender provides a platform for transferring USDT across multiple blockchain networks. We are not
            a financial institution or money transmitter, but a technology provider.
          </p>

          <h2>3. User Responsibilities</h2>
          <p>
            Users are responsible for ensuring the accuracy of recipient addresses and transaction details. Flash USDT
            Sender cannot reverse completed transactions or recover funds sent to incorrect addresses.
          </p>

          <h2>4. Compliance with Laws</h2>
          <p>
            Users must comply with all applicable laws and regulations in their jurisdiction. Flash USDT Sender is not
            available in regions where cryptocurrency transactions are prohibited.
          </p>

          <h2>5. Service Availability</h2>
          <p>
            We strive to maintain continuous service availability, but cannot guarantee uninterrupted access.
            Maintenance, network issues, or blockchain congestion may affect service performance.
          </p>

          <h2>6. Fees and Charges</h2>
          <p>
            Flash USDT Sender charges fees for transactions as displayed before confirmation. Network fees are estimated
            and may vary based on blockchain conditions.
          </p>

          <h2>7. Privacy and Data</h2>
          <p>
            We collect and process user data as outlined in our Privacy Policy. By using our service, you consent to our
            data practices.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            Flash USDT Sender is not liable for any direct, indirect, incidental, or consequential damages resulting
            from the use or inability to use our service.
          </p>

          <h2>9. Modifications to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of the service after changes
            constitutes acceptance of the updated terms.
          </p>

          <h2>10. Contact Information</h2>
          <p>For questions regarding these terms, please contact us at support@flash-usdt-sender.com.</p>
        </div>
      </div>
    </main>
  )
}
