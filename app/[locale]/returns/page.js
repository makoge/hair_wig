export const metadata = {
  title: "Return & Exchange Policy | Confida Hair",
  description:
    "Read Confida Hair’s return and exchange policy, including 14-day returns for confirmed order mix-ups and premium customer exchanges.",
};

export default function ReturnsPage() {
  return (
    <main className="policy-page">
      <div className="policy-wrap">
        <h1>Return &amp; Exchange Policy</h1>
        <p className="policy-updated">Last updated: {new Date().toISOString().slice(0, 10)}</p>

        <section>
          <h2>Returns</h2>
          <p>
            We take great care to ensure that only the products ordered are shipped to all customers.
            However, in the rare event of a shipping error or product mix-up on our side, we offer a
            14-day return policy from the date of delivery.
          </p>

          <h3>Eligibility</h3>
          <ul>
            <li>The issue must be confirmed as an error made by Confida Hair.</li>
            <li>The item must be unused, unaltered, and in its original condition and packaging.</li>
            <li>You must contact us within 14 days of receiving your order.</li>
          </ul>

          <p>
            If your request is approved, we will provide return instructions and the return address.
          </p>
        </section>

        <section>
          <h2>Exchanges</h2>
          <p>
            If you are a premium customer and want to exchange your wig for a different one, we will
            be glad to do so on an agreeable price (based on the price difference and availability).
          </p>

          <h3>Exchange conditions</h3>
          <ul>
            <li>The original item must be unused and in original condition.</li>
            <li>Exchange requests are subject to stock availability.</li>
            <li>Any price difference and applicable shipping costs will be confirmed before processing.</li>
          </ul>
        </section>

        <section>
          <h2>Non-returnable items</h2>
          <p>For hygiene and quality reasons, we do not accept returns for:</p>
          <ul>
            <li>Used or worn wigs</li>
            <li>Customized, altered, or installed products</li>
            <li>Items damaged after delivery due to improper handling or care</li>
          </ul>
        </section>

        <section>
          <h2>How to request a return or exchange</h2>
          <p>Please contact us with:</p>
          <ul>
            <li>Your order number</li>
            <li>A clear explanation of the issue/request</li>
            <li>Photos (if there is a mix-up or damage)</li>
          </ul>
          <p>
            We review requests case-by-case and respond as quickly as possible with next steps.
          </p>
        </section>

        <section>
          <h2>Final notes</h2>
          <p>
            We aim to be fair, transparent, and customer-focused while maintaining high product
            quality standards. This policy does not affect your statutory consumer rights where applicable.
          </p>
        </section>
      </div>
    </main>
  );
}
