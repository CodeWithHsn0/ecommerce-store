import { GlobalLoading } from "../global-loading"

export default function PrivacyPage() {
  return (
    <div className="container py-10">
      <GlobalLoading />

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <div className="prose max-w-none">
          <p>
            At ShopHub, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you visit our website.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We may collect information about you in a variety of ways. The information we may collect via the Website
            includes:
          </p>

          <h3>Personal Data</h3>
          <p>
            Personally identifiable information, such as your name, shipping address, email address, and telephone
            number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily
            give to us when you register with the Website or when you choose to participate in various activities
            related to the Website. You are under no obligation to provide us with personal information of any kind,
            however your refusal to do so may prevent you from using certain features of the Website.
          </p>

          <h3>Derivative Data</h3>
          <p>
            Information our servers automatically collect when you access the Website, such as your IP address, your
            browser type, your operating system, your access times, and the pages you have viewed directly before and
            after accessing the Website.
          </p>

          <h3>Financial Data</h3>
          <p>
            Financial information, such as data related to your payment method (e.g. valid credit card number, card
            brand, expiration date) that we may collect when you purchase, order, return, exchange, or request
            information about our services from the Website. We store only very limited, if any, financial information
            that we collect. Otherwise, all financial information is stored by our payment processor and you are
            encouraged to review their privacy policy and contact them directly for responses to your questions.
          </p>

          <h2>2. Use of Your Information</h2>
          <p>
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized
            experience. Specifically, we may use information collected about you via the Website to:
          </p>
          <ul>
            <li>Create and manage your account.</li>
            <li>Process your orders and manage your transactions.</li>
            <li>Send you a newsletter.</li>
            <li>Email you regarding your account or order.</li>
            <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Website.</li>
            <li>Monitor and analyze usage and trends to improve your experience with the Website.</li>
            <li>Notify you of updates to the Website.</li>
            <li>Resolve disputes and troubleshoot problems.</li>
            <li>Respond to product and customer service requests.</li>
          </ul>

          <h2>3. Disclosure of Your Information</h2>
          <p>
            We may share information we have collected about you in certain situations. Your information may be
            disclosed as follows:
          </p>

          <h3>By Law or to Protect Rights</h3>
          <p>
            If we believe the release of information about you is necessary to respond to legal process, to investigate
            or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we
            may share your information as permitted or required by any applicable law, rule, or regulation.
          </p>

          <h3>Third-Party Service Providers</h3>
          <p>
            We may share your information with third parties that perform services for us or on our behalf, including
            payment processing, data analysis, email delivery, hosting services, customer service, and marketing
            assistance.
          </p>

          <h2>4. Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information.
            While we have taken reasonable steps to secure the personal information you provide to us, please be aware
            that despite our efforts, no security measures are perfect or impenetrable, and no method of data
            transmission can be guaranteed against any interception or other type of misuse.
          </p>

          <h2>5. Contact Us</h2>
          <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
          <p>
            ShopHub
            <br />
            123 Commerce Street
            <br />
            New York, NY 10001
            <br />
            Email: privacy@shophub.com
            <br />
            Phone: +1 (555) 123-4567
          </p>
        </div>
      </div>
    </div>
  )
}

